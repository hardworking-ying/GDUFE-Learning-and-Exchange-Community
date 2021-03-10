import {request} from './request'
export function getIndexData() {
  return request({
    url: "/index",
    method: "get"
  })
}
export function getIndexDataNew(orderType,page){
  return request({
    url: "/index",
    method: "get",
    params: {
      orderMode: orderType,
      currentPage: page
    }
  })
}