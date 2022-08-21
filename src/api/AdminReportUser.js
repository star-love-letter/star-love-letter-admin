import request from '../utils/request';

export const AdminReportUserData = {
    pageList: (pageIndex, pageSize, state) => {
        return request({
            url: '/api/admin/reportUser/pageList',
            method: 'get',
            params: { 'pageIndex': pageIndex, 'pageSize': pageSize, 'state': state }
        });
    },
    count: (state) => {
        return request({
            url: '/api/admin/reportUser/count',
            method: 'get',
            params: { 'state': state }
        });
    },
    searchList: (keyword, pageIndex, pageSize, state) => {
        return request({
            url: '/api/admin/reportUser/searchList',
            method: 'get',
            params: { 'keyword': keyword, 'pageIndex': pageIndex, 'pageSize': pageSize, 'state': state }
        });
    },
    searchCount: (keyword, state) => {
        return request({
            url: '/api/admin/reportUser/searchCount',
            method: 'get',
            params: { 'keyword': keyword, 'state': state }
        });
    },
    getReportByUser: (userId) => {
        return request({
            url: '/api/admin/reportUser/getReportByUser',
            method: 'get',
            params: { 'userId': userId }
        });
    },
    getReportByReportUser: (reportUserId) => {
        return request({
            url: '/api/admin/reportUser/getReportByReportUser',
            method: 'get',
            params: { 'reportUserId': reportUserId }
        });
    },
    handleReport: (userId,agree) => {
        return request({
            url: '/api/admin/reportUser/handleReport',
            method: 'put',
            params: { 'userId': userId ,'agree': agree}
        });
    },
}
