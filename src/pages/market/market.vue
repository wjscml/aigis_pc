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
              <a @click="toDetail(item)" class="name-z">{{item.name}}</a><br>{{item.code}}
            </span>
            <span class="item price">{{item.value[0] | toNumber}}</span>
            <span class="item changePer" :class="item.value[6] > 0 ? 'red' : (item.value[6] == 0 ? '' : 'green')">{{item.value[7] | toPercent}}</span>

            <span class="item change" :class="item.value[6] > 0 ? 'red' : (item.value[6] == 0 ? '' : 'green')">{{item.value[6] | toNumber}}</span>

            <span class="item high">{{item.value[1] | toNumber}}</span>
            <span class="item low">{{item.value[2] | toNumber}}</span>
            <span class="item open">{{item.value[3] | toNumber}}</span>
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
import { toDecimal } from 'common/js/data.js'
import { mapGetters } from 'vuex'
import WebSocketClass from 'api/socket.js'

export default {
  data () {
    return {
      type: 0,
      marketsData: {},
      marketNav: [],
      subNav: [],
      nameData: [],
      confirmText: ''
    }
  },
  filters: {
    toPercent (str) {
      return (Math.round(str * 10000) / 100).toFixed(2) + '%'
    },
    toNumber (str) {
      return toDecimal(str)
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this._getIndicators()
  },
  mounted () {

  },
  methods: {
    toDetail (item) {
      window.open(`/market/site?symbol=${item.code}&interval=1D&description=${item.name}`, '_blank')
    },
    toggleFavor (item, index, n) {
      addFavorIndicator({
        indicatorId: this.marketsData[this.type][index].id,
        session: this.userInfo.session,
        action: n
      }).then(res => {
        item.status = res.status
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
      var that = this
      for (let o in res) {
        that.nameData[o].value = res[o]
      }
      let start = 0
      let end = 0
      that.marketsData = []
      for (let i in that.marketsLength) {
        if (i < 1) {
          start = 0
          end = that.marketsLength[0]
        } else {
          start = start + that.marketsLength[i - 1]
          end = end + that.marketsLength[i]
        }
        that.marketsData.push(that.nameData.slice(start, end))
      }
    },
    _getIndicators () {
      var nameData = []
      var agentData = []
      var marketsData = []
      var marketsLength = []
      getIndicators({
        session: this.userInfo.session
      }).then(res => {
        this.marketNav = Object.keys(res)
        this.marketNav.unshift('自选')
        for (var i in res) {
          marketsData = marketsData.concat(res[i])
          marketsLength.push(res[i].length)
        }

        getFavorIndicatorList({
          session: this.userInfo.session
        }).then(res => {
          marketsLength.unshift(res.length)
          marketsData = res.concat(marketsData)
          for (let o = 0; o < marketsData.length; o++) {
            agentData.push(marketsData[o].table_name)
            nameData.push({
              name: marketsData[o].indicator_name,
              code: marketsData[o].indicator_code,
              id: marketsData[o].indicator_id,
              status: marketsData[o].status,
              value: []
            })
          }
          this.marketsLength = marketsLength
          this.nameData = nameData
          this.socket = new WebSocketClass('markets', agentData, this.getConfigResult)
          this.socket.connect()
        })
      })
    },
    change (i) {
      this.type = i
    },
    shadow () {
      addClass(this.$refs.test, 'red')
      setTimeout(() => {
        removeClass(this.$refs.test, 'red')
      }, 500)
    }
  },
  watch: {
    type (val) {
      this.socket.closeMyself()
      this.marketsData = []
      this._getIndicators()
    }
  },
  destroyed () {
    this.socket.closeMyself()
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
            color $color-yellow
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
