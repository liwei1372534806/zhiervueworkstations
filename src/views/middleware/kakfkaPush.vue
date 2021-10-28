<template>
  <page-header-wrapper>
    <div id="components-form-demo-advanced-search">
      <a-row type="flex" justify="space-around">
        <a-col :span="10" class="ant-advanced-search-form">
          <a-popover title="提醒">
            <template slot="content">
              <p style="color: red">*该功能只是验证push和三方的发送接口</p>
              <p style="color: red">*请确认手机号已经加入到白名单</p>
            </template>
            <h1>发送行业&营销短信</h1></a-popover>
          <p></p>
          <a-form-model :model="marketform" :rules="marketrules">
            <a-form-model-item label="环境：" prop="ENV">
              <a-radio-group v-model="marketform.ENV" default-value="t" button-style="solid">
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
            </a-form-model-item>
            <p></p>
            <a-form-model-item label="手机号：" prop="telephones">
              <a-input v-model="marketform.telephones" placeholder="多个手机号英文逗号隔开" style="width:300px">手机号</a-input>
            </a-form-model-item>
            <p></p>
            <a-form-model-item style="right: auto">
              <a-button type="primary" @click="marketSubmit">发送</a-button>
            </a-form-model-item>
          </a-form-model>
        </a-col>
        <a-col :span="10" class="ant-advanced-search-form">
          <a-popover title="提醒">
            <template slot="content">
              <p style="color: red">*该功能只是验证push和三方的发送接口</p>
              <p style="color: red">*请确认手机号已经加入到白名单</p></template>
            <h1>发送一知语音短信（议价提醒、寄卖提醒）</h1></a-popover>
          <p></p>
          <a-form-model :model="aiform" :rules="airules">
            <a-form-model-item label="环境：" prop="ENV">
              <a-radio-group v-model="aiform.ENV" default-value="t" button-style="solid">
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
            </a-form-model-item>
            <p></p>
            <a-form-model-item label="短信类型：" prop="ai_type">
              <a-select
                placeholder="请选择短信类型"
                v-model="aiform.ai_type"
                :options="data_list"
                style="width: 200px;"
              ></a-select>
            </a-form-model-item>
            <a-form-model-item label="手机号：" prop="telephones">
              <a-input v-model="aiform.telephones" placeholder="多个手机号英文逗号隔开" style="width:300px">手机号</a-input>
            </a-form-model-item>
            <p></p>
            <a-form-model-item>
              <a-button type="primary" @click="aiSubmit">发送</a-button>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>

<script>
import {pushMessage} from '@/api/kafka'

const data_list = [{'value': 0, 'label': '议价提醒'}, {'value': 1, 'label': '寄卖提醒'}]
export default {
  name: 'kafkaPush',
  data() {
    return {
      marketform: {ENV: 't', 'telephones': '','type':0},
      marketrules: {
        ENV: [{required: true, message: "请选择环境", trigger: 'change'}],
        telephones: [{required: true, message: "请输入有效的手机号", trigger: "change"}]
      },
      aiform: {ENV: 't', 'telephones': '', ai_type: '','type':1},
      airules: {
        ENV: [{required: true, message: "请选择环境", trigger: 'change'}],
        ai_type: [{required: true, message: "请选择短信类型", trigger: 'change'}],
        telephones: [{required: true, message: "请输入有效的手机号", trigger: "change"}]
      },
      data_list
    }
  },
  created() {
    this.aiform.ai_type = data_list[0].value
  },
  methods: {
    marketSubmit() {
      pushMessage(this.marketform).then(res => {
        if (res.code === 20000) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })

    },
    aiSubmit() {
      pushMessage(this.aiform).then(res => {
        if (res.code === 20000) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
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
</style>