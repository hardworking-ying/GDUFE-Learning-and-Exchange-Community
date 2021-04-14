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
  return request({
    method: "post",
    url: "/login",
    data: postData,
  });
}