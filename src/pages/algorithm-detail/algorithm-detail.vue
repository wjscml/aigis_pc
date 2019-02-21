<template>
  <div class="algorithm-detail">
    <div class="top-container">
      <div class="info">

      </div>
      <div class="style">
        <h1 class="title">风格分析</h1>
        <radar-chart :sourceData="lcharts.data" :name="lcharts.id" :fieldsText="['a', 'b']"></radar-chart>
      </div>

    </div>
    <div class="chart-container">

      <chart :sourceData="charts.data" :name="charts.id" :fieldsText="['Tokyo']" :tickCount="11" :timeCount="5"></chart>
    </div>
  </div>
</template>

<script>
import Chart from 'base/chart/chart'
import RadarChart from 'base/chart/radar-chart'

export default {
  data () {
    return {
      lcharts: {
        id: 'l0',
        title: '纽约铜',
        value1: 21.36,
        value2: 10.18,
        value3: 32.72,
        data: [
          {
            item: 'Design',
            a: 70,
            b: 30
          }, {
            item: 'Development',
            a: 60,
            b: 70
          }, {
            item: 'Marketing',
            a: 50,
            b: 60
          }, {
            item: 'Users',
            a: 40,
            b: 50
          }, {
            item: 'Test',
            a: 60,
            b: 70
          }, {
            item: 'Language',
            a: 70,
            b: 50
          }, {
            item: 'Technology',
            a: 50,
            b: 40
          }, {
            item: 'Support',
            a: 30,
            b: 40
          }, {
            item: 'Sales',
            a: 60,
            b: 40
          }, {
            item: 'UX',
            a: 50,
            b: 60
          }
        ]
      },
      charts: {
        id: 'm0',
        title: '纽约铜',
        value1: 21.36,
        value2: 10.18,
        value3: 32.72,
        data: [
          { month: '2019/01/11', Tokyo: 7.0, London: 3.9 },
          { month: '2019/01/12', Tokyo: 6.9, London: 4.2 },
          { month: '2019/01/13', Tokyo: 9.5, London: 5.7 },
          { month: '2019/01/14', Tokyo: 14.5, London: 8.5 },
          { month: '2019/01/15', Tokyo: 18.4, London: 11.9 },
          { month: '2019/01/16', Tokyo: 21.5, London: 15.2 },
          { month: '2019/01/17', Tokyo: 25.2, London: 17.0 },
          { month: '2019/01/18', Tokyo: 26.5, London: 16.6 },
          { month: '2019/01/19', Tokyo: 23.3, London: 14.2 },
          { month: '2019/01/20', Tokyo: 18.3, London: 10.3 },
          { month: '2019/01/21', Tokyo: 13.9, London: 6.6 },
          { month: '2019/01/22', Tokyo: 9.6, London: 4.8 }
        ]
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
.algorithm-detail
  .top-container
    display flex
    margin-bottom 30px
    .info
      flex 2
      height 300px
      margin-right 30px
      border-radius 10px
      background-color $color-blue
    .style
      flex 1
      padding 20px 24px
      background-color $color-light-background
      border-radius 10px
      .title
        color $color-white
  .chart-container
    padding 40px 30px
    border-radius 10px
    background-color $color-light-background
</style>
