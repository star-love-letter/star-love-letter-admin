<template>
    <div>
        <el-card shadow="hover">
            <el-tabs v-model="pageState">
                <el-tab-pane label="待处理" name="0"></el-tab-pane>
                <el-tab-pane label="举报通过" name="1"></el-tab-pane>
                <el-tab-pane label="举报未通过" name="-1"></el-tab-pane>
            </el-tabs>
            <el-table :row-class-name="tableRowClassName" :data="tables" style="width: 100%">
                <el-table-column prop="id" width="50"> </el-table-column>
                <el-table-column prop="sender" label="表白者" width="100"> </el-table-column>
                <el-table-column prop="recipient" label="被表白者" width="100"> </el-table-column>
                <el-table-column prop="content" show-overflow-tooltip label="内容" width="350"></el-table-column>
                <el-table-column prop="images" show-overflow-tooltip label="图片列表" width="180"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="140"></el-table-column>
                <el-table-column prop="stateName" label="状态" width="80"></el-table-column>
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
                :total="tableCount"
            >
            </el-pagination>
        </el-card>

        <el-dialog :visible.sync="dialogInfoShow" v-dialogDrag title="举报详情" top="4vh" center width="70%" :fullscreen="isMobile">
            <el-form ref="formRef" label-position="top" :model="dialogInfoData">
                <el-row :gutter="20">
                    <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
                         <el-form-item label="id">
                            <el-tag type="info" v-if="dialogInfoData.table.anonymous == 0">身份公开</el-tag>
                            <el-tag type="info" v-else-if="dialogInfoData.table.anonymous == 1">匿名</el-tag>
                            <el-input disabled v-model="dialogInfoData.table.id"></el-input>
                        </el-form-item>
                        <el-form-item label="表白者">
                            <el-tag type="info" v-if="dialogInfoData.table.senderGender == 1">男</el-tag>
                            <el-tag type="info" v-else-if="dialogInfoData.table.senderGender == 2">女</el-tag>
                            <el-tag type="info" v-else-if="dialogInfoData.table.senderGender == 0">性别保密</el-tag>
                            <el-input v-model="dialogInfoData.table.sender"></el-input>
                        </el-form-item>
                        <el-form-item label="被表白者">
                            <el-tag type="info" v-if="dialogInfoData.table.recipientGender == 1">男</el-tag>
                            <el-tag type="info" v-else-if="dialogInfoData.table.recipientGender == 2">女</el-tag>
                            <el-tag type="info" v-else-if="dialogInfoData.table.recipientGender == 0">性别保密</el-tag>
                            <el-input v-model="dialogInfoData.table.recipient"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="dialogInfoData.table.state" placeholder="帖子状态">
                                <el-option label="正常" :value="0"></el-option>
                                <el-option label="待审核" :value="1"></el-option>
                                <el-option label="封禁" :value="-1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
                        <el-form-item label="内容">
                            <el-input type="textarea" :rows="5" v-model="dialogInfoData.table.content"></el-input>
                        </el-form-item>

                        <el-form-item label="图片列表">
                            <el-input type="textarea" :rows="3" v-model="dialogInfoData.table.images"></el-input>
                            <div>
                                <el-image
                                    v-for="(item, index) in JSON.parse(dialogInfoData.table.images == null ? '[]' : dialogInfoData.table.images)"
                                    v-bind:key="index"
                                    style="width: 33%"
                                    :src="IMAGE_URL + item"
                                >
                                </el-image>
                            </div>
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
import { AdminReportTableData } from '../../api/AdminReportTable';
import { AdminTableData } from '../../api/AdminTable';
import global from '../../utils/global';

export default {
    name: 'ReportTable',
    data() {
        return {
            IMAGE_URL: global.image,
            tables: [],
            sortName: null,
            sortType: null,
            pageIndex: 1,
            pageSize: 10,
            tableCount: 0,
            keyword: '',
            isSearch: false,
            dialogInfoShow: false,
            dialogInfoData: {
                table: {},
                reports: []
            },
            pageState: 0
        };
    },
    created() {
        this.getReportTables();
    },
    watch: {
        pageState() {
            this.getReportTables();
        }
    },
    methods: {
        failReport() {
            AdminReportTableData.handleReport(this.dialogInfoData.table.id, false).then((res) => {
                this.$message.success(res.message);
                this.getReportTables();
                this.closeDialogInfo();
            });
        },
        successReport() {
            AdminReportTableData.handleReport(this.dialogInfoData.table.id, true).then((res) => {
                this.$message.success(res.message);
                this.getReportTables();
                this.closeDialogInfo();
            });
        },
        getDialogInfoDatas(tableId) {
            AdminTableData.table(tableId).then((res) => {
                this.$set(this.dialogInfoData, 'table', res.data);
            });

            AdminReportTableData.getReportByTable(tableId).then((res) => {
                this.$set(this.dialogInfoData, 'reports', res.data);
            });
        },
        openDialogInfo(index) {
            let table = this.tables[index];

            this.getDialogInfoDatas(table.id);

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

            this.getReportTables();
        },
        search() {
            this.pageIndex = 1;

            if (this.keyword == '') this.isSearch = false;
            else this.isSearch = true;

            this.getReportTables();
        },

        setPage(index) {
            this.getReportTables();
        },
        getReporTable(index) {
            AdminReportTableData.table(this.tables[index].id).then((res) => {
                this.$set(this.tables, index, res.data);
            });
        },
        getReportTables() {
            if (!this.isSearch) {
                AdminReportTableData.count(this.pageState).then((res) => {
                    this.tableCount = res.data;
                });

                AdminReportTableData.pageList(this.pageIndex, this.pageSize, this.pageState).then((res) => {
                    this.tables = res.data;
                });
            } else {
                AdminReportTableData.searchCount(this.keyword, this.pageState).then((res) => {
                    this.tableCount = res.data;
                });

                AdminReportTableData.searchList(this.keyword, this.pageIndex, this.pageSize, this.pageState).then((res) => {
                    this.tables = res.data;
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