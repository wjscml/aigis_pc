<template>
  <div class="vip-value-wrapper">
    <div class="vip-value-nav">
      <row-nav :nav="valueNav"></row-nav>
    </div>
    <div class="vip-value-content">
      <div class="value-subNav">
        <span class="subNav-btn" :class="{'subNav-btn-s':index===type}" v-for="(item, index) in subNav" :key="index" @click="change(index)">{{item.time}}</span>
      </div>
      <div class="value-chart">
        <chart :sourceData="charts.data" :name="charts.id" :fieldsText="['Tokyo']" :tickCount="11" :timeCount="5"></chart>
      </div>
      <div class="value-info">
        <div class="item" v-for="(item, index) in valueInfo" :key="index">
          <span class="value" :class="item.value < 0 ? 'green' : 'red'">{{item.value}}</span>
          <span class="name">{{item.name}}</span>
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
      type: 0,
      valueNav: [ '黄金', '原油', '铜', '美元' ],
      subNav: [
        { time: '近1月' },
        { time: '近3月' },
        { time: '近6月' },
        { time: '近1年' },
        { time: '近3年' }
      ],
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
      valueInfo: [
        {
          name: '7日涨跌幅',
          value: '+2.36%'
        },
        {
          name: '基金净值',
          value: '1.78'
        },
        {
          name: '总资产',
          value: '2,427,200'
        },
        {
          name: '委托资金',
          value: '2,000,000'
        },
        {
          name: '累计收益率',
          value: '21.36%'
        },
        {
          name: '年化收益',
          value: '10.18%'
        }
      ]
    }
  },
  methods: {
    change (i) {
      this.type = i
    }
  },
  components: {
    RowNav,
    Chart
  }
}
</script>

<style lang="stylus">
.vip-value-wrapper
  margin 0 30px 30px 0
  min-width 774px
  .vip-value-nav
    margin-bottom 30px
    .row-nav
      display flex
      justify-content center
  .vip-value-content
    padding 4px 0
    border-radius 12px
    background-color $color-light-background
    .value-subNav
      display flex
      align-items center
      height 52px
      padding 0 30px
      border-bottom 1px solid $color-line
      .subNav-btn
        width 56px
        margin-right 36px
        &.subNav-btn-s
          font-weight 600
          color $color-white
    .value-chart
      margin 40px 30px
    .value-info
      display flex
      justify-content space-between
      margin 40px 30px
      .item
        span
          display block
        .value
          font-weight 600
          line-height 18px
          font-size 18px
          color $color-white
        .red
          color $color-red
        .green
          color $color-green
        .name
          margin-top 10px
          line-height 14px
        &:nth-child(2),&:nth-child(4)
          .red,.green
            color $color-white

</style>
