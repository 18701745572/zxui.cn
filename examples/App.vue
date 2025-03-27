<template>
  <div class="example-container">
    <h1>ZXUI 组件示例</h1>
    <div class="example-section">
      <h2>Button 按钮</h2>
      <div class="example-block">
        <ZxButton>默认按钮</ZxButton>
        <ZxButton type="primary">主要按钮</ZxButton>
        <ZxButton type="success">成功按钮</ZxButton>
        <ZxButton type="warning">警告按钮</ZxButton>
        <ZxButton type="danger">危险按钮</ZxButton>
      </div>
      <div class="example-block">
        <ZxButton size="small">小型按钮</ZxButton>
        <ZxButton>默认按钮</ZxButton>
        <ZxButton size="large">大型按钮</ZxButton>
      </div>
      <div class="example-block">
        <ZxButton disabled>禁用按钮</ZxButton>
        <ZxButton type="primary" disabled>禁用主要按钮</ZxButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style lang="scss">
.example-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    margin-bottom: 30px;
    color: #303133;
  }

  .example-section {
    margin-bottom: 40px;

    h2 {
      margin-bottom: 20px;
      color: #606266;
    }
  }

  .example-block {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;

    .ZxButton {
      margin-right: 10px;
    }
  }
}
</style> 