import { request } from "./request"
import qs from "qs"
export function getUserInfo(userId){
  return request({
    method: "get",
    url: "/community/user/profile/"+userId,
  })
}

export function getMyPosts(userId, params){
  return request({
    method: "get",
    url: "/community/user/myDiscussPost/" + userId,
    params
  })
}

export function getMyComments(userId, params){
  console.log("params", params);
  return request({
    method: "get",
    url: "/community/user/replyPost/"+userId,
    params
  })
}

export function getMyFans(userId){
  return request({
    method: "get",
    url: "/community/followers/"+userId,
  })
}

export function getMyFollowees(userId){
  return request({
    method: "get",
    url: "/community/followees/"+userId,
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
    url: "/community/follow",
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
    url: "/community/unfollow",
    data: postData
  })
}

export function changePassword(data) {
  const formData = qs.stringify(data);
  const postData = { formData, $_isFormData: true };
  return request({
    method: "post",
    url: "/community/user/password",
    data: postData
  }) 
}

export function uploadAvatar(data) {
  const formData = data;
  const postData = { formData, $_isFormData: true };
  return request({
    method: "post",
    url: "/community/user/upload",
    data: postData
  })
}