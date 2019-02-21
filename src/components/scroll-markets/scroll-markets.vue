<template>
  <div class="scroll" v-show="scrollData.length">
    <div class="item" v-for="(item, index) in scrollData" :key="index">
      <div class="item-top">
        <span>{{item.name}} ·</span><span>{{item.priceUsd}}</span>
      </div>
      <div class="item-bottom" :class="item.isUp ? 'red' : 'green'">
        <i :class="item.isUp ? 'icon-up' : 'icon-down'"></i>
        <div>
          <span class="change">{{item.changeUsd1h}}</span><span>{{item.priceUsd}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDigiccyScroll } from 'api'

export default {
  data () {
    return {
      scrollData: [],
      screenWidth: document.body.clientWidth
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
    _getScrollData () {
      getDigiccyScroll().then(res => {
        console.log(this.screenWidth)
        if (this.screenWidth > 1600) {
          this.scrollData = res.splice(0, 7)
        } else {
          this.scrollData = res.splice(0, 6)
        }
      })
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
