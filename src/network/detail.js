import { request } from "./request"
export function getDetailPost(id) {
  return request({
    url: "/discuss/detail/" + id,
    method: "get",
  })
}