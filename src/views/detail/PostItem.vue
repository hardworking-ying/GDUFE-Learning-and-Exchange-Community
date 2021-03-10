<template>
  <div class="post-item">
    <div class="item-header">
      <div class="author-info">
        <img
          :src="user.headerUrl"
          alt=""
          class="author-avatar"
        />
        <span class="author-name">{{ user.username }}</span>
      </div>
      <div class="edit-time">
        <span>{{ post.createTime }}</span>
        <slot name="editOrReply"><span>编辑</span></slot>
      </div>
      <div>
        <slot name="authorFlag"></slot>
      </div>
    </div>
    <div class="item-content">
      {{ post.content }}
    </div>
    <ul class="item-control clearfix">
      <li class="control-delete" @click="clickDelete">
        <i class="fa fa-trash-o"></i>
      </li>
      <li class="control-like" @click="clickLike">
        <i v-if="likeStatus==0" class="fa fa-heart-o"></i>
        <i v-else class="fa fa-heart liked"></i> {{ likeCount }}
      </li>
      <li class="control-reply" @click="clickReply">
        <i class="fa fa-reply"></i> {{ commentCount }}
      </li>
    </ul>
    
  </div>
</template>

<script>
export default {
  name: "PostItem",
  data() {return {}},
  props: {
    post: {
      type: Object,
      default() {
        return {}
      }
    },
    likeCount: 0,
    likeStatus: 0,
    user: {
      type: Object,
      default() {
        return {}
      }
    },
    comments: {
      type: Array,
      deafult() {
        return []
      }
    },
    commentCount: 0,
  },
  created() {},
  mounted() {},
  methods: {
    clickReply() {
      console.log("点击了回复");
    },
    clickLike() {
      console.log("点赞");
    },
    clickDelete() {
      console.log("点击删除");
    }
  },
};
</script>

<style lang="less">
.post-item {
  margin-bottom: 20px;
  background-color: #fff;
  .item-header {
    width: 100%;
    display: flex;
    align-items: flex-end;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .author-info {
      font-size: 14px;
      margin-right: 16px;
      .author-avatar {
        width: 27px;
        height: 27px;
        border: 3px solid @primary;
        border-radius: 8px;
        margin-right: 8px;
      }
      .author-name {
        color: #333;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .edit-time {
      flex: 1;
      span {
        margin-right: 8px;
      }
    }
  }
  .item-content {
    padding: 10px 0;
  }
  .item-control {
    li {
      float: right;
      margin-left: 20px;
      cursor: pointer;
      i {
        font-size: 16px;
      }
      .liked {
        color: @primary;
      }
    }
    li:hover {
      opacity: .8;
    }
  }
}
</style>