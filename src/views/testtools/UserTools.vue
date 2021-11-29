<template>
  <page-header-wrapper>
    <div id="components-form-demo-advanced-search">
      测试打开本地文件：
      <iframe src="public/rep2/rep004/index.html"></iframe>
      <a-collapse v-model="activeKey">
        <a-collapse-panel key="1" header="只二APP用户">
          <div class="ant-advanced-search-form">
            <a-form-model :model="appUserForm" :rules="appUserRules" @submit="queryUser" @submit.native.prevent
                          :layout="'inline'">
              <a-form-model-item label="环境：">
                <a-radio-group v-model="appUserForm.env" default-value="t" button-style="solid">
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
              <a-form-model-item label="用户ID/手机号" prop="user_account">
                <a-input style="width: 20%" v-model="appUserForm.user_account"></a-input>
              </a-form-model-item>
              <a-form-model-item>
                <a-button type="primary" html-type="submit">查询</a-button>
              </a-form-model-item>
            </a-form-model>
            <a-descriptions
              title="用户信息详情" bordred
              :size="size"
              class="search-result-list">
              <a-descriptions-item label="用户ID：">{{ this.data }}</a-descriptions-item>
              <a-descriptions-item label="用户名称：">{{this.data}}}</a-descriptions-item>
              <a-descriptions-item label="用户手机号：">{{this.data}}}</a-descriptions-item>
              <a-descriptions-item label="用户性别：">{{this.data}}}</a-descriptions-item>
              <a-descriptions-item label="用户昵称：">{{this.data}}}</a-descriptions-item>
              <a-descriptions-item label="用户邮箱：">{{this.data}}}</a-descriptions-item>
              <a-descriptions-item label="用户注册区域：">{{this.data}}}</a-descriptions-item>
              <a-descriptions-item label="用户个人图片：">{{this.data}}}</a-descriptions-item>
              <a-descriptions-item label="用户生日：">{{this.data}}}</a-descriptions-item>
              <a-descriptions-item label="用户简介：">{{this.data}}}</a-descriptions-item>
              <a-descriptions-item label="用户业务标签：">{{this.data}}}</a-descriptions-item>
              <a-descriptions-item label="用户标：">{{this.data}}}</a-descriptions-item>
            </a-descriptions>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="商家APP&商家小程序账号">
          <a-row type="flex" justify="space-around">
            <a-col :span="8" class="ant-advanced-search-form">
              <a-form-model>
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
        </a-collapse-panel>
        <a-collapse-panel key="3" header="BD小程序账号">
          <a-row type="flex" justify="space-around">
            <a-col :span="8" class="ant-advanced-search-form">
              <a-form-model>
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
        </a-collapse-panel>
        <a-collapse-panel key="4" header="销售小程序账号">
          <a-row type="flex" justify="space-around">
            <a-col :span="8" class="ant-advanced-search-form">
              <a-form-model>
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
        </a-collapse-panel>
      </a-collapse>
    </div>
  </page-header-wrapper>
</template>

<script>
import {getAppUser, updateAppUser} from '@/api/user_tools'

export default {
  name: "UserTools",
  data() {
    return {
      size:'small',
      activeKey: ['1'],
      columns: [],
      data: [],
      appUserForm: {"env": "t", 'user_account': ''},
      appUserRules: {user_account: [{required: true, message: "请输入手机号或用户ID", trigger: 'blur'}]}

    }
  },
  methods: {
    queryUser() {
      getAppUser(this.appUserForm).then(
        res => {
          const firstData = res.data[0] || {};
          this.columns = Object.keys(firstData).map((item) => ({
            title: item,
            dataIndex: item,
            key: item
          }))
          this.data = res.data
        }
      )

    },
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