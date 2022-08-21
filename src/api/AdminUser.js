import request from '../utils/request';

export const AdminUserData = {
    pageList: (pageIndex, pageSize, rankName, rankType) => {
        return request({
            url: '/api/admin/user/pageList',
            method: 'get',
            params: { 'pageIndex': pageIndex, 'pageSize': pageSize, 'rankName': rankName, 'rankType': rankType }
        });
    },
    count: () => {
        return request({
            url: '/api/admin/user/count',
            method: 'get'
        });
    },
    searchList: (keyword, pageIndex, pageSize, rankName, rankType) => {
        return request({
            url: '/api/admin/user/searchList',
            method: 'get',
            params: { 'keyword': keyword, 'pageIndex': pageIndex, 'pageSize': pageSize, 'rankName': rankName, 'rankType': rankType }
        });
    },
    searchCount: (keyword) => {
        return request({
            url: '/api/admin/user/searchCount',
            method: 'get',
            params: { 'keyword': keyword }
        });
    },
    user: (userId) => {
        return request({
            url: '/api/admin/user/user',
            method: 'get',
            params: { 'userId': userId }
        });
    },
    getExamineCount: () => {
        return request({
            url: '/api/admin/user/getExamineCount',
            method: 'get'
        });
    },
    updateUser: (userId, name, email, wechat, studentId, state) => {
        return request({
            url: '/api/admin/user/updateUser',
            method: 'put',
            params: {
                'userId': userId, 'name': name, 'email': email, 'wechat': wechat, 'studentId': studentId, 'state': state
            }
        });
    },
    delete: (userId) => {
        return request({
            url: '/api/admin/user/deleteUser',
            method: 'delete',
            params: { 'userId': userId }
        });
    }
}
