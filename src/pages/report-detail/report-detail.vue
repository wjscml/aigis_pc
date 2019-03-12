<template>
  <div class="report-detail" v-wechat-title="reportDetails.title">
    <div class="report-detail-wrapper" v-show="reportDetails.content">
      <div class="detail-header">
        <h1 class="title-box">{{reportDetails.title}}</h1>
        <div class="issue-box">
          <span>埃癸斯智能风控</span>
          <span class="publish-time">{{reportDetails.publish_time}}</span>
        </div>
      </div>
      <div class="detail-main" v-html="reportDetails.content"></div>
    </div>
  </div>
</template>

<script>
import { getReportContent } from 'api'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      reportDetails: [],
      isShow: null
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.getDetail()
  },
  mounted () {
    setTimeout(() => {
      window.addEventListener('scroll', this.handleScroll)
    }, 20)
  },
  methods: {
    handleScroll () {
      this.isShow = false
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var h = document.documentElement.clientHeight
      if (scrollTop < h) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    getDetail () {
      getReportContent({
        session: this.userInfo.session,
        reportId: this.$route.params.id
      }).then(res => {
        // console.log(window.location.pathname)
        this.reportDetails = res
        console.log(res)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.httpGet()
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus">
.report-detail-wrapper
  padding 0 30px
  min-width 620px
  .detail-header
    margin-bottom 20px
    .title-box
      line-height 30px
      font-size 20px
      font-weight 600
      color $color-white
    .issue-box
      display flex
      align-items center
      height 40px
      .publish-time
        margin-left 10px
  .detail-main
    .abstract, .b-review
      display none!important
    .clearp, center
      border none!important
      background-color rgba(0, 0, 0, 0)!important
    p
      border none!important
      background-color rgba(0, 0, 0, 0)!important
      color $color-text!important
      span
        a
          color $color-text!important
  .detail-text
    b
      line-height 32px!important
</style>
