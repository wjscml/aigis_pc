<template>
  <div class="charts-wrapper" v-show="charts.length">
    <router-link :to="`/algorithm/${column.id}`" tag="div" class="charts-column" v-for="(column, index) in charts" :key="index">
      <p class="title">{{column.title}}</p>
      <chart :sourceData="column.data" :name="column.id" :height="154" :fieldsText="['Tokyo', 'London']" :isPercent="true"></chart>
      <div class="info">
        <p class="left"><span class="value" :class="{'red': column.value1 > 0}">{{column.value1}}%</span><span class="label">累计收益</span></p>
        <p class="center"><span class="value" :class="{'red': column.value2 > 0}">{{column.value2}}%</span><span class="label">年化收益</span></p>
        <p class="right"><span class="value">{{column.value3}}%</span><span class="label">最大回撤</span></p>
      </div>
      <div class="tag" v-if="column.isRecommend">Alaya 推荐</div>
    </router-link>
  </div>
</template>

<script>
import Chart from 'base/chart/chart'

export default {
  data () {
    return {
      charts: [
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
    }
  },
  components: {
    Chart
  }
}
</script>

<style lang="stylus" scoped>
.charts-wrapper
  display flex
  flex-wrap: wrap
  .charts-column
    position relative
    margin 0 26px 26px 0
    width calc(50% - 66px)
    min-width 292px
    padding 24px 20px
    border-radius 10px
    background-color $color-light-background
    cursor pointer
    &:hover
      box-shadow 0 0 3px $color-blue
    .title
      margin-bottom 24px
      line-height 24px
      color #fff
    .info
      display flex
      justify-content space-between
      p
        &.center
          text-align center
        &.right
          text-align right
        span
          display block
          &.value
            margin-top 14px
            line-height 18px
            font-weight 600
            font-size 18px
            &.red
              color $color-red
          &.label
            margin-top 10px
            line-height 14px
    .tag
      position absolute
      right 20px
      top 24px
      padding 0 10px
      line-height 24px
      height 24px
      border-radius 2px
      background-color $color-blue
      color $color-white

</style>
