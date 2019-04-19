<template>
  <div class="aigis">
    <div class="top-wrapper">
      <div v-if="isIndex">
        <scroll-markets></scroll-markets>
      </div>
      <div class="top-content">
        <router-link to="/index" tag="div" class="logo">
          <i class="icon-logo"></i>
        </router-link>
        <div class="search-box-wrapper">
          <search-box ref="searchBox" @query="onQueryChange"></search-box>
        </div>
        <div class="user-box-wrapper">

          <img class="avatar" :src="avatar" alt="avatar">
          <span class="name">{{nickname}}</span>
          <div class="user-pulldown">
            <ul>
              <router-link to="/forget" tag="li">修改密码</router-link>
              <li @click="showConfirm">退出登录</li>
            </ul>
            <div class="pulldown-bg"></div>
          </div>
        </div>

      </div>
    </div>
    <div class="nav-wrapper">
      <router-link tag="div" class="nav" active-class="nav-s" :to="item.url" v-for="(item, index) in nav" :key="index">
        <div class="navBtn">
          <i :class="`icon icon-${item.name}`"></i>
          <span class="title">{{item.title}}</span>
        </div>
      </router-link>
    </div>
    <p class="copyright">©2018 aigis.leadfintech<br>京ICP备12019798号</p>
    <div class="main-wrapper" :class="{'main-wrapper-index': isIndex}">
      <router-view></router-view>
    </div>
    <confirm @confirm="logout" text="确定要退出登陆吗 ？" ref="confirm"></confirm>
  </div>
</template>
<script>
import Confirm from 'components/confirm/confirm'
import SearchBox from 'base/search-box/search-box'
import ScrollMarkets from 'components/scroll-markets/scroll-markets'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'aigis',
  data () {
    return {
      nav: [
        {
          name: 'index',
          title: '首页',
          url: '/index'
        },
        {
          name: 'algorithm',
          title: '精选策略',
          url: '/algorithm'
        },
        {
          name: 'report',
          title: '市场报告',
          url: '/report'
        },
        {
          name: 'market',
          title: '行情数据',
          url: '/market'
        },
        {
          name: 'vip_report',
          title: '专享报告',
          url: '/vip_report'
        },
        {
          name: 'vip_follow',
          title: '跟单指引',
          url: '/vip_follow'
        },
        {
          name: 'vip_value',
          title: '委托资管',
          url: '/vip_value'
        },
        {
          name: 'vip_qusetion',
          title: '问题咨询',
          url: '/vip_qusetion'
        }
      ],
      query: ''
    }
  },
  props: {
    isIndex: {
      type: Boolean,
      default: null
    }
  },
  computed: {
    nickname () {
      return this.userInfo.nickname
    },
    avatar () {
      return this.userInfo.avatar
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    if (!this.userInfo || this.userInfo.length === 0) {
      this.$router.push('/login')
      alert('☺请先登录吖')
    }
  },
  methods: {
    logout () {
      this.saveUserInfo()
      this.$router.push({ path: '/login' })
    },
    showConfirm () {
      if (this.userInfo && this.userInfo.length !== 0) {
        this.$refs.confirm.show()
      }
    },
    onQueryChange (newQuery) {
      this.query = newQuery
    },
    ...mapActions([
      'saveUserInfo'
    ])
  },
  components: {
    SearchBox,
    ScrollMarkets,
    Confirm
  }
}
</script>
<style lang="stylus">
@import "~common/stylus/variable"
.aigis
  width 100%
  height 100%
  .top-wrapper
    .top-content
      display flex
      align-items center
      height 80px
      padding 0 30px
      background-color $color-background
      .logo
        min-width 185px
        cursor pointer
        .icon-logo
          margin-left 24px
          font-size 30px
          color #fff
      .search-box-wrapper
        flex 1
        margin-right 100px
      .user-box-wrapper
        position relative
        display flex
        align-items center
        color $color-light-purple
        .icon-bell
          margin-right 40px
          font-size 20px
        .avatar
          width 40px
          height 40px
          border-radius 50%
        .name
          min-width 56px
          margin 0 20px
        &:hover
          .user-pulldown
            display block

        .user-pulldown
          display none
          position absolute
          width 96px
          top 50px
          right 10px
          padding 6px 0
          border-radius 4px
          background-color $color-blue
          box-shadow: 0 0 3px $color-background
          z-index 2
          &:before
            content: ""
            position: absolute
            left: -40px
            right 0
            top: -20px
            height: 20px
          ul
            li
              line-height 32px
              cursor pointer
              text-align center
              color $color-white
              &:hover
                background-color $color-dark-blue
          .pulldown-bg
            position absolute
            width 100%
            height 6px
            top -6px
            left 0
            background url(./pulldown-bg.png) no-repeat center top
  .nav-wrapper
    margin-left 30px
    min-width 155px
    background-color $color-background
    .nav
      cursor pointer
      display block
      margin-top 12px
      &:nth-child(5):before
        content: '定制服务'
        display block
        margin-left 24px
        padding 46px 0 24px 0
        color $color-nav-text
      &.nav-s
        .navBtn
          background-color $color-blue
          .icon
            color #fff
          .title
            color #fff
      .navBtn
        display flex
        align-items center
        width 155px
        height 32px
        border-radius 4px
        .icon
          margin 0 24px
          font-size 18px
          color $color-icon
        .title
          color $color-nav-text
  .copyright
    position fixed
    left 30px
    bottom 30px
    line-height 20px
    color $color-light-purple
    background-color $color-background
  .main-wrapper
    position fixed
    left 215px
    right 0
    top 80px
    bottom 0
    padding 1px 0 0 1px
    overflow scroll
    &::-webkit-scrollbar
      width: 4px
    &::-webkit-scrollbar-thumb
      background-color $color-light-purple
    &.main-wrapper-index
      top 146px
</style>
