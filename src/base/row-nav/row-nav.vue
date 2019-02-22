<template>
  <div class="row-nav" v-if="nav.length">
    <div class="nav-btn" v-for="(item, index) in nav" :key="index" :class="{'nav-btn-s':index===type}" @click="change(index)">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 0
    }
  },
  props: {
    nav: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    change (i) {
      this.type = i
      this.$emit('change', i)
    }
  }
}
</script>

<style lang="stylus" scoped>
.row-nav
  display flex
  .nav-btn
    display flex
    align-items center
    justify-content center
    margin 0 9px
    width 80px
    height 32px
    border-radius 16px
    text-align center
    cursor pointer
    &.nav-btn-s
      background-color $color-blue
      color $color-white
</style>
