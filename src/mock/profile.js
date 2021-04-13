import Mock from 'mockjs'

Mock.mock(/\/user\/profile\//, "get", {
  code: 200,
  message: "成功",
  data: {
    id: "@id",
    type: 0,
    username: "@cname",
    headerUrl: "@dataImage",
    email: "@email",
    createTime: "@date('yyyy-MM-dd HH:mm')",
    hasFollowed: false
  }
})

Mock.mock(/\/myDiscussPosts\//, "get", {
  code: 200,
  message: "成功",
  'data|1-10': [{
    id: "@id",
    title: "@ctitle",
    tag: "@tag",
    content: "@cparagraph",
    createTime: "@date('yyyy-MM-dd HH:mm')",
  }]
})

Mock.mock(/\/myComments\//, "get", {
  code: 200,
  message: "成功",
  'data|0-5': [{
    id: "@id",
    userId: '@id',
    username: "@cname",
    targetId: "@id",
    targetUserId: "@id",
    targetUsername: "@cname",
    targetType: 1,
    targetTypeName: "评论",
    replyContent: "@csentence",
    originalContent: "@csentence",
    createTime: "@date('yyyy-MM-dd HH:mm')",
  }]
})

Mock.mock(/\/myFollowers\//, "get", {
  code: 200,
  message: "成功",
  'data|5-20': [{
    id: "@id",
    headerUrl: "@dataImage",
    username: "@cname",
  }]
})

Mock.mock(/\/myFollowees\//, "get", {
  code: 200,
  message: "成功",
  'data|5-20': [{
    id: "@id",
    headerUrl: "@dataImage",
    username: "@cname",
  }]
})

Mock.mock(/\/myThumbs\//, "get", {
  code: 200,
  message: "success",
  'data|1-20': [{
    userId: '@id',
    username: "@cname",
    thumbType: 0,
    thumbTypeName: "帖子",
    thumbContent: "@csentence",
    targetId: '@id',
    targetUserId: '@id',
    targetUsername: "@cname",
  }]
})

Mock.mock("/profile/follow", "post", function (config) {
  console.log("关注", config);
  return {
    code: 200,
    message: "success",
    data: ""
  }
})

Mock.mock("/profile/unFollow", "post", function (config) {
  console.log("取消关注", config);
  return {
    code: 200,
    message: "success",
    data: ""
  }
})

