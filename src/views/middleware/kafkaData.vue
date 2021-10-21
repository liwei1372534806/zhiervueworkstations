<template>
  <page-header-wrapper>
    <div id="components-form-demo-advanced-search">
      <a-row class="ant-advanced-search-form">
        <a-col :span="8">
          环境：
          <a-radio-group v-model="ENV" default-value="t" button-style="solid" @change="changeTopic">
            <a-radio-button value="t">
              T
            </a-radio-button>
            <a-radio-button value="lemonade">
              lemonade
            </a-radio-button>
            <a-radio-button value="newjava">
              newjava
            </a-radio-button>
            <a-radio-button value="pressure">
              pressure
            </a-radio-button>
            <a-radio-button value="beta2">
              beta2
            </a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col :span="10">
          Topic：
          <a-select
            :allowClear="true"
            v-model="value"
            show-search
            placeholder="请选择topic"
            @popupScroll="handlePopupScroll"
            :options="dataZ"
            style="width: 70%"></a-select>
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="handleSearch">
            查询
          </a-button>
        </a-col>
      </a-row>
    </div>
    <div class="search-result-list">
      <a-table
        :loading="loading"
        :rowKey="record=>record.key"
        :columns="columns"
        :data-source="data_list"
        :scroll="{ x: 1500, y: 500 }"
        bordered>
        <!--          <a slot="name" slot-scope="text">{{ text }}</a>-->
      </a-table>
    </div>
  </page-header-wrapper>
</template>

<script>
import {getTopics, getTopicList} from '@/api/kafka'

const columns = [
  {
    title: 'partition',
    dataIndex: 'partition',
    key: 'partition'
  },
  {
    title: 'offset',
    dataIndex: 'offset',
    key: 'offset'
  },
  {
    title: 'key',
    dataIndex: 'key',
    key: 'key'
  },
  {
    title: 'value',
    dataIndex: 'value',
    key: 'value'
  },
  {
    title: 'timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp'
  }
]
export default {
  name: 'kafkaData',
  data() {
    return {
      ENV: 't',
      columns,
      dataZ: [],
      value: '',
      allDataZ: [],
      frontDataZ: [],
      treePageSize: 100,
      scrollPage: 1,
      data_list: [],
      loading: false
    }
  },
  created() {
    getTopics({ENV: this.ENV}).then(
      res => {
        this.allDataZ = res.data
        this.frontDataZ = this.allDataZ.slice(0, 100)
        this.dataZ = this.frontDataZ
      }
    )
  },
  methods: {
    changeTopic() {
      getTopics({ENV: this.ENV}).then(res => {
        this.allDataZ = res.data
        this.frontDataZ = this.allDataZ.slice(0, 100)
        this.dataZ = this.frontDataZ
      })
    },
    handleSearch() {
      this.loading = true
      getTopicList({topic: this.value}).then(res => {
        console.log(res.data)
          this.data_list = res.data
        }
      )
      this.loading = false
    },
    handlePopupScroll(e) {
      const {target} = e
      const scrollHeight = target.scrollHeight - target.scrollTop
      const clientHeight = target.clientHeight
      // 下拉框不下拉的时候
      if (scrollHeight === 0 && clientHeight === 0) {
        this.scrollPage = 1
        console.log(this.scrollPage)
      } else {
        // 当下拉框滚动条到达底部的时候
        if (scrollHeight < clientHeight + 5) {
          this.scrollPage = this.scrollPage + 1
          const scrollPage = this.scrollPage// 获取当前页
          const treePageSize = this.treePageSize * (scrollPage || 1)// 新增数据量
          const newData = [] // 存储新增数据
          let max = '' // max 为能展示的数据的最大条数
          if (this.dataZ.length > treePageSize) {
            // 如果总数据的条数大于需要展示的数据
            max = treePageSize
          } else {
            // 否则
            max = this.dataZ.length
          }
          // 判断是否有搜索
          if (this.valueData) {
            this.allDataZ.forEach((item, index) => {
              if (index < max) { // 当data数组的下标小于max时
                newData.push(item)
              }
            })
          } else {
            this.dataZ.forEach((item, index) => {
              if (index < max) { // 当data数组的下标小于max时
                newData.push(item)
              }
            })
          }

          this.frontDataZ = newData // 将新增的数据赋值到要显示的数组中
        }
      }
    }
  }
}
</script>

<style scoped>
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