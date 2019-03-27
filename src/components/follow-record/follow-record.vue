<template>
<div class="record">
  <h1 class="record-title">
    <i class="icon-record"></i>
    <span>成交记录</span>
  </h1>
  <div class="record-content">
    <div>
      <div class="column">
        <span class="item name">成交合约</span>
        <span class="item sale">买卖</span>
        <span class="item kaiping">开平</span>
        <span class="item price">成交价格</span>
        <span class="item amount">成交手数</span>
        <span class="item time">成交时间</span>
      </div>
      <div class="column" v-for="(column, index) in data" :key="index">
        <span class="item name">{{column.indicator_name}}</span>
        <div class="item sale">
          <span class="left" v-if="column.is_buy==0">买</span>
          <span class="right" v-if="column.is_buy==1">卖</span>
        </div>
        <div class="item kaiping">
          <span v-if="column.position==0">平仓</span>
          <span v-if="column.position==1">开仓</span>
        </div>
        <span class="item price">{{column.price | toNumber}}</span>
        <span class="item amount">{{column.deal_volume}}</span>
        <span class="item time">{{column.deal_time | getLocalTime}}</span>
      </div>
    </div>
    <loading-small v-show="data.length == 0"></loading-small>
  </div>
</div>
</template>

<script>
import LoadingSmall from 'base/loading/loading-small'
import { toDecimal } from 'common/js/data'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    toNumber (str) {
      return toDecimal(str)
    },
    replaceZero (str) {
      return str.replace(/00$/, '')
    },
    getLocalTime (nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, '')
    }
  },
  components: {
    LoadingSmall
  }
}
</script>

<style lang="stylus" scoped>
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
</style>
