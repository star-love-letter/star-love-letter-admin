import request from '../utils/request';

export const UserData = {
    login: (userStr, password) => {
        return request({
            url: '/api/user/login',
            method: 'post',
            params: { 'userStr': userStr, 'password': password }
        });
    },
    user: () => {
        return request({
            url: '/api/user/user',
            method: 'get'
        });
    }
}
