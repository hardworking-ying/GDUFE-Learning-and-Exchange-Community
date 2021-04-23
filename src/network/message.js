import { request } from "./request"
import qs from "qs"
export function getMessageList() {
  const dataObj = {};
  const formData = qs.stringify(dataObj);
  const postData = {formData, $_isFormData: true}
  return request({
    url: "/community/getUnreadList",
    method: "post",
    data: postData
  })
}