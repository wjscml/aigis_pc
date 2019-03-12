<template>
  <div class="report-wrapper">
    <report-column :data="nomalList" :timeKey="timeKey"></report-column>
    <div v-show="nomalList.length">
      <load-more @loadMore="loadmore" :tips="tips" :isLoad="isLoad"></load-more>
    </div>
    <loading v-if="!nomalList.length"></loading>
  </div>
</template>

<script>
import ReportColumn from 'components/report-column/report-column'
import LoadMore from 'base/load-more/load-more'
import Loading from 'base/loading/loading'
import { getNomalList } from 'api'
import { mapGetters } from 'vuex'
import { extend } from 'common/js/data'

const COUNT = 6
export default {
  data () {
    return {
      nomalList: [],
      timeKey: [],
      tips: '点击加载更多',
      page: 0,
      isLoad: null
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
        limit: COUNT
      }).then((res) => {
        if (res) {
          this.sourceRes = res
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
    },
    loadmore () {
      this.tips = '加载中...'
      this.isLoad = true
      this.page++
      getNomalList({
        session: this.userInfo.session,
        page: this.page,
        limit: COUNT
      }).then(res => {
        this.isLoad = false
        if (res.length !== 0) {
          this.sourceRes = extend(this.sourceRes, res)
          this.timeKey = Object.keys(this.sourceRes)
          this.nomalList = []
          for (let i in this.sourceRes) {
            this.nomalList.push(this.sourceRes[i])
          }
          this.tips = '点击加载更多'
        } else {
          this.tips = '没有更多数据了'
        }
      })
    }
  },
  components: {
    ReportColumn,
    LoadMore,
    Loading
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
