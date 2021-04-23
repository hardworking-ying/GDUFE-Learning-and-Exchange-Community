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
      orderType: 1,
      orderTypeList: [{
        value: 2,
        label: "新鲜出炉"
      }, {
        value: 1,
        label: "热门话题"
      }]
    }
  },
  methods: {
    changeOrderType(newValue) {
      this.$emit("changeOrderType", newValue);
    },
  },
};
</script>

<style lang="less">

</style>