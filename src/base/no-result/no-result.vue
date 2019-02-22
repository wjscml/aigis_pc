<template>
<div class="no-result-wrapper">
  <i class="icon-no_result"></i>
  <p>{{tips}}</p>
</div>
</template>

<script>
export default {
  props: {
    tips: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
.no-result-wrapper
  text-align center
  .icon-no_result
    font-size 120px
</style>
