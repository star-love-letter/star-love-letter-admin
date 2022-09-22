<template>
    <div>
        <el-tabs @tab-click="onTabClick" type="border-card">
            <el-tab-pane label="基本设置">
                <div class="container">
                    <div class="form-box">
                        <el-form ref="formBasicRef" :model="formBasic" label-width="170px">
                            <el-form-item label="用户每天上传的图片数量">
                                <el-input v-model="formBasic['user-imageMaxNumberDay']"></el-input>
                            </el-form-item>
                            <el-form-item label="帖子的图片数量">
                                <el-input v-model="formBasic['table-imageMaxNumber']"></el-input>
                            </el-form-item>
                            <el-form-item label="评论的图片数量">
                                <el-input v-model="formBasic['comment-imageMaxNumber']"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱通知周期（秒）">
                                <el-input v-model="formBasic['user-notifyEmailPeriod']"></el-input>
                            </el-form-item>
                            <el-form-item label="跨域地址">
                                <el-input v-model="formBasic['cors-origin']"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmitBasic">保存</el-button>
                                <el-button @click="onReInput">重填</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="页面显示">
                <div class="container">
                    <div class="form-box">
                        <el-form ref="formViewRef" :model="formView" label-width="150px">
                            <el-form-item label="统计代码(不带script)">
                                <el-input type="textarea" :rows="4" v-model="formView['view-statsCode']"></el-input>
                            </el-form-item>
                            <el-form-item label="页面头部">
                                <el-input type="textarea" :rows="4" v-model="formView['view-header']"></el-input>
                            </el-form-item>
                            <el-form-item label="页面尾部">
                                <el-input type="textarea" :rows="4" v-model="formView['view-footer']"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmitView">保存</el-button>
                                <el-button @click="onReInput">重填</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="SMTP设置">
                <div class="container">
                    <div class="form-box">
                        <el-form ref="formSMTPRef" :model="formSMTP" label-width="100px">
                            <el-form-item label="SMTP服务器">
                                <el-input v-model="formSMTP['smtp-host']"></el-input>
                            </el-form-item>
                            <el-form-item label="SMTP端口">
                                <el-input v-model="formSMTP['smtp-port']"></el-input>
                            </el-form-item>
                            <el-form-item label="SSL">
                                <el-checkbox v-model="formSMTP['smtp-ssl']"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="SMTP用户">
                                <el-input v-model="formSMTP['smtp-username']"></el-input>
                            </el-form-item>
                            <el-form-item label="SMTP密码">
                                <el-input v-model="formSMTP['smtp-password']"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmitSTMP">保存</el-button>
                                <el-button @click="onReInput">重填</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="发送测试邮件">
                <div class="container">
                    <div class="form-box">
                        <el-form ref="formTestEmailRef" :model="formTestEmail" label-width="80px">
                            <el-form-item label="接收邮箱">
                                <el-input v-model="formTestEmail.receiveMail"></el-input>
                            </el-form-item>
                            <el-form-item label="主题">
                                <el-input v-model="formTestEmail.subject"></el-input>
                            </el-form-item>
                            <el-form-item label="内容">
                                <el-input type="textarea" :rows="5" v-model="formTestEmail.content"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="sendTestEmail">发送</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="关闭网站">
                <div class="container">
                    <div class="form-box">
                        <el-form ref="formCloseRef" :model="formClose" label-width="120px">
                            <el-form-item label="关闭网站">
                                <el-checkbox v-model="formClose['view-stop']"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="网站关闭的原因">
                                <el-input type="textarea" :rows="4" v-model="formClose['view-stopReason']"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmitClose">保存</el-button>
                                <el-button @click="onReInput">重填</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="执行SQL">
                <div class="container">
                    <el-form ref="formSQLRef" v-model="formSQL" label-width="50px">
                        <el-row :gutter="20">
                            <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
                                <el-form-item label="方式">
                                    <el-radio-group v-model="formSQL.type">
                                        <el-radio label="Execute"></el-radio>
                                        <el-radio label="Update"></el-radio>
                                        <el-radio label="Query"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="SQL">
                                    <el-input type="textarea" :rows="5" v-model="formSQL.sql" @keyup.ctrl.enter.native="runSQL"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="runSQL">执行 (Ctrl+Enter)</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
                                <el-form-item label="消息">
                                    <el-input readonly type="textarea" :rows="6" v-model="formSQL.message"></el-input>
                                </el-form-item>
                                <el-form-item label="数据">
                                    <el-input readonly type="textarea" :rows="15" v-model="formSQL.data"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { AdminSettingData } from '../../api/AdminSetting';

export default {
    name: 'Setting',
    data() {
        return {
            data: {},
            formBasic: {
                'user-imageMaxNumberDay': 27,
                'table-imageMaxNumber': 9,
                'comment-imageMaxNumber': 3,
                'user-notifyEmailPeriod': 7200,
                'cors-origin': ''
            },
            formView: {
                'view-header': '',
                'view-footer': '',
                'view-statsCode': ''
            },
            formSMTP: {
                'smtp-host': '',
                'smtp-port': '',
                'smtp-username': '',
                'smtp-password': '',
                'smtp-ssl': false
            },
            formClose: {
                'view-stop': false,
                'view-stopReason': ''
            },
            formTestEmail: {
                receiveMail: '',
                subject: '',
                content: ''
            },
            formSQL: {
                type: 'Execute',
                sql: '',
                message: '',
                data: ''
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        onTabClick(tab) {
            this.initData();
        },
        onReInput() {
            this.initData();
        },
        onSubmitBasic() {
            AdminSettingData.updateSettings(this.formBasic).then((res) => {
                this.$message.success(res.message);
                this.init();
            });
        },
        onSubmitView() {
            AdminSettingData.updateSettings(this.formView).then((res) => {
                this.$message.success(res.message);
                this.init();
            });
        },
        onSubmitSTMP() {
            AdminSettingData.updateSettings(this.formSMTP).then((res) => {
                this.$message.success(res.message);
                this.init();
            });
        },
        onSubmitClose() {
            AdminSettingData.updateSettings(this.formClose).then((res) => {
                this.$message.success(res.message);
                this.init();
            });
        },
        runSQL() {
            if (this.formSQL.sql == '') {
                this.$message.error('SQL不能为空');
                return;
            }

            let fun = function (sql) {
                return request();
            };

            if (this.formSQL.type == 'Execute') fun = AdminSettingData.sqlForExecute;
            else if (this.formSQL.type == 'Update') fun = AdminSettingData.sqlForUpdate;
            else if (this.formSQL.type == 'Query') fun = AdminSettingData.sqlForQuery;

            fun(this.formSQL.sql)
                .then((res) => {
                    this.formSQL.data = JSON.stringify(res.data, null, '\t');
                    this.formSQL.message = this.formSQL.sql + '\n' + this.formSQL.type + '-' + res.message;
                })
                .catch((error) => {
                    this.formSQL.message = '发生错误：\n' + error;
                });
        },
        sendTestEmail() {
            AdminSettingData.emailTest(this.formTestEmail.receiveMail, this.formTestEmail.subject, this.formTestEmail.content).then(
                (res) => {
                    this.$message.success(res.message);
                }
            );
        },
        initData() {
            this.formBasic['comment-imageMaxNumber'] = this.data['comment-imageMaxNumber'];
            this.formBasic['table-imageMaxNumber'] = this.data['table-imageMaxNumber'];
            this.formBasic['user-imageMaxNumberDay'] = this.data['user-imageMaxNumberDay'];
            this.formBasic['user-notifyEmailPeriod'] = this.data['user-notifyEmailPeriod'];
            this.formBasic['cors-origin'] = this.data['cors-origin'];

            this.formView['view-header'] = this.data['view-header'];
            this.formView['view-footer'] = this.data['view-footer'];
            this.formView['view-statsCode'] = this.data['view-statsCode'];

            this.formSMTP['smtp-host'] = this.data['smtp-host'];
            this.formSMTP['smtp-port'] = this.data['smtp-port'];
            this.formSMTP['smtp-ssl'] = this.data['smtp-ssl'] == 'true';
            this.formSMTP['smtp-username'] = this.data['smtp-username'];
            this.formSMTP['smtp-password'] = this.data['smtp-password'];

            this.formClose['view-stop'] = this.data['view-stop'] == 'true';
            this.formClose['view-stopReason'] = this.data['view-stopReason'];
        },
        init() {
            AdminSettingData.getSettings().then((res) => {
                this.data = res.data;

                this.initData();
            });
        }
    }
};
</script>