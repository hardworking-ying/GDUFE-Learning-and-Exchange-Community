import { request } from "./request"
export function getMessageList(userId) {
  return request({
    url: "/community/message/" + userId,
    method: "get",
  })
}