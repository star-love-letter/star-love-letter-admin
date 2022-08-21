<template>
    <div>
        <el-card shadow="hover">
            <el-table :data="logs" height="500" style="width: 100%">
                <el-table-column prop="id" width="50"> </el-table-column>
                <el-table-column prop="createTime" label="时间" width="135"> </el-table-column>
                <el-table-column :filters="filtersUser" :filter-method="filterUser" prop="userId" label="用户id" width="80">
                </el-table-column>
                <el-table-column prop="userName" label="用户名称" width="100"> </el-table-column>
                <el-table-column
                    :filters="filtersAction"
                    :filter-method="filterAction"
                    prop="action"
                    label="动作"
                    width="100"
                ></el-table-column>
                <el-table-column prop="data" label="产生的数据"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import { AdminLogData } from '../../api/AdminLog';

export default {
    name: 'log',
    data() {
        return {
            logs: [],
            filtersUser: [],
            filtersAction: []
        };
    },
    created() {
        this.initLogs();
    },
    methods: {
        filterUser(value, row, column) {
            return row.userId == value;
        },
        filterAction(value, row, column) {
            return row.action == value;
        },
        initLogs() {
            AdminLogData.all().then((res) => {
                this.logs = res.data;

                // 去重后 放到filters中
                let userMap = new Map();
                let actionMap = new Map();
                for (let item of this.logs) {
                    if (!userMap.has(item.userId)) {
                        userMap.set(item.userId, { text: item.userName + '(id:' + item.userId + ')', value: item.userId });
                    }

                    if (!actionMap.has(item.action)) {
                        actionMap.set(item.action, { text: item.action, value: item.action });
                    }
                }

                this.filtersUser = [...userMap.values()];
                this.filtersAction = [...actionMap.values()];
            });
        }
    }
};
</script>