// 现在没有在用

import axios from 'axios'
// axios.defaults.timeout = 5000;  // 超时时间设置
// axios.defaults.withCredentials = true;  // true允许跨域
// // Content-Type 响应头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// axios.defaults.baseURL = 'http://47.93.21.142:8080';

// if (process.env.NODE_ENV === 'production') {
//     /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
//     if (process.env.VUE_APP_FLAG === 'pro') {
//       //production 生产环境
//       axios.defaults.baseURL = 'http://47.93.21.142:8080';
//     } else {
//       //test 测试环境
//       axios.defaults.baseURL = 'http://47.93.21.142:8080';
//     }
//   } else {
//     //dev 开发环境
//     axios.defaults.baseURL = 'http://47.93.21.142:8080';
//   }

// 响应拦截器
// axios.interceptors.response.use(
//   response => {
//     // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
//     // 否则的话抛出错误
//     if (response.status === 200) {
//       return Promise.resolve(response);
//     } else {
//       return Promise.reject(response);
//     }
//   },
//   // 服务器状态码不是2开头的的情况
//   error => {
//     if (error.response.status) {
//       switch (error.response.status) {
//         case 401:  // 401未登录
//           router.replace({
//             path: '/',
//             query: {
//               redirect: router.currentRoute.fullPath
//             }
//           });
//           break;
//         case 403:
//           // console.log('权限已修改请重新登录')
//           // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
//           setTimeout(() => {
//             router.replace({
//               path: '/',
//               query: {
//                 redirect: router.currentRoute.fullPath
//               }
//             });
//           }, 1000);
//           break;
//         case 404:  // 404请求不存在
//           console.log('请求页面飞到火星去了')
//           break;
//       }
//       return Promise.reject(error.response);
//     }
//   });

/**
   * 封装get方法
   * @param url
   * @param data
   * @returns {Promise}
   */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
   * 封装post请求
   * @param url
   * @param data
   * @returns {Promise}
   */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
   * 封装delete请求
   * @param url
   * @param data
   * @returns {Promise}
   */

export function deletes(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
   * 封装put请求
   * @param url
   * @param data
   * @returns {Promise}
   */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}


