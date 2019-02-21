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
          id: 'chart0',
          title: '格雷厄姆数字价值投资法',
          isRecommend: 1,
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
        },
        {
          id: 'chart1',
          title: '风险平价ETF配置',
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
        },
        {
          id: 'chart2',
          title: '盈利倍增',
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
