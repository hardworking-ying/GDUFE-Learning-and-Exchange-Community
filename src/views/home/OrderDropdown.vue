<template>
  <el-select v-model="orderType" placeholder="" @change="changeOrderType">
    <el-option
      v-for="item in orderTypeList"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "OrderDropdown",
  data() {
    return {
      orderType: 0,
      orderTypeList: [{
        value: 0,
        label: "新鲜出炉"
      }, {
        value: 1,
        label: "热门话题"
      }, {
        value: 2,
        label: "精选优帖"
      }]
    }
  },
  methods: {
    changeOrderType(newValue) {
      this.$bus.$emit("selectOrderType", newValue);
    },
  },
};
</script>

<style lang="less">

</style>