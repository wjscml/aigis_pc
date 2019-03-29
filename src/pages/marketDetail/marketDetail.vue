<template>
  <div class="marketDetail">
    <tradingview :symbol="symbol" :interval="interval"></tradingview>
  </div>
</template>

<script>
import Tradingview from 'components/tradingview/tradingview'

export default {
  data () {
    return {
      symbol: this.$route.query.symbol + ':' + this.$route.query.description,
      interval: this.$route.query.interval
    }
  },
  components: {
    Tradingview
  }
}
</script>

<style lang="stylus" scoped>
.marketDetail
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background-color $color-background
</style>
