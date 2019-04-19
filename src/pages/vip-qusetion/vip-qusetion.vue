<template>
  <div class="vip-qusetion">
    <div class="editor-wrapper">
      <p class="editor-title">
        <i class="icon-write"></i>
        <span>提出您的问题</span>
      </p>
      <editor :session="this.userInfo.session" @img="getImg" @html="getHtml" @submit="submit" ref="editor"></editor>
      <button class="editor-submit" @click="toConfirm">确认提交</button>
      <p class="submit-error" v-show="isError"><i class="icon-notice"></i><a>{{errorTips}}</a></p>
    </div>
    <div class="comment-wrappper">
      <p class="comment-title">
        <i class="icon-record"></i>
        <span>留言记录</span>
      </p>
      <qusetion-record @delete="_deleteQuestion" :questionData="questionContent" v-show="questionContent.length"></qusetion-record>
      <no-result tips="暂无记录~" v-show="!questionContent.length"></no-result>
    </div>
    <confirm :hasCancel="false" :text="confirmTxt" cancelBtnText="关闭" ref="confirm" id="confirm"></confirm>
  </div>
</template>

<script>
import Editor from 'components/editor/editor.vue'
import QusetionRecord from 'components/qusetion-record/qusetion-record.vue'
import Confirm from 'components/confirm/confirm'
import NoResult from 'base/no-result/no-result'
import { submitQuestion, getAllQuestion, deleteQuestion } from 'api'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isError: null,
      errorTips: '',
      confirmTxt: '提交成功，Alaya团队会尽快为您解答问题~',
      qusetionData: []
    }
  },
  created () {
    this._getAllQuestion()
  },
  computed: {
    questionContent () {
      return this.qusetionData
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    _deleteQuestion (id, index) {
      deleteQuestion({
        session: this.userInfo.session,
        askId: id
      }).then(res => {
        this.qusetionData.splice(index, 1)
      })
    },
    _getAllQuestion () {
      getAllQuestion({
        session: this.userInfo.session
      }).then(res => {
        this.qusetionData = res.reverse()
        for (var o in this.qusetionData) {
          this.qusetionData[o].ask_content = this.addImgBox(this.qusetionData[o].ask_content)
          if (this.qusetionData[o].is_replied) {
            this.qusetionData[o].reply.answer_content = this.addImgBox(this.qusetionData[o].reply.answer_content)
          }
        }
      })
    },
    getImg (data) {
      this.imgAddress = data
    },
    getHtml (data) {
      this.editorContent = data
    },
    toConfirm () {
      if (this.editorContent && this.editorContent !== '' && this.editorContent !== '<p><br></p>') {
        this.isError = false
        this.$refs.editor.showConfirm()
      } else {
        this.isError = true
        this.errorTips = '内容不能为空'
      }
    },
    submit () {
      let formData = new FormData()
      formData.append('session', this.userInfo.session)
      formData.append('question_content', this.editorContent)
      submitQuestion(formData).then(res => {
        this.showConfirm()
        res.ask_content = this.addImgBox(res.ask_content)
        this.qusetionData.unshift(res)
      })
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    addImgBox (str) {
      var s = ''
      if (str.length === 0) return ''
      s = str.replace(/<img(.*?)src=\"(.*?)\"(.*?)>/g,'<div class="img-wrapper"><div class="img-container"><p class="pic"><i class="icon-pic"></i><span>图片留言<span></p><p class="pull_up"><i class="icon-pull_up"></i><span>收起<span></p>$&</div><div class="cover"></div></div>')
      s = s.replace(/<br>/g, '')
      s = s.replace(/###~SITEURL~###/g, 'https://aigis.leadfintech.com:8888/')
      return s
    }
  },
  components: {
    Editor,
    QusetionRecord,
    Confirm,
    NoResult
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
.vip-qusetion
  padding 15px 30px 0 20px
  min-width 500px
  .editor-wrapper
    position relative
    margin-bottom 50px
    .editor-title
      display flex
      align-items center
      margin-bottom 8px
      font-size 15px
      color $color-white
      .icon-write
        color $color-search
        margin-right 8px
        font-size 17px
    .editor-submit
      margin-top 6px
      width 100px
      line-height 24px
      border none
      background-color $color-blue
      color $color-nav-text
      &:hover
        background-color $color-dark-blue
    .submit-error
      position absolute
      bottom 0
      left 150px
      color $color-red
  .comment-wrappper
    width 100%
    .comment-title
      display flex
      align-items center
      margin-bottom 8px
      font-size 15px
      color $color-white
      .icon-record
        color $color-search
        margin-right 8px
        font-size 17px

</style>
