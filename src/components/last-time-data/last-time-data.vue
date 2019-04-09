<template>
  <div class="last-time-data">
    <h1 class="title">{{title}}</h1>
    <div class="content">
      <div class="column" v-for="(column, index) in data" :key="index">
        <div class="item" v-for="(item, index) in column" :key="index">
          <span class="name">{{item.name}}</span>
          <span class="value" :class="colorClass(item.color)">{{item.value}}</span>
        </div>
      </div>
      <loading-small v-show="data.length == 0"></loading-small>
    </div>
  </div>
</template>

<script>
import LoadingSmall from 'base/loading/loading-small'
export default {
  name: 'last-time-data',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  created () {

  },
  methods: {
    colorClass (val) {
      if (val === 'y') {
        return 'yellow'
      } else {
        if (val > 0) {
          return 'red'
        }
        if (val < 0) {
          return 'green'
        }
        if (val === 0) {
          return ''
        }
      }
    }
  },
  components: {
    LoadingSmall
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.last-time-data
  flex 1
  padding 24px
  border-radius 10px
  background-color $color-light-background
  .title
    margin-bottom 30px
    font-size 15px
    color $color-white
  .content
    display flex
    .column
      flex 1
      line-height 24px
      .item
        display flex
        color $color-white
        .name
          flex 1
        .value
          font-weight 600
          &.red
            color $color-red
          &.green
            color $color-green
          &.yellow
            color $color-yellow
      &:nth-child(1)
        padding-right 14px
        border-right 1px solid $color-line
      &:nth-child(2)
        padding-left 14px
</style>
