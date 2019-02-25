<template>
<div class="login-wrapper">
  <div class="tips-wrapper" v-show="loginTips" ref="tipsWrapper" :class="{'correct': isCorrect}">
    <p class="tips">{{loginTips}}</p>
  </div>
  <div class="input-wrapper" :class="{'error': errors.has('username')}">
    <input v-model="tel" v-validate="'required|numeric|length:11'" name="username" type="text" placeholder="手机号">
    <span class="common-error-tips" v-show="errors.has('username')">{{errors.first('username')}}</span>
  </div>
  <div class="input-wrapper" :class="{'error': errors.has('password')}">
    <input v-model="password" v-validate="'required'" name="password" type="password" placeholder="密码" @keyup.enter="login">
    <span class="common-error-tips" v-show="errors.has('password')">{{errors.first('password')}}</span>
  </div>
  <div class="submit-upper">
    <span @click="change">短信验证码登录</span>
    <span @click="forget">忘记密码</span>
  </div>
  <div class="submit-btn" @click="login"><span>登录</span></div>
</div>
</template>

<script>
import { getLogin } from 'api'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      tel: '',
      password: '',
      loginTips: '',
      isCorrect: ''
    }
  },
  methods: {
    ...mapActions([
      'saveUserInfo'
    ]),
    change () {
      this.$emit('change')
    },
    forget () {
      this.$emit('forget')
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
              this.isCorrect = true
              this.loginTips = '成功登录！'
              this.$router.push({ path: '/index' })
            } else {
              this.isCorrect = false
              this.loginTips = res.errorMessage
            }
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
