import { request } from "./request"
import qs from "qs"
export function loginCheck(data) {
  const dataobj = {
    username: data.username,
    // email: data.email,
    password: data.password,
    code: data.checkCode,  
  };
  const formData = qs.stringify(dataobj)
  const postData = { formData, $_isFormData: true }
  return request({
    method: "post",
    url: "/login",
    // withCredentials: true,
    // data: dataobj,
    data: postData,
  });
}