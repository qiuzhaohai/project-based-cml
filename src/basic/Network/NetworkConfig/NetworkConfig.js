/*
 * @Description: 
 * @Author: qiuzhaohai
 * @Date: 2020-04-02 09:47:39
 * @LastEditors: qiuzhaohai
 * @LastEditTime: 2020-04-03 18:06:45
 */

const domain = 'https://api..com/';

// 网络请求URL
const networkRequestPaths = {
    LOGIN_IN_POST: 'v1/login/login', // 登录
}

//http状态码
const netWorkStatusCode = {
    success: '200',
    tokenTimeout: '10401'
};


export {
    domain,
    networkRequestPaths,
    netWorkStatusCode
}