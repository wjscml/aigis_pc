<template>
  <div class="scroll" v-show="scrollData.length">
    <a v-for="(item, index) in scrollData" :key="index" :href="`https://aigis.leadfintech.com:8800/?symbol=${item.code}&interval=1D&description=${item.name}`" target="_blank">
      <div class="item">
        <div class="item-top">
          <span>{{item.name}} ·</span><span>{{item.value[0] | toNumber}}</span>
        </div>
        <div class="item-bottom" :class="item.value[1] > 0 ? 'red' : 'green'">
          <i :class="item.value[1] > 0 ? 'icon-up' : 'icon-down'"></i>
          <div>
            <span class="change">{{item.value[1] | toNumber}}</span><span>{{item.value[2] | toPercent}}</span>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nameData: [
        { table_name: 'INDEX_SPX_GI', name: '标普500', code: 'SPX.GI' },
        { table_name: 'INDEX_IXIC_GI', name: '纳斯达克100', code: 'IXIC.GI' },
        { table_name: 'INDEX_000001_SH', name: '上证指数', code: '000001.SH' },
        { table_name: 'COMMODITY_HG00Y_CMX', name: '原油', code: 'CL00Y.NYM' },
        { table_name: 'COMMODITY_LCPS_LME', name: '黄金', code: 'GC00Y.CMX' },
        { table_name: 'COMMODITY_CL00Y_NYM', name: '美元指数', code: 'USDX.FX' },
        { table_name: 'COMMODITY_LLDS_LME', name: '铜', code: 'HG00Y.CMX' }
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
      return Number(str)
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  created () {
    this._getScrollData()
  },
  methods: {
    getConfigResult (res) {
      if (res) {
        var scrollData = []
        if (this.screenWidth > 1600) {
          scrollData = res.data.map((o, i) => {
            return Object.assign(o, this.nameData[i])
          })
          this.scrollData = scrollData.splice(0, 7)
        } else {
          scrollData = res.data.map((o, i) => {
            return Object.assign(o, this.nameData[i])
          })
          this.scrollData = scrollData.splice(0, 6)
        }
      }
    },
    requstSocketData (data) {
      this.socketApi.sendSock(data, this.getConfigResult)
    },
    _getScrollData () {
      var agentData = {}
      agentData.page = 'scroll_page'
      agentData.data = []
      this.nameData.forEach(el => {
        agentData.data.push({
          table: el.table_name,
          code: el.code,
          indicator: ['NOW', 'CHANGE', 'PCTCHANGE']
        })
      })
      this.requstSocketData(agentData)
    }
  },
  watch: {
    screenWidth (val) {
      this.screenWidth = val
    }
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
