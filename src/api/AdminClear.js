import request from '../utils/request';

export const AdminClearData = {
    clearReport: (time) => {
        return request({
            url: '/api/admin/clear/clearReport',
            method: 'delete',
            params: { 'time': time }
        });
    },
    clearImage: () => {
        return request({
            url: '/api/admin/clear/clearImage',
            method: 'delete'
        });
    }
}
