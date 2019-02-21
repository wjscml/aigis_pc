<template>
  <div class="index-wrapper">
    <div class="index-left">
      <div class="index-algorithm">
        <algorithm-charts></algorithm-charts>
      </div>
      <div class="index-news">
        <news></news>
      </div>
    </div>
    <div class="index-right">
      <market-charts></market-charts>
    </div>
  </div>
</template>

<script>
import AlgorithmCharts from 'components/algorithm-charts/algorithm-charts'
import MarketCharts from 'components/market-charts/market-charts'
import News from 'components/news/news'

export default {
  name: 'index',
  data () {
    return {

    }
  },
  created () {

  },
  components: {
    AlgorithmCharts,
    MarketCharts,
    News
  }
}
</script>

<style lang="stylus">
.index-wrapper
  display flex
  justify-content space-between
  margin-right 30px
  .index-left
    flex 2
    .index-algorithm
      .charts-column
        &:nth-child(1)
          width calc(100% - 66px)
          min-width 650px
          .info
            p
              span
                float right
                &.label
                  margin-right 20px
                  margin-top 16px
        &:nth-child(2)
          margin-right 26px
    .index-news
      margin-top 24px
  .index-right
    flex 1

</style>
