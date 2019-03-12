<template>
  <div class="news-more">
    <img class="image" src="./loading.png" v-show="isLoad">
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
  .news-more
    display flex
    align-items center
    justify-content center
    margin 20px 0
    .icon-pull_down
      margin-right 4px
      font-size 24px
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
      margin-right 4px
      width 14px
      height 14px
      animation: loadingRotate .4s linear infinite forwards
@keyframes loadingRotate
  0%
    -webkit-transform: rotate(0) translateZ(0)
    transform: rotate(0) translateZ(0)
  50%
    -webkit-transform: rotate(180deg) translateZ(0)
    transform: rotate(180deg) translateZ(0)
  100%
    -webkit-transform: rotate(360deg) translateZ(0)
    transform: rotate(360deg) translateZ(0)

</style>
