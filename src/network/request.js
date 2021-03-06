import axios from "axios";
import Vue from "vue";
import store from "../store";
import qs from "qs";

axios.defaults.withCredentials = true;
var loading;
export function request(config) {
  // 基本配置信息
  const instance = axios.create({
    // baseURL: store.state.baseURL,
    timeout: 15000
  });

  // 请求拦截
  instance.interceptors.request.use(
    config => {
      loading = Vue.prototype.$loading({
        lock: "true",
        text: "加载中..."
      });
      // 请求过程的的操作在这里进行
      // 检测是否有token令牌

      // 自动书写headers
      // 注意传回来的data参数必须带有data和$_isFormDatal两项
      if (config.method == "post") {
        if (config.data && config.data.$_isFormData === false) {
          // config.headers["Content-Type"] = "application/json";
          config.data = config.data.dataobj;
        } else {
          // config.headers["Content-Type"] = "multipart/form-data";
          config.data = config.data.formData;
        }
      }

      return config;
    },
    err => {
      console.log("拦截器检测到错误:" + err);
      return Promise.reject(err);
    }
  );

  // 响应拦截
  instance.interceptors.response.use(
    res => {
      loading.close();
      return res.data;
    },
    err => {
      loading.close();
      Vue.prototype.$message.error("加载失败！");
      let error = "获取响应失败：真的获取不到数据啊！我哭了！\n" + "错误信息:" + err;
      return Promise.reject(error)
    }
  );

  return instance(config);
}