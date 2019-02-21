<template>
<div class="login-wrapper">
  <div class="input-wrapper">
    <input v-model="tel" v-validate="'required|numeric|length:11'" name="username" type="text" placeholder="手机号">
    <span class="common-error-tips" v-show="errors.has('username')">{{errors.first('username')}}</span>
  </div>
  <div class="input-wrapper">
    <input v-model="password" v-validate="'required'" name="password" type="password" placeholder="密码">
    <span class="common-error-tips" v-show="errors.has('password')">{{errors.first('password')}}</span>
  </div>
  <div class="submit-upper">
    <span @click="change">手机验证码登录</span>
    <span>忘记密码</span>
  </div>
  <div class="submit-btn" @click="login"><span>登录</span></div>
</div>
</template>

<script>
import { getLogin } from 'api'

export default {
  data () {
    return {
      tel: '',
      password: '',
      loginTips: '',
      fromUrl: ''
    }
  },
  methods: {
    change () {
      this.$emit('change')
    },
    login () {
      this.$validator.validateAll().then(res => {
        this.loginTips = ''
        if (res) {
          let loginParam = {
            mobileNumber: this.tel,
            password: this.password
          }
          getLogin(loginParam).then(res => {
            console.log(res)
            if (res.errorMessage === '') {
              this.saveUserInfo(res.data)
              this.$refs.tipsWrapper.style['background-color'] = '#04be02'
              this.loginTips = '成功登录！'
              if (this.fromUrl === '/') {
                this.$router.push({ path: '/index' })
                return false
              } else {
                this.$router.back()
              }
            } else {
              this.loginTips = res.errorMessage
            }
          })
        }
      })
    },

  }
}
</script>

<style>

</style>
