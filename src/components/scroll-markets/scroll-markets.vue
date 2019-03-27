<template>
  <div class="scroll" v-show="scrollData.length">
    <div class="item" v-for="(item, index) in scrollData" :key="index" @click="toDetail(item)">
      <div class="item-top">
        <span>{{item.name}} ·</span><span>{{item.value[0] | toNumber}}</span>
      </div>
      <div class="item-bottom" :class="item.value[6] < 0 ? 'green' : 'red'">
        <i :class="item.value[6] < 0 ? 'icon-down' : 'icon-up'"></i>
        <div>
          <span class="change">{{item.value[7] | toPercent}}</span><span>{{item.value[6] | toNumber}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toDecimal } from 'common/js/data.js'
import WebSocketClass from 'api/socket.js'

export default {
  data () {
    return {
      scrollData: [],
      screenWidth: document.body.clientWidth
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
  mounted () {
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
      })()
    }
  },
  created () {
    this._getScrollData()
  },
  methods: {
    toDetail (item) {
      window.open(`https://aigis.leadfintech.com:8800/?symbol=${item.code}&interval=1D&description=${item.name}`)
    },
    getConfigResult (res) {
      let nameData = [
        { table_name: 'INDEX_SPX_GI', name: '标普500', code: 'SPX.GI' },
        { table_name: 'INDEX_IXIC_GI', name: '纳斯达克100', code: 'IXIC.GI' },
        { table_name: 'INDEX_000001_SH', name: '上证指数', code: '000001.SH' },
        { table_name: 'COMMODITY_CL00Y_NYM', name: '原油', code: 'CL00Y.NYM' },
        { table_name: 'COMMODITY_GC00Y_CMX', name: '黄金', code: 'GC00Y.CMX' },
        { table_name: 'COMMODITY_USDX_FX', name: '美元指数', code: 'USDX.FX' },
        { table_name: 'COMMODITY_HG00Y_CMX', name: '铜', code: 'HG00Y.CMX' }
      ]
      if (res) {
        // scrollData = res.data.map((o, i) => {
        //   return Object.assign(o, this.nameData[i])
        // })
        for (let o in res) {
          nameData[o].value = res[o]
        }
        this.scrollData = nameData.splice(0, 7)
        if (this.screenWidth < 1318) {
          this.scrollData = this.scrollData.splice(0, 5)
        } else if (this.screenWidth < 1600) {
          this.scrollData = this.scrollData.splice(0, 6)
        }
      }
    },
    _getScrollData () {
      let nameData = [
        { table_name: 'INDEX_SPX_GI', name: '标普500', code: 'SPX.GI' },
        { table_name: 'INDEX_IXIC_GI', name: '纳斯达克100', code: 'IXIC.GI' },
        { table_name: 'INDEX_000001_SH', name: '上证指数', code: '000001.SH' },
        { table_name: 'COMMODITY_CL00Y_NYM', name: '原油', code: 'CL00Y.NYM' },
        { table_name: 'COMMODITY_GC00Y_CMX', name: '黄金', code: 'GC00Y.CMX' },
        { table_name: 'CURRENCY_USDX_FX', name: '美元指数', code: 'USDX.FX' },
        { table_name: 'COMMODITY_HG00Y_CMX', name: '铜', code: 'HG00Y.CMX' }
      ]
      var agentData = []
      for (let i in nameData) {
        agentData.push(nameData[i].table_name)
      }
      this.socket = new WebSocketClass('scrollmarkets', agentData, this.getConfigResult)
      this.socket.connect()
    }
  },
  watch: {
    screenWidth (val) {
      this.screenWidth = val
    }
  },
  destroyed () {
    this.socket.closeMyself()
  }
}
</script>

<style lang="stylus" scoped>
.scroll
  display flex
  justify-content space-between
  padding 12px 0 14px
  background-color $color-light-background
  .item
    display flex
    flex-direction column
    justify-content space-between
    padding 0 22px
    width calc(16.6% - 44px)
    min-width 168px
    height 40px
    font-size 12px
    border-right 1px solid $color-line
    cursor pointer
    &:nth-last-child(1)
      border-right none
    .item-top
      display flex
      justify-content space-between
      color $color-text
    .item-bottom
      display flex
      align-items center
      height 18px
      &.red
        color $color-red
      &.green
        color $color-green
      .icon-up,.icon-down
        margin-right 10px
      .change
        margin-right 8px
        font-weight 600
        font-size 24px
</style>
