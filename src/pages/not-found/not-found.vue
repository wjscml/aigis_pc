<template>
<div class="not-found">
  <div class="notfoundWrapper">
    <div class="tips">
      <img src="./notfoundBg.png" alt="notfound">
      <p>很抱歉，您要访问的页面不存在</p>
    </div>
    <router-link to="/index" tag="div" class="goIndex">返回首页</router-link>
  </div>
</div>

</template>
<script>
export default {
}
</script>
<style lang="stylus">
@import "~common/stylus/variable"
.not-found
  position fixed
  left 0
  top 0
  bottom 0
  width 100%
  z-index 2
  .notfoundWrapper
    display flex
    flex-direction column
    box-sizing border-box
    margin 140px auto
    width 80%
    .tips
      img
        display block
        margin 0 auto
      p
        margin 60px 0 40px
        font-size 16px
        text-align center
        color $color-text
        font-weight 600
    .goIndex
      width 140px
      margin 0 auto
      line-height 34px
      font-size 16px
      text-align center
      border-radius 17px
      background-color $color-blue
      color #fff
      cursor pointer
      &:hover
        background-color $color-dark-blue
</style>
