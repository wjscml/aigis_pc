<template>
  <div class="market">
    <div class="market-nav" v-show="marketNav.length">
      <row-nav :nav="marketNav" @change="change"></row-nav>
    </div>
    <div class="market-wrapper" v-show="marketsData.length">
      <div v-for="(column, index) in marketsData" :key="index">
        <div class="subNav" v-if="false">
          <div class="subNavItem" v-for="(item, index) in subNav" :key="index" :class="{'subNavItem-s':index===type}" @click="subChange(index)">
            <span>{{item}}</span>
          </div>
        </div>
        <div class="content" v-show="index==type && column.length !== 0">
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
          <div class="column" v-for="(item, itemIndex) in column" :key="item.id">
            <span class="item name">
              <a :href="`https://aigis.leadfintech.com:8800/?symbol=${item.code}&interval=1D&description=${item.name}`" target="_blank" class="name-z">{{item.name}}</a><br>{{item.code}}
            </span>
            <span class="item price">{{item.value[0] | toNumber}}</span>
            <span class="item changePer" :class="item.value[4] > 0 ? 'red' : (item.value[4] == 0 ? '' : 'green')">{{item.value[5] | toPercent}}</span>
            <span class="item change" :class="item.value[4] > 0 ? 'red' : (item.value[4] == 0 ? '' : 'green')">{{item.value[4] | toNumber}}</span>
            <span class="item high">{{item.value[1] | toNumber}}</span>
            <span class="item low">{{item.value[2] | toNumber}}</span>
            <span class="item open">{{item.value[2] | toNumber}}</span>
            <div class="item add" @click="addFavor(item, itemIndex)" v-show="item.status !== 1"><span>加自选</span></div>
            <div class="item delete" @click="showConfirm(item, itemIndex)" v-show="item.status == 1"><span>删自选</span></div>
          </div>
        </div>
        <no-result tips="您还没有自选行情~" v-show="index==type && column.length == 0"></no-result>
      </div>
    </div>
    <loading v-if="!marketsData.length"></loading>
    <confirm @confirm="deleteFavor" :text="confirmText" ref="confirm"></confirm>
  </div>
</template>

<script>
import NoResult from 'base/no-result/no-result'
import Confirm from 'components/confirm/confirm'
import RowNav from 'base/row-nav/row-nav'
import Loading from 'base/loading/loading'
import { getIndicators, addFavorIndicator, getFavorIndicatorList } from 'api'
import { addClass, removeClass } from 'common/js/dom.js'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      type: 0,
      marketsData: [],
      marketNav: [],
      subNav: [],
      agentData: [],
      nameData: [],
      timer: null,
      confirmText: ''
    }
  },
  filters: {
    toPercent (str) {
      return (Math.round(str * 10000) / 100).toFixed(2) + '%'
    },
    toNumber (str) {
      return Number(str)
    },
    replaceZero (str) {
      return str.replace(/00$/, '')
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this._getIndicators(0)
  },
  beforeMount () {

  },
  methods: {
    toggleFavor (item, index, n) {
      addFavorIndicator({
        indicatorId: this.marketsData[this.type][index].id,
        session: this.userInfo.session,
        action: n
      }).then(res => {
        item.status = n
        this._getIndicators(this.type)
      })
    },
    addFavor (item, index) {
      this.toggleFavor(item, index, 1)
    },
    deleteFavor () {
      this.toggleFavor(this.item, this.i, 2)
    },
    showConfirm (item, index) {
      this.item = item
      this.i = index
      this.confirmText = `是否不再关注 "${item.name}"`
      this.$refs.confirm.show()
    },
    getConfigResult (res) {
      let resultData = res.data
      let marketsData = resultData.map((o, i) => {
        return Object.assign(o, this.nameData[i])
      })
      let start = 0
      let end = 0
      this.marketsData = []
      for (let i in this.marketsLength) {
        if (i < 1) {
          start = 0
          end = this.marketsLength[0]
        } else {
          start = start + this.marketsLength[i - 1]
          end = end + this.marketsLength[i]
        }
        this.marketsData.push(marketsData.slice(start, end))
      }
    },
    requstSocketData (data) {
      this.socketApi.sendSock(data, this.getConfigResult)
    },
    _getIndicators (type) {
      this.marketsData = []
      var agentData = {}
      agentData.page = 'market_page'
      agentData.data = []
      var nameData = []
      var marketsLength = []
      var marketsData = []
      getIndicators({
        session: this.userInfo.session
      }).then(res => {
        this.marketNav = Object.keys(res)
        this.marketNav.unshift('自选')
        for (var i in res) {
          marketsData.push(res[i])
        }
        getFavorIndicatorList({
          session: this.userInfo.session
        }).then(res => {
          marketsData.unshift(res)
          marketsData.forEach(element => {
            marketsLength.push(element.length)
            element.forEach(el => {
              agentData.data.push({
                table: el.table_name,
                indicator: ['NOW', 'HIGH', 'LOW', 'OPEN', 'CHANGE', 'PCTCHANGE']
              })
              nameData.push({
                name: el.indicator_name,
                code: el.indicator_code,
                id: el.indicator_id,
                status: el.status
              })
            })
          })
          this.nameData = nameData
          this.marketsLength = marketsLength
          this.requstSocketData(agentData)
          // this.timer = setInterval(() => {
          //   this.requstSocketData(agentData)
          // }, 4000)
        })
      })
    },
    change (i) {
      clearInterval(this.timer)
      this.type = i
    },
    shadow () {
      addClass(this.$refs.test, 'red')
      setTimeout(() => {
        removeClass(this.$refs.test, 'red')
      }, 500)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  components: {
    RowNav,
    Loading,
    Confirm,
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
      padding 12px 24px
      background-color $color-light-background
      border-radius 12px
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
            &:hover
              cursor pointer
              .name-z
                color $color-light-blue
          &.price
            font-weight 600
            color $color-white
          &.changePer,&.change
            font-weight 600
          &.add
            width 8%
            margin-left 6%
            display flex
            align-items center
            justify-content center
            height 28px
            background-color $color-blue
            color $color-white
            border-radius 2px
            cursor pointer
            &:hover
              background-color $color-dark-blue
          &.delete
            width 8%
            margin-left 6%
            display flex
            align-items center
            justify-content center
            height 28px
            background-color $color-light-purple
            color $color-white
            border-radius 2px
            cursor pointer
            &:hover
              background-color $color-dark-blue
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
        &:nth-last-child(1)
          border-bottom none
  .no-result-wrapper
    margin-top 100px
</style>
