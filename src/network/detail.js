import { request } from "./request"
import qs from "qs"
export function getPostDetail(id, params) {
  return request({
    url: "/community/discuss/detail/" + id,
    method: "get",
    params
  })
}

export function delPostSelf(id) {
  const dataObj = {postId: id};
  const formData = qs.stringify(dataObj);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/community/discuss/delete",
    method: "post",
    data: postData
  })
}

export function delPostByAdmin(id) {
  const dataObj = {postId: id};
  const formData = qs.stringify(dataObj);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/community/delete",
    method: "post",
    data: postData
  })
}

export function like(data) {
  console.log(data);
  const formData = qs.stringify(data);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/community/like",
    method: "post",
    data: postData
  })
}

export function addComment(data, discussPostId) {
  const formData = qs.stringify(data);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/community/comment/add/"+ discussPostId,
    method: "post",
    data: postData
  })
}

export function setTop(id) {
  const dataObj = {postId: id};
  const formData = qs.stringify(dataObj);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/community/discuss/top",
    method: "post",
    data: postData
  })
}

export function unSetTop(id) {
  const dataObj = {postId: id};
  const formData = qs.stringify(dataObj);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/community/discuss/unTop",
    method: "post",
    data: postData
  })
}
export function setWonderful(id) {
  const dataObj = {postId: id};
  const formData = qs.stringify(dataObj);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/community/discuss/wonderful",
    method: "post",
    data: postData
  })
}
export function unSetWonderful(id) {
  const dataObj = {postId: id};
  const formData = qs.stringify(dataObj);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/community/discuss/unWonderful",
    method: "post",
    data: postData
  })
}

export function modifyPost(data) {
  const formData = qs.stringify(data);
  const postData = { formData, $_isFormData: true };
  return request({
    method: "POST",
    url: "/community/discuss/modify",
    data: postData
  })
}