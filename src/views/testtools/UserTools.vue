<template>
  <page-header-wrapper>
    <div id="components-form-demo-advanced-search">
      <a-row><h1>只二APP账号</h1></a-row>
      <a-row type="flex" justify="space-around" class="ant-advanced-search-form">
        <a-col :span="8" class="ant-advanced-search-form">
          <a-form-model :layout="Inline">
            <a-form-model-item label="用户ID">
              <a-input style="width: 60%"></a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary">查询</a-button>
            </a-form-model-item>
          </a-form-model>
        </a-col>
        <a-col :span="8" class="ant-advanced-search-form">
          <a-form-model>
            <a-form-model-item label="用户ID">
              <a-input></a-input>
            </a-form-model-item>
          </a-form-model>
          <a-form-model>
            <a-form-model-item label="用户ID">
              <a-input></a-input>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
      <p></p>
      <a-row><h1>商家APP&小程序账号</h1></a-row>
      <a-row type="flex" justify="space-around" class="ant-advanced-search-form">
        <a-col :span="8" class="ant-advanced-search-form">
          <a-form-model :layout="Inline">
            <a-form-model-item label="用户ID">
              <a-input style="width: 60%"></a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary">查询</a-button>
            </a-form-model-item>
          </a-form-model>
        </a-col>
        <a-col :span="8" class="ant-advanced-search-form">
          <a-form-model>
            <a-form-model-item label="用户ID">
              <a-input></a-input>
            </a-form-model-item>
          </a-form-model>
          <a-form-model>
            <a-form-model-item label="用户ID">
              <a-input></a-input>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
      <p></p>
      <a-row><h1>BD小程序账号</h1></a-row>
      <a-row type="flex" justify="space-around" class="ant-advanced-search-form">
        <a-col :span="8" class="ant-advanced-search-form">
          <a-form-model :layout="Inline">
            <a-form-model-item label="用户ID">
              <a-input style="width: 60%"></a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary">查询</a-button>
            </a-form-model-item>
          </a-form-model>
        </a-col>
        <a-col :span="8" class="ant-advanced-search-form">
          <a-form-model>
            <a-form-model-item label="用户ID">
              <a-input></a-input>
            </a-form-model-item>
          </a-form-model>
          <a-form-model>
            <a-form-model-item label="用户ID">
              <a-input></a-input>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
      <p></p>
      <a-row><h1>销售小程序账号</h1></a-row>
      <a-row type="flex" justify="space-around" class="ant-advanced-search-form">
        <a-col :span="8" class="ant-advanced-search-form">
          <a-form-model :layout="inline">
            <a-form-model-item label="用户ID">
              <a-input style="width: 40%"></a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary">查询</a-button>
            </a-form-model-item>
          </a-form-model>
        </a-col>
        <a-col :span="8" class="ant-advanced-search-form">
          <a-form-model>
            <a-form-model-item label="用户ID">
              <a-input></a-input>
            </a-form-model-item>
          </a-form-model>
          <a-form-model>
            <a-form-model-item label="用户ID">
              <a-input></a-input>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>

<script>
export default {
  name: "UserTools"
}
</script>

<style>
.ant-advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}

#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>