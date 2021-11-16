<template>
  <page-header-wrapper>
    <div id="components-form-demo-advanced-search">
      <a-collapse v-model="activeKey">
        <a-collapse-panel key="1" header="只二APP用户">
          <a-row type="flex" justify="space-around">
            <a-col :span="8" class="ant-advanced-search-form">
              <a-form-model :model="appUserForm" :rules="appUserRules" @submit="queryUser" @submit.native.prevent>
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
                  <a-input style="width: 40%" v-model="appUserForm.user_account"></a-input>
                </a-form-model-item>
                <a-form-model-item>
                  <a-button type="primary" html-type="submit">查询</a-button>
                </a-form-model-item>
              </a-form-model>
              <a-table
                :columns="columns"
                :data-source="data"
                class="search-result-list"></a-table>
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
import {getAppUser} from '@/api/user_tools'

export default {
  name: "UserTools",
  data() {
    return {
      activeKey: ['1'],
      columns: [],
      data: [],
      appUserForm: {'user_account': ''},
      appUserRules: {user_account: [{required: true, message: "请输入手机号或用户ID", trigger: 'blur'}]}

    }
  },
  methods: {
    queryUser() {
      getAppUser(this.appUserForm)
      {
        res => {
          console.log(res)
        }
      }
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