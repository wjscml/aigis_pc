<template>
  <section class="loader-wrapper">
    <div class="loader loader-7">
      <div class="line line1"></div>
      <div class="line line2"></div>
      <div class="line line3"></div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
.loader-wrapper
  width 100%
  padding-left 50%
  margin-left -30px
  .loader
    position: relative
    width: 60px
    height: 60px
    border-radius: 50%
    display: inline-block
    vertical-align: middle
    .line
      width: 8px;
      position: absolute;
      border-radius: 5px;
      bottom: 0;
      background: -webkit-gradient(linear, left top, left bottom, from(#06eefe), to(#6d51ff))
      background: -webkit-linear-gradient(top, #06eefe, #6d51ff)
      background: linear-gradient(to bottom, #06eefe, #6d51ff)
      &.line1
        left: 0
        animation: line-grow 0.5s ease alternate infinite
      &.line2
        left: 20px
        animation: line-grow 0.5s 0.2s ease alternate infinite
      &.line3
        left: 40px
        animation: line-grow 0.5s 0.4s ease alternate infinite
@keyframes line-grow {
  0% {
    height: 0
  }
  100% {
    height: 75%
  }
}
</style>
