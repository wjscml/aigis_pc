<template>
  <div class="vip-follow-wrapper">
    <div class="vip-follow-nav">
      <row-nav :nav="followNav"></row-nav>
    </div>
    <div class="vip-follow-chart">
      <chart :sourceData="charts.data" :name="charts.id" :fieldsText="['Tokyo']"
        :point="['2019/01/17', 25.2]" :pointValue="'受稳健货币政策影响，协定存款利\n率居高不下,收益率达6.763%'"
        :tickCount="11" :timeCount="5" :keyColor="['#fff']">
      </chart>
    </div>
    <div class="vip-follow-content">
      <div class="record">
        <h1 class="record-title">
          <i class="icon-record"></i>
          <span>成交记录</span>
        </h1>
        <div class="record-content">
          <div class="column" v-for="(column, index) in records" :key="index">
            <span class="item name">{{column.name}}</span>
            <span class="item sale">{{column.sale}}</span>
            <span class="item kaiping">{{column.kaiping}}</span>
            <span class="item price">{{column.price}}</span>
            <span class="item amount">{{column.amount}}</span>
            <span class="item time">{{column.time}}</span>
          </div>
        </div>
      </div>
      <div class="timeData">
        <h1 class="title">COMEX黄金</h1>
        <div class="content">
          <div class="column">
            <div class="item" v-for="(item, index) in timeData" :key="index">
              <span class="name">{{item.name}}</span>
              <span class="value">{{item.value}}</span>
            </div>
          </div>
          <div class="column" >
            <div class="item" v-for="(item, index) in timeData" :key="index">
              <span class="name">{{item.name}}</span>
              <span class="value">{{item.value}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import RowNav from 'base/row-nav/row-nav'
import Chart from 'base/chart/chart'

export default {
  data () {
    return {
      followNav: [ '铜', '黄金', '美元' ],
      charts: {
        id: 'market0',
        title: '纽约铜',
        value1: 21.36,
        value2: 10.18,
        value3: 32.72,
        data: [
          { month: '2019/01/11', Tokyo: 7.0 },
          { month: '2019/01/12', Tokyo: 6.9 },
          { month: '2019/01/13', Tokyo: 9.5 },
          { month: '2019/01/14', Tokyo: 14.5 },
          { month: '2019/01/15', Tokyo: 18.4 },
          { month: '2019/01/16', Tokyo: 21.5 },
          { month: '2019/01/17', Tokyo: 25.2 },
          { month: '2019/01/18', Tokyo: 26.5 },
          { month: '2019/01/19', Tokyo: 23.3 },
          { month: '2019/01/20', Tokyo: 18.3 },
          { month: '2019/01/21', Tokyo: 13.9 },
          { month: '2019/01/22', Tokyo: 9.6 }
        ]
      },
      records: [
        {
          name: '成交合约',
          sale: '买卖',
          kaiping: '开平',
          price: '成交价格',
          amount: '成交手数',
          time: '成交时间'
        },
        {
          name: 'COMEX黄金',
          sale: '买',
          kaiping: '平仓',
          price: '3110.4',
          amount: 100,
          time: '2019-01-05 13:41:54'
        },
        {
          name: 'COMEX黄金',
          sale: '买',
          kaiping: '平仓',
          price: '3110.4',
          amount: 100,
          time: '2019-01-05 13:41:54'
        },
        {
          name: 'COMEX黄金',
          sale: '买',
          kaiping: '平仓',
          price: '3110.4',
          amount: 100,
          time: '2019-01-05 13:41:54'
        },
        {
          name: 'COMEX黄金',
          sale: '买',
          kaiping: '平仓',
          price: '3110.4',
          amount: 100,
          time: '2019-01-05 13:41:54'
        }
      ],
      timeData: [
        {
          name: '最新',
          value: '2372.0'
        },
        {
          name: '涨跌',
          value: '36.4'
        },
        {
          name: '幅度',
          value: '1.57%'
        },
        {
          name: '总手',
          value: '19309'
        },
        {
          name: '现手',
          value: '1'
        },
        {
          name: '杠杆',
          value: '7.69'
        },
        {
          name: '持仓',
          value: '18367'
        },
        {
          name: '日增',
          value: '-301'
        }
      ]
    }
  },
  created () {
    console.log(this.charts)
  },
  components: {
    RowNav,
    Chart
  }
}
</script>

<style lang="stylus">
.vip-follow-wrapper
  margin 0 30px 30px 0
  min-width 774px
  .vip-follow-nav
    margin-bottom 30px
    .row-nav
      display flex
      justify-content center
  .vip-follow-chart
    padding 26px
    margin-bottom 26px
    border-radius 12px
    background-color $color-dark-blue
  .vip-follow-content
    display flex
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
              text-align left
            &.sale
              width 10%
            &.time
              width 30%
          &:nth-child(1)
            .item
              font-weight 600
              color $color-text
    .timeData
      flex 1
      padding 24px
      border-radius 10px
      background-color $color-light-background
      .title
        margin-bottom 30px
        color $color-white
      .content
        display flex
        .column
          flex 1
          line-height 24px
          .item
            display flex
            color $color-white
            .name
              flex 1
            .value
              font-weight 600
              &.red
                color $color-red
              &.green
                color $color-green
              &.yellow
                color $color-yellow
          &:nth-child(1)
            padding-right 14px
            border-right 1px solid $color-line
          &:nth-child(2)
            padding-left 14px
</style>
