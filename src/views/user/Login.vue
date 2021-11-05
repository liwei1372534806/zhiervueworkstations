<template>
  <div>
    <div style="text-align: center">
      <a-row><p></p>
        <a-input size="large" placeholder="请输入账号" v-model="username" style="width:20%"></a-input>
      </a-row>
      <a-row><p></p>
        <a-input-password
          v-model="password"
          size="large"
          placeholder="请输入密码"
          style="width:20%;margin-top: 1%"></a-input-password>
      </a-row>
      <a-row><p></p>
        <a-button size="large" type="primary" style="width: 20%;margin-top: 1%" @click="handleClick">登录</a-button>
      </a-row>
      <p></p>
      <a-row type="flex" justify="center">
        <a-col :span="4"><a @click="handleRegister">注册账号</a></a-col>
        <a-col :span="4" @click="changePassword"><a>忘记密码？</a></a-col>
      </a-row>
    </div>
    <div>
      <a-modal v-model="visible" title="注册账号" @ok="registerAccount">


        <a-form-model ref="ruleForm" :model="registerForm" :rules="registerRules" :layout="'horizontal'" v-bind="{
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
          }">
          <a-form-model-item label="账号：" prop="username">
            <a-input v-model="registerForm.username" placeholder="请输入英文字母组成的账号"></a-input>
          </a-form-model-item>
          <a-form-model-item label="密码：" prop="password">
            <a-input-password v-model="registerForm.password" placeholder="请输入英文字母、数字组成的密码"></a-input-password>
          </a-form-model-item>
          <a-form-model-item label="确认密码：" prop="confirm_password">
            <a-input-password v-model="registerForm.confirm_password" placeholder="请输入英文字母、数字组成的密码"></a-input-password>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
    <div>
      <a-modal v-model="changeVisible" title="修改密码" @ok="handleChangeAccount" @cancel="cancelUpdate">
        <a-form-model ref="updateRuleForm" :model="updateForm" :rules="updateRules" v-bind="{
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
          }">
          <a-form-model-item label="账号:" prop="username">
            <a-input v-model="updateForm.username"></a-input>
          </a-form-model-item>
          <a-form-model-item label="重置密码：" prop="password">
            <a-input-password v-model="updateForm.password" placeholder="请输入英文字母、数字组成的密码"></a-input-password>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
  </div>

</template>

<script>
import {login} from '@/api/login_token'
import {register, changePassword} from '@/api/login'
import storage from 'store'

export default {
  name: 'Login',
  data() {
    return {
      registerForm: {username: '', password: '', is_superuser: 0, is_active: 1, is_staff: 1},
      registerRules: {
        username: [{required: true, message: "请输入账号", trigger: 'change'}],
        password: [{required: true, message: "请输入密码", trigger: 'change'}],
        confirm_password: [{required: true, message: "请输入确认密码", trigger: 'change'}, ({getFieldValue}) => ({
          validator(role, value) {
            if (value !== getFieldValue('password')) {
              console.log(getFieldValue('password'))
              return Promise.reject('两次密码不一致')
            }
            return Promise.resolve();
          }

        })]
      },
      updateForm: {username: '', password: '', type: 0},
      updateRules: {
        username: [{required: true, message: "请输入账号", trigger: 'change'}],
        password: [{required: true, message: "请输入密码", trigger: 'change'}]
      },
      username: '',
      password: '',
      confirm_password: '',
      visible: false,
      userName: '',
      passWord: '',
      changeVisible: false

    }
  },
  methods: {
    cancelUpdate() {
      this.updateForm.username='';
      this.updateForm.password='';
    },
    changePassword() {
      this.changeVisible = true
    },
    handleClick() {
      login({username: this.username, password: this.password}).then(res => {
        if (res.code === 20000) {
          storage.set('Authorization', 'Bearer ' + res.token)
          this.$router.push('/database/redis')
        }
        if (res.code === 500) {
          this.$message.error(res.msg)
        }
      })
    },
    handleRegister() {
      this.visible = true
    },
    handleChangeAccount() {
      changePassword(this.updateForm).then(res => {
        if (res.code === 20000) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    registerAccount() {
      register(this.registerForm).then(
        res => {
          if (res.code === 20000) {
            this.$message.success('注册成功～')
          }
          if (res.code === 20001) {
            this.$message.error(res.msg)
          }
          this.visible = false
        }
      )
    }
  }
}
</script>

<style>

</style>