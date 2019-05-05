<template>
  <div class="suggest">
    <div class="suggest-column" v-for="(column, index) in searchData" :key="index" @click="toDetail(column)">
      <span class="symbol">{{column.symbol}}</span>
      <span class="name">{{column.cn_name}}</span>
      <span class="type">{{column.type}}</span>
    </div>
    <div class="noResult" v-show="hasData && !searchData.length">{{tips}}</div>
  </div>
</template>

<script>
import { getSearch } from 'api'

export default {
  data () {
    return {
      searchData: [],
      hasData: null,
      tips: '没有符合您搜索条件的商品品种代码.'
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  methods: {
    _getSearchData () {
      getSearch({
        q: this.query
      }).then(res => {
        // console.log(res)
        if (res.length) {
          this.searchData = res
        } else {
          this.searchData = []
        }
      })
    },
    toDetail (item) {
      window.open(`/market/site?symbol=${item.symbol}&interval=1D&description=${item.description}`)
    }
  },
  watch: {
    query (q) {
      this.searchData = []
      if (q !== '') {
        this.hasData = true
        this._getSearchData()
      } else {
        this.hasData = false
      }
    }
  },
  components: {

  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
.suggest
  border-radius 2px
  background-color rgba(255, 255, 255, 0.9)
  .suggest-column
    display flex
    align-items center
    height 32px
    padding 0 40px 0 20px
    cursor pointer
    &:hover
      border-radius 2px
      background-color $color-white
    .symbol
      min-width 110px
      font-weight 600
      color $color-light-background
    .name
      flex 1
      color $color-light-background
  .noResult
    height 32px
    line-height 32px
    text-align center
    color $color-light-purple
</style>
