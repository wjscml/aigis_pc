<template>
  <div class="vip-value-wrapper">
    <div class="vip-value-nav">
      <row-nav :nav="valueNav" @change="change"></row-nav>
    </div>
    <div class="vip-value-content" v-show="valueList.length">
      <div class="value-subNav">
        <span class="subNav-btn" :class="{'subNav-btn-s':index===time}" v-for="(item, index) in subNav" :key="index" @click="changeTime(index)">{{item.time}}</span>
      </div>
      <div class="value-chart" v-for="(chart, index) in valueList" :key="index">
        <chart :sourceData="chart.nets" :name="`value${chart.indicator_id}`" :fieldsText="['净值']"
        :tickCount="11" :timeCount="5" :tooltips="'<li>{name}: {value}</li>'"></chart>
      </div>
      <div class="value-info">
        <div class="item" v-for="(item, index) in valueInfo" :key="index">
          <span class="value" :class="item.value < 0 ? 'green' : 'red'">{{item.value}}</span>
          <span class="name">{{item.name}}</span>
        </div>
      </div>
    </div>
    <loading v-show="pageLoading"></loading>
    <div class="vip-value-no-result" v-if="!valueList.length && !pageLoading">
      <no-result :tips="resultTips" ></no-result>
    </div>
  </div>
</template>

<script>
import RowNav from 'base/row-nav/row-nav'
import Chart from 'base/chart/chart'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'
import { mapGetters } from 'vuex'
import { getValueList } from 'api'
import { formatDate, formatNumber } from 'common/js/data.js'

export default {
  data () {
    return {
      type: 0,
      time: 0,
      valueNav: [],
      subNav: [
        { time: '近1月' },
        { time: '近3月' },
        { time: '近6月' },
        { time: '近1年' },
        { time: '近3年' }
      ],
      valueList: {},
      valueInfo: [],
      pageLoading: true,
      resultTips: '您还没有委托资产~'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this._getValueData(0)
  },
  methods: {
    changeTime (i) {
      this.time = i
      console.log(i)
    },
    change (i) {
      this.type = i
      this._getValueData(i)
    },
    _getValueData (type) {
      this.pageLoading = true
      getValueList({
        session: this.userInfo.session
      }).then(res => {
        this.pageLoading = false
        if (res.length !== 0) {
          // nav
          this.valueNav = []
          for (let i in res) {
            this.valueNav.push(res[i].indicator_name)
          }
          // charts
          this.valueList = []
          let valueList = res[type]
          valueList.nets.forEach(el => {
            el.time = formatDate(el.notice_time * 1000)
            el.净值 = Number(el.now_nav)
          })
          this.$nextTick(() => {
            this.valueList.push(valueList)
          })
          // info
          this.valueInfo = []
          let valueInfo = res[type]
          this.valueInfo = [
            {
              name: '日涨跌幅',
              value: this.toPercent(valueInfo.nets[0].pct_change)
            },
            {
              name: '基金净值',
              value: Number(valueInfo.nets[0].now_nav)
            },
            {
              name: '总资产',
              value: formatNumber(valueInfo.trust_amount + valueInfo.interest_amount)
            },
            {
              name: '委托资金',
              value: formatNumber(valueInfo.trust_amount)
            },
            {
              name: '累计收益率',
              value: this.toPercent(valueInfo.average_interest_rate)
            },
            {
              name: '年化收益',
              value: '10.18%'
            }
          ]
        }
      })
    },
    toPercent (str) {
      return (Math.round(str * 10000) / 100).toFixed(2) + '%'
    }
  },
  components: {
    RowNav,
    Chart,
    Loading,
    NoResult
  }
}
</script>

<style lang="stylus">
.vip-value-wrapper
  margin 0 30px 30px 0
  min-width 774px
  .vip-value-nav
    margin-bottom 30px
    .row-nav
      display flex
      justify-content center
  .vip-value-content
    padding 4px 0
    border-radius 12px
    background-color $color-light-background
    .value-subNav
      display flex
      align-items center
      height 52px
      padding 0 30px
      border-bottom 1px solid $color-line
      .subNav-btn
        width 56px
        margin-right 36px
        &.subNav-btn-s
          font-weight 600
          color $color-white
    .value-chart
      margin 40px 30px
    .value-info
      display flex
      justify-content space-between
      margin 40px 30px
      .item
        span
          display block
        .value
          font-weight 600
          line-height 18px
          font-size 18px
          color $color-white
        .red
          color $color-red
        .green
          color $color-green
        .name
          margin-top 10px
          line-height 14px
        &:nth-child(2),&:nth-child(4)
          .red,.green
            color $color-white
  .vip-value-no-result
    margin-top 100px
</style>
