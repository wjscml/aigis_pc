<template>
  <div class="news-more">
    <img class="image" src="./loading.gif" v-show="isLoad">
    <span class="text" @click="loadMore">{{tips}}</span>
  </div>
</template>

<script>
export default {
  props: {
    isLoad: {
      type: Boolean,
      default: null
    },
    tips: {
      type: String,
      default: ''
    }
  },
  methods: {
    loadMore () {
      this.$emit('loadMore')
    }
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
  .news-more
    display flex
    align-items center
    justify-content center
    height 20px
    margin 20px 0
    .text
      display inline-block
      font-size: 14px
      color $color-light-purple
      cursor pointer
      &:hover
        color $color-purple
    .image
      display inline-block
      vertical-align middle
      margin-right 8px
      width 20px
      height 20px

</style>
