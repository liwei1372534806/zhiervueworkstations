<template>
  <page-header-wrapper>
    <div id="components-form-demo-advanced-search">
      <!--      <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">-->
      <a-row class="ant-advanced-search-form">
        <a-col :span=10>
          索引别名：
          <a-select
            :allowClear="true"
            v-model="value"
            show-search
            placeholder="请选择别名"
            :options="options"
            style="width: 60%"></a-select>
        </a-col>
        <a-col :span="8">
          用户/商品ID：
          <a-input placeholder="请输入用户/商品ID，多个的以逗号隔开" style="width: 60%"></a-input>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" @click="">
            查询
          </a-button>
        </a-col>
      </a-row>
      <!--      </a-form>-->
      <div class="search-result-list">
        <a-row type="flex" justify="space-around">
          <a-col :span="10">
            ES查询数据:
            <a-textarea autosize="true"></a-textarea>
          </a-col>
          <a-col :span="10">
            mysql查询数据:
            <a-textarea autosize="ture"></a-textarea>
          </a-col>

        </a-row>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>

import { getOptions } from '@/api/es'

export default {
  name: 'esProductSearch',
  data() {
    return {
      options: [],
      value: ''

    }
  },
  created() {
    getOptions().then(res => {
      let alias_list = []
      for (let i = 0; i < res.data.length; i++) {
        alias_list.push({ 'title': res.data[i]['alias_name'], 'value': res.data[i]['alias_name'] })
      }
      this.options = alias_list

    })
  },
  methods: {}
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