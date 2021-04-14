import {request} from './request'
import qs from "qs"

export function getTagList() {
  return request({
    method: "get",
    url: "/getTagList",
  })
}

export function getAllPost(orderMode) {
  return request({
    method: "get",
    url: "/index",
    params: {
      orderMode
    }
  })
}

export function searchPost(keyword) {
  return request({
    method: "get",
    url: "/search",
    params: {
      keyword
    }
  })
}

export function releasePost(data) {
  const formData = qs.stringify(data);
  const postData = { formData, $_isFormData: true }
  return request({
    method: "POST",
    url: "/add",
    data: postData
  })
}

