import { request } from "./request"

export function getUserInfo(userId){
  return request({
    method: "get",
    url: "/user/profile/"+userId,
  })
}

export function getMyPosts(userId){
  return request({
    method: "get",
    url: "/myDiscussPosts/"+userId,
  })
}

export function getMyComments(userId){
  return request({
    method: "get",
    url: "/myComments/"+userId,
  })
}

export function getMyFans(userId){
  return request({
    method: "get",
    url: "/myFollowers/"+userId,
  })
}

export function getMyFollowees(userId){
  return request({
    method: "get",
    url: "/myFollowees/"+userId,
  })
}

export function getMyThumbs(userId){
  return request({
    method: "get",
    url: "/myThumbs/"+userId,
  })
}

export function follow(userId) {
  return request({
    method: "post",
    url: "/profile/follow",
    data: {
      userId
    }
  })
}

export function unFollow(userId) {
  return request({
    method: "post",
    url: "/profile/unFollow",
    data: {
      userId
    }
  })
}