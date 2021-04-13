import Mock from 'mockjs'

Mock.mock(/\/discuss\/detail/, "get", {
  code: 200,
  msg: "success",
  data: {
    post: {
      id: '@id',
      title: '@ctitle',
      'tag|1': '@tag',
      content: '@cparagraph',
      createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
      'commentCount|0-100': 5,
      'likeCount|0-100': 5,
      'likeStatus|0-1': 0,
      'commentStatus|0-1': 0,
      isTop: 0,
      isWonderful: 1,
    },
    user: {
      id: '@id',
      username: '@cname',
      headerUrl: '@dataImage',
    },
    'comments|1-20': [{
      comment: {
        id: '@id',
        title: '@ctitle',
        content: '@cparagraph',
        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        'commentCount|0-100': 5,
        'likeCount|0-100': 5,
        'likeStatus|0-1': 0,
        'commentStatus|0-1': 0,
      },
      user: {
        id: '@id',
        username: '@cname',
        headerUrl: '@dataImage',
      },
      'comments|0-20': [{
        comment: {
          id: '@id',
          title: '@ctitle',
          content: '@cparagraph',
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          'commentCount|0-100': 5,
          'likeCount|0-100': 5,
          'likeStatus|0-1': 0,
          'commentStatus|0-1': 0,
        },
        user: {
          id: '@id',
          username: '@cname',
          headerUrl: '@dataImage',
        }
      }]
    }]
  }
})

Mock.mock("/discuss/detail/delPostSelf", "post", function(config) {
  return {
    code: 200,
    msg: "success",
    data: ""
  }
})

Mock.mock("/discuss/detail/delPostAdmin", "post", function(config) {
  console.log('管理员删帖', config);
  return {
    code: 200,
    msg: "success",
    data:""
  }
})

Mock.mock("/discuss/detail/like", "post", function(config) {
  console.log('点赞', config);
  return Mock.mock({
    code: 200,
    msg: "success",
    'data|1-9': 1
  })
})

Mock.mock("/discuss/detail/unlike", "post", function(config) {
  console.log('取消点赞', config);
  return Mock.mock({
    code: 200,
    msg: "success",
    'data|0-9': 0
  })
})

Mock.mock("/discuss/detail/setTop", "post", function(config) {
  console.log('置顶', config);
  return {
    code: 200,
    msg: "success",
    data: ""
  }
})

Mock.mock("/discuss/detail/unSetTop", "post", function(config) {
  console.log('取消置顶', config);
  return {
    code: 200,
    msg: "success",
    data: ""
  }
})

Mock.mock("/discuss/detail/setWonderful", "post", function(config) {
  console.log('加精', config);
  return {
    code: 200,
    msg: "success",
    data: ""
  }
})

Mock.mock("/discuss/detail/unSetWonderful", "post", function(config) {
  console.log('取消加精', config);
  return {
    code: 200,
    msg: "success",
    data: ""
  }
})
