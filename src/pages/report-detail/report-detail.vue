<template>
  <div class="report-detail" v-wechat-title="reportDetails.title">
    <div class="report-detail-wrapper" v-show="reportDetails.content">
      <div class="detail-header">
        <h1 class="title-box">{{reportDetails.title}}</h1>
        <div class="issue-box">
          <span>埃癸斯智能风控</span>
          <span class="publish-time"> · {{reportDetails.publish_time}}</span>
        </div>
      </div>
      <div class="detail-main" v-html="reportDetails.content"></div>
      <div class="notices">免责声明：此板块内的信息取自第三方机构研报，不代表第八识智能科技的立场或观点，不对您构成任何投资建议，据此操作，风险自担。</div>
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
@import "~common/stylus/variable"
.report-detail-wrapper
  padding 0 80px 0 50px
  min-width 620px
  .detail-header

    border-bottom 1px solid $color-line
    .title-box
      line-height 30px
      font-size 20px
      font-weight 600
      color $color-white
    .issue-box
      display flex
      align-items center
      height 40px
      color $color-blue
      .publish-time
        margin-left 10px
        color $color-search
  .detail-main
    margin 30px 0
    font-size 15px
    .abstract, .b-review
      display none!important
    .clearp, center
      border none!important
      background-color rgba(0, 0, 0, 0)!important
    p
      text-indent 30px
      margin-bottom 16px
      border none!important
      background-color rgba(0, 0, 0, 0)!important
      color $color-text!important
      span
        a
          color $color-text!important
      strong
        text-indent 0
  .notices
    border-top 1px dashed $color-line
    padding 10px 0

    color $color-search
</style>
