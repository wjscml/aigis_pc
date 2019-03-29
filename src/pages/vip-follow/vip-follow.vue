<template>
  <div class="vip-follow-wrapper">
    <div class="vip-follow-nav">
      <row-nav :nav="followNav" @change="change"></row-nav>
    </div>
    <div class="vip-follow-chart" v-show="followList.length">
      <div class="chartBox" v-for="list in followList" :key="list.id">
        <chart :sourceData="list.data" :name="list.id" :fieldsText="['value']"
          :guideData="guideData" :tickCount="7" :timeCount="5" :keyColor="['#fff']">
        </chart>
      </div>
    </div>
    <div class="vip-follow-content" v-show="followList.length">
      <follow-record :data="recordsData"></follow-record>
      <last-time-data :title="title" :data="lastData"></last-time-data>
    </div>
    <loading v-show="pageLoading"></loading>
    <div class="vip-follow-no-result" v-if="!followList.length && !pageLoading">
      <no-result :tips="resultTips" ></no-result>
    </div>
  </div>
</template>

<script>
import RowNav from 'base/row-nav/row-nav'
import Chart from 'base/chart/chart'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'
import FollowRecord from 'components/follow-record/follow-record'
import LastTimeData from 'components/last-time-data/last-time-data'
import { getFollowList, getLastTimeData, getPeriodData } from 'api'
import { mapGetters } from 'vuex'
import { formatDate, toDecimal } from 'common/js/data'

export default {
  data () {
    return {
      type: 0,
      title: '',
      followNav: [],
      followList: [],
      recordsData: [],
      lastData: [],
      guideData: [],
      pageLoading: true,
      resultTips: '您还没有开通此服务~'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this._getFollowList(0)
  },
  mounted () {

  },
  methods: {
    toPercent (str) {
      return (Math.round(str * 10000) / 100).toFixed(2) + '%'
    },
    chinesize (str) {
      if (str === '01') {
        return '买开'
      }
      if (str === '10') {
        return '卖平'
      }
      if (str === '11') {
        return '卖开'
      }
      if (str === '00') {
        return '买平'
      }
    },
    getLocalTime (nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, '')
    },

    isZero (x, y) {
      if (x == 0) {
        return 0
      }
      return x - y
    },
    change (i) {
      this.recordsData = []
      this.lastData = []
      this.type = i
      this._getFollowList(i)
    },
    _getFollowList (type) {
      this.pageLoading = true
      getFollowList({
        session: this.userInfo.session
      }).then(res => {
        this.pageLoading = false
        if (res.length !== 0) {
          this.followNav = []
          for (let i in res) {
            this.followNav.push(res[i].indicator_name)
          }
          this.title = res[type].indicator_name
          this.recordsData = res[type].purchaseLog
          this.guideData = []
          for (let n in this.recordsData) {
            this.guideData.push({
              point: [formatDate(this.recordsData[n].deal_time * 1000), Number(this.recordsData[n].price)],
              pointValue: this.chinesize(this.recordsData[n].is_buy + this.recordsData[n].position)
            })
          }
          let id = res[type].indicator_id
          getLastTimeData({
            indicatorId: id
          }).then(res => {
            this.lastData = [
              [
                {
                  name: '最新',
                  value: toDecimal(res.NOW),
                  color: res.CHANGE
                },
                {
                  name: '涨跌',
                  value: toDecimal(res.CHANGE),
                  color: res.CHANGE
                },
                {
                  name: '幅度',
                  value: this.toPercent(res.PCTCHANGE),
                  color: res.PCTCHANGE
                },
                {
                  name: '总手',
                  value: res.VOLUME,
                  color: 'y'
                },
                {
                  name: '现手',
                  value: res.ROUNDLOT,
                  color: 'y'
                },
                {
                  name: '外盘',
                  value: res.OUTVOLUME,
                  color: 'y'
                },
                {
                  name: '内盘',
                  value: res.INVOLUME,
                  color: 'y'
                },
                {
                  name: '基差',
                  value: toDecimal(res.SPREAD),
                  color: 'y'
                }
              ],
              [
                {
                  name: '昨结',
                  value: toDecimal(res.PRECLEAR),
                  color: 0
                },
                {
                  name: '昨收',
                  value: toDecimal(res.PRECLOSE),
                  color: this.isZero(res.PRECLOSE, res.PRECLEAR)
                },
                {
                  name: '今开',
                  value: toDecimal(res.OPEN),
                  color: this.isZero(res.OPEN, res.PRECLEAR)
                },
                {
                  name: '最高',
                  value: toDecimal(res.HIGH),
                  color: this.isZero(res.HIGH, res.PRECLEAR)
                },
                {
                  name: '最低',
                  value: toDecimal(res.LOW),
                  color: this.isZero(res.LOW, res.PRECLEAR)
                },
                {
                  name: '今结',
                  value: toDecimal(res.CLEAR),
                  color: this.isZero(res.CLEAR, res.PRECLEAR)
                },
                {
                  name: '涨停',
                  value: toDecimal(res.HIGHLIMIT),
                  color: this.isZero(res.HIGHLIMIT, res.PRECLEAR)
                },
                {
                  name: '跌停',
                  value: toDecimal(res.LOWLIMIT),
                  color: this.isZero(res.LOWLIMIT, res.PRECLEAR)
                }
              ]
            ]
          })
          var followList = {}
          getPeriodData({
            indicatorId: id,
            fromDate: this.guideData[0].point[0],
            toDate: formatDate(new Date())
          }).then(res => {
            followList.id = 'followList' + id
            followList.data = res
            followList.data.forEach(element => {
              element.time = element.ftime
              element.value = Number(element.CLOSE)
            })
            this.followList = []
            this.followList.push(followList)
          })
        }
      })
    },
    _getPeriodData () {

    }
  },
  components: {
    RowNav,
    Chart,
    Loading,
    NoResult,
    FollowRecord,
    LastTimeData
  }
}
</script>

<style lang="stylus">
.vip-follow-wrapper
  margin 0 30px 30px 0
  min-width 800px
  .vip-follow-nav
    margin-bottom 30px
    .row-nav
      display flex
      justify-content center
  .vip-follow-chart
    border-radius 12px
    background-color $color-dark-blue
    .chartBox
      padding 26px
      margin-bottom 26px
  .vip-follow-content
    display flex
  .vip-follow-no-result
    margin-top 100px

</style>
