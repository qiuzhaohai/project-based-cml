/*
 * @Description: 
 * @Author: qiuzhaohai
 * @Date: 2019-10-18 13:50:38
 * @LastEditors: qiuzhaohai
 * @LastEditTime: 2020-03-02 14:35:09
 */

import http from '../NetworkBasic/HttpHelper';
import { domain, eleCareServerCode} from './NetworkConfig';

function initHttpIntercetper(context) {
    // http request 拦截
    http.intercepter.request.use((request) => {
        if (!request.header) {
        request.header = {};
        }
        request.header.token = http['token'];
        if (!request.domain && !request.url.match(/(http|https):\/\//)) {
            request.domain = domain;
        }
        return Promise.resolve(request);
    });

    // http response 拦截
    http.intercepter.response.use((response) => {
        if (response.status === -1) { // cml 捕获的http错误
        return response;
        } else {
        if (response.code === eleCareServerCode.success) {
            return Promise.resolve(response);
        } else if (response.code === eleCareServerCode.tokenTimeout) {
            return Promise.reject(response);
        } else {
            return Promise.reject(response);
        }
        }
    })
}

function initHttpPlugin(context) {
    initHttpIntercetper(context);
}

function setAuthorizationToken(value) {
    http['token'] = value;
}

export {
    initHttpPlugin,
    setAuthorizationToken
}
