<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" @keyup.enter="keyupEnter" v-model="query" :placeholder="placeholder">
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Search...'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    },
    keyupEnter () {
      this.$emit('keyupEnter')
    }
  },
  created () {
    this.$watch('query', (newQuery, oldQuery) => {
      this.$emit('query', newQuery, oldQuery)
    })
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.search-box
  display flex
  align-items center
  box-sizing border-box
  width 100%
  padding 0 6px
  height 40px
  border-radius 6px
  color $color-search
  .icon-search
    width 40px
    font-size 24px
    text-align center
  .box
    flex 1
    background-color $color-background
    color $color-search
    outline none
    border none
  .icon-dismiss
    width 40px
    font-size 18px
    text-align center

</style>
