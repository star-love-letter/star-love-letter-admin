import axios from 'axios';
import global from './global';
import { Message } from 'element-ui';
import qs from 'qs'

// 过滤连续重复的错误信息
function MyErrorMessage() {
    var time = 0;
    var lastMessage = '';
    return function (message) {
        var now = Date.now();

        if (lastMessage != message || now - time > 300)
            Message.error(message);

        console.log(message);
        time = now
        lastMessage = message;
    };
}
let myErrorMessage = MyErrorMessage()


const service = axios.create({
    baseURL: global.baseURL,
    timeout: 5000,
    paramsSerializer: function(p) {
        return qs.stringify(p, {arrayFormat: 'repeat'})
      }
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        myErrorMessage(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.code === 200)
                return response.data;
            else {
                myErrorMessage(response.data.message);

                if (response.data.code == 20001) this.$router.push('/Login');
                if (response.data.code == 70001) this.$router.push('/Login');
                return Promise.reject(response.data.message);
            }
        } else {
            Promise.reject();
        }
    },
    error => {
        myErrorMessage(error);
        return Promise.reject();
    }
);

export default service;
