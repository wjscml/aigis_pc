<template>
  <div class="loading">
    <img v-show="hasGif" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    },
    hasGif: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="stylus">
.loading
  width: 100%
  text-align: center
  img
    width 24px
    height 24px
  .desc
    line-height: 2.4rem
    font-size 1.2rem
</style>
