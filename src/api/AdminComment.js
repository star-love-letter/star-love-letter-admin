import request from '../utils/request';

export const AdminCommentData = {
    pageList: (pageIndex, pageSize, rankName, rankType) => {
        return request({
            url: '/api/admin/comment/pageList',
            method: 'get',
            params: { 'pageIndex': pageIndex, 'pageSize': pageSize, 'rankName': rankName, 'rankType': rankType }
        });
    },
    count: () => {
        return request({
            url: '/api/admin/comment/count',
            method: 'get'
        });
    },
    searchList: (keyword, pageIndex, pageSize, rankName, rankType) => {
        return request({
            url: '/api/admin/comment/searchList',
            method: 'get',
            params: { 'keyword': keyword, 'pageIndex': pageIndex, 'pageSize': pageSize, 'rankName': rankName, 'rankType': rankType }
        });
    },
    searchCount: (keyword) => {
        return request({
            url: '/api/admin/comment/searchCount',
            method: 'get',
            params: { 'keyword': keyword }
        });
    },
    comment: (commentId) => {
        return request({
            url: '/api/admin/comment/comment',
            method: 'get',
            params: { 'commentId': commentId }
        });
    },
    getExamineCount: () => {
        return request({
            url: '/api/admin/comment/getExamineCount',
            method: 'get'
        });
    },
    updateComment: (commentId, content, images, state) => {
        return request({
            url: '/api/admin/comment/updateComment',
            method: 'put',
            params: {
                'commentId': commentId, 'content': content, 'images': images, 'state': state
            }
        });
    },
    delete: (commentId) => {
        return request({
            url: '/api/admin/comment/deletecomment',
            method: 'delete',
            params: { 'commentId': commentId }
        });
    },
}
