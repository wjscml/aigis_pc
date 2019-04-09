<template>
  <div id="app" v-wechat-title="$route.meta.title">
    <router-view :isIndex="isIndex"></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      isIndex: {
        type: Boolean,
        default: null
      }
    }
  },
  watch: {
    '$route' (to) {
      if (to.name === 'index') {
        this.isIndex = true
      } else {
        this.isIndex = false
      }
    }
  }
}
</script>
<style lang="stylus">
@import 'common/stylus/index.styl'
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  width 100%
  height 100%
</style>
