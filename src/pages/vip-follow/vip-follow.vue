<template>
  <div class="vip-follow-wrapper">
    <div class="vip-follow-nav">
      <row-nav :nav="followNav" @change="change"></row-nav>
    </div>
    <div class="vip-follow-chart" v-for="list in followList" :key="list.id">
      <div class="chartBox">
        <chart :sourceData="list.data" :name="list.id" :fieldsText="['value']"
          :guideData="guideData" :tickCount="7" :timeCount="5" :keyColor="['#fff']">
        </chart>
      </div>
    </div>
    <div class="vip-follow-content" v-show="followList">
      <follow-record :data="recordsData"></follow-record>
      <last-time-data :title="title" :data="lastData"></last-time-data>
    </div>
    <loading v-if="!followList"></loading>
  </div>
</template>

<script>
import RowNav from 'base/row-nav/row-nav'
import Chart from 'base/chart/chart'
import Loading from 'base/loading/loading'
import FollowRecord from 'components/follow-record/follow-record'
import LastTimeData from 'components/last-time-data/last-time-data'
import { getFollowList, getLastTimeData, getDaysData } from 'api'
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
      lastTimeData: [],
      guideData: []
    }
  },
  computed: {
    lastData () {
      return [
        [
          {
            name: '最新',
            value: toDecimal(this.lastTimeData.NOW),
            color: this.lastTimeData.CHANGE
          },
          {
            name: '涨跌',
            value: toDecimal(this.lastTimeData.CHANGE),
            color: this.lastTimeData.CHANGE
          },
          {
            name: '幅度',
            value: this.toPercent(this.lastTimeData.PCTCHANGE),
            color: this.lastTimeData.PCTCHANGE
          },
          {
            name: '总手',
            value: this.lastTimeData.VOLUME,
            color: 'y'
          },
          {
            name: '现手',
            value: this.lastTimeData.ROUNDLOT,
            color: 'y'
          },
          {
            name: '外盘',
            value: this.lastTimeData.OUTVOLUME,
            color: 'y'
          },
          {
            name: '内盘',
            value: this.lastTimeData.INVOLUME,
            color: 'y'
          },
          {
            name: '基差',
            value: toDecimal(this.lastTimeData.SPREAD),
            color: 'y'
          }
        ],
        [
          {
            name: '昨结',
            value: toDecimal(this.lastTimeData.PRECLEAR),
            color: 0
          },
          {
            name: '昨收',
            value: toDecimal(this.lastTimeData.PRECLOSE),
            color: this.isZero(this.lastTimeData.PRECLOSE, this.lastTimeData.PRECLEAR)
          },
          {
            name: '今开',
            value: toDecimal(this.lastTimeData.OPEN),
            color: this.isZero(this.lastTimeData.OPEN, this.lastTimeData.PRECLEAR)
          },
          {
            name: '最高',
            value: toDecimal(this.lastTimeData.HIGH),
            color: this.isZero(this.lastTimeData.HIGH, this.lastTimeData.PRECLEAR)
          },
          {
            name: '最低',
            value: toDecimal(this.lastTimeData.LOW),
            color: this.isZero(this.lastTimeData.LOW, this.lastTimeData.PRECLEAR)
          },
          {
            name: '今结',
            value: toDecimal(this.lastTimeData.CLEAR),
            color: this.isZero(this.lastTimeData.CLEAR, this.lastTimeData.PRECLEAR)
          },
          {
            name: '涨停',
            value: toDecimal(this.lastTimeData.HIGHLIMIT),
            color: this.isZero(this.lastTimeData.HIGHLIMIT, this.lastTimeData.PRECLEAR)
          },
          {
            name: '跌停',
            value: toDecimal(this.lastTimeData.LOWLIMIT),
            color: this.isZero(this.lastTimeData.LOWLIMIT, this.lastTimeData.PRECLEAR)
          }
        ]
      ]
    },
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
      getFollowList({
        session: this.userInfo.session
      }).then(res => {
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
          this.lastTimeData = res

        })
        var followList = {}
        getDaysData({
          indicatorId: id,
          limit: 90
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
      })
    }
  },
  components: {
    RowNav,
    Chart,
    Loading,
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

</style>
