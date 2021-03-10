<template>
  <div class="editor-container">
    <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption"
      @change="changeValue">
    </quill-editor>
  </div>
</template>

<script>
var options = {
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
      ["blockquote", "code-block"], //引用，代码块
      [{ list: "ordered" }, { list: "bullet" }], //列表
      [{ script: "sub" }, { script: "super" }], // 上下标
      [{ indent: "-1" }, { indent: "+1" }], // 缩进
      [{ direction: "rtl" }], // 文本方向
      [{ size: ["small", false, "large", "huge"] }], // 字体大小
      [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

      [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
      [{ font: [] }], //字体
      [{ align: [] }], //对齐方式

      ["clean"], //清除字体样式
      ["image", "video"], //上传图片、上传视频
    ],
  },
};
export default {
  name: "Editor",
  data() {
    return {
      content: "",
      editorOption: options,
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor;
    },
  },
  methods: {
    changeValue($event){
      console.log($event);
      console.log(this.content);
    }
  },
  created() {
  }
};
</script>

<style lang="less">
.editor-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 50%;
  min-width: 500px;
  height: 400px;
  border: 2px solid @primary;
  border-bottom: none;
  border-radius: 16px 16px 0 0;
  .quill-editor {
    .ql-toolbar {
      border-radius: 16px 16px 0 0;
    }
    .ql-container {
      height: 300px;
      overflow-y: auto;
    }
  }
}
</style>