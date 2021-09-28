<template>

  <page-header-wrapper>
    <div id="components-form-demo-advanced-search">
      <div class="search-result-list">

        <a-table
          :loading="loading"
          :rowKey="record=>record.job_id"
          :columns="columns"
          :data-source="data_list"
          :scroll="{ x: 1500, y: 500 }"
          bordered>
          <span slot="action" slot-scope="text,record">
            <a-button
              size="small"
              type="primary"
              @click="handleStart()">启动
          </a-button><a-divider type="vertical"/>
          <a-button
            size="small"
            type="danger"
            @click="handleStop()">停止
          </a-button><a-divider type="vertical"/>
          <a-button
            size="small"
            type="primary">编辑
          </a-button><a-divider type="vertical"/>
          <a-button
            size="small"
            type="primary" style="margin-top: 2%"
            @click="handleRemove()">删除
          </a-button><a-divider type="vertical"/>
          </span>

        </a-table>


      </div>
    </div>

  </page-header-wrapper>
</template>

<script>
import {addJob, startJob, stopJob, removeJob, getList} from '@/api/cron'
import {getOptions} from "@/api/es";

const columns = [
  {
    title: '任务ID',
    dataIndex: 'job_id',
    key: 'job_id'
  },
  {
    title: '任务名称',
    dataIndex: 'job_name',
    key: 'job_name'
  },
  {
    title: '任务描述',
    dataIndex: 'job_describe',
    key: 'job_describe'
  },
  {
    title: '任务类型',
    dataIndex: 'job_type',
    key: 'job_type'
  },
  {
    title: '任务执行频率',
    dataIndex: 'job_frequency',
    key: 'job_frequency'
  },
  {
    title: '任务状态',
    dataIndex: 'job_status',
    key: 'job_status'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: {customRender: 'action'}
  }
]
export default {
  name: "CronTab",
  data() {
    return {
      data: [],
      columns,
      data_list: [{
        "job_id": 1,
        'job_name': "test",
        "job_describe": "测试内容",
        "job_type": 1,
        "job_frequency": "test",
        "job_status": 1,
        "operation": 1
      }, {
        "job_id": 1,
        'job_name': "test",
        "job_describe": "测试内容",
        "job_type": 1,
        "job_frequency": "test",
        "job_status": 1,
        "operation": 1
      }],
      loading: false
    }
  },
  created() {
    getOptions().then(res => {

      this.data_list = res.data

    })
  },
  methods: {
    handleStart() {
      startJob().then(res => {
        if (res.code === 20000) {
          this.$message.success('job启动成功~')
        } else {
          this.$message.info('job启动失败！')
        }
      })
    },
    handleStop() {
      stopJob().then(res => {
        if (res.code === 20000) {
          this.$message.success('job停止成功~')
        } else {
          this.$message.info('job停止失败！')
        }
      })
    },
    handleRemove() {
      removeJob().then(res => {
        if (res.code === 20000) {
          this.$message.success('job移除成功~')
        } else {
          this.$message.info('job移除失败！')
        }
      })
    },
    handleAdd() {
      addJob().then(res => {
        if (res.code === 20000) {
          this.$message.success('job添加成功~')
        } else {
          this.$message.info('job添加失败！')
        }
      })
    },
  },

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