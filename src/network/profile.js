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
    url: "/myDiscussPost/"+userId,
  })
}

export function getMyComments(userId){
  return request({
    method: "get",
    url: "/replyPost/"+userId,
  })
}

export function getMyFans(userId){
  return request({
    method: "get",
    url: "/followers/"+userId,
  })
}

export function getMyFollowees(userId){
  return request({
    method: "get",
    url: "/followees/"+userId,
  })
}

export function getMyThumbs(userId){
  return request({
    method: "get",
    url: "/myThumbs/"+userId,
  })
}

export function follow(entityId) {
  const dataObj = {
    entityType: 3,
    entityId,
  };
  const formData = qs.stringify(dataObj);
  const postData = { formData, $_isFormData: true };
  return request({
    method: "post",
    url: "/follow",
    data: postData
  })
}

export function unFollow(entityId) {
  const dataObj = {
    entityType: 3,
    entityId,
  };
  const formData = qs.stringify(dataObj);
  const postData = { formData, $_isFormData: true };
  return request({
    method: "post",
    url: "/unfollow",
    data: postData
  })
}