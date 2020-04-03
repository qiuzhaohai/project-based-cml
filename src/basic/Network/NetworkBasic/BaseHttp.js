/*
 * @Description: 
 * @Author: qiuzhaohai
 * @Date: 2019-10-18 13:50:38
 * @LastEditors: qiuzhaohai
 * @LastEditTime: 2020-04-02 09:44:59
 */

import cml from 'chameleon-api';
import HttpIntercepter from './HttpIntercepter';

class BaseHttp {
    constructor() {
      this.timeout = 30000;
      this.enableIntercepter = true;
      this.intercepter = new HttpIntercepter();
    }
    /**
   * @param {cmlHttpOptions} 请求参数
   * get请求
   */
    get(cmlHttpOptions) {
      let promise = undefined;
        if (this.enableIntercepter) {
          promise = new Promise((resolve, reject) => {
                this.intercepter.request.callback(cmlHttpOptions).then((req) => {
                    cml.get(req).then((resp) => {
                        resolve(this.intercepter.response.callback(resp));
                    }).catch((err) => {
                        reject(this.intercepter.response.callback(err));
                    });
                }).catch((err) => {
                    console.error(JSON.stringify(err));
                    reject(this.intercepter.response.callback(err));
                });
            });
        } else {
          promise = cml.get(cmlHttpOptions);
        }
        return new Promise((resolve, reject) => {
          Promise.race([
            this.delayPromise(cmlHttpOptions.timeout || this.timeout),
            promise
          ]).then((resp) => {
              resolve(resp);
          }).catch((err) => {
              reject(err);
          });
        })
    }
    
    post(cmlHttpOptions) {
      let promise = undefined;
      if (this.enableIntercepter) {
        promise = new Promise((resolve, reject) => {
              this.intercepter.request.callback(cmlHttpOptions).then((req) => {
                  cml.post(req).then((resp) => {
                      resolve(this.intercepter.response.callback(resp));
                  }).catch((err) => {
                      reject(this.intercepter.response.callback(err));
                  });
              }).catch((err) => {
                reject(this.intercepter.response.callback(err));
              });
          });
      } else {
        promise = cml.post(cmlHttpOptions);
      }
      return new Promise((resolve, reject) => {
        Promise.race([
          this.delayPromise(cmlHttpOptions.timeout || this.timeout),
          promise
        ]).then((resp) => {
            resolve(resp);
        }).catch((err) => {
            reject(err);
        });
      })
    }

    request(cmlHttpOptions) {
      let promise = undefined;
      if (this.enableIntercepter) {
        promise = new Promise((resolve, reject) => {
          this.intercepter.request.callback(cmlHttpOptions).then((req) => {
              cml.request(req).then((resp) => {
                  resolve(this.intercepter.response.callback(resp));
              }).catch((err) => {
                  reject(this.intercepter.response.callback(err));
              });
          }).catch((err) => {
              reject(this.intercepter.response.callback(err));
          });
        });
      } else {
        promise = cml.request(cmlHttpOptions);
      }
      return Promise.race([
        this.delayPromise(cmlHttpOptions.timeout || this.timeout),
        promise
      ])
    }
    
    delayPromise(ms) {
      return new Promise((resolve,reject) => {
          setTimeout(() => {
            reject();
          }, ms);
      });
    }    
};

export default BaseHttp;
