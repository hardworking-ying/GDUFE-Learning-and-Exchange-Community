import { request } from "./request"
export function getPostDetail(id) {
  return request({
    url: "/discuss/detail/" + id,
    method: "get",
  })
}