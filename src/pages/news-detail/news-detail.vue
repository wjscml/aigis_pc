<template>
  <div class="news-detail" v-wechat-title="newsDetails.title">
      <div class="news-detail-wrapper" v-show="newsDetails.content">
          <div class="detail-header">
              <h1 class="title-box">{{newsDetails.title}}</h1>
              <div class="issue-box">
                  <p class="author">
                      <img :src="newsDetails.author_avatar" width="24" height="24">
                      <span class="name">{{newsDetails.author_name}}</span>
                  </p>
                  <p class="time">发布时间：<span>{{newsDetails.publish_time}}</span></p>
                  <p class="read-number">
                    <i class="icon-hot_fill"></i>
                    <span>{{newsDetails.scan_count}}</span>
                  </p>
              </div>
          </div>
          <div class="detail-text" v-html="newsDetails.content"></div>
          <div class="page">
              <p class="page-item">
                <span>上一篇：</span>
                <span v-if="beforeArticle.title" @click="golast" class="title">{{beforeArticle.title}}</span>
                <span v-if="!beforeArticle.title" class="tips">已经是第一篇文章啦~</span>
              </p>
              <p class="page-item">
                <span>下一篇：</span>
                <span v-if="afterArticle.title" @click="gonext" class="title">{{afterArticle.title}}</span>
                <span v-if="!afterArticle.title" class="tips">已经是最后一篇文章啦~</span>
              </p>
          </div>

      </div>
      <loading class="loading-wrapper" v-show="!newsDetails.content"></loading>
      <div class="fixed-tool" v-show="isShow">
        <a href="#top" class="btn-goTop"><i class="icon-top"></i></a>
      </div>
  </div>
</template>
<script>
import Loading from 'base/loading/loading.vue'
import { getNewsDetail } from 'api'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      newsDetails: [],
      afterArticle: [],
      beforeArticle: [],
      isShow: null
    }
  },
  created () {
    this.httpGet()
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted () {
    setTimeout(() => {
      window.addEventListener('scroll', this.handleScroll)
    }, 20)
  },
  methods: {
    handleScroll () {
      console.log('scrollTop')
      this.isShow = false
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var h = document.documentElement.clientHeight
      console.log(scrollTop, h)
      if (scrollTop < h) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    httpGet () {
      if (this.userInfo && this.userInfo.length !== 0) {
        this.params = {
          articleId: this.$route.params.id,
          session: this.userInfo.session
        }
        this.getDetail()
      } else {
        this.params = {
          articleId: this.$route.params.id
        }
        this.getDetail()
      }
    },
    getDetail () {
      getNewsDetail(this.params).then(res => {
        // console.log(window.location.pathname)
        this.newsDetails = res
        this.afterArticle = this.newsDetails.article_after
        this.beforeArticle = this.newsDetails.article_before
      })
    },
    gotop () {
      this.$refs.article.scrollIntoView()
    },
    gonext () {
      if (this.newsDetails.article_after.length === 0) {
        alert('已经是最后一篇文章啦~')
      } else {
        this.$router.push({ path: `/news/${this.newsDetails.article_after.id}` })
      }
    },
    golast () {
      if (this.newsDetails.article_before.length === 0) {
        alert('已经是第一篇文章啦~')
      } else {
        this.$router.push(`/news/${this.newsDetails.article_before.id}`)
      }
    },
    toggleFavorite () {
      if (this.userInfo && this.userInfo.length !== 0) {
        collectArticle({
          session: this.userInfo.session,
          articleId: this.$route.params.id
        }).then(res => {
          if (res.action === 1) {
            this.newsDetails.isKeep = 1
          }
          if (res.action === 2) {
            this.newsDetails.isKeep = 0
          }
        })
      } else {
        this.$refs.confirm.show()
      }
    },
    goLogin () {
      this.$router.push('/login')
    },
    showQRCode () {
      this.isQRCode = true
    },
    hideQRCode () {
      this.isQRCode = false
    }
  },
  watch: {
    '$route' (to, from) {
      this.httpGet()
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
    'loading': Loading
  }
}
</script>

<style lang="stylus">
.news-detail
  width 100%
  min-width 600px
  overflow: hidden
  .news-detail-wrapper
    padding 0 30px
    .detail-header
      .title-box
        font-size: 24px
        line-height: 36px
        font-weight: 600
        color: $color-white
      .issue-box
        display flex
        align-items center
        justify-content space-between
        overflow: hidden
        margin-top: 10px
        border-bottom: 1px solid $color-search
        height: 40px
        .author
          display flex
          align-items center
          margin-right 30px
          img
            margin-right 6px
            border-radius 50%
            width 24px
            height 24px
          .name
            outline none
        .collect
          display flex
          align-items center
          margin-right 30px
          cursor pointer
          .icon-favor,.icon-favor_fill
            margin-right 4px
            font-size 18px
            color #1f8bee
          .tips-favor
            &:hover
              color #1f8bee
          .tips-favor_fill
            color #1f8bee
        .read-number
          display flex
          align-items center
          .icon-hot_fill
            margin-right 4px
            font-size 18px
            color $color-red
    .detail-text
      margin: 24px 0
      color $color-text
      p
        font-size: 14px
        line-height: 28px
        margin-bottom: 14px
        a
          color $color-text
      h2,h3,h4,h5
        margin-bottom: 18px
        font-size: 18px
        font-weight: 600
    .page
      margin-top:48px
      .page-item
        display flex
        height 34px

        color: $color-search
        .title
          margin-left 8px
          font-weight 600
          color $color-text
          cursor pointer
          &:hover
            color: $color-light-blue
        .tips
          margin-left 8px
          font-weight normal

  .loading-wrapper
    margin-top 140px
  .fixed-tool
    position: fixed
    right: 50px
    bottom: 120px
    .btn-goTop
      display block
      width 48px
      height 48px
      border-radius 50%
      outline none
      background-color #ccc
      text-align center
      .icon-top
        color #fff
        font-size 24px
        line-height 48px
      &:hover
        background-color: #1f8bee
        transition-duration: .4s
</style>
