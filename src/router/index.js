import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '星愿表白墙' },
            children: [
                {
                    path: '/index',
                    component: () => import('../components/page/Index.vue'),
                    meta: { title: '仪器表' }
                },


                {
                    path: '/report.user',
                    component: () => import('../components/page/ReportUser.vue'),
                    meta: { title: '用户举报' }
                },
                {
                    path: '/report.table',
                    component: () => import('../components/page/ReportTable.vue'),
                    meta: { title: '帖子举报' }
                },
                {
                    path: '/report.comment',
                    component: () => import('../components/page/ReportComment.vue'),
                    meta: { title: '评论举报' }
                },



                {
                    path: '/content.user',
                    component: () => import('../components/page/User.vue'),
                    meta: {
                        title: '用户管理'
                    }
                },
                {
                    path: '/content.table',
                    component: () => import('../components/page/Table.vue'),
                    meta: {
                        title: '帖子管理'
                    }
                },
                {
                    path: '/content.comment',
                    component: () => import('../components/page/Comment.vue'),
                    meta: {
                        title: '评论管理'
                    }
                },


                {
                    path: '/system.log',
                    component: () => import('../components/page/Log.vue'),
                    meta: { title: '日志' }
                },
                {
                    path: '/system.setting',
                    component: () => import('../components/page/Setting.vue'),
                    meta: { title: '系统设置' }
                },
                {
                    path: '/system.clear',
                    component: () => import('../components/page/Clear.vue'),
                    meta: { title: '清理' }
                },

                {
                    path: '/404',
                    component: () => import('../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import('../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: { title: '登录' }
        }
    ]
});
