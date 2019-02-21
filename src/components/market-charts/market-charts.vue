<template>
  <div class="charts-wrapper" ref="chartsWrapper">
    <div class="charts-column" v-for="(column, index) in charts" :key="index">
      <div class="column-title" >
        <p class="name">{{column.title}}</p>
        <i class="icon-more" @click="toggleLayer(index)"></i>
        <div class="layer_menu_list" v-show="index == limit">
          <ul >
            <li>置顶</li>
            <li>删除行情</li>
          </ul>
        </div>
        <div class="mask" @click="hideLayer" v-show="index == limit"></div>

      </div>
      <chart :sourceData="column.data" :name="column.id" :height="186" :fieldsText="['Tokyo']" :tickCount="5" :textColor="'#fff'" :keyColor="['#fff']"></chart>
    </div>
  </div>
</template>

<script>
import Chart from 'base/chart/chart'

export default {
  data () {
    return {
      limit: -1,
      charts: [
        {
          id: 'market0',
          title: '纽约铜',
          value1: 21.36,
          value2: 10.18,
          value3: 32.72,
          data: [
            { month: '2019/01/11', Tokyo: 7.0 },
            { month: '2019/01/12', Tokyo: 6.9 },
            { month: '2019/01/13', Tokyo: 9.5 },
            { month: '2019/01/14', Tokyo: 14.5 },
            { month: '2019/01/15', Tokyo: 18.4 },
            { month: '2019/01/16', Tokyo: 21.5 },
            { month: '2019/01/17', Tokyo: 25.2 },
            { month: '2019/01/18', Tokyo: 26.5 },
            { month: '2019/01/19', Tokyo: 23.3 },
            { month: '2019/01/20', Tokyo: 18.3 },
            { month: '2019/01/21', Tokyo: 13.9 },
            { month: '2019/01/22', Tokyo: 9.6 }
          ]
        },
        {
          id: 'market1',
          title: '黄金',
          value1: 21.36,
          value2: 10.18,
          value3: 32.72,
          data: [
            { month: '2019/01/11', Tokyo: 7.0 },
            { month: '2019/01/12', Tokyo: 6.9 },
            { month: '2019/01/13', Tokyo: 9.5 },
            { month: '2019/01/14', Tokyo: 14.5 },
            { month: '2019/01/15', Tokyo: 18.4 },
            { month: '2019/01/16', Tokyo: 21.5 },
            { month: '2019/01/17', Tokyo: 25.2 },
            { month: '2019/01/18', Tokyo: 26.5 },
            { month: '2019/01/19', Tokyo: 23.3 },
            { month: '2019/01/20', Tokyo: 18.3 },
            { month: '2019/01/21', Tokyo: 13.9 },
            { month: '2019/01/22', Tokyo: 9.6 }
          ]
        },
        {
          id: 'market2',
          title: '原油',
          value1: 21.36,
          value2: 10.18,
          value3: 32.72,
          data: [
            { month: '2019/01/11', Tokyo: 7.0 },
            { month: '2019/01/12', Tokyo: 6.9 },
            { month: '2019/01/13', Tokyo: 9.5 },
            { month: '2019/01/14', Tokyo: 14.5 },
            { month: '2019/01/15', Tokyo: 18.4 },
            { month: '2019/01/16', Tokyo: 21.5 },
            { month: '2019/01/17', Tokyo: 25.2 },
            { month: '2019/01/18', Tokyo: 26.5 },
            { month: '2019/01/19', Tokyo: 23.3 },
            { month: '2019/01/20', Tokyo: 18.3 },
            { month: '2019/01/21', Tokyo: 13.9 },
            { month: '2019/01/22', Tokyo: 9.6 }
          ]
        },
        {
          id: 'market3',
          title: '美元汇率',
          value1: 21.36,
          value2: 10.18,
          value3: 32.72,
          data: [
            { month: '2019/01/11', Tokyo: 7.0 },
            { month: '2019/01/12', Tokyo: 6.9 },
            { month: '2019/01/13', Tokyo: 9.5 },
            { month: '2019/01/14', Tokyo: 14.5 },
            { month: '2019/01/15', Tokyo: 18.4 },
            { month: '2019/01/16', Tokyo: 21.5 },
            { month: '2019/01/17', Tokyo: 25.2 },
            { month: '2019/01/18', Tokyo: 26.5 },
            { month: '2019/01/19', Tokyo: 23.3 },
            { month: '2019/01/20', Tokyo: 18.3 },
            { month: '2019/01/21', Tokyo: 13.9 },
            { month: '2019/01/22', Tokyo: 9.6 }
          ]
        }
      ]
    }
  },
  methods: {
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
            line-height 24px
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
