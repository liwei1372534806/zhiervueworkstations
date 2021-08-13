<template>
  <page-header-wrapper>
    <div id="components-grid-demo-playground">
      <a-row :gutter="[16,16]">
        <a-col :span="8">
          <a style="text-align:center">替换索引</a>
        </a-col>
        <a-col :span="8">
          <a style="text-align:center">查询es商品</a>
        </a-col>
        <a-col :span="8">
          <a style="text-align:center">测试</a>
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>
<script>
export default {
  name: 'es',
  data() {
    return {}
  }
}
</script>
<style scoped>
#components-grid-demo-playground [class~='ant-col'] {
  background: transparent;
  border: 0;
}

#components-grid-demo-playground [class~='ant-col'] > div {
  background: #00a0e9;
  height: 120px;
  line-height: 120px;
  font-size: 13px;
}

#components-grid-demo-playground pre {
  background: #f9f9f9;
  border-radius: 6px;
  font-size: 13px;
  padding: 8px 16px;
}
</style>