<template>
  <div class="report-wrapper">
    <report-column :data="nomalList" :timeKey="timeKey"></report-column>
    <load-more :tips="tips"></load-more>
  </div>
</template>

<script>
import ReportColumn from 'components/report-column/report-column'
import LoadMore from 'base/load-more/load-more'
import { getNomalList } from 'api'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      nomalList: [],
      timeKey: [],
      tips: '点击加载更多'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this._getNomalList()
  },
  methods: {
    _getNomalList () {
      getNomalList({
        session: this.userInfo.session,
        page: 0,
        limit: 6
      }).then((res) => {
        console.log(res)
        if (res) {
          this.timeKey = Object.keys(res)

          for (let i in res) {
            this.nomalList.push(res[i])
          }

          this.tips = '点击加载更多'
        } else {
          this.nomalList = []
          this.tips = '暂无数据'
        }
      })
    }
  },
  components: {
    ReportColumn,
    LoadMore
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
