import { request } from "./request"
import qs from "qs"
export function loginCheck(data) {
  const dataobj = {
    username: data.username,
    password: data.password,
    code: data.checkCode,  
  };
  const formData = qs.stringify(dataobj)
  const postData = { formData, $_isFormData: true }
  console.log(111, postData);
  return request({
    method: "post",
    url: "/community/login",
    data: postData,
  });
}

export function getKaptcha() {
  return request({
    method: "get",
    url: "/community/kaptcha"
  })
}