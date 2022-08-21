<template>
    <div>
        <el-row :gutter="20">
            <el-col :xl="15" :lg="15" :md="24" :sm="24" :xs="24">
                <el-card shadow="hover" class="mgb20">
                    <div class="user-info">
                        <img :src="avatar" class="user-avatar" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ user.name }}</div>
                            <div>{{ user.roleName }}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>{{ user.lastTime }}</span>
                    </div>
                </el-card>
                <el-col :span="25">
                    <el-row :gutter="20" class="mgb20">
                        <el-col :xl="8" :lg="8" :md="8" :xs="24" style="padding: 3px">
                            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                <div class="grid-content grid-con-1">
                                    <i class="el-icon-user grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{ count.user }}</div>
                                        <div>用户总数量</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :xl="8" :lg="8" :md="8" :xs="24" style="padding: 3px">
                            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                <div class="grid-content grid-con-1">
                                    <i class="el-icon-document grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{ count.table }}</div>
                                        <div>帖子总数量</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :xl="8" :lg="8" :md="8" :xs="24" style="padding: 3px">
                            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                <div class="grid-content grid-con-1">
                                    <i class="el-icon-chat-square grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{ count.comment }}</div>
                                        <div>评论总数量</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :xl="8" :lg="8" :md="8" :xs="24" style="padding: 3px">
                            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                <div class="grid-content grid-con-3">
                                    <i class="el-icon-user grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{ count.reportUser }}</div>
                                        <div>举报用户待处理</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :xl="8" :lg="8" :md="8" :xs="24" style="padding: 3px">
                            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                <div class="grid-content grid-con-3">
                                    <i class="el-icon-document grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{ count.reportTable }}</div>
                                        <div>举报帖子待处理</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :xl="8" :lg="8" :md="8" :xs="24" style="padding: 3px">
                            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                <div class="grid-content grid-con-3">
                                    <i class="el-icon-chat-square grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{ count.reportComment }}</div>
                                        <div>举报评论待处理</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :xl="8" :lg="8" :md="8" :xs="24" style="padding: 3px">
                            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                <div class="grid-content grid-con-2">
                                    <i class="el-icon-user grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{ count.examineUser }}</div>
                                        <div>用户待审核</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :xl="8" :lg="8" :md="8" :xs="24" style="padding: 3px">
                            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                <div class="grid-content grid-con-2">
                                    <i class="el-icon-document grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{ count.examineTable }}</div>
                                        <div>帖子待审核</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :xl="8" :lg="8" :md="8" :xs="24" style="padding: 3px">
                            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                <div class="grid-content grid-con-2">
                                    <i class="el-icon-chat-square grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{ count.examineComment }}</div>
                                        <div>评论待审核</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-col>
            </el-col>
            <el-col :xl="9" :lg="9" :md="24" :sm="24" :xs="24">
                <el-card shadow="hover" style="height: 600px">
                    <div slot="header" class="clearfix">
                        <span>日志</span>
                        <el-link type="primary" :underline="false" style="float: right; padding: 3px 0" href="#/system.log"
                            >查看完整日志</el-link
                        >
                    </div>
                    <el-table :data="logs" height="500" style="width: 100%; height: 500px">
                        <el-table-column prop="id" width="50"> </el-table-column>
                        <el-table-column prop="createTime" label="时间" width="135"> </el-table-column>
                        <el-table-column prop="userId" label="用户id" width="55"> </el-table-column>
                        <el-table-column prop="userName" label="用户名称" width="75"> </el-table-column>
                        <el-table-column prop="action" label="动作"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import { AdminUserData } from '../../api/AdminUser';
import { AdminTableData } from '../../api/AdminTable';
import { AdminCommentData } from '../../api/AdminComment';
import { AdminReportUserData } from '../../api/AdminReportUser';
import { AdminReportTableData } from '../../api/AdminReportTable';
import { AdminReportCommentData } from '../../api/AdminReportComment';
import { AdminLogData } from '../../api/AdminLog';
import { UserData } from '../../api/User';
import global from '../../utils/global';

export default {
    name: 'dashboard',
    data() {
        return {
            user: {},
            avatar: '',
            count: {
                user: '获取中...',
                table: '获取中...',
                comment: '获取中...',
                reportUser: '获取中...',
                reportTable: '获取中...',
                reportComment: '获取中...',
                examineUser: '获取中...',
                examineTable: '获取中...',
                examineComment: '获取中...'
            },
            logs: []
        };
    },
    watch: {
        user: {
            handler() {
                this.avatar = global.image + this.user.avatar;
            },
            deep: true
        }
    },
    created() {
        UserData.user()
            .then((res) => {
                if (res.code == 200) {
                    this.user = res.data;
                }
            })
            .finally(() => {
                if (this.user.roleId != 0) {
                    this.$message.error('权限不足，请重新登录');
                    this.$router.push('/Login');
                }
            });

        this.initCounts();

        this.initLogs();
    },
    components: {
        Schart
    },
    computed: {},
    methods: {
        initCounts() {
            AdminUserData.count().then((res) => {
                this.count.user = res.data;
            });
            AdminTableData.count().then((res) => {
                this.count.table = res.data;
            });
            AdminCommentData.count().then((res) => {
                this.count.comment = res.data;
            });

            AdminReportUserData.count(0).then((res) => {
                this.count.reportUser = res.data;
            });
            AdminReportTableData.count(0).then((res) => {
                this.count.reportTable = res.data;
            });
            AdminReportCommentData.count(0).then((res) => {
                this.count.reportComment = res.data;
            });

            AdminUserData.getExamineCount().then((res) => {
                this.count.examineUser = res.data;
            });
            AdminTableData.getExamineCount().then((res) => {
                this.count.examineTable = res.data;
            });
            AdminCommentData.getExamineCount().then((res) => {
                this.count.examineComment = res.data;
            });
        },
        initLogs() {
            AdminLogData.all(null, null).then((res) => {
                this.logs = res.data;
            });
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
