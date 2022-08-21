import request from '../utils/request';

export const AdminReportCommentData = {
    pageList: (pageIndex, pageSize, state) => {
        return request({
            url: '/api/admin/reportComment/pageList',
            method: 'get',
            params: { 'pageIndex': pageIndex, 'pageSize': pageSize, 'state': state }
        });
    },
    count: (state) => {
        return request({
            url: '/api/admin/reportComment/count',
            method: 'get',
            params: { 'state': state }
        });
    },
    searchList: (keyword, pageIndex, pageSize, state) => {
        return request({
            url: '/api/admin/reportComment/searchList',
            method: 'get',
            params: { 'keyword': keyword, 'pageIndex': pageIndex, 'pageSize': pageSize, 'state': state }
        });
    },
    searchCount: (keyword, state) => {
        return request({
            url: '/api/admin/reportComment/searchCount',
            method: 'get',
            params: { 'keyword': keyword, 'state': state }
        });
    },
    getReportByComment: (commentId) => {
        return request({
            url: '/api/admin/reportComment/getReportByComment',
            method: 'get',
            params: { 'commentId': commentId }
        });
    },
    getReportByReportUser: (reportUserId) => {
        return request({
            url: '/api/admin/reportComment/getReportByReportUser',
            method: 'get',
            params: {
                'reportUserId': reportUserId
            }
        });
    },
    handleReport: (commentId,agree) => {
        return request({
            url: '/api/admin/reportComment/handleReport',
            method: 'put',
            params: { 'commentId': commentId ,'agree': agree}
        });
    },
}
