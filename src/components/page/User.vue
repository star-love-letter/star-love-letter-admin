<template>
    <div>
        <el-card shadow="hover">
            <el-table :data="users" @sort-change="sortChange" :row-class-name="tableRowClassName" style="width: 100%">
                <el-table-column sortable="custom" prop="id" width="50"> </el-table-column>
                <el-table-column sortable="custom" prop="name" label="用户名称" width="130"> </el-table-column>
                <el-table-column sortable="custom" prop="studentId" label="学号" width="140"> </el-table-column>
                <el-table-column sortable="custom" prop="email" label="邮箱" width="160"> </el-table-column>
                <el-table-column sortable="custom" prop="wechat" show-overflow-tooltip label="微信" width="90"></el-table-column>
                <el-table-column sortable="custom" prop="lastTime" label="上次登录时间" width="140"></el-table-column>
                <el-table-column sortable="custom" prop="createTime" label="创建时间" width="140"></el-table-column>
                <el-table-column sortable="custom" prop="roleName" label="角色" width="70"></el-table-column>
                <el-table-column sortable="custom" prop="stateName" label="状态" width="80"></el-table-column>
                <el-table-column width="200">
                    <template slot="header" slot-scope="scope">
                        <el-input
                            size="mini"
                            placeholder="请输入内容"
                            v-model="keyword"
                            @keyup.enter.native="search"
                            class="input-with-select"
                        >
                            <el-button v-if="isSearch" slot="append" icon="el-icon-close" @click="clearSearch"></el-button>
                            <el-button v-if="!isSearch" slot="append" icon="el-icon-search" @click="search"></el-button>
                        </el-input>
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="openDialogEdit(scope.$index)">编辑</el-button>
                        <el-button type="success" v-if="scope.row.state == 1" size="mini" @click="reportSuccess(scope.$index, scope.row.id)"
                            >通过审核</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                style="margin-top: 20px"
                background
                layout="prev, pager, next"
                :current-page.sync="pageIndex"
                @current-change="setPage"
                :page-size="pageSize"
                :total="userCount"
            >
            </el-pagination>
        </el-card>

        <el-dialog :visible.sync="dialogEditShow" v-dialogDrag title="编辑用户信息" top="7vh" center width="40%" :fullscreen="isMobile">
            <el-form ref="formRef" :model="form">
                <div>
                    <div style="display: inline-block; width: 75%">
                        <el-form-item label="id">
                            <el-input disabled v-model="form.id"></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </div>
                    <div v-if="!isMobile" style="display: inline-block; width: 20%; margin: 10px">
                        <img :src="IMAGE_URL + form.avatar" class="user-avatar" alt />
                    </div>
                </div>
                <el-form-item label="邮箱">
                    <el-checkbox v-model="form.emailIsNULL">是否为空</el-checkbox>
                    <el-input v-model="form.email" :disabled="form.emailIsNULL"></el-input>
                </el-form-item>

                <el-form-item label="微信">
                    <el-checkbox v-model="form.wechatIsNULL">是否为空</el-checkbox>
                    <el-input v-model="form.wechat" :disabled="form.wechatIsNULL"></el-input>
                </el-form-item>
                <el-form-item label="学号">
                    <el-checkbox v-model="form.studentIdIsNULL">是否为空</el-checkbox>
                    <el-input v-model="form.studentId" :disabled="form.studentIdIsNULL"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.state" placeholder="用户状态">
                        <el-option label="正常" :value="0"></el-option>
                        <el-option label="待审核" :value="1"></el-option>
                        <el-option label="封禁" :value="-1"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialogEdit">取 消</el-button>
                <el-button type="primary" @click="saveDialogEdit">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { AdminUserData } from '../../api/AdminUser';
import global from '../../utils/global';

export default {
    name: 'User',
    data() {
        return {
            IMAGE_URL:global.image,
            users: [],
            sortName: null,
            sortType: null,
            pageIndex: 1,
            pageSize: 10,
            userCount: 0,
            keyword: '',
            isSearch: false,
            dialogEditShow: false,
            form: {}
        };
    },
    created() {
        this.getUsers();
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            if (row.state === -1) {
                return 'lock-row';
            } else if (row.state === 1) {
                return 'wait-row';
            }
            return '';
        },
        sortChange({ column, order, prop }) {
            // 默认排序方式
            if (order == null) {
                this.sortName = null;
                this.sortType = null;
                return;
            }

            //判断排序类型
            if (order == 'descending') this.sortType = false;
            else if (order == 'ascending') this.sortType = true;

            //排序字段
            if (prop == 'studentId') this.sortName = 'student_id';
            else if (prop == 'lastTime') this.sortName = 'last_time';
            else if (prop == 'createTime') this.sortName = 'create_time';
            else if (prop == 'roleName') this.sortName = 'role_id';
            else if (prop == 'stateName') this.sortName = 'state';
            else this.sortName = prop;

            this.getUsers();
        },
        reportSuccess(index, id) {
            let user = this.users[index];
            if (user.id != id) this.$message.error('非法操作');

            AdminUserData.updateUser(user.id, user.name, user.email, user.wechat, user.studentId, 0).finally(() => {
                this.getUser(index);
            });
        },
        openDialogEdit(index) {
            let user = this.users[index];

            Object.keys(user).forEach((key) => {
                this.$set(this.form, key, user[key]);
            });
            this.$set(this.form, 'index', index);
            this.$set(this.form, 'emailIsNULL', user.email == null);
            this.$set(this.form, 'wechatIsNULL', user.wechat == null);
            this.$set(this.form, 'studentIdIsNULL', user.studentId == null);

            this.dialogEditShow = true;
        },
        saveDialogEdit() {
            if (this.form.emailIsNULL) this.form.email = null;
            if (this.form.wechatIsNULL) this.form.wechat = null;
            if (this.form.studentIdIsNULL) this.form.studentId = null;

            AdminUserData.updateUser(
                this.form.id,
                this.form.name,
                this.form.email,
                this.form.wechat,
                this.form.studentId,
                this.form.state
            ).then((res) => {
                this.getUser(this.form.index);
                this.closeDialogEdit();
                this.$message.success(res.message);
            });
        },
        closeDialogEdit() {
            this.dialogEditShow = false;
        },
        handleEdit(id) {
            this.openDialog();
        },
        clearSearch() {
            this.pageIndex = 1;
            this.keyword = '';
            this.isSearch = false;

            this.getUsers();
        },
        search() {
            this.pageIndex = 1;

            if (this.keyword == '') this.isSearch = false;
            else this.isSearch = true;

            this.getUsers();
        },

        setPage(index) {
            this.getUsers();
        },
        getUser(index) {
            AdminUserData.user(this.users[index].id).then((res) => {
                this.$set(this.users, index, res.data);
            });
        },
        getUsers() {
            if (!this.isSearch) {
                AdminUserData.count().then((res) => {
                    this.userCount = res.data;
                });

                AdminUserData.pageList(this.pageIndex, this.pageSize, this.sortName, this.sortType).then((res) => {
                    this.users = res.data;
                });
            } else {
                AdminUserData.searchCount(this.keyword).then((res) => {
                    this.userCount = res.data;
                });

                AdminUserData.searchList(this.keyword, this.pageIndex, this.pageSize, this.sortName, this.sortType).then((res) => {
                    this.users = res.data;
                });
            }
        }
    },
    computed: {
        isMobile() {
            return screen.width <= 425;
        }
    }
};
</script>

<style>
/* 待审核 的每行颜色 */
.el-table .wait-row {
    background: #f0f9eb;
}

/* 封禁 的每行颜色 */
.el-table .lock-row {
    background: oldlace;
}

.user-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}
</style>