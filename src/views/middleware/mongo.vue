<template>
  <page-header-wrapper>
    <div id="components-form-demo-advanced-search">
      <a-row class="ant-advanced-search-form">
        <a-col :span=10>
          数据库：
          <a-cascader
            placeholder="请选择数据库及表"
            v-model="data_list"
            :options="options"
            style="width: 80%"></a-cascader>
        </a-col>
        <a-col :span="2" :style="{ textAlign: 'right' }">
          <a-button type="primary" @click="handleSearch">
            查询
          </a-button>
        </a-col>
      </a-row>
      <!--      </a-form>-->
      <div class="search-result-list">
        <a-table
          :loading="loading"
          :rowKey="record=>record.message_id"
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1500, y: 500 }"
          bordered>
          <!--          <a slot="name" slot-scope="text">{{ text }}</a>-->
        </a-table>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>

import { getOptions, getMongoList } from '@/api/mongo'

const columns = [
  // {
  //   title: '_class',
  //   dataIndex: '_class',
  //   key: '_class',
  //   scopedSlots: { customRender: '_class' },
  // },
  // {
  //   title: 'version',
  //   dataIndex: 'version',
  //   key: 'version',
  // },
  {
    title: 'message_id',
    dataIndex: 'message_id',
    key: 'message_id'
  },
  {
    title: 'timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp'
  },
  {
    title: 'message_type',
    dataIndex: 'message_type',
    key: 'message_type'
  },
  {
    title: 'scene_id',
    dataIndex: 'scene_id',
    key: 'scene_id'
  },
  {
    title: 'comment_content',
    dataIndex: 'comment_content',
    key: 'comment_content'
  },
  {
    title: 'comment_type',
    dataIndex: 'comment_type',
    key: 'comment_type'
  },
  {
    title: 'member_level',
    dataIndex: 'member_level',
    key: 'member_level'
  },
  {
    title: 'nick_name',
    dataIndex: 'nick_name',
    key: 'nick_name'
  },
  {
    title: 'member_id',
    dataIndex: 'member_id',
    key: 'member_id'
    // ellipsis: true,
  }
]
const data = []
export default {
  name: 'mongo',
  data() {
    return {
      data,
      columns,
      options: [],
      data_list: [],
      loading: false
    }
  },
  created() {
    getOptions().then(res => {
      this.options = res.data

    })
  },
  methods: {
    handleSearch() {
      if (this.data_list) {
        this.loading = true
        getMongoList({ data_base: this.data_list[0], table_name: this.data_list[1] }).then(res => {
          this.data = res.data
          this.loading = false
        })

      }
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