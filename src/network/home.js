import {request} from './request'
import qs from "qs"

export function getTagList() {
  const formData = qs.stringify({});
  const postData = { formData, $_isFormData: true }  
  return request({
    method: "post",
    url: "/community/discuss/getTagList",
    data: postData
  })
}

export function getAllPost(params) {
  return request({
    method: "get",
    url: "/community/index",
    params,
  })
}

export function searchPost(params) {
  return request({
    method: "get",
    url: "/community/search",
    params
  })
}

export function releasePost(data) {
  const formData = qs.stringify(data);
  const postData = { formData, $_isFormData: true }
  return request({
    method: "POST",
    url: "/community/discuss/add",
    data: postData
  })
}

