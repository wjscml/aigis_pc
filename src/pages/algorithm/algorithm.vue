<template>
  <div class="algorithm-wrapper">
    <div class="algorithm-nav">
      <row-nav :nav="algoNav" @change="_getAlgoList"></row-nav>
    </div>
    <algorithm-charts></algorithm-charts>
    <load-more :tips="tips" :isLoad="isLoad" @loadMore="loadMore"></load-more>
  </div>
</template>

<script>
import RowNav from 'base/row-nav/row-nav'
import AlgorithmCharts from 'components/algorithm-charts/algorithm-charts'
import LoadMore from 'base/load-more/load-more'
import { getCategories } from 'api'

export default {
  data () {
    return {
      algoNav: [],
      tips: '点击加载更多',
      page: 0,
      isLoad: null
    }
  },
  created () {
    this._getAlgoList()
  },
  methods: {
    _getAlgoList () {
      getCategories().then(res => {
        this.algoNav = res.splice(0, 5)
        this.algoNav = [ '策略评分', '累计收益', '年化收益' ]
      })
    },
    loadMore () {
      this.tips = '加载中...'
      this.isLoad = true
      this.page++
    }
  },
  components: {
    AlgorithmCharts,
    RowNav,
    LoadMore
  }
}
</script>

<style lang="stylus">
.algorithm-wrapper
  .algorithm-nav
    display flex
    justify-content center
    margin-right 30px
    margin-bottom 30px
    .row-nav
      .nav-btn
        width 100px
  .charts-wrapper
    .charts-column
      min-width 284px
    @media screen and (min-width: 1270px)
      .charts-column
        width calc(33.3% - 66px)
    @media screen and (max-width: 920px)
      .charts-column
        width calc(100% - 66px)
</style>
