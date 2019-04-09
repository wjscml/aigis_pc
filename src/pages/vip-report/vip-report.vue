<template>
  <div class="vip-report-wrapper">
    <div class="vip-report-nav">
      <row-nav :nav="reportNav"></row-nav>
    </div>
    <report-column :data="specialList" :timeKey="timeKey" :hasImg="false"></report-column>
    <div v-show="specialList.length">
      <load-more @loadMore="loadmore" :tips="tips" :isLoad="isLoad"></load-more>
    </div>
    <loading v-show="pageLoading"></loading>
    <div class="vip-report-no-result" v-if="!specialList.length && !pageLoading">
      <no-result :tips="resultTips" ></no-result>
    </div>

  </div>
</template>

<script>
import ReportColumn from 'components/report-column/report-column'
import RowNav from 'base/row-nav/row-nav'
import LoadMore from 'base/load-more/load-more'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'
import { getSpecialList } from 'api'
import { mapGetters } from 'vuex'
import { extend } from 'common/js/data'

const COUNT = 5
export default {
  data () {
    return {
      specialList: [],
      timeKey: [],
      tips: '点击加载更多',
      resultTips: '暂无报告~',
      pageLoading: true,
      reportNav: [],
      isLoad: null,
      page: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this._getSpecialList()
  },
  methods: {
    _getSpecialList () {
      this.pageLoading = true
      getSpecialList({
        session: this.userInfo.session,
        page: 0,
        limit: COUNT
      }).then((res) => {
        this.pageLoading = false
        if (res.length !== 0) {
          this.sourceRes = res
          this.timeKey = Object.keys(res)
          for (let i in res) {
            this.specialList.push(res[i])
          }
          this.tips = '点击加载更多'
        }
      })
    },
    loadmore () {
      this.tips = '加载中...'
      this.isLoad = true
      this.page++
      getSpecialList({
        session: this.userInfo.session,
        page: this.page,
        limit: COUNT
      }).then(res => {
        this.isLoad = false
        console.log(res)
        if (res.length !== 0) {
          this.sourceRes = extend(this.sourceRes, res)
          this.timeKey = Object.keys(this.sourceRes)
          this.specialList = []
          for (let i in this.sourceRes) {
            this.specialList.push(this.sourceRes[i])
          }
          this.tips = '点击加载更多'
        } else {
          this.tips = '没有更多数据了'
        }
      })
    }
  },
  components: {
    ReportColumn,
    RowNav,
    LoadMore,
    Loading,
    NoResult
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
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
  .vip-report-no-result
    margin-top 100px
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
