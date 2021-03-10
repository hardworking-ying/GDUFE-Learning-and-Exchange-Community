<template>
  <div class="form-box">
    <div class="form-header">
      <span><slot name="header"></slot></span>
    </div>
    <div class="form-body">
      <slot name="body"></slot>
      <div class="form-btn">
        <slot name="submit"></slot>
      </div>
    </div>
    <div class="form-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonForm"
}
</script>

<style lang="less">
.form-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 375px;
  background-color: #fff;
  box-shadow: 0 0 10px 2px #eee;
  border-radius: 16px;
  .form-header {
    position: relative;
    text-align: center;
    padding: 25px;
    font-size: 20px;
    border-radius: 16px 16px 0 0;
  }
  .form-body {
    background-color: #ededed;
    padding: 25px 30px;
    color: #808080;
    .form-btn {
      .el-button {
        width: 100%;
      }
    }
  }
  .form-footer {
    padding: 20px;
    color: #808080;
    text-align: center;
    background-color: #fff;
    border-radius: 0 0 16px 16px;
    div {
      margin-bottom: 10px;
    }
  }
}
</style>