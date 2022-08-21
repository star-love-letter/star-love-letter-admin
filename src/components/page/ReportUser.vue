<template>
    <div>
        <el-card shadow="hover">
            <el-tabs v-model="pageState">
                <el-tab-pane label="待处理" name="0"></el-tab-pane>
                <el-tab-pane label="举报通过" name="1"></el-tab-pane>
                <el-tab-pane label="举报未通过" name="-1"></el-tab-pane>
            </el-tabs>
            <el-table :row-class-name="tableRowClassName" :data="users" style="width: 100%">
                <el-table-column prop="id" width="50"> </el-table-column>
                <el-table-column prop="name" label="用户名称" width="130"> </el-table-column>
                <el-table-column prop="studentId" label="学号" width="140"> </el-table-column>
                <el-table-column prop="email" label="邮箱" width="160"> </el-table-column>
                <el-table-column prop="wechat" show-overflow-tooltip label="微信" width="90"></el-table-column>
                <el-table-column prop="lastTime" label="上次登录时间" width="140"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="140"></el-table-column>
                <el-table-column prop="roleName" label="角色" width="70"></el-table-column>
                <el-table-column prop="stateName" label="账号状态" width="80"></el-table-column>
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
                        <el-button size="mini" @click="openDialogInfo(scope.$index)">查看详情</el-button>
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

        <el-dialog :visible.sync="dialogInfoShow" v-dialogDrag title="举报详情" top="4vh" center width="70%" :fullscreen="isMobile">
            <el-form ref="formRef" label-position="top" :model="dialogInfoData">
                <el-row :gutter="20">
                    <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
                        <el-form-item label="id">
                            <el-input readonly v-model="dialogInfoData.user.id"></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input readonly v-model="dialogInfoData.user.name"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="dialogInfoData.user.state" placeholder="用户状态">
                                <el-option disabled label="正常" :value="0"></el-option>
                                <el-option disabled label="待审核" :value="1"></el-option>
                                <el-option disabled label="封禁" :value="-1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
                        <el-row :gutter="20">
                            <el-col :xl="17" :lg="17" :md="24" :sm="24" :xs="24">
                                <el-form-item label="邮箱">
                                    <el-input readonly v-model="dialogInfoData.user.email"></el-input>
                                </el-form-item>
                                <el-form-item label="微信">
                                    <el-input readonly v-model="dialogInfoData.user.wechat"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :xl="7" :lg="7" :md="24" :sm="24" :xs="24">
                                <img v-if="!isMobile" :src="IMAGE_URL + dialogInfoData.user.avatar" class="user-avatar" alt />
                            </el-col>
                        </el-row>

                        <el-form-item label="学号">
                            <el-input readonly v-model="dialogInfoData.user.studentId"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <el-table
                height="240"
                :row-class-name="tableRowClassName"
                :data="dialogInfoData.reports"
                :default-sort="{ prop: 'createTime', order: 'descending' }"
            >
                <el-table-column sortable property="reportUserId" label="举报者id" width="150"></el-table-column>
                <el-table-column sortable property="reportUserName" label="举报者名称" width="150"></el-table-column>
                <el-table-column sortable property="typeName" label="举报类型" width="200"></el-table-column>
                <el-table-column sortable property="content" label="举报内容"></el-table-column>
                <el-table-column sortable property="createTime" label="创建时间"></el-table-column>
                <el-table-column sortable property="stateName" label="举报状态"></el-table-column>
            </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="successReport">举报通过</el-button>
                <el-button type="info" @click="failReport">未通过</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { AdminReportUserData } from '../../api/AdminReportUser';
import { AdminUserData } from '../../api/AdminUser';
import global from '../../utils/global';

export default {
    name: 'ReportUser',
    data() {
        return {
            IMAGE_URL: global.image,
            users: [],
            sortName: null,
            sortType: null,
            pageIndex: 1,
            pageSize: 10,
            userCount: 0,
            keyword: '',
            isSearch: false,
            dialogInfoShow: false,
            dialogInfoData: {
                user: {},
                reports: []
            },
            pageState: 0
        };
    },
    created() {
        this.getReportUsers();
    },
    watch: {
        pageState() {
            this.getReportUsers();
        }
    },
    methods: {
        failReport() {
            AdminReportUserData.handleReport(this.dialogInfoData.user.id, false).then((res) => {
                this.$message.success(res.message);
                this.getReportUsers();
                this.closeDialogInfo();
            });
        },
        successReport() {
            AdminReportUserData.handleReport(this.dialogInfoData.user.id, true).then((res) => {
                this.$message.success(res.message);
                this.getReportUsers();
                this.closeDialogInfo();
            });
        },
        getDialogInfoDatas(userId) {
            AdminUserData.user(userId).then((res) => {
                this.$set(this.dialogInfoData, 'user', res.data);
            });

            AdminReportUserData.getReportByUser(userId).then((res) => {
                this.$set(this.dialogInfoData, 'reports', res.data);
            });
        },
        openDialogInfo(index) {
            let user = this.users[index];

            this.getDialogInfoDatas(user.id);

            this.dialogInfoShow = true;
        },
        closeDialogInfo() {
            this.dialogInfoShow = false;
        },
        tableRowClassName({ row, rowIndex }) {
            if (row.state === -1) {
                return 'lock-row';
            } else if (row.state === 1) {
                return 'wait-row';
            }
            return '';
        },
        clearSearch() {
            this.pageIndex = 1;
            this.keyword = '';
            this.isSearch = false;

            this.getReportUsers();
        },
        search() {
            this.pageIndex = 1;

            if (this.keyword == '') this.isSearch = false;
            else this.isSearch = true;

            this.getReportUsers();
        },

        setPage(index) {
            this.getReportUsers();
        },
        getReporUser(index) {
            AdminReportUserData.user(this.users[index].id).then((res) => {
                this.$set(this.users, index, res.data);
            });
        },
        getReportUsers() {
            if (!this.isSearch) {
                AdminReportUserData.count(this.pageState).then((res) => {
                    this.userCount = res.data;
                });

                AdminReportUserData.pageList(this.pageIndex, this.pageSize, this.pageState).then((res) => {
                    this.users = res.data;
                });
            } else {
                AdminReportUserData.searchCount(this.keyword, this.pageState).then((res) => {
                    this.userCount = res.data;
                });

                AdminReportUserData.searchList(this.keyword, this.pageIndex, this.pageSize, this.pageState).then((res) => {
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