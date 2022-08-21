import request from '../utils/request';

export const AdminTableData = {
    pageList: (pageIndex, pageSize, rankName, rankType) => {
        return request({
            url: '/api/admin/table/pageList',
            method: 'get',
            params: { 'pageIndex': pageIndex, 'pageSize': pageSize, 'rankName': rankName, 'rankType': rankType }
        });
    },
    count: () => {
        return request({
            url: '/api/admin/table/count',
            method: 'get'
        });
    },
    searchList: (keyword, pageIndex, pageSize, rankName, rankType) => {
        return request({
            url: '/api/admin/table/searchList',
            method: 'get',
            params: { 'keyword': keyword, 'pageIndex': pageIndex, 'pageSize': pageSize, 'rankName': rankName, 'rankType': rankType }
        });
    },
    searchCount: (keyword) => {
        return request({
            url: '/api/admin/table/searchCount',
            method: 'get',
            params: { 'keyword': keyword }
        });
    },
    table: (tableId) => {
        return request({
            url: '/api/admin/table/table',
            method: 'get',
            params: { 'tableId': tableId }
        });
    },
    getExamineCount: () => {
        return request({
            url: '/api/admin/table/getExamineCount',
            method: 'get'
        });
    },
    updateTable: (tableId, sender, senderGender, recipient, recipientGender, content, images, notifyEmail, state) => {
        return request({
            url: '/api/admin/table/updateTable',
            method: 'put',
            params: {
                'tableId': tableId, 'sender': sender, 'senderGender': senderGender, 'recipient': recipient, 'recipientGender': recipientGender,
                'content': content, 'images': images, 'notifyEmail': notifyEmail, 'state': state
            }
        });
    },
    delete: (tableId) => {
        return request({
            url: '/api/admin/table/deleteTable',
            method: 'delete',
            params: { 'tableId': tableId }
        });
    },
}
