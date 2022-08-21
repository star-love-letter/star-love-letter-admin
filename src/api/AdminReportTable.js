import request from '../utils/request';

export const AdminReportTableData = {
    pageList: (pageIndex, pageSize, state) => {
        return request({
            url: '/api/admin/reportTable/pageList',
            method: 'get',
            params: { 'pageIndex': pageIndex, 'pageSize': pageSize, 'state': state }
        });
    },
    count: (state) => {
        return request({
            url: '/api/admin/reportTable/count',
            method: 'get',
            params: { 'state': state }
        });
    },
    searchList: (keyword, pageIndex, pageSize, state) => {
        return request({
            url: '/api/admin/reportTable/searchList',
            method: 'get',
            params: { 'keyword': keyword, 'pageIndex': pageIndex, 'pageSize': pageSize, 'state': state }
        });
    },
    searchCount: (keyword, state) => {
        return request({
            url: '/api/admin/reportTable/searchCount',
            method: 'get',
            params: { 'keyword': keyword, 'state': state }
        });
    },
    getReportByTable: (tableId) => {
        return request({
            url: '/api/admin/reportTable/getReportByTable',
            method: 'get',
            params: { 'tableId': tableId }
        });
    },
    getReportByReportUser: (reportUserId) => {
        return request({
            url: '/api/admin/reportTable/getReportByReportUser',
            method: 'get',
            params: {
                'reportUserId': reportUserId
            }
        });
    },
    handleReport: (tableId,agree) => {
        return request({
            url: '/api/admin/reportTable/handleReport',
            method: 'put',
            params: { 'tableId': tableId ,'agree': agree}
        });
    },
}
