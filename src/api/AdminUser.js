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
        let args = {
            'userId': userId, 'name': name, 'state': state
        }

        if (email != null)
            args['email'] = email;

        if (wechat != null)
            args['wechat'] = wechat;

        if (studentId != null)
            args['studentId'] = studentId;

        return request({
            url: '/api/admin/user/updateUser',
            method: 'put',
            params: args
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
