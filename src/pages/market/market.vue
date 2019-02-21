<template>
  <div class="market">
    <div class="market-nav">
      <row-nav :nav="marketNav"></row-nav>
    </div>
    <div class="market-wrapper">
      <div class="subNav">
        <div class="subNavItem" v-for="(item, index) in subNav" :key="index" :class="{'subNavItem-s':index===type}" @click="change(index)">
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="content">
        <div class="column" v-for="(column, index) in marketsData" :key="index">
          <span class="item name"><a class="name-z">{{column.name}}</a><br>{{column.hup1}}</span>
          <span class="item price">{{column.priceUsd}}</span>
          <span class="item changePer red">{{column.changUsd7d}}</span>
          <span class="item changeUsd green">{{column.changUsd24h}}</span>
          <span class="item rangeDay">{{column.changeUsd1h}}</span>
          <span class="item range52Week">{{column.dup7}}</span>
          <div class="item add"><span>加自选</span></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import RowNav from 'base/row-nav/row-nav'
import { getCategories, getDigiccyList } from 'api'
import { addClass, removeClass } from 'common/js/dom.js'

export default {
  data () {
    return {
      marketsData: [],
      marketNav: [
        { name: '自选' },
        { name: '商品' },
        { name: '外汇' },
        { name: '股指' }
      ],
      subNav: [],
      type: 0
    }
  },
  created () {
    this._getSubNav()
    this._getDigiccyList()
  },
  methods: {
    _getDigiccyList () {
      getDigiccyList().then(res => {
        this.marketsData = res
        this.marketsData.unshift({
          changUsd7d: '涨跌幅',
          changUsd24h: '涨跌额',
          changeUsd1h: '日内区间',
          dup7: '52周区间',
          name: '资产',
          priceUsd: '最新价'
        })
        console.log(this.marketsData)
      })
    },
    _getSubNav () {
      getCategories().then(res => {
        this.subNav = res
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
  components: {
    RowNav
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
          width 14%
          text-align right
          &.name
            width 7%
            text-align left
            .name-z
              color $color-white
          &.price
            font-weight 600
            color $color-white
          &.add
            width 7%
            margin-left 7%
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
</style>
