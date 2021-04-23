<template>
  <div class="message">
    <div class="message-header-wrapper">
      <el-row class="message-header">
        <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
          <div class="message-title">消息列表</div>
        </el-col>
      </el-row>
    </div>
    <div class="message-body-wrapper">
      <el-row class="message-body">
        <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
          <el-select v-model="msgType" placeholder="请选择" class="msg-type-select">
            <el-option
              v-for="item in msgTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div v-for="item in msgList" :key="item.id">
            <MessageItem :message="item" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import MessageItem from "./MessageItem";
import { getMessageList } from "@/network/message";
export default {
  name: "Message",
  components: {
    MessageItem,
  },
  data() {
    return {
      msgList: [],
      msgTypeList: [{
        value: 0,
        label: "所有消息"
      }, {
        value: 1,
        label: "回复我的"
      }, {
        value: 2,
        label: "收到的赞"
      }, {
        value: 3,
        label: "新增粉丝"
      }],
      msgType: 0
    };
  },
  methods: {
    getMessageList() {
      const _this = this;
      getMessageList(this.$store.state.user.id).then((res) => {
        console.log("消息列表来了", res);
        if (res.code === 200) {
          _this.msgList = [];
          _this.msgList.push(...res.data);
        } else {
          _this.$message.error(res.message);
        }
      });
    },
  },
  created() {
    this.getMessageList();
    this.$store.commit("setHasMsg", {hasMsg: false});
  },
};
</script>

<style lang="less" scoped>
.message {
  height: 100%;
  > .message-header-wrapper {
    background-color: @primary;
    .message-title {
      color: #fff;
      height: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: bold;
    }
  }
  > .message-body-wrapper {
    height: calc(100% - 60px);
    padding: 20px 0;
    overflow: auto;
    .msg-type-select {
      margin-bottom: 10px;
    }
  }
}
</style>