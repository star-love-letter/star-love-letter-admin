<template>
    <div>
        <el-card shadow="hover">
            <el-table :data="comments" @sort-change="sortChange" :row-class-name="tableRowClassName" style="width: 100%">
                <el-table-column sortable="custom" prop="id" width="50"> </el-table-column>
                <el-table-column sortable="custom" prop="tableId" label="帖子id" width="80"> </el-table-column>
                <el-table-column sortable="custom" prop="userId" label="用户id" width="80"> </el-table-column>
                <el-table-column prop="userName" label="用户名" width="90"> </el-table-column>
                <el-table-column sortable="custom" prop="content" show-overflow-tooltip label="内容" width="300"></el-table-column>
                <el-table-column sortable="custom" prop="images" show-overflow-tooltip label="图片列表" width="180"></el-table-column>
                <el-table-column sortable="custom" prop="createTime" label="创建时间" width="140"></el-table-column>
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
                :total="CommentCount"
            >
            </el-pagination>
        </el-card>

        <el-dialog :visible.sync="dialogEditShow" v-dialogDrag title="编辑用户信息" top="7vh" center width="40%" :fullscreen="isMobile">
            <el-form ref="formRef" :model="form">
                <el-form-item label="id">
                    <el-input disabled v-model="form.id"></el-input>
                </el-form-item>

                <el-form-item label="内容">
                    <el-input type="textarea" :rows="5" v-model="form.content"></el-input>
                </el-form-item>

                <el-form-item label="图片列表">
                    <el-input type="textarea" :rows="2" v-model="form.images"></el-input>
                    <div>
                        <el-image
                            v-for="(item, index) in JSON.parse(form.images == null ? '[]' : form.images)"
                            v-bind:key="index"
                            style="width: 33%"
                            :src="IMAGE_URL + item"
                        >
                        </el-image>
                    </div>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.state" placeholder="帖子状态">
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
import { AdminCommentData } from '../../api/AdminComment';
import { AdminUserData } from '../../api/AdminUser';
import global from '../../utils/global';

export default {
    name: 'Comment',
    data() {
        return {
            IMAGE_URL: global.image,
            comments: [],
            sortName: null,
            sortType: null,
            pageIndex: 1,
            pageSize: 10,
            CommentCount: 0,
            keyword: '',
            isSearch: false,
            dialogEditShow: false,
            form: {},
            userInfMap: {}
        };
    },
    created() {
        this.getComments();
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
            if (prop == 'tableId') this.sortName = 'table_id';
            else if (prop == 'userId') this.sortName = 'user_id';
            else if (prop == 'createTime') this.sortName = 'create_time';
            else if (prop == 'stateName') this.sortName = 'state';
            else this.sortName = prop;

            this.getComments();
        },
        reportSuccess(index, id) {
            let comment = this.comments[index];
            if (comment.id != id) this.$message.error('非法操作');

            AdminCommentData.updateComment(comment.id, comment.content, comment.images, 0).finally(() => {
                this.getComment(index);
            });
        },
        openDialogEdit(index) {
            let comment = this.comments[index];

            Object.keys(comment).forEach((key) => {
                this.$set(this.form, key, comment[key]);
            });
            this.$set(this.form, 'index', index);

            this.dialogEditShow = true;
        },
        saveDialogEdit() {
            AdminCommentData.updateComment(this.form.id, this.form.content, this.form.images, this.form.state).then((res) => {
                this.getComment(this.form.index);
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

            this.getComments();
        },
        search() {
            this.pageIndex = 1;

            if (this.keyword == '') this.isSearch = false;
            else this.isSearch = true;

            this.getComments();
        },

        setPage(index) {
            this.getComments();
        },
        getUsersName() {
            for (let i = 0; i < this.comments.length; i++) {
                let userId = this.comments[i].userId;
                let inf = this.userInfMap[userId];
                if (inf != null) {
                    this.$set(this.comments[i], 'userName', inf.name);
                    continue;
                }

                AdminUserData.user(userId).then((res) => {
                    this.userInfMap[userId] = res.data;
                    this.$set(this.comments[i], 'userName', res.data.name);
                });
            }
        },
        getComment(index) {
            AdminCommentData.comment(this.comments[index].id).then((res) => {
                this.$set(this.comments, index, res.data);
                this.getUsersName();
            });
        },
        getComments() {
            if (!this.isSearch) {
                AdminCommentData.count().then((res) => {
                    this.CommentCount = res.data;
                });

                AdminCommentData.pageList(this.pageIndex, this.pageSize, this.sortName, this.sortType).then((res) => {
                    this.comments = res.data;
                    this.getUsersName();
                });
            } else {
                AdminCommentData.searchCount(this.keyword).then((res) => {
                    this.CommentCount = res.data;
                });

                AdminCommentData.searchList(this.keyword, this.pageIndex, this.pageSize, this.sortName, this.sortType).then((res) => {
                    this.comments = res.data;
                    this.getUsersName();
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
</style>