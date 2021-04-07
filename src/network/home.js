import {request} from './request'

export function getTagList() {
  return request({
    method: "GET",
    url: "/getTagList",
  })
}

export function getAllPost(data) {
  return request({
    method: "GET",
    url: "/getAllPost",
    params: {
      keyword: data.keyword || "",
      orderType: data.orderType || 0,
      tag: data.tag || 0,
      current: data.current || 1
    }
  })
}

export function releasePost(data) {
  return request({
    method: "POST",
    url: "/releasePost",
    data
  })
}