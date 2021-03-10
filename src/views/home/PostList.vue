<template>
  <div class="post-list">
    <Post v-for="(item, index) in posts" :key="index" :post="item"/>
  </div>
</template>

<script>
import Post from "./Post"
export default {
  name: "PostList",
  components: {
    Post,
  },
  props: {},
  data() {
    return {
      
    }
  },
  props: {
    posts: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {}
}
</script>

<style>

</style>