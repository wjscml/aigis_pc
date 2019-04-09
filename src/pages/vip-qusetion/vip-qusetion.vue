<template>
  <div class="vip-qusetion">
    <div class="editor-wrapper">
      <p class="editor-title">发表您的留言</p>
      <editor @html="content" @submit="submit" ref="editor"></editor>
      <button class="editor-submit" @click="toConfirm">发表</button>
      <p class="submit-error" v-show="isError"><i class="icon-notice"></i><a>{{errorTips}}</a></p>
    </div>
    <div class="comment-wrappper">
      <p class="comment-title">留言</p>
      <div class="column">
        <div class="avatar">
          <img src="http://api.dev.aigis.com/resource/image/user-avatar.png" alt="avatar" width="50" height="50">
        </div>
        <div class="content">
          <h1 class="name">{{userInfo.nickname}}</h1>
          <p class="text">{{questionContent}}</p>
          <p class="time">2016-11-21 08:07</p>
        </div>
      </div>
    </div>
    <confirm :hasCancel="false" :text="confirmTxt" cancelBtnText="确定" ref="confirm" id="confirm"></confirm>
  </div>
</template>

<script>
import Editor from 'components/editor/editor.vue'
import Confirm from 'components/confirm/confirm'
import { submitQuestion } from 'api'
import { toText } from 'common/js/data.js'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isError: null,
      errorTips: '',
      confirmTxt: '发表成功，Alaya团队会尽快回复您',
    }
  },
  created () {
  },
  computed: {
    questionContent () {
      return '如果 uni-app 能加强开源开放，再加强与大厂的合作，相信未来还能更上一层楼。 同感。uni-app 完全开源会走的更远， 用和参与还是区别很大的。uni-app 把 WePy 和 Weex 的坑是填了一'
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    content (res) {
      this.editorContent = toText(res)
    },
    toConfirm () {
      if (this.editorContent && this.editorContent !== '') {
        console.log(this.editorContent)
        this.isError = false
        this.$refs.editor.showConfirm()
      } else {
        this.isError = true
        this.errorTips = '内容为空'
      }
    },
    submit () {
      let formData = new FormData()
      formData.append('session', this.userInfo.session)
      formData.append('question_content', this.editorContent)
      submitQuestion(formData).then(res => {
        this.showConfirm()
        console.log(res)
      })
    },
    showConfirm () {
      this.$refs.confirm.show()
    }
  },
  components: {
    Editor,
    Confirm
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
.vip-qusetion
  padding 15px 30px 0 20px
  min-width 500px
  .editor-wrapper
    margin-bottom 30px
    .editor-title
      margin-bottom 8px
      font-size 15px
      color $color-white
    .editor-submit
      margin-top 6px
      width 70px
      line-height 24px
      border none
      background-color $color-blue
      color $color-nav-text
      &:hover
        background-color $color-dark-blue
  .comment-wrappper

    .comment-title
      border-bottom 1px solid $color-line
      font-size 15px
      color $color-white
    .column
      display flex
      padding 20px 10px
      border-bottom 1px solid $color-line
      .avatar
        margin-right 20px
        img
          width 50px
          height 50px
      .content
        flex 1
        .name
          line-height 15px
          font-size 15px
          color $color-light-blue
        .text
          margin 15px 0
          line-height 22px
          min-height 66px
        .time
          line-height 14px
          color $color-search
</style>
