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

Mock.mock()
