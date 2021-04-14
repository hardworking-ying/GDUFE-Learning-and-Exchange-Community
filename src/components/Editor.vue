<template>
  <div id="editor">
    <div class="editor-container" ref="myEditor">
      <div class="editor-header">
        <div class="releaser-avatar">
          <img :src="$store.state.user.headerUrl" alt="" />
        </div>
        <div class="info-about-content">
          <div class="target-box" v-if="!isPost">
            <i class="fa fa-reply" aria-hidden="true"></i> {{ targetUser }}
          </div>
          <div class="tag-and-title" v-else>
            <el-select v-model="editInfo.tag" placeholder="添加标签">
              <el-option
                v-for="item in tagList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <div
                  :title="item.describe"
                  :style="{ color: item.color }"
                  class="tag-item"
                >
                  <i :class="item.icon"></i><span>{{ item.name }}</span>
                </div>
              </el-option>
            </el-select>
            <el-input
              placeholder="请输入标题"
              v-model="editInfo.title"
            ></el-input>
          </div>
        </div>
        <div class="close-expand-box">
          <i
            v-if="isExpand"
            class="fa fa-compress"
            title="退出全屏"
            @click="compressEditor"
          ></i>
          <i v-else class="fa fa-expand" title="全屏" @click="expandEditor"></i>
          <i class="fa fa-times" title="关闭" @click="closeEditor"></i>
        </div>
      </div>
      <quill-editor
        v-model="editInfo.content"
        ref="myQuillEditor"
        :options="editorOption"
      >
      </quill-editor>
      <div class="editor-bottom">
        <div class="release-box clearfix">
          <el-button type="primary" @click="release">发布</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addQuillTitle } from "plugins/quill-editor";

var options = {
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
      ["blockquote", "code-block"], //引用，代码块
      [{ list: "ordered" }, { list: "bullet" }], //列表
      [{ script: "sub" }, { script: "super" }], // 上下标
      [{ size: ["small", false, "large", "huge"] }], // 字体大小
      [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

      [{ color: [] }], // 字体颜色，字体背景颜色
      [{ align: [] }], //对齐方式

      ["clean"], //清除字体样式
      ["image"], //上传图片、上传视频
    ],
  },
};

export default {
  name: "Editor",
  data() {
    return {
      editInfo: {
        tag: this.originalPost.tag,
        title: this.originalPost.title,
        content: this.originalPost.content,
      },
      editorOption: options,
      isExpand: false,
    };
  },
  props: {
    isPost: true,
    originalPost: {
      type: Object,
      default() {
        return {
          discussPostId: -1,
          tag: "",
          title: "",
          content: "",
        };
      },
    },
    tagList: {
      type: Array,
      default() {
        return [];
      },
    },
    targetUser: {
      type: String,
      default: "",
    },
  },
  methods: {
    expandEditor() {
      this.isExpand = true;
      this.$refs.myEditor.classList.add("expand-editor");
      console.log(this.$refs.myEditor);
    },
    compressEditor() {
      this.isExpand = false;
      this.$refs.myEditor.classList.remove("expand-editor");
    },
    closeEditor() {
      const _this = this;
      if (this.editInfo.title !== "" || this.editInfo.content !== "") {
        this.$confirm("是否保留此次编辑?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        })
          .then(() => {
            _this.$emit("closeEditor");
          })
          .catch(() => {
            _this.clearEditor();
            _this.$emit("closeEditor");
          });
      } else {
        this.$emit("closeEditor");
      }
    },
    release() {
      if (this.isPost) {
        if (this.editInfo.tag === "") {
          this.$message.error("请选择帖子标签!");
          return;
        } else if (this.editInfo.title === "") {
          this.$message.error("标题不能为空！");
          return;
        } else if (this.editInfo.content === "") {
          this.$message.error("帖子内容不能为空！");
          return;
        }
        this.$emit("releasePost", this.editInfo);
        this.$emit("closeEditor");
        this.clearEditor();
      } else {
        if (this.editInfo.content === "") {
          this.$message.error("评论内容不能为空！");
          return;
        }
        this.$emit("releaseComment", this.editInfo.content);
        this.$emit("closeEditor");
        this.clearEditor();
      }
    },
    clearEditor() {
      this.editInfo.tag = "";
      this.editInfo.title = "";
      this.editInfo.content = "";
    },
  },
  created() {},
  mounted() {
    addQuillTitle();
  },
};
</script>

<style lang="less">
#editor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(197, 195, 195, 0.5);
  z-index: 999;
  .editor-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 50%;
    min-width: 500px;
    height: 480px;
    // z-index: 999;
    border: 2px solid @primary;
    border-bottom: none;
    border-radius: 16px 16px 0 0;
    background-color: #fff;
    .editor-header {
      width: 100%;
      display: flex;
      padding: 10px 20px 0 10px;
      .releaser-avatar {
        img {
          width: 64px;
          height: 64px;
          border-radius: 8px;
        }
      }
      .info-about-content {
        margin: 0 20px;
        flex: 1;
        color: rgb(204, 204, 204);
        .tag-and-title {
          .el-select {
            width: 120px;
          }
          .el-input {
            margin-bottom: 10px;
          }
        }
      }
      .close-expand-box {
        i {
          margin-right: 16px;
          font-size: 20px;
          color: rgb(184, 180, 180);
          cursor: pointer;
          &:hover {
            color: @primary;
          }
        }
      }
    }
    .quill-editor {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      .ql-container {
        flex: 1;
        overflow-y: auto;
      }
    }
    .editor-bottom {
      margin-top: 10px;
      .release-box {
        float: right;
        line-height: 50px;
        margin-right: 20px;
      }
    }
  }
}
.tag-item {
  i {
    margin-right: 10px;
  }
}
.expand-editor {
  width: 99% !important;
  height: 99% !important;
}
</style>