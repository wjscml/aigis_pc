<template>
  <div class="market-wrapper" >
    <div class="subNav" v-show="subNavData.length">
      <div class="subNavItem" :class="{'subNavItem-s': index==type}" v-for="(item, index) in subNavData" :key="index" @click="change(index)">
        <span>{{item.exchange_code}}</span>
      </div>
    </div>
    <div class="content" v-show="data.length">
      <div class="column" v-for="(item, itemIndex) in marketsData" :key="itemIndex" ref="content">
        <span class="item name" @click="toDetail(item)">
          <a class="name-z">{{item.name}}</a><br>{{item.code}}
        </span>
        <span class="item price">{{item.value[0] | toNumber}}</span>
        <span class="item changePer" :class="item.value[6] > 0 ? 'red' : (item.value[6] == 0 ? '' : 'green')">{{item.value[7] | toPercent}}</span>
        <span class="item change" :class="item.value[6] > 0 ? 'red' : (item.value[6] == 0 ? '' : 'green')">{{item.value[6] | toNumber}}</span>
        <span class="item high">{{item.value[1] | toNumber}}</span>
        <span class="item low">{{item.value[2] | toNumber}}</span>
        <span class="item open">{{item.value[3] | toNumber}}</span>
        <div class="item add" @click="addFavor(item)" v-show="item.favor !== 1"><span>加自选</span></div>
        <div class="item delete" @click="showConfirm(item)" v-show="item.favor == 1"><span>删自选</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import Confirm from 'components/confirm/confirm'
import { toDecimal } from 'common/js/data.js'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    type: {
      type: Number,
      default: 0
    },
    subNavData: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    toPercent (str) {
      var f = parseFloat(str)
      if (isNaN(f)) {
        return str
      }
      return (Math.round(str * 10000) / 100).toFixed(2) + '%'
    },
    toNumber (str) {
      return toDecimal(str)
    }
  },
  computed: {
    marketsData () {
      let tipsData = [{
        name: '资产',
        value: [ '最新价', '最高价', '最低价', '开盘价', '4', '5', '涨跌额', '涨跌幅']
      }]
      let marketsData = tipsData.concat(this.data)
      // console.log(marketsData)
      return marketsData
    }
  },
  methods: {
    change (i) {
      this.$emit('change', i)
    },
    toDetail (item) {
      if (item.name !== '资产') {
        window.open(`/market/site?symbol=${item.code}&interval=1D&description=${item.name}`, '_blank')
      }
    },
    addFavor (item) {
      this.$emit('addFavor', item)
    },
    showConfirm (item) {
      this.$emit('showConfirm', item)
    }
  },
  components: {
    Confirm
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
.market-wrapper
  background-color $color-light-background
  border-radius 12px
  .subNav
    display flex
    align-items center
    height 52px
    border-bottom 1px solid $color-line
    .subNavItem
      padding 0 2px
      margin 0 23px
      cursor pointer
    .subNavItem-s
      position relative
      color $color-white
      span
        &:after
          position absolute
          bottom -13px
          left 0
          content ''
          width 100%
          height 2px
          background-color $color-blue
  .content
    padding 12px 24px
    .column
      display flex
      align-items center
      justify-content space-between
      padding 12px 8px
      line-height 20px
      border-bottom 1px solid $color-line
      transition background-color 0.5s
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
          &.name
            .name-z
              font-weight 600
              color $color-text
            &:hover
              cursor default
              .name-z
                color $color-text
          &.add
            visibility hidden
      &:nth-last-child(1)
        border-bottom none
      &.shadowUp
        background-color $color-red
      &.shadowDown
        background-color $color-green
</style>
