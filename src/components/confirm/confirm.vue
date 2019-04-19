<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click="cancel">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click.stop="cancel" class="operate-btn">{{cancelBtnText}}</div>
            <div @click.stop="confirm" class="operate-btn" v-if="hasCancel">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    hasCancel: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    },
    confirm () {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
.confirm
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  background-color rgba(7,17,27,0.9)
  z-index 10002
  &.confirm-fade-enter-active
    animation: confirm-fadein 0.4s
    .confirm-content
      animation: confirm-zoom 0.4s
  .confirm-wrapper
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    .confirm-content
      width 25rem
      border-radius 1rem
      text-align center
      background-color #fff
      .text
        padding 1.8rem 2rem
        line-height 2.4rem
        font-size 1.6rem
        border-bottom 1px solid rgba(7,17,27,0.1)
        color $color-background
      .operate
        display flex
        line-height 5rem
        font-size 1.5rem
        .operate-btn
          flex 1
          color $color-blue
          cursor pointer
          &:first-child
            border-right 1px solid rgba(7,17,27,0.1)
            color #999
@keyframes confirm-fadein
  0%
    opacity 0
  100%
    opacity 1
@keyframes confirm-zoom
  0%
    transform: scale(0)
  50%
    transform: scale(1.1)
  100%
    transform: scale(1)
</style>
