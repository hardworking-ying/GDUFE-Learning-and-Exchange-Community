import { getTagList } from '@/network/home'

export const tagMixin = {
  data() {
    return {
      tagList: [],
    }
  },
  methods: {
    // 获取标签列表
    getTagList() {
      const _this = this;
      getTagList().then((res) => {
        if (res.code === 200) {
          _this.tagList = [];
          _this.tagList.push(...res.data);
          console.log(res.data);
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
  },
  created() {
    this.getTagList();
  }
}