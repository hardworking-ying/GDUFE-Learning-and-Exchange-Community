import Mock from 'mockjs'

Mock.mock("/getTagList", "get", {
  code: 200,
  message: "成功",
  data: [{
    id: 1,
    name: "公告",
    describe: "GDUFE COMMUNITY 社区的公告",
    color: "#EF564F",
    icon: "fa fa-bullhorn"
  }, {
    id: 2,
    name: "求助",
    describe: "获取社区管理员和小伙伴的帮助",
    color: "#4B93D1",
    icon: "fa fa-wrench"
  }, {
    id: 3,
    name: "分享",
    describe: "欢迎分享你的资源、经历和感悟",
    color: "#6DBB3E",
    icon: "fa fa-share-alt"
  }, {
    id: 4,
    name: "闲聊",
    describe: "feel free to flood",
    color: "#888",
    icon: "fa fa-beer"
  }, {
    id: 5,
    name: "反馈",
    describe: "对于 GDUFE COMMUNITY 在设计上、功能上有什么好的建议呢？",
    color: "#9354CA",
    icon: "fa fa-commenting-o"
  }]
})

Mock.mock(/\/getAllPost/, "get", {
  code: 200,
  message: "成功",
  data: {
    'postList|5-20': [{
      post: {
        id: '@id',
        title: '@ctitle',
        'tag|1': '@tag',
        content: '@cparagraph',
        createTime: '@date("yyyy-MM-dd")',
        'commentCount|0-100': 1,
        'likeCount|0-100': 1,
        'status|0-2': 0,
        'score|0-10000': 0
      },
      user: {
        id: '@id',
        username: '@cname',
        headerUrl: "@dataImage('50x50')"
      },
    }],
    'total|10-40': 10
  }
})

Mock.mock('/releasePost', "post", function(option) {
  return Mock.mock({
    code: 200,
    message: "发帖成功！",
  })
})

Mock.mock('/login', "post", function(option) {
  console.log("登录 " ,option);
  return Mock.mock({
    code: 200,
    message: "登陆成功！",
    data: "@id"
  })
})
