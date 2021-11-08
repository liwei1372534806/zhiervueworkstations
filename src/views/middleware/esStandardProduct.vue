<template>
  <page-header-wrapper>
    <div id="components-form-demo-advanced-search">
      <a-form-model ref="standardForm" :model="standardForm" class="ant-advanced-search-form">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-model-item label="索引别名：">
              <a-select
                v-model="standardForm.es_index"
                show-search
                placeholder="请选择别名"
                :options="options"></a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="一级品类ID：" prop="prod_type">
              <a-input placeholder="请输入一级品类ID " style="width: 60%" v-model="standardForm.prod_type"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="二级品类ID：" prop="prod_category">
              <a-input placeholder="请输入二级品类ID" style="width: 60%" v-model="standardForm.prod_category"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-model-item label="成色ID：" prop="prod_degree">
              <a-input placeholder="请输入成色ID" style="width: 60%" v-model="standardForm.prod_degree"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="系列ID：" prop="series_id">
              <a-input placeholder="请输入系列ID" style="width: 60%" v-model="standardForm.series_id"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="尺码：" prop="yard_name">
              <a-input placeholder="请输入尺码名称" style="width: 60%" v-model="standardForm.yard_name"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" @click="handleSubmit">
              查询
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset('standardForm')">
              重置
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
      <div class="search-result-list">
        <a-table
          :loading="loading"
          :rowKey="record=>record.id"
          :columns="columns"
          :data-source="data_list"
          :scroll="{ x: 1500, y: 500 }"
          style="word-break: break-all"
          bordered>
        </a-table>
      </div>
    </div>

  </page-header-wrapper>
</template>

<script>

import {getEsStandardData} from '@/api/es'

export default {
  name: 'esStandardProduct',
  data() {
    return {
      options: [{'title': "标品库(series_price_data)", 'value': "series_price_data"}],
      standardForm: {
        'es_index': "",
        'prod_type': "",
        'prod_category': "",
        'prod_degree': "",
        "series_id": "",
        'yard_name': ""
      },
      data_list: [],
      columns: [],
      loading: false

    }
  },
  created() {
    this.standardForm.es_index = this.options[0].value
  },
  methods: {
    handleSubmit() {
      getEsStandardData(this.standardForm).then(res => {
        this.loading = true
        if (res.code === 20000) {
          this.data_list = res.data
          const firstData = res.data[0] || {};
          this.columns = Object.keys(firstData).map((item)=>({
            title: item,
            dataIndex: item,
            key: item,
            width:200
          }))
          this.loading = false
        }
      })
      this.loading = false
    },
    handleReset(formName) {
      this.$refs[formName].resetFields();
    }
  }
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