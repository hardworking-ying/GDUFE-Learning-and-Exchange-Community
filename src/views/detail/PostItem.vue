<template>
  <div class="post-item">
    <div class="item-header">
      <div class="author-info">
        <router-link
          :to="'/profile/' + user.id"
          :title="'去' + user.username + '的主页'"
        >
          <img :src="user.headerUrl" alt="" class="author-avatar" />
          <span class="author-name">{{ user.username }}</span>
        </router-link>
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
      <slot name="targetUser"></slot>
      <div v-html="post.content"></div>
    </div>
    <ul class="item-control clearfix">
      <!-- <li class="control-delete" @click="clickDelete">
        <i class="fa fa-trash-o" title="删除"></i>
      </li> -->
      <li class="control-like">
        <i
          v-if="likeStatus == 0"
          class="fa fa-heart-o"
          title="点赞"
          @click="clickLike(type, post.id, user.id, postId)"
        ></i>
        <i
          v-else
          class="fa fa-heart liked"
          title="取消点赞"
          @click="clickLike(type, post.id, user.id, postId)"
        ></i>
        {{ likeCount == 0 ? "" : likeCount }}
      </li>
      <li class="control-reply" @click="clickReply">
        <i class="fa fa-reply" title="回复"></i>
        {{ replyCount === 0 ? "" : replyCount }}
      </li>
    </ul>
    <PostItem
      v-for="(item, key) in comments"
      :key="key"
      :post="item.comment"
      :user="item.userVO"
      :comments="item.replies | commentsFilter"
      :likeCount="item.likeCount"
      :likeStatus="item.likeStatus"
      :replyCount="item.replyCount"
      :type="2"
    >
      <template v-slot:targetUser>
        <el-tooltip class="target" effect="light" placement="top-start">
          <span><i class="fa fa-reply"></i> {{ user.username }}</span>
          <div slot="content" v-html="post.content"></div>
        </el-tooltip>
      </template>
      <template v-slot:editOrReply><span>回复</span></template>
    </PostItem>
  </div>
</template>

<script>
import { like } from "network/detail";
import { checkMixin } from "@/common/mixin"
export default {
  name: "PostItem",
  data() {
    return {
      postId: -1,
    };
  },
  props: {
    post: {
      type: Object,
      default() {
        return {};
      },
    },
    user: {
      type: Object,
      default() {
        return {};
      },
    },
    comments: {
      // type: Map,
      // default() {
      //   return new Map();
      // },
      type: Array,
      default() {
        return []
      }
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    likeStatus: {
      type: Number,
      default: 0,
    },
    type: {
      type: Number,
      default: 1,
    },
    replyCount: {
      type: Number,
      default: 0,
    }
  },
  filters: {
    commentsFilter(value) {
      // console.log("filter", value);
      // const map = new Map();
      // value.forEach(item => {
      //   map.set(item.comment.id, item)
      // });
      // return map;
      return value;
    } 
  },
  methods: {
    clickReply() {
      if(!this.checkAuth()) return false;
      this.$bus.$emit(
        "clickReply",
        this.type,
        this.post.id,
        this.user.id,
        this.user.username
      );
    },
    clickLike(entityType, entityId, entityUserId, postId) {
      if(!this.checkAuth()) return false;
      const _this = this;
      like({
        entityType,
        entityId,
        entityUserId,
        postId,
      }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          _this.likeStatus = res.data.likeStatus;
          _this.likeCount = res.data.likeCount;
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    clickDelete() {
      console.log("点击删除", this.post.id, this.user.id);
    },
  },
  created() {
    this.postId = this.$route.params.postId;
    console.log('1111111111111comment',this.comments);
  },
  mounted() {},
  mixins: [checkMixin]
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
      opacity: 0.8;
    }
  }
}
</style>