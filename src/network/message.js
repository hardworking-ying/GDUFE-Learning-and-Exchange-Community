import { request } from "./request"
export function getMessageList(userId) {
  return request({
    url: "/message/" + userId,
    method: "get",
  })
}