import { request } from './request'

export function getUserInfo(userId){
  return request({
    method: "get",
    url: "/user/profile/"+userId,
  })
}