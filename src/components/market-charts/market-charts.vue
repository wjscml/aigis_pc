<template>
  <div class="charts-wrapper" ref="chartsWrapper">
    <div class="charts-column" v-for="(column, index) in charts" :key="index">
      <a :href="`https://aigis.leadfintech.com:8800/?symbol=${column.code}&interval=1D&description=${column.name}`" target="_blank">
        <div class="column-title" >
          <p class="name">{{column.name}}</p>
          <i class="icon-more" @click="toggleLayer(index)"></i>
          <div class="layer_menu_list" v-show="index == limit">
            <ul>
              <li>置顶</li>
            </ul>
          </div>
          <div class="mask" @click="hideLayer" v-show="index == limit"></div>
        </div>
        <chart ref="chart" :sourceData="column.data" :name="column.id" :height="186"
        :fieldsText="['value']" :tickCount="5" :textColor="'#fff'" :keyColor="['#fff']"></chart>
      </a>
    </div>
  </div>
</template>

<script>
import Chart from 'base/chart/chart'
import { mapActions, mapGetters } from 'vuex'
import { getFavorIndicatorList, getDaysData, addFavorIndicator } from 'api'

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
    deleteFavor (item, i) {
      addFavorIndicator({
        indicatorId: item.indicatorId,
        session: this.userInfo.session,
        action: 2
      }).then(res => {
        this.toggleLayer(i)
        console.log(res)
        this.getData()
      })
    },
    stick (i) {
      this.toggleLayer(i)
      this.saveStickNumber(i)
      var returntop = this.charts[i]
      this.charts.splice(i, 1)
      this.charts.unshift(returntop)
    },
    _getDaysData (res) {
      for (let r in res) {
        getDaysData({
          indicatorId: res[r].indicator_id
        }).then(response => {
          var data = []
          for (let i in response) {
            data.push({
              time: response[i].ftime,
              value: Number(response[i].CLOSE)
            })
          }
          this.charts.push({
            data: data,
            id: 'indexChart' + res[r].id,
            name: res[r].indicator_name,
            indicatorId: res[r].indicator_id,
            code: res[r].indicator_code
          })
        })
      }
    },
    getData () {
      getFavorIndicatorList({
        session: this.userInfo.session
      }).then(res => {
        if (res.length > 1) {
          this._getDaysData(res)
        } else {
          for (var i in res) {
            if (res[i] === (default1 || default2 || default3)) {
              res.splice(i, 1)
            }
          }
          res.push(default1, default2, default3)
          this._getDaysData(res)
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
    Chart
  }
}
</script>

<style lang="stylus" scoped>
.charts-wrapper
  .charts-column
    margin-bottom 26px
    min-width 292px
    padding 24px 20px
    border-radius 10px
    background-color $color-blue
    &:nth-child(even)
      background-color $color-purple
      .column-title
        .layer_menu_list
          background-color $color-purple
    .column-title
      position relative
      display flex
      align-items center
      margin-bottom 24px
      height 24px
      color #fff
      .name
        flex 1
      .icon-more
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
