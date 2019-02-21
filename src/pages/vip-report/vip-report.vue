<template>
  <div class="vip-report-wrapper">
    <div class="vip-report-nav">
      <row-nav :nav="reportNav"></row-nav>
    </div>
    <report-column :data="news" :hasImg="false"></report-column>
  </div>
</template>

<script>
import ReportColumn from 'components/report-column/report-column'
import RowNav from 'base/row-nav/row-nav'
import { getCategories, getNewsList } from 'api'

export default {
  data () {
    return {
      news: [],
      tips: '点击加载更多',
      reportNav: []
    }
  },
  created () {
    this._getReportNav()
    this._getNewsList()
  },
  methods: {
    _getReportNav () {
      getCategories().then(res => {
        this.reportNav = res
      })
    },
    _getNewsList (type) {
      getNewsList({
        page: 0,
        type: type
      }).then((res) => {
        if (res) {
          this.news = res
          this.tips = '点击加载更多'
        } else {
          this.news = []
          this.tips = '暂无数据'
        }
      })
    }
  },
  components: {
    ReportColumn,
    RowNav
  }
}
</script>

<style lang="stylus">
.vip-report-wrapper
  .vip-report-nav
    margin-right 30px
    min-width 600px
    .row-nav
      display flex
      justify-content center
  .report-column
    .report-column-time
      display inline-block
      margin 20px 0 16px
      .title
        font-size 16px
        color $color-white
        background none
    .report-column-main
      .column
        display flex
        flex-direction column
        justify-content space-between
        .content
          height 100px
          .enter
            left 0
          .summary
            padding-left 0
            width 100%
            -webkit-line-clamp: 3
  @media screen and (max-width: 1048px)
    .report-column
      .report-column-main
        .column
          width calc(100% - 74px)
  @media screen and (min-width: 1440px)
    .report-column
      .report-column-main
        .column
          width calc(33.3% - 74px)
  @media screen and (min-width: 1844px)
    .report-column
      .report-column-main
        .column
          width calc(25% - 74px)

</style>
