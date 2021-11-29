<template>
  <page-header-wrapper>
    <div id='components-form-demo-advanced-search'>
      <a-row>
        <a-space :size='8'>
          <a-button type='primary' @click='handleSearch'>查询</a-button>
          <a-button type='primary' @click='handleCreate'>获取报告</a-button>
        </a-space>
      </a-row>
      <a-row class='search-result-list'>
        <a-table :loading='loading'
                 :rowKey='record=>record.url'
                 :columns='columns'
                 :data-source='data'
                 :scroll='{ x: 1500, y: 500 }'
                 bordered>
          <a
            slot='action'
            :disabled='record.operation===0'
            :href='record.url'
            target='_blank'
            slot-scope='text,record'
            type='danger'>查看
          </a>
        </a-table>
      </a-row>
    </div>
  </page-header-wrapper>

</template>

<script>
import { getReport, createReport } from '@/api/jmeter'

const columns = [{
  title: '报告地址',
  dataIndex: 'url',
  key: 'url',
  width: '70%'
},
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'action' },
    width: '20%'
  }]
export default {
  name: 'JmeterReport',
  data() {
    return {
      loading: false,
      data: [],
      columns
    }

  },
  methods: {
    handleSearch() {
      this.loading = true
      getReport().then(res => {
        if (res.code === 20000) {
          this.data = res.data
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false
      })
    },
    handleCreate() {
      this.loading = true
      createReport().then(res => {
        this.data = res.data
        this.loading = false
      })
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