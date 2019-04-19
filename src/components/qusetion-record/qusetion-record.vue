<template>
  <div class="comment-content">
    <div class="column" v-for="(column, index) in questionData" :key="index">
      <div class="timeline">
        <span>{{column.created_at | getTime}}</span>
        <i class="icon-point"></i>
      </div>
      <div class="content">
        <div class="qusetion-text" v-html="column.ask_content" @click="showImg($event)" ref="qusetionText"></div>
        <div class="sub-content" v-if="column.is_replied">
          <p class="text" v-html="column.reply.answer_content" @click="showImg($event)"></p>
          <p class="time">{{column.reply.answer_name}} · {{column.reply.created_at | getTime}}</p>
        </div>
      </div>
      <div class="delete" @click="showConfirm(column.id, index)">
        <i class="icon-delete"></i>
      </div>
    </div>
    <confirm @confirm="_deleteQuestion" :text="confirmTxt" ref="confirm" id="confirm"></confirm>
  </div>
</template>

<script>
import Confirm from 'components/confirm/confirm'
import { addClass, removeClass } from 'common/js/dom.js'
import { getCurrentTime } from 'common/js/data.js'

import Vue from 'vue'

export default {
  data () {
    return {
      confirmTxt: '回复内容也将一起删除，确定要删除这条问题吗？'
    }
  },
  props: {
    questionData: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    getTime (time) {
      return getCurrentTime(time * 1000)
    }
  },
  created () {

  },
  methods: {
    _deleteQuestion () {
      this.$emit('delete', this.id, this.index)
    },
    showImg (event) {
      let target = event.target
      if (event.target.classList.length <= 1) {
        addClass(target, 'showImg')
      } else {
        removeClass(target, 'showImg')
      }
    },
    showConfirm (id, index) {
      this.id = id
      this.index = index
      this.$refs.confirm.show()
    }
  },
  components: {
    Confirm
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
.comment-content
  padding 20px 0
  background-color $color-light-background
  border-radius 10px
  .column
    display flex
    .timeline
      flex-shrink 0
      position relative
      width 140px
      padding-top 20px
      margin 0 30px
      border-right 2px solid $color-line
      .icon-point
        position absolute
        top 25px
        right -8px
        color $color-light-blue
    .content
      flex 1
      padding 20px 0
      margin-right 20px
      word-break break-all
      .qusetion-text, .sub-content .text
        line-height 22px
        color $color-light-blue
        .img-wrapper
          position relative
          .img-container
            position relative
            margin 8px 0
            &:after
              content ''
              position absolute
              width 100%
              height 30px
              top 0
              left 0
            &:hover
              cursor pointer
              .pic,.pull_up
                color $color-white
            .pic
              position relative
              display flex
              align-items center
              height 30px
              color $color-blue
              .icon-pic
                padding 0 4px
                font-size 16px
            .pull_up
              position relative
              display none
              padding 4px 0 0 16px
              height 30px
              color $color-search
              .icon-pull_up
                padding 0 4px
                font-size 16px
            img
              position relative
              box-sizing border-box
              padding 0 16px 16px
              display none
            &.showImg
              border-radius 4px
              background-color $color-light-purple
              .pic
                display none
              .pull_up
                display flex
                align-items center
              img
                display block
              &+.cover
                position absolute
                top 34px
                bottom 0
                width 100%

      .sub-content
        margin-top 20px
        margin-left 40px
        .text
          color $color-white
        .time
          color $color-search
    .delete
      width 30px
      height 30px
      margin 20px 10px 0 0
      cursor pointer
      .icon-delete
        font-size 16px
        color $color-light-purple
      &:hover
        .icon-delete
          color $color-red

</style>
