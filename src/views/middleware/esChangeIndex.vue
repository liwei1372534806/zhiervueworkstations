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
        <a-col :span="2" :style="{ textAlign: 'left' }">
          <a-button type="primary" @click="handleSearch">
            查询
          </a-button>
        </a-col>
        <a-col :span="1" :style="{ textAlign: 'left' }">
          <a-button type="primary" @click="turnVisible">新增</a-button>
        </a-col>
      </a-row>
      <a-modal v-model="add_visible" title="新增索引" @ok="handleAddAlias">
        <a-row>索引别名:
          <a-input v-model="add_alias_key" style="width: 50%;"></a-input>
          <p></p>
        </a-row>
        <a-row>索引值:
          <a-select
            :allowClear="true"
            v-model="add_index_value"
            show-search
            placeholder="请选择替换值"
            :options="add_index_options"
            size="large"
            style="width: 80%"></a-select>
        </a-row>
      </a-modal>
      <!--      </a-form>-->
      <div class="search-result-list">
        <a-table
          :rowKey="record=>record.alias_name"
          :loading="loading"
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1500, y: 500 }"
          bordered>
          <a-button
            slot="action"
            slot-scope="text,record"
            @click="handleChange(record.alias_name,record.value)"
            type="primary">替换
          </a-button>
        </a-table>
        <div>
          <a-modal v-model="visible" title="替换索引" @ok="handleOk">
            <a-row>索引别名:
              <a-input v-model="alias_key" style="width: 50%" :disabled="true"></a-input>
              <p></p>
            </a-row>
            <a-row>索引值:
              <a-input v-model="alias_value" style="width: 80%;" :disabled="true"></a-input>
              <p></p>
            </a-row>
            <a-row>替换值:
              <a-select
                v-model="index_value"
                show-search
                placeholder="请选择替换值"
                :options="index_options"
                size="large"
                style="width: 80%"></a-select>
            </a-row>
          </a-modal>
        </div>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>

import { getOptions, getEslist, getEsIndexList, changeIndex } from '@/api/es'

const columns = [
  {
    title: '索引别名',
    dataIndex: 'alias_name',
    key: 'alias_name'
  },
  {
    title: '索引值',
    dataIndex: 'value',
    key: 'value'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'action' }
  }
]
const data = []
export default {
  name: 'esChangeIndex',
  data() {
    return {
      data,
      columns,
      options: [],
      data_list: [],
      loading: false,
      value: '',
      visible: false,
      index_value: '',
      index_options: [],
      alias_key: '',
      alias_value: '',
      add_visible: false,
      add_index_value: '',
      add_alias_key: '',
      add_index_options: []

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
  methods: {
    turnVisible() {
      this.add_visible = true
      getEsIndexList().then(
        res => {
          this.add_index_options = res.data
        }
      )
    },
    handleAddAlias() {
      changeIndex({
        remove_index: '',
        add_index: this.add_index_value,
        alias_name: this.add_alias_key,
        type: 1
      }).then(res => {
        if (res.code === 20000) {
          this.$message.success('索引增加成功~')
          this.add_visible = false
          this.handleSearch()
        } else {
          this.$message.error('索引增加失败!')
        }
      })
    },
    handleSearch() {
      if (this.data_list) {
        this.loading = true
        // 三目运算符 如果this.value为true，则 alias_name = this.value 否则 alias_name =undefined
        const alias_name = this.value ? this.value : undefined
        getEslist({ alias_name }).then(res => {
          this.data = res.data
        })
        this.loading = false
      }
    },
    handleChange(key, value) {
      this.visible = true
      this.alias_key = key
      this.alias_value = value
      getEsIndexList({ key }).then(
        res => {
          this.index_options = res.data
        }
      )
    },
    handleOk() {
      changeIndex({
        remove_index: this.alias_value,
        add_index: this.index_value,
        alias_name: this.alias_key,
        type: 2
      }).then(
        res => {
          if (res.code === 20000) {
            this.$message.success('索引替换成功~')
            this.visible = false
            this.handleSearch()
          } else {
            this.$message.error('索引替换失败!')
          }

        }
      )
    }
  }
}
</script>
<style>s
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