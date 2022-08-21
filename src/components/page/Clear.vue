<template>
    <div>
        <el-row :gutter="20">
            <el-col :xl="8" :lg="8" :md="8" :xs="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>清理无关联的图片</span>
                    </div>
                    <el-container style="height: 200px">
                        <el-main> </el-main>
                        <el-footer><el-button type="danger" @click="clearImage">清理</el-button></el-footer>
                    </el-container>
                </el-card>
            </el-col>
            <el-col :xl="8" :lg="8" :md="8" :xs="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>清理已处理的举报</span>
                    </div>
                    <el-container style="height: 200px">
                        <el-main>
                            <lable>清理多少天之前</lable>
                            <el-input v-model="formReport.day"></el-input
                        ></el-main>
                        <el-footer><el-button type="danger" @click="clearReport">清理</el-button></el-footer>
                    </el-container>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { AdminClearData } from '../../api/AdminClear';

export default {
    name: 'Setting',
    data() {
        return {
            formReport: {
                day: 60
            }
        };
    },
    methods: {
        clearImage() {
            AdminClearData.clearImage().then((res) => {
                this.$message.success(res.message);
            });
        },
        clearReport() {
            AdminClearData.clearReport(this.formReport.day * 24 * 60 * 60).then((res) => {
                this.$message.success(res.message);
            });
        }
    }
};
</script>