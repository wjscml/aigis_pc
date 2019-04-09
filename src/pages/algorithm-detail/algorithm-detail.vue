<template>
  <div class="algorithm-detail">
    <div class="top-container">
      <div class="info">
        <div class="info-top">
          <div class="item">
            <p class="name">累计收益</p>
            <p class="value">{{charts.value1}}%</p>
          </div>
          <div class="item">
            <p class="name">年化收益</p>
            <p class="value">{{charts.value2}}%</p>
          </div>

        </div>
        <div class="info-bottom">
          <div class="item">
            <p class="value">{{charts.value3}}%</p>
            <p class="name">最大回撤</p>
          </div>
          <div class="item">
            <p class="value">{{charts.data[0].time}}</p>
            <p class="name">开始时间</p>
          </div>
          <div class="item">
            <p class="value">1,000,000</p>
            <p class="name">初始资金</p>
          </div>
        </div>
      </div>
      <div class="style">
        <h1 class="title">风格分析</h1>
        <radar-chart :sourceData="lcharts.data" :name="lcharts.id" :fieldsText="['2019-01', '2019-02']"></radar-chart>
      </div>

    </div>
    <div class="chart-container">
      <chart :sourceData="charts.data" :name="charts.id" :fieldsText="['Tokyo', 'London']" :tickCount="11" :timeCount="5"></chart>
    </div>
  </div>
</template>

<script>
import Chart from 'base/chart/chart'
import RadarChart from 'base/chart/radar-chart'

export default {
  data () {
    return {
      lcharts: {},
      charts: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      let lchartsData = [
        {
          id: 'l0',
          data: [
            {
              item: '贝塔',
              '2019-01': 20 * 3,
              '2019-02': 13 * 3
            }, {
              item: '账面市值比',
              '2019-01': 16 * 3,
              '2019-02': 21 * 3
            }, {
              item: '盈利性',
              '2019-01': 11 * 3,
              '2019-02': 16 * 3
            }, {
              item: '成长性',
              '2019-01': 10 * 3,
              '2019-02': 18 * 3
            }, {
              item: '杠杆率',
              '2019-01': 16 * 3,
              '2019-02': 23 * 3
            }, {
              item: '流动性',
              '2019-01': 22 * 3,
              '2019-02': 15 * 3
            }, {
              item: '动量',
              '2019-01': 20 * 3,
              '2019-02': 14 * 3
            }, {
              item: '非线性市值',
              '2019-01': 11 * 3,
              '2019-02': 17 * 3
            }, {
              item: '残差波动率',
              '2019-01': 19 * 3,
              '2019-02': 14 * 3
            }, {
              item: '市值',
              '2019-01': 12 * 3,
              '2019-02': 24 * 3
            }
          ]
        },
        {
          id: 'l1',
          data: [
            {
              item: '贝塔',
              '2019-01': 66,
              '2019-02': 41
            }, {
              item: '账面市值比',
              '2019-01': 20,
              '2019-02': 30
            }, {
              item: '盈利性',
              '2019-01': 50,
              '2019-02': 60
            }, {
              item: '成长性',
              '2019-01': 30,
              '2019-02': 40
            }, {
              item: '杠杆率',
              '2019-01': 35,
              '2019-02': 43
            }, {
              item: '流动性',
              '2019-01': 67,
              '2019-02': 60
            }, {
              item: '动量',
              '2019-01': 46,
              '2019-02': 32
            }, {
              item: '非线性市值',
              '2019-01': 70,
              '2019-02': 67
            }, {
              item: '残差波动率',
              '2019-01': 71,
              '2019-02': 68
            }, {
              item: '市值',
              '2019-01': 70,
              '2019-02': 75
            }
          ]
        },
        {
          id: 'l2',
          data: [
            {
              item: '贝塔',
              '2019-01': 70,
              '2019-02': 30
            }, {
              item: '账面市值比',
              '2019-01': 60,
              '2019-02': 70
            }, {
              item: '盈利性',
              '2019-01': 50,
              '2019-02': 60
            }, {
              item: '成长性',
              '2019-01': 40,
              '2019-02': 50
            }, {
              item: '杠杆率',
              '2019-01': 60,
              '2019-02': 70
            }, {
              item: '流动性',
              '2019-01': 70,
              '2019-02': 50
            }, {
              item: '动量',
              '2019-01': 50,
              '2019-02': 40
            }, {
              item: '非线性市值',
              '2019-01': 30,
              '2019-02': 40
            }, {
              item: '残差波动率',
              '2019-01': 60,
              '2019-02': 40
            }, {
              item: '市值',
              '2019-01': 50,
              '2019-02': 60
            }
          ]
        }
      ]
      let chartsData = [
        {
          id: '7001',
          title: '格雷厄姆数字价值投资法',
          isRecommend: 1,
          value1: 21.36,
          value2: 10.18,
          value3: 32.72,
          data: [
            { time: '2019/01/01', Tokyo: 7.0, London: 3.9 },
            { time: '2019/01/03', Tokyo: 6.9, London: 4.2 },
            { time: '2019/01/05', Tokyo: 9.5, London: 5.7 },
            { time: '2019/01/07', Tokyo: 14.5, London: 8.5 },
            { time: '2019/01/09', Tokyo: 20.5, London: 16.6 },
            { time: '2019/01/11', Tokyo: 23.3, London: 14.2 },
            { time: '2019/01/13', Tokyo: 18.3, London: 10.3 },
            { time: '2019/01/15', Tokyo: 13.9, London: 6.6 },
            { time: '2019/01/17', Tokyo: 11.6, London: 6.8 },
            { time: '2019/01/19', Tokyo: 16.3, London: 12.2 },
            { time: '2019/01/21', Tokyo: 18.3, London: 10.3 },
            { time: '2019/01/23', Tokyo: 13.9, London: 6.6 },
            { time: '2019/01/25', Tokyo: 14.6, London: 4.8 },
            { time: '2019/01/27', Tokyo: 18.4, London: 11.9 },
            { time: '2019/01/29', Tokyo: 21.5, London: 15.2 },
            { time: '2019/01/31', Tokyo: 25.2, London: 17.0 },
            { time: '2019/02/02', Tokyo: 26.5, London: 16.6 }
          ]
        },
        {
          id: '7002',
          title: '风险平价ETF配置',
          value1: 28.96,
          value2: 55.25,
          value3: 16.13,
          data: [
            { time: '2018/08/15', Tokyo: 0.1, London: -0.1 },
            { time: '2018/08/30', Tokyo: 2.7, London: -3.7 },
            { time: '2018/09/15', Tokyo: 1.7, London: -8.3 },
            { time: '2018/09/30', Tokyo: -0.3, London: -10.3 },
            { time: '2018/10/15', Tokyo: 0.9, London: -8.5 },
            { time: '2018/10/30', Tokyo: -12.0, London: -14.2 },
            { time: '2018/11/15', Tokyo: -4.9, London: -13.7 },
            { time: '2018/11/30', Tokyo: 8.5, London: -10.5 },
            { time: '2018/12/15', Tokyo: 6.7, London: -11.3 },
            { time: '2018/12/30', Tokyo: 11.5, London: -13.2 },
            { time: '2019/01/15', Tokyo: 15.6, London: -3.6 },
            { time: '2019/01/30', Tokyo: 37.1, London: 9.1 }
          ]
        },
        {
          id: '7003',
          title: '盈利倍增',
          value1: 20.64,
          value2: 87.86,
          value3: 5.08,
          data: [
            { time: '2019/01/11', Tokyo: -0.14, London: -1.49 },
            { time: '2019/01/12', Tokyo: -0.61, London: -0.46 },
            { time: '2019/01/13', Tokyo: -0.34, London: -6.11 },
            { time: '2019/01/14', Tokyo: -1.00, London: -8.98 },
            { time: '2019/01/15', Tokyo: -0.37, London: -5.28 },
            { time: '2019/01/16', Tokyo: -3.85, London: -1.95 },
            { time: '2019/01/17', Tokyo: 1.50, London: 2.23 },
            { time: '2019/01/18', Tokyo: 9.82, London: 5.77 },
            { time: '2019/01/19', Tokyo: 12.44, London: 8.05 },
            { time: '2019/01/20', Tokyo: 15.71, London: 12.91 },
            { time: '2019/01/21', Tokyo: 20.19, London: 18.11 },
            { time: '2019/01/22', Tokyo: 19.92, London: 14.53 }
          ]
        }
      ]
      if (this.$route.params.id === '7001') {
        this.charts = chartsData[0]
        this.lcharts = lchartsData[0]
      }
      if (this.$route.params.id === '7002') {
        this.charts = chartsData[1]
        this.lcharts = lchartsData[1]
      }
      if (this.$route.params.id === '7003') {
        this.charts = chartsData[2]
        this.lcharts = lchartsData[2]
      }
    }
  },
  components: {
    Chart,
    RadarChart
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
.algorithm-detail
  .top-container
    display flex
    margin-bottom 30px
    .info
      flex 2
      padding 50px 40px 0 40px
      margin-right 30px
      border-radius 10px
      background-color $color-blue
      color $color-white
      .info-top
        display flex
        padding-bottom 50px
        border-bottom  1px solid $color-search
        .item
          flex 1
          .name
            margin-bottom 24px
          .value
            font-size 48px
          &:nth-child(1)
            .value
              font-size 48px
              font-weight 600
              color $color-yellow
      .info-bottom
        display flex
        padding-top 50px
        .item
          flex 1
          text-align center
          .name
            margin-top 14px
          .value
            font-size 24px
    .style
      flex 1
      padding 20px 24px
      background-color $color-light-background
      border-radius 10px
      .title
        color $color-white
        font-size 15px
  .chart-container
    padding 40px 30px
    border-radius 10px
    background-color $color-light-background
</style>
