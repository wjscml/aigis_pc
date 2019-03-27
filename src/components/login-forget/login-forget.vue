<template>
<div class="login-wrapper">
  <div class="tips-wrapper" v-show="registerTips" ref="tipsWrapper" :class="{'correct': isCorrect}">
    <p class="tips">{{registerTips}}</p>
  </div>
  <div class="input-wrapper" :class="{'error': errors.has('username')}">
    <input v-model="tel" v-validate="'required|numeric|length:11'" name="username" type="text" placeholder="手机号">
    <span class="common-error-tips" v-show="errors.has('username')">{{errors.first('username')}}</span>
  </div>

  <div class="input-wrapper" :class="{'error': errors.has('imgcode')}">
      <input v-model="code" v-validate="'required|alpha|length:4'" name="imgcode" type="text" placeholder="图片验证码" ref="codeWrapper">
      <span class="common-error-tips" v-show="errors.has('imgcode')">{{errors.first('imgcode')}}</span>
      <img class="imgCode" :src="captchaImage" @click="refreshCode">
  </div>

  <div class="input-wrapper" :class="{'error': errors.has('code')}">
    <input v-model="mobileCode" v-validate="'required|numeric|length:4'" name="code" type="text" placeholder="短信验证码">
    <span class="common-error-tips" v-show="errors.has('code')">{{errors.first('code')}}</span>
    <div class="text send-code" v-show="!isSendCode && !isClick" @click="_getMobileCode">{{sendText}}</div>
    <div class="text" v-show="isClick"><img class="loading" src="~common/image/eclipse.gif" alt=""></div>
    <div class="text" v-show="isSendCode">{{count}}s</div>
  </div>

  <div class="input-wrapper" :class="{'error': errors.has('password')}">
    <input v-model="password" v-validate="'required|min:6|max:18'" name="password" type="password" placeholder="请输入密码" @keyup.enter="register">
    <span class="common-error-tips" v-show="errors.has('password')">{{errors.first('password')}}</span>
  </div>

  <div class="submit-upper">
    <span @click="loginPsw">密码登录</span>
    <span @click="loginMob">短信验证码登录</span>
  </div>
  <div class="submit-btn" @click="register"><span>重置密码</span></div>
</div>
</template>

<script>
import { getMobileCode, getCaptcha, getForget } from 'api'
import { mapActions } from 'vuex'

const TIME_COUNT = 60
export default {
  data () {
    return {
      registerTips: '',
      tel: '',
      code: '',
      mobileCode: '',
      password: '',
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
    ...mapActions([
      'saveUserInfo'
    ]),
    loginPsw () {
      this.$emit('loginPsw')
    },
    loginMob () {
      this.$emit('loginMob')
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
      getForget(registerParam).then(res => {
        if (!res.errorMessage) {
          this.saveUserInfo(res)
          this.isCorrect = true
          this.registerTips = '密码修改成功！'
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
        usage: 3
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
  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>

</style>
