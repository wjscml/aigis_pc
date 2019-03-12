<template>
  <div class="vip-follow-wrapper">
    <div class="vip-follow-nav">
      <row-nav :nav="followNav"></row-nav>
    </div>
    <div class="vip-follow-chart" v-for="list in followList" :key="list.id">
      <chart :sourceData="list.data" :name="list.id" :fieldsText="['value']"
        :guideData="guideData" :tickCount="7" :timeCount="5" :keyColor="['#fff']">
      </chart>
    </div>
    <div class="vip-follow-content" v-show="followList">
      <div class="record">
        <h1 class="record-title">
          <i class="icon-record"></i>
          <span>成交记录</span>
        </h1>
        <div class="record-content">
          <div class="column">
            <span class="item name">成交合约</span>
            <span class="item sale">买卖</span>
            <span class="item kaiping">开平</span>
            <span class="item price">成交价格</span>
            <span class="item amount">成交手数</span>
            <span class="item time">成交时间</span>
          </div>
          <div class="column" v-for="(column, index) in records" :key="index">
            <span class="item name">{{column.indicator_name}}</span>
            <div class="item sale">
              <span class="left" v-if="column.is_buy==0">买</span>
              <span class="right" v-if="column.is_buy==1">卖</span>
            </div>
            <div class="item kaiping">
              <span v-if="column.is_buy==0">平仓</span>
              <span v-if="column.is_buy==1">开仓</span>
            </div>
            <span class="item price">{{column.price | replaceZero}}</span>
            <span class="item amount">{{column.deal_volume}}</span>
            <span class="item time">{{column.deal_time | getLocalTime}}</span>
          </div>
        </div>
      </div>
      <div class="timeData">
        <h1 class="title">{{title}}</h1>
        <div class="content">
          <div class="column" v-for="(column, index) in lastTimeData" :key="index">
            <div class="item" v-for="(item, index) in column" :key="index">
              <span class="name">{{item.name}}</span>
              <span class="value" :class="colorClass(item.color)">{{item.value | replaceZero}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-if="!followList"></loading>
  </div>
</template>

<script>
import RowNav from 'base/row-nav/row-nav'
import Chart from 'base/chart/chart'
import Loading from 'base/loading/loading'
import { getFollowList, getLastTimeData, getDaysData } from 'api'
import { mapGetters } from 'vuex'
import { formatDate } from 'common/js/data'

export default {
  data () {
    return {
      type: 0,
      title: '',
      followNav: [],
      followList: [],
      records: [],
      lastTimeData: [],
      guideData: [

      ]
    }
  },
  filters: {
    toNumber (str) {
      return Number(str)
    },
    replaceZero (str) {
      return str.replace(/00$/, '')
    },
    getLocalTime (nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, '')
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this._getFollowList(0)
    console.log(this.userInfo)
  },
  mounted () {

  },
  methods: {
    toPercent (str) {
      return (Math.round(str * 10000) / 100).toFixed(2) + '%'
    },
    chinesize (str) {
      if (str === '01') {
        return '买平'
      }
      if (str === '10') {
        return '卖开'
      }
      if (str === '11') {
        return '卖平'
      }
      if (str === '00') {
        return '买开'
      }
    },
    getLocalTime (nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, '')
    },
    colorClass (val) {
      if (val === 'y') {
        return 'yellow'
      } else {
        if (val > 0) {
          return 'red'
        }
        if (val < 0) {
          return 'green'
        }
        if (val === 0) {
          return ''
        }
      }
    },
    _getFollowList (type) {
      getFollowList({
        session: this.userInfo.session
      }).then(res => {
        for (let i in res) {
          this.followNav.push(res[i].indicator_name)
        }
        this.title = res[type].indicator_name
        this.records = res[type].purchaseLog
        for (let n in this.records) {
          this.guideData.push({
            point: [formatDate(this.records[n].deal_time * 1000), Number(this.records[n].price)],
            pointValue: this.chinesize(this.records[n].is_buy + this.records[n].position)
          })
        }
        let id = res[type].indicator_id
        getLastTimeData({
          indicatorId: id
        }).then(res => {
          this.lastTimeData = [
            [
              {
                name: '最新',
                value: res.NOW,
                color: res.CHANGE
              },
              {
                name: '涨跌',
                value: res.CHANGE,
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
                value: res.SPREAD,
                color: 'y'
              }
            ],
            [
              {
                name: '昨结',
                value: res.PRECLEAR,
                color: 0
              },
              {
                name: '昨收',
                value: res.PRECLOSE,
                color: res.PRECLOSE - res.PRECLEAR
              },
              {
                name: '今开',
                value: res.OPEN,
                color: res.OPEN - res.PRECLEAR
              },
              {
                name: '最高',
                value: res.HIGH,
                color: res.HIGH - res.PRECLEAR
              },
              {
                name: '最低',
                value: res.LOW,
                color: res.LOW - res.PRECLEAR
              },
              {
                name: '今结',
                value: res.CLEAR,
                color: res.CLEAR - res.PRECLEAR
              },
              {
                name: '涨停',
                value: res.HIGHLIMIT,
                color: res.HIGHLIMIT - res.PRECLEAR
              },
              {
                name: '跌停',
                value: res.LOWLIMIT,
                color: res.LOWLIMIT - res.PRECLEAR
              }
            ]
          ]
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
          this.followList.push(followList)
        })
      })
    }
  },
  components: {
    RowNav,
    Chart,
    Loading
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
    padding 26px
    margin-bottom 26px
    border-radius 12px
    background-color $color-dark-blue
  .vip-follow-content
    display flex
    .record
      margin-right 26px
      flex 2
      .record-title
        display flex
        align-items center
        height 24px
        margin-bottom 12px
        .icon-record
          margin 0 8px
          font-size 16px
          color $color-purple
        span
          color $color-white
      .record-content
        padding 10px 0
        border-radius 10px
        background-color $color-light-background
        .column
          display flex
          align-items center
          height 44px
          margin 0 20px
          border-bottom 1px solid $color-line
          .item
            width 15%
            text-align right
            color $color-white
            &.name
              width 20%
              text-align left
              min-width 90px
            &.sale
              width 10%
              .left
                padding-right 13px
                color $color-red
              .right
                color $color-green
            &.kaiping
              width 10%
            &.price
              color $color-yellow
            &.time
              width 30%
              min-width 150px
          &:nth-child(1)
            .item
              font-weight 600
              color $color-text
          &:nth-last-child(1)
            border-bottom none
    .timeData
      flex 1
      padding 24px
      border-radius 10px
      background-color $color-light-background
      .title
        margin-bottom 30px
        color $color-white
      .content
        display flex
        .column
          flex 1
          line-height 24px
          .item
            display flex
            color $color-white
            .name
              flex 1
            .value
              font-weight 600
              &.red
                color $color-red
              &.green
                color $color-green
              &.yellow
                color $color-yellow
          &:nth-child(1)
            padding-right 14px
            border-right 1px solid $color-line
          &:nth-child(2)
            padding-left 14px
</style>
