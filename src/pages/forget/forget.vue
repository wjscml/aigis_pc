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
    <div class="text" v-show="isClick"><img class="loading" src="~common/image/loading.gif" alt=""></div>
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
.login-wrapper
  position relative
  margin 50px 25% 0 25%
  min-width 380px
  .tips-wrapper
    position absolute
    top -50px
    left 0
    line-height 40px
    height 40px
    width 100%
    border-radius 4px
    background-color $color-red
    color $color-white
    &.correct
      background-color $color-green
  .input-wrapper
    position relative
    display flex
    align-items center
    padding 0 30px
    margin-bottom 30px
    height 50px
    border-radius 4px
    background-color $color-light-background
    color $color-white
    &.error
      outline 1px solid $color-red
    input
      flex 1
      background-color $color-light-background
      color $color-white
      caret-color $color-light-blue
      outline none
    .common-error-tips
      position absolute
      left 30px
      bottom -18px
      color $color-red
    .imgCode
      cursor pointer
    .text
      display flex
      align-items center
      padding-left 14px
      color: $color-white
      .loading
        width 24px
        height 24px
      &.send-code
        cursor: pointer
        &:hover
          color $color-light-blue
  .submit-upper
    display flex
    justify-content space-between
    align-items center
    padding 0 30px
    height 40px
    span
      color $color-white
      &:hover
        color $color-light-blue
        cursor pointer
  .submit-btn
    width 100%
    line-height 50px
    height 50px
    font-size 16px
    text-align center
    border-radius 4px
    background-color $color-blue
    color $color-white
    cursor pointer
.copyright
  margin-bottom 40px

</style>
