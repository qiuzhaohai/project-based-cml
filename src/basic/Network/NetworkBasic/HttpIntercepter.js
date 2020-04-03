/*
 * @Description: 
 * @Author: qiuzhaohai
 * @Date: 2019-10-18 13:50:38
 * @LastEditors: qiuzhaohai
 * @LastEditTime: 2019-12-12 01:47:01
 */

class HttpIntercepter {
    request = {
        callback: undefined,
        use: (callback) => {
            
            this.request.callback = callback;
        }
    };
    response = {
        callback: undefined,
        use: (callback) => {
            
            this.response.callback = callback;
        }
    }
}

export default HttpIntercepter;
