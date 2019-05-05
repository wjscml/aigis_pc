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
      isFirst: true,
      nameData: [
        { table_name: 'COMMODITY_CL00Y_NYM', name: '原油', code: 'CL00Y.NYM' },
        { table_name: 'COMMODITY_GC00Y_CMX', name: '黄金', code: 'GC00Y.CMX' },
        { table_name: 'COMMODITY_HG00Y_CMX', name: '铜', code: 'HG00Y.CMX' },
        { table_name: 'CURRENCY_USDCNH_FX', name: '人民币汇率', code: 'USDCNH.FX' },
        { table_name: 'INDEX_000001_SH', name: '上证指数', code: '000001.SH' },
        { table_name: 'INDEX_IXIC_GI', name: '纳斯达克100', code: 'IXIC.GI' },
        { table_name: 'INDEX_SPX_GI', name: '标普500', code: 'SPX.GI' }
      ],
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
  computed: {

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
      window.open(`/market/site?symbol=${item.code}&interval=1D&description=${item.name}`)
    },
    getScrollData () {
      let data = []
      if (this.screenWidth < 1280) {
        data = this.marketsData.slice(0, 5)
        return data
      } else if (this.screenWidth < 1600) {
        data = this.marketsData.slice(0, 6)
        return data
      }
      return this.marketsData.slice(0, 7)
    },
    getConfigResult (res) {
      if (res.length) {
        // scrollData = res.data.map((o, i) => {
        //   return Object.assign(o, this.nameData[i])
        // })
        if (this.isFirst) {
          this.isFirst = false
          this.marketsData = this.nameData
          for (let o in res) {
            this.marketsData[o].value = res[o]
          }
        } else {
          for (let o in res) {
            if (res[o] !== '--') {
              this.marketsData[o].value = res[o]
            }
          }
        }
        this.scrollData = this.getScrollData()
      }
    },
    _getScrollData () {
      var agentData = []
      for (let i in this.nameData) {
        agentData.push(this.nameData[i].table_name)
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
@import "~common/stylus/variable"
.scroll
  display flex
  justify-content space-around
  padding 12px 0 14px
  background-color $color-light-background
  .item
    display flex
    flex-direction column
    justify-content space-between
    padding 0 22px
    width calc(16.66% - 44px)
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
@media screen and (max-width: 1280px)
  .scroll
    .item
      width calc(20% - 44px)

</style>
