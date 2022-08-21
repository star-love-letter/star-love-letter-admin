import request from '../utils/request';

export const AdminLogData = {
    all: () => {
        return request({
            url: '/api/admin/log/all',
            method: 'get'
        });
    },
    pageList: (pageIndex, pageSize, rankName, rankType) => {
        return request({
            url: '/api/admin/log/pageList',
            method: 'get',
            params: { 'pageIndex': pageIndex, 'pageSize': pageSize, 'rankName': rankName, 'rankType': rankType }
        });
    },
    count: () => {
        return request({
            url: '/api/admin/log/count',
            method: 'get'
        });
    },
    searchList: (keyword, pageIndex, pageSize, rankName, rankType) => {
        return request({
            url: '/api/admin/log/searchList',
            method: 'get',
            params: { 'keyword': keyword, 'pageIndex': pageIndex, 'pageSize': pageSize, 'rankName': rankName, 'rankType': rankType }
        });
    },
    searchCount: (keyword) => {
        return request({
            url: '/api/admin/log/searchCount',
            method: 'get',
            params: { 'keyword': keyword }
        });
    }
}
