import request from '../utils/request';

export const AdminSettingData = {
    sqlForExecute: (sql) => {
        return request({
            url: '/api/admin/setting/sqlForExecute',
            method: 'post',
            params: { 'sql': sql }
        });
    },
    sqlForUpdate: (sql) => {
        return request({
            url: '/api/admin/setting/sqlForUpdate',
            method: 'post',
            params: { 'sql': sql }
        });
    },
    sqlForQuery: (sql) => {
        return request({
            url: '/api/admin/setting/sqlForQuery',
            method: 'post',
            params: { 'sql': sql }
        });
    },
    getSettings: () => {
        return request({
            url: '/api/admin/setting/getSettings',
            method: 'get'
        });
    },
    updateSettings: (maps) => {
        return request({
            url: '/api/admin/setting/updateSettings',
            method: 'put',
            params: maps
        });
    },
    emailTest: (receiveMail, subject, content) => {
        return request({
            url: '/api/admin/setting/emailTest',
            method: 'get',
            params: { 'receiveMail': receiveMail, 'subject': subject, 'content': content }
        });
    }
}
