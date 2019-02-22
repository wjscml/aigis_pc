<template>
<div class="login-wrapper">
  <div class="tips-wrapper" v-show="registerTips" ref="tipsWrapper" :class="{'correct': isCorrect}">
    <p class="tips">{{registerTips}}</p>
  </div>
  <div class="input-wrapper">
    <input v-model="tel" v-validate="'required|numeric|length:11'" name="username" type="text" placeholder="手机号">
    <span class="common-error-tips" v-show="errors.has('username')">{{errors.first('username')}}</span>
  </div>

  <div class="input-wrapper">
      <input v-model="code" v-validate="'required|alpha|length:4'" name="imgcode" type="text" placeholder="图片验证码" ref="codeWrapper">
      <span class="common-error-tips" v-show="errors.has('imgcode')">{{errors.first('imgcode')}}</span>
      <img class="imgCode" :src="captchaImage" @click="refreshCode">
  </div>

  <div class="input-wrapper">
    <input v-model="password" v-validate="'required'" name="password" type="password" placeholder="短信验证码">
    <span class="common-error-tips" v-show="errors.has('password')">{{errors.first('password')}}</span>
    <div class="text send-code" v-show="!isSendCode && !isClick" @click="_getMobileCode">{{sendText}}</div>
    <div class="text" v-show="isClick"></div>
    <div class="text" v-show="isSendCode">{{count}}s</div>
  </div>

  <div class="submit-upper">
    <span @click="change">密码登录</span>
    <span>忘记密码</span>
  </div>
  <div class="submit-btn" @click="register"><span>登录</span></div>
</div>
</template>

<script>
import { getMobileCode, getCaptcha } from 'api'

const TIME_COUNT = 60
export default {
  data () {
    return {
      registerTips: '',
      tel: '',
      password: '',
      code: '',
      mobileCode: '',
      isTel: null,
      isPsw: null,
      isCode: null,
      isMobileCode: null,
      captchaImage: '',
      isClick: false,
      isSendCode: false,
      isCorrect: null,
      sendText: '发送验证码',
      count: ''
    }
  },
  created () {
    this.getCode()
  },
  methods: {
    change () {
      this.$emit('change')
    },
    register () {
      this.$validator.validate().then(res => {
        this.registerTips = ''
        if (res) {
          this.toRegister()
        }
      })
    },
    toRegister () {
      let registerParam = {
        captchaCodeKey: this.captchaCodeKey,
        captchaCode: this.code,
        mobileNumber: this.tel,
        mobileCode: this.mobileCode,
        password: this.password
      }
      getRegister (registerParam).then(res => {
        if (!res.errorMessage) {
          this.saveUserInfo(res)
          this.isCorrect = true
          this.registerTips = '成功注册！'
          this.$router.push({ path: '/index' })
        } else {
          this.registerTips = res.errorMessage
          this.isCorrect = false
        }
      })
    },
    getCode () {
      getCaptcha().then(res => {
        this.captchaImage = res.captchaImage
        this.captchaCodeKey = res.captchaCodeKey
      })
    },
    refreshCode () {
      this.getCode()
    },
    _getMobileCode () {
      this.isClick = true
      let params = {
        captchaCodeKey: this.captchaCodeKey,
        captchaCode: this.code,
        mobileNumber: this.tel,
        usage: 2
      }
      getMobileCode(params).then(res => {
        this.isClick = false
        if (!res) {
          this.isSendCode = true
          this.registerTips = '验证码发送成功！'
          this.isCorrect = true
          if (!this.timer) {
            this.count = TIME_COUNT
            this.isSendCode = true
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.isSendCode = false
                clearInterval(this.timer)
                this.timer = null
                this.sendText = '重新发送'
              }
            }, 1000)
          }
        } else {
          this.registerTips = res.errorMessage
          this.isCorrect = false
          this.refreshCode()
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.text
  padding-left 14px
  color: $color-white
  &.send-code
    cursor: pointer
    &:hover
      color $color-light-blue
</style>
