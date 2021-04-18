import { request } from './request'

export function getUserInfo(userId){
  return request({
    method: "get",
    url: "/community/user/profile/"+userId,
  })
}