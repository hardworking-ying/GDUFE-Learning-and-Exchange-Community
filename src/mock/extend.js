import {Random} from 'mockjs'

Random.extend({
  tag(data) {
    const tags = ["求助", "分享", "闲聊", "公告", "反馈"];
    return this.pick(tags);
  }
})