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
        <a-row>用户名:
          <a-input v-model="username" style="width: 50%"></a-input>
          <p></p>
        </a-row>
        <a-row>密码:
          <a-input-password v-model="password" style="width: 53%;"></a-input-password>
          <p></p>
        </a-row>
        <a-row>确认密码:
          <a-input-password v-model="confirm_password" style="width: 53%;"></a-input-password>
        </a-row>
      </a-modal>
    </div>
    <div>
      <a-modal v-model="changeVisible" title="修改密码" @ok="handleChangeAccount">
        <a-row>用户名:
          <a-input v-model="userName" style="width: 50%"></a-input>
          <p></p>
        </a-row>
        <a-row>密码:
          <a-input-password v-model="passWord" style="width: 53%;"></a-input-password>
          <p></p>
        </a-row>
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
    changePassword() {
      this.changeVisible = true
    },
    handleClick() {
      login({username: this.username, password: this.password}).then(res => {
        if (res.code === 20000) {
          storage.set('Authorization', 'Bearer ' + res.token)
          this.$router.push('/database/redis')
        }
        if (res.status === 500) {
          this.$message.error(res.msg)
        }
      })
    },
    handleRegister() {
      this.visible = true
    },
    handleChangeAccount() {
      changePassword({user_name: this.userName, password: this.passWord, type: 0}).then(res => {
        if (res.code === 20000) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    registerAccount() {
      register({username: this.username, password: this.password, is_superuser: 0, is_active: 1, is_staff: 1}).then(
        res => {
          if (res.code === 200) {
            this.$message.success('注册成功～')
          }
          if (res.code === 500) {
            this.$message.error('该用户已注册过,请正常登录哟！')
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