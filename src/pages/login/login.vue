<template>
  <div class="flex-container" id="login" :style="{height: screenHeight+'px'}">
    <div class="canvaszz" :style="{height: screenHeight+'px'}"></div>
    <canvas id="canvas" :style="{height: screenHeight+'px'}"></canvas>
    <div class="login-main">
      <div class="login-top">
        <div class="logo"><i class="icon-logo"></i></div>
        <h1 class="name">埃癸斯风险管理系统</h1>
      </div>
      <login-password v-if="loginType==0" @change="changeType" @forget="toForget"></login-password>
      <login-mobilecode v-if="loginType==1" @change="changeType" @forget="toForget"></login-mobilecode>
      <login-forget v-if="loginType==2" @loginPsw="loginPsw" @loginMob="loginMob"></login-forget>
      <p class="copyright">©2018 aigis.leadfintech   京ICP备12019798号</p>
    </div>

  </div>
</template>

<script>
import LoginPassword from 'components/login-password/login-password.vue'
import LoginMobilecode from 'components/login-mobilecode/login-mobilecode.vue'
import LoginForget from 'components/login-forget/login-forget.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      loginType: 0,
      screenHeight: window.innerHeight
    }
  },
  watch: {
    'screenHeight': function (val) {
      var oIframe = document.getElementById('login')
      oIframe.style.height = Number(val) + 'px'
    }
  },
  mounted () {
    var _this = this
    window.onresize = function () { // 定义窗口大小变更通知事件
      _this.screenHeight = document.documentElement.clientHeight
    }
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')
    var w = canvas.width = window.innerWidth
    var h = canvas.height = window.innerHeight
    var hue = 217
    var stars = []
    var count = 0
    var maxStars = 1300 // 星星数量

    var canvas2 = document.createElement('canvas')
    var ctx2 = canvas2.getContext('2d')
    canvas2.width = 100
    canvas2.height = 100
    var half = canvas2.width / 2
    var gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)
    gradient2.addColorStop(0.025, '#CCC')
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
    gradient2.addColorStop(1, 'transparent')

    ctx2.fillStyle = gradient2
    ctx2.beginPath()
    ctx2.arc(half, half, half, 0, Math.PI * 2)
    ctx2.fill()

    function random (min, max) {
      if (arguments.length < 2) {
        max = min
        min = 0
      }

      if (min > max) {
        var hold = max
        max = min
        min = hold
      }

      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    function maxOrbit (x, y) {
      var max = Math.max(x, y)
      var diameter = Math.round(Math.sqrt(max * max + max * max))
      return diameter / 2 // 星星移动范围，值越大范围越小
    }

    var Star = function () {
      this.orbitRadius = random(maxOrbit(w, h))
      this.radius = random(60, this.orbitRadius) / 8 // 星星大小
      this.orbitX = w / 2
      this.orbitY = h / 2
      this.timePassed = random(0, maxStars)
      this.speed = random(this.orbitRadius) / 50000 // 星星移动速度
      this.alpha = random(2, 10) / 10

      count++
      stars[count] = this
    }

    Star.prototype.draw = function () {
      var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX
      var y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY
      var twinkle = random(10)

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05
      }

      ctx.globalAlpha = this.alpha
      ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius)
      this.timePassed += this.speed
    }

    for (var i = 0; i < maxStars; i++) {
      /* eslint-disable no-new */
      new Star()
    }

    function animation () {
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 0.5 // 尾巴
      ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)'
      ctx.fillRect(0, 0, w, h)

      ctx.globalCompositeOperation = 'lighter'
      for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw()
      }

      window.requestAnimationFrame(animation)
    }

    animation()
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    if (this.userInfo && this.userInfo.length !== 0) {
      this.$router.push({ path: '/index' })
    }
  },
  methods: {
    changeType () {
      if (this.loginType === 0) {
        this.loginType = 1
      } else if (this.loginType === 1) {
        this.loginType = 0
      }
    },
    loginPsw () {
      this.loginType = 0
    },
    loginMob () {
      this.loginType = 1
    },
    toForget () {
      this.loginType = 2
    },
    addClass (val) {
      document.getElementById(val).style.color = 'black'
      // document.getElementById('register').style.color = 'black'
    },
    deleteClass (val) {
      document.getElementById(val).style.color = ''
    }
  },
  components: {
    LoginMobilecode,
    LoginPassword,
    LoginForget
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
.flex-container
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  canvas
    width 100%
    height: auto
    display: inline-block
    vertical-align: baseline
    position: absolute
    z-index: -1
  .canvaszz
    width: 100%
    background: url(./bj.jpg) no-repeat center
    // height: 640px
    position: absolute
    z-index: 10
    filter: opacity(40%)
    opacity: 0.4
  .login-main
    display flex
    flex-direction column
    position absolute
    left 50%
    top 0
    bottom 0
    z-index: 11
    width 450px
    margin-left -225px
    text-align center
    .login-top
      margin 100px 0
      color $color-white
      .logo
        margin-bottom 18px
        .icon-logo
          font-size 80px
      .name
        line-height 18px
        font-size 18px
    .login-wrapper
      flex 1
      position relative
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
          bottom -24px
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
        border-radius 4px
        background-color $color-blue
        color $color-white
        cursor pointer
    .copyright
      margin-bottom 40px

</style>
