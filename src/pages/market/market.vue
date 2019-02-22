<template>
  <div class="market">
    <div class="market-nav">
      <row-nav :nav="marketNav" @change="change"></row-nav>
    </div>
    <div class="market-wrapper" v-if="marketsData.length">
      <div class="subNav" v-if="false">
        <div class="subNavItem" v-for="(item, index) in subNav" :key="index" :class="{'subNavItem-s':index===type}" @click="subChange(index)">
          <span>{{item}}</span>
        </div>
      </div>
      <div class="content">
        <div class="column">
          <span class="item name">资产</span>
          <span class="item price">最新价</span>
          <span class="item changePer red">涨跌幅</span>
          <span class="item change green">涨跌额</span>
          <span class="item high">最高价</span>
          <span class="item low">最低价</span>
          <span class="item open">开盘价</span>
          <span class="item add">7</span>
        </div>
        <div class="column" v-for="(column, index) in marketsData" :key="index">
          <span class="item name"><a class="name-z">{{column.name}}</a><br>{{column.code}}</span>
          <span class="item price" >{{column.value[0] | replaceZero}}</span>
          <span class="item changePer" :class="column.value[4] < 0 ? 'green' : 'red'">{{column.value[5] | toPercent}}</span>
          <span class="item change" :class="column.value[4] < 0 ? 'green' : 'red'">{{column.value[4] | replaceZero}}</span>
          <span class="item high">{{column.value[1] | replaceZero}}</span>
          <span class="item low">{{column.value[2] | replaceZero}}</span>
          <span class="item open">{{column.value[2] | replaceZero}}</span>
          <div class="item add"><span>加自选</span></div>
        </div>
      </div>
    </div>
    <no-result :tips="'网络繁忙，请刷新重试'" v-if="!marketsData.length"></no-result>
  </div>
</template>

<script>
import NoResult from 'base/no-result/no-result'
import RowNav from 'base/row-nav/row-nav'
import { getIndicators } from 'api'
import { addClass, removeClass } from 'common/js/dom.js'

export default {
  data () {
    return {
      marketsData: [],
      marketNav: [],
      subNav: [],
      agentData: [],
      timer: null
    }
  },
  filters: {
    toPercent (str) {
      return (Math.round(str * 10000) / 100).toFixed(2) + '%'
    },
    replaceZero (str) {
      return str.replace(/00$/, '')
    }
  },
  created () {
    this._getIndicators(0)
  },
  methods: {
    getConfigResult (res) {
      let resultData = []
      resultData = res.data
      let marketsData = ((d) => {
        return d.reduce((v1, v2) => {
          v2.forEach((item, i) => {
            (v1[i] || (v1[i] = [])).push(item)
          })
          return v1
        }, [])
      })([resultData, this.nameData])

      // let marketsData = resultData.map((o,i) => {
      //   return [o, this.nameData[i]]
      // })

      this.marketsData = []
      marketsData.forEach(el => {

        this.marketsData.push({
          name: el[1].name,
          code: el[1].code,
          value: el[0].value
        })
      })
    },
    requstSocketData (type) {
      this.socketApi.sendSock(this.agentData, this.getConfigResult)
      console.log(type)
    },
    _getIndicators (type) {
      getIndicators({
        session: 'LtTadpte9Z1uX9i1sag88yU7GX-pdKi5'
      }).then(res => {
        this.marketNav = Object.keys(res)
        // this.marketNav.unshift('自选')

        let dataType = this.marketNav[type]
        let data = res[dataType]

        let agentData = []
        let nameData = []
        data.forEach(element => {
          agentData.push({
            table: element.table_name,
            indicator: ['NOW', 'HIGH', 'LOW', 'OPEN', 'CHANGE', 'PCTCHANGE']
          })
          nameData.push({
            name: element.indicator_name,
            code: element.indicator_code
          })
        })
        this.agentData = {
          page: 'market_page',
          data: agentData
        }
        this.nameData = nameData
        console.log(this.agentData)

        this.timer = setInterval(() => {
          this.socketApi.sendSock(this.agentData, this.getConfigResult)
          console.log(type)
        }, 1000)
        this.$once('hook:beforeDestroy', () => {
          clearInterval(this.timer)
        })
        console.log(type)
      })
    },
    change (i) {
      this.type = i
      this._getIndicators(i)
    },
    shadow () {
      addClass(this.$refs.test, 'red')
      setTimeout(() => {
        removeClass(this.$refs.test, 'red')
      }, 500)
    }
  },
  components: {
    RowNav,
    NoResult
  }
}
</script>

<style lang="stylus">
.market
  margin 0 30px 30px 0
  min-width 680px
  .market-nav
    display flex
    justify-content center
    margin 0 30px 30px 0
  .market-wrapper
    padding 6px 0
    border-radius 12px
    background-color $color-light-background
    .subNav
      display flex
      align-items center
      height 52px
      border-bottom 1px solid $color-line
      .subNavItem
        margin 0 25px
      .subNavItem-s
        position relative
        color $color-white
        span
          &:after
            position absolute
            bottom -20px
            left 0
            content ''
            width 100%
            height 2px
            background-color $color-blue
    .content
      margin 6px 24px 0
      .column
        display flex
        align-items center
        justify-content space-between
        padding 12px 0
        line-height 20px
        border-bottom 1px solid $color-line
        .item
          width 12%
          text-align right
          &.name
            width 14%
            min-width 114px
            text-align left
            .name-z
              color $color-white
          &.price
            font-weight 600
            color $color-white
          &.add
            width 8%
            margin-left 6%
            display flex
            align-items center
            justify-content center
            height 24px
            border 1px solid $color-text
            border-radius 2px
          &.red
            color $color-red
          &.green
            color $color-green
        &:nth-child(1)
          border-bottom none
          .item
            font-weight 600
            color $color-text
            .name-z
              font-weight 600
              color $color-text
            &.add
              visibility hidden
  .no-result-wrapper
    margin-top 100px
</style>
