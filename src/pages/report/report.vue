<template>
  <div class="report-wrapper">
    <report-column :data="news"></report-column>
  </div>
</template>

<script>
import ReportColumn from 'components/report-column/report-column'
import { getNewsList } from 'api'

export default {
  data () {
    return {
      news: [],
      tips: '点击加载更多'
    }
  },
  created () {
    this._getNewsList()
  },
  methods: {
    _getNewsList (type) {
      getNewsList({
        page: 0,
        type: type
      }).then((res) => {
        if (res) {
          this.news = res
          this.tips = '点击加载更多'
        } else {
          this.news = []
          this.tips = '暂无数据'
        }
      })
    }
  },
  components: {
    ReportColumn
  }
}
</script>

<style lang="stylus">
@media screen and (max-width: 1048px)
  .report-column
    .report-column-main
      .column
        width calc(100% - 74px)
@media screen and (min-width: 1440px)
  .report-column
    .report-column-main
      .column
        width calc(33.3% - 74px)
</style>
