import { request } from "./request"
export function getPostDetail(id) {
  return request({
    url: "/discuss/detail/" + id,
    method: "get",
  })
}

export function delPostSelf(id) {
  return request({
    url: "/discuss/detail/delPostSelf",
    method: "post",
    data: {
      postId: id
    }
  })
}

export function delPostByAdmin(data) {
  return request({
    url: "/discuss/detail/delPostAdmin",
    method: "post",
    data
  })
}

export function like(data) {
  return request({
    url: "/discuss/detail/like",
    method: "post",
    data
  })
}

export function unLike(data) {
  return request({
    url: "/discuss/detail/unlike",
    method: "post",
    data
  })
}

export function reply(id) {
  return request({
    url: "/discuss/detail/reply",
    method: "post",
    data: {
      postId: id
    }
  })
}

export function setTop(id) {
  return request({
    url: "/discuss/detail/setTop",
    method: "post",
    data: {
      postId: id
    }
  })
}
export function unSetTop(id) {
  return request({
    url: "/discuss/detail/unSetTop",
    method: "post",
    data: {
      postId: id
    }
  })
}
export function setWonderful(id) {
  return request({
    url: "/discuss/detail/setWonderful",
    method: "post",
    data: {
      postId: id
    }
  })
}
export function unSetWonderful(id) {
  return request({
    url: "/discuss/detail/unSetWonderful",
    method: "post",
    data: {
      postId: id
    }
  })
}