import Mock from 'mockjs'

Mock.mock(/\/message\//, "get", {
  code: 200,
  message: "success",
  'data|2-15': [{
    id: '@id',
    content: '@cparagraph',
    postId: '@id',
    status: 0,
  }]
})