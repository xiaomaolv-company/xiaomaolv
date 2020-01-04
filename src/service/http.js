import axios from "axios";
import {Toast} from "antd-mobile";


const service = axios.create({
  timeout: 100000,  // 请求超时的配置
});

// 设置post请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// request 的拦截----自定义相关操作
service.interceptors.request.use(config => {
  config.url = `/app${config.url}`;
  Toast.loading("请稍候...", 0);
  // 在此处可设置请求头
  return config;
}, error => {
  Toast.fail("发生了一点小错误哦！", 3);
  throw new Error(error);
});

// response 的拦截----自定义相关操作
service.interceptors.response.use(({data, status}) => {
  // 在此处处理后端返回的数据
  if (status === 200) { // 说明后端已经正常返回数据
    Toast.hide();
    const {appData, statusCode, message} = data;
    if (statusCode == 200) {
      return appData;
    } else {
      Toast.fail(message, 3);
    }
  } else {
    Toast.fail("发生了一点小错误哦！", 3);
  }
}, error => {
  Toast.fail("发生了一点小错误哦！", 3);
  throw new Error(error);
});

export default service;