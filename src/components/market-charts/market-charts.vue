<template>
  <div class="charts-wrapper" ref="chartsWrapper" >
    <div class="charts-column" v-for="(column, index) in charts" :key="index">
      <a class="column-wrapper" v-if="charts.length">
        <div class="column-title">
          <i v-show="column.isTop" class="icon-ignore"></i>
          <p class="name" @click="goDetail(column)">{{column.indicator_name}}</p>

          <i class="icon-more" @click="toggleLayer(index)"></i>
          <div class="layer_menu_list" v-show="index == limit">
            <ul>
              <li @click.stop="stick(index)" v-show="!column.isTop">置顶</li>
              <li @click.stop="unstick(index)" v-show="column.isTop">取消置顶</li>
            </ul>
          </div>

          <div class="mask" @click="hideLayer" v-show="index == limit"></div>
        </div>
        <div @click="goDetail(column)">
          <chart ref="chart" :sourceData="column.data" :name="column.name" :height="186"
          :fieldsText="['value']" :tickCount="5" :textColor="'#fff'" :keyColor="['#fff']"></chart>
        </div>
      </a>
    </div>
    <loading-small v-show="!charts.length"></loading-small>
  </div>
</template>

<script>
import LoadingSmall from 'base/loading/loading-small'
import Chart from 'base/chart/chart'
import { mapActions, mapGetters } from 'vuex'
import { getFavorIndicatorList, getDaysData } from 'api'
import { setTimeout } from 'timers';

const default1 = { id: 1, indicator_id: 3, indicator_name: 'WTI原油当月连续', indicator_code: 'CL00Y.NYM', status: 1 }
const default2 = { id: 9, indicator_id: 5, indicator_name: 'COMEX黄金', indicator_code: 'GC00Y.CMX', status: 1 }
const default3 = { id: 10, indicator_id: 6, indicator_name: 'COMEX铜', indicator_code: 'HG00Y.CMX', status: 1 }
export default {
  data () {
    return {
      limit: -1,
      charts: [],
      chartsData: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'stickNumber'
    ])
  },
  mounted () {

  },
  created () {
    this.getData()
  },
  methods: {
    ...mapActions([
      'saveStickNumber'
    ]),
    goDetail (column) {
      window.open(`/market/site?symbol=${column.indicator_code}&interval=1D&description=${column.indicator_name}`)
    },
    unstick (i) {
      this.toggleLayer(i)
      this.saveStickNumber(0)
      this._getDaysData()
    },
    stick (i) {
      this.toggleLayer(i)
      this.saveStickNumber(this.charts[i].indicator_id)
      this._getDaysData()
    },
    _getDaysData () {
      this.charts = []
      let daysData = this.chartsData
      for (let n in daysData) {
        if (daysData[n].indicator_id === this.stickNumber) {
          daysData[n].isTop = 1
          var returntop = daysData[n]
          daysData = daysData.filter(function (item) {
            return item != returntop
          })
          daysData.unshift(returntop)
          getDaysData({
            indicatorId: daysData[n].indicator_id
          }).then(response => {
            for (let o in response) {
              response[o].time = response[o].ftime,
              response[o].value = Number(response[o].CLOSE)
            }
            daysData[n].data = response
            daysData[n].name = 'indexMarket' + daysData[n].id
          })
        } else {
          daysData[n].isTop = 0
          getDaysData({
            indicatorId: daysData[n].indicator_id
          }).then(response => {
            for (let o in response) {
              response[o].time = response[o].ftime,
              response[o].value = Number(response[o].CLOSE)
            }
            daysData[n].data = response
            daysData[n].name = 'indexMarket' + daysData[n].id
          })
        }
      }
      setTimeout(() => {
        this.charts = daysData
      }, 500)
    },
    getData () {
      getFavorIndicatorList({
        session: this.userInfo.session
      }).then(res => {
        if (res.length > 1) {
          this.chartsData = res
          this._getDaysData()
        } else {
          for (var i in res) {
            if (res[i] === (default1 || default2 || default3)) {
              res.splice(i, 1)
            }
          }
          res.push(default1, default2, default3)
          this.chartsData = res
          this._getDaysData()
        }
      })
    },
    toggleLayer (i) {
      if (i === this.limit) {
        this.limit = -1
      } else {
        this.limit = i
      }
    },
    hideLayer () {
      this.limit = -1
    }
  },
  components: {
    Chart,
    LoadingSmall
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.charts-wrapper
  .charts-column
    min-width 292px
    border-radius 10px
    background-color $color-blue
    &:nth-child(even)
      background-color $color-purple
      .column-title
        .layer_menu_list
          background-color $color-purple
    .column-wrapper
      display block
      padding 24px 20px
      margin-bottom 26px
      .column-title
        position relative
        display flex
        align-items center
        margin-bottom 24px
        height 24px
        color #fff
        .icon-ignore
          margin-right 8px
          color $color-light-blue
        .name
          flex 1
          cursor pointer
        .icon-more
          margin-left 30px
          font-size 16px
          cursor pointer
          &:hover
            color $color-light-blue
        .layer_menu_list
          position absolute
          right 0
          top 24px
          z-index 10
          background $color-blue
          border-radius 4px
          box-shadow: 0 0 3px $color-background
          ul
            padding 6px 0
            li
              display block
              padding 0 20px
              line-height 28px
              color $color-white
              cursor pointer
              &:hover
                background-color $color-dark-blue
        .mask
          position fixed
          top 0
          bottom 0
          left 0
          right 0
          z-index 9

</style>
