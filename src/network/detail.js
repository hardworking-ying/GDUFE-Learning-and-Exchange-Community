import { request } from "./request"
export function getPostDetail(id) {
  return request({
    url: "/detail/" + id,
    method: "get",
  })
}

export function delPostSelf(id) {
  const dataObj = {postId: id};
  const formData = qs.stringify(dataObj);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/delete",
    method: "post",
    data: postData
  })
}

export function delPostByAdmin(id) {
  const dataObj = {postId: id};
  const formData = qs.stringify(dataObj);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/delete",
    method: "post",
    data: postData
  })
}

export function like(data) {
  const formData = qs.stringify(data);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/like",
    method: "post",
    data: postData
  })
}

export function addComment(data, discussPostId) {
  const formData = qs.stringify(data);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/add/"+ discussPostId,
    method: "post",
    data: postData
  })
}

export function setTop(id) {
  const dataObj = {postId: id};
  const formData = qs.stringify(dataObj);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/top",
    method: "post",
    data: postData
  })
}

export function unSetTop(id) {
  const dataObj = {postId: id};
  const formData = qs.stringify(dataObj);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/unTop",
    method: "post",
    data: postData
  })
}
export function setWonderful(id) {
  const dataObj = {postId: id};
  const formData = qs.stringify(dataObj);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/wonderful",
    method: "post",
    data: postData
  })
}
export function unSetWonderful(id) {
  const dataObj = {postId: id};
  const formData = qs.stringify(dataObj);
  const postData = {formData, $_isFormData: true};
  return request({
    url: "/unWonderful",
    method: "post",
    data: postData
  })
}

export function modifyPost(data) {
  const formData = qs.stringify(data);
  const postData = { formData, $_isFormData: true };
  return request({
    method: "POST",
    url: "/modify",
    data: postData
  })
}