<template>
  <div class="message-item">
    <router-link :to="'/detail/' + message.postId" class="message-content">
      {{ message.content }}
    </router-link>
    <div class="message-operate">
      <span v-if="message.status === 0" class="message-status">未读</span>
      <span @click="delMessage" class="operate" v-else>
        <i class="fa fa-trash-o" alt="删除消息"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageItem",
  props: {
    message: {
      type: Object,
      default() {
        return {
          id: -1,
          content: "是客户反馈是否",
          status: 0
        };
      },
    },
  },
  methods: {
    delMessage() {
      console.log("删除id为" + this.message.id + "的消息");
    },
  },
};
</script>

<style lang="less" scoped>
.message-item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 16px;
  font-size: 16px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid;
  border-radius: 8px;
  transition: all .5s;
  &:hover {
    box-shadow: 0 0 8px 2px #ccc;
  }
  > .message-content {
    flex: 1;
    color: #607d8b;
    font-weight: bold;
    line-height: 1.5;
  }
  > .message-operate {
    margin-left: 20px;
    .message-status {
      font-size: 14px;
      color: red;
    }
    .operate {
      cursor: pointer;
    }
  }
}
</style>