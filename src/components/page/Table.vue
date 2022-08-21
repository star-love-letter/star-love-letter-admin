<template>
    <div>
        <el-card shadow="hover">
            <el-table :data="tables" @sort-change="sortChange" :row-class-name="tableRowClassName" style="width: 100%">
                <el-table-column sortable="custom" prop="id" width="50"> </el-table-column>
                <el-table-column sortable="custom" prop="sender" label="表白者" width="100"> </el-table-column>
                <el-table-column sortable="custom" prop="recipient" label="被表白者" width="100"> </el-table-column>
                <el-table-column sortable="custom" prop="content" show-overflow-tooltip label="内容" width="350"></el-table-column>
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
                :total="tableCount"
            >
            </el-pagination>
        </el-card>

        <el-dialog :visible.sync="dialogEditShow" v-dialogDrag title="编辑帖子信息" top="7vh" center width="60%" :fullscreen="isMobile">
            <el-form ref="formRef" :model="form">
                <el-row :gutter="20">
                    <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
                        <el-form-item label="id">
                            <el-tag type="info" v-if="form.anonymous == 0">身份公开</el-tag>
                            <el-tag type="info" v-else-if="form.anonymous == 1">匿名</el-tag>
                            <el-input disabled v-model="form.id"></el-input>
                        </el-form-item>
                        <el-form-item label="表白者">
                            <el-tag type="info" v-if="form.senderGender == 1">男</el-tag>
                            <el-tag type="info" v-else-if="form.senderGender == 2">女</el-tag>
                            <el-tag type="info" v-else-if="form.senderGender == 0">性别保密</el-tag>
                            <el-input v-model="form.sender"></el-input>
                        </el-form-item>
                        <el-form-item label="被表白者">
                            <el-tag type="info" v-if="form.recipientGender == 1">男</el-tag>
                            <el-tag type="info" v-else-if="form.recipientGender == 2">女</el-tag>
                            <el-tag type="info" v-else-if="form.recipientGender == 0">性别保密</el-tag>
                            <el-input v-model="form.recipient"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="form.state" placeholder="帖子状态">
                                <el-option label="正常" :value="0"></el-option>
                                <el-option label="待审核" :value="1"></el-option>
                                <el-option label="封禁" :value="-1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
                        <el-form-item label="内容">
                            <el-input type="textarea" :rows="5" v-model="form.content"></el-input>
                        </el-form-item>

                        <el-form-item label="图片列表">
                            <el-input type="textarea" :rows="3" v-model="form.images"></el-input>
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
                    </el-col>
                </el-row>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialogEdit">取 消</el-button>
                <el-button type="primary" @click="saveDialogEdit">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { AdminTableData } from '../../api/AdminTable';
import global from '../../utils/global';

export default {
    name: 'Table',
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
            dialogEditShow: false,
            form: {}
        };
    },
    created() {
        this.getTables();
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
            if (prop == 'createTime') this.sortName = 'create_time';
            else if (prop == 'stateName') this.sortName = 'state';
            else this.sortName = prop;

            this.getTables();
        },
        reportSuccess(index, id) {
            let table = this.tables[index];
            if (table.id != id) this.$message.error('非法操作');

            AdminTableData.updateTable(
                table.id,
                table.sender,
                table.senderGender,
                table.recipient,
                table.recipientGender,
                table.content,
                table.images,
                table.notifyEmail,
                0
            ).finally(() => {
                this.getTable(index);
            });
        },
        openDialogEdit(index) {
            console.log(this.form);

            let table = this.tables[index];

            Object.keys(table).forEach((key) => {
                this.$set(this.form, key, table[key]);
            });
            this.$set(this.form, 'index', index);

            this.dialogEditShow = true;
        },
        saveDialogEdit() {
            AdminTableData.updateTable(
                this.form.id,
                this.form.sender,
                this.form.senderGender,
                this.form.recipient,
                this.form.recipientGender,
                this.form.content,
                this.form.images,
                this.form.notifyEmail,
                this.form.state
            ).then((res) => {
                this.getTable(this.form.index);
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

            this.getTables();
        },
        search() {
            this.pageIndex = 1;

            if (this.keyword == '') this.isSearch = false;
            else this.isSearch = true;

            this.getTables();
        },

        setPage(index) {
            this.getTables();
        },
        getTable(index) {
            AdminTableData.table(this.tables[index].id).then((res) => {
                this.$set(this.tables, index, res.data);
            });
        },
        getTables() {
            if (!this.isSearch) {
                AdminTableData.count().then((res) => {
                    this.tableCount = res.data;
                });

                AdminTableData.pageList(this.pageIndex, this.pageSize, this.sortName, this.sortType).then((res) => {
                    this.tables = res.data;
                });
            } else {
                AdminTableData.searchCount(this.keyword).then((res) => {
                    this.tableCount = res.data;
                });

                AdminTableData.searchList(this.keyword, this.pageIndex, this.pageSize, this.sortName, this.sortType).then((res) => {
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