<template>
  <page-header-wrapper>
    <div id="components-form-demo-advanced-search">
      <!--      <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">-->
      <div class="ant-advanced-search-form">
        <a-row>
          <a-col :span="10">
            环境：
            <a-radio-group v-model="ENV" default-value="t_" button-style="solid">
              <a-radio-button value="t_">
                T
              </a-radio-button>
              <a-radio-button value="lemonade_">
                lemonade
              </a-radio-button>
              <a-radio-button value="newjava_">
                newjava
              </a-radio-button>
              <a-radio-button value="pressure_">
                pressure
              </a-radio-button>
              <a-radio-button value="beta2_">
                beta2
              </a-radio-button>
              <a-radio-button value="">
                无环境
              </a-radio-button>
            </a-radio-group>
          </a-col>
          <a-col :span="8">
            redis-key：
            <a-input style="width:80%" v-model="key" placeholder="redis-key(可模糊输入)"></a-input>
          </a-col>
          <a-col :span="2" :style="{ textAlign: 'right' }">
            <a-button type="primary" @click="handleSearch">
              查询
            </a-button>
          </a-col>
        </a-row>
        <!--        <a-row style="margin-top: 20px">-->
        <!--          <a-col :span="20" :style="{ textAlign: 'left' }">-->
        <!--            <a-button type="primary">-->
        <!--              批量删除-->
        <!--            </a-button>-->
        <!--          </a-col>-->
        <!--        </a-row>-->
      </div>
      <!--      </a-form>-->
      <div class="search-result-list">
        <a-table
          :rowKey="record=>record.key"
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1500, y: 500 }"
          :loading="loading"
          bordered>
          <a-tooltip slot="toolTips" title="text"></a-tooltip>
          <a-button
            slot="action"
            :disabled="record.operation===0"
            slot-scope="text,record"
            @click="handleDelete(record.key)"
            type="danger">删除
          </a-button>
        </a-table>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import { getlist, deleteKey } from '@/api/redis'

const columns = [
  {
    title: 'redis_key',
    dataIndex: 'key',
    width: '25%'
  },
  {
    title: 'redis_value',
    dataIndex: 'value',
    width: '50%',
    ellipsis: true,
    slot: { filterIcon: 'toolTips' }
  },
  {
    title: 'ttl(小时)',
    dataIndex: 'ttl'
    // width: '10%'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
export default {
  name: 'redis',
  data() {
    return {
      ENV: 't_',
      key: '',
      data,
      columns,
      loading: false
    }
  },
  // computed: {
  //   count() {
  //     return this.expand ? 11 : 7
  //   }
  // },
  // updated() {
  //   console.log('updated')
  // },
  methods: {
    handleSearch() {
      this.loading = true
      getlist({ ENV: this.ENV, key: this.key }).then(
        res => {
          this.data = res.data
          this.loading = false
        }
      )
    },
    handleDelete(key) {
      deleteKey({ key: key }).then(res => {
          if (res.code === 20000) {
            this.$message.success('删除成功！')
            this.handleSearch()
          } else {
            this.$message.info('执行失败！')
          }
        }
      )
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