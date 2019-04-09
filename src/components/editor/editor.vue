<template>
<div>
  <div class="editor">
    <div ref="editorBar" class="toolbar"></div>
    <div ref="editorElem" class="text"></div>
  </div>
  <p></p>
  <confirm @confirm="submit" :text="confirmTxt" ref="confirm" id="confirm"></confirm>
</div>
</template>

<script>
import E from 'wangeditor'
import Confirm from 'components/confirm/confirm'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      confirmTxt: '确定发布内容吗？',
      editorContent: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted () {
    this.refreshEditor()
  },
  created () {

  },
  methods: {
    submit () {
      this.$emit('submit')
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    refreshEditor () {
      var editor = new E(this.$refs.editorBar, this.$refs.editorElem)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
        this.$emit('html', this.editorContent)
      }
      editor.customConfig.uploadImgServer = 'https://api.cnibd.com/site/index?method=user.uploadImage&format=json'
      editor.customConfig.uploadFileName = 'qusetion_img'
      editor.customConfig.menus = [
        'head',
        'bold',
        'italic',
        'underline',
        'fontSize',
        'foreColor',
        'list',
        'justify',
        'quote',
        'image',
        'undo',
        'redo'
      ]
      editor.customConfig.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
          var url = result.data
          insertImg(url)
        },
        before: function (xhr, editor, files) { // 图片上传之前触发
          console.log(xhr, editor, files)
          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //   prevent: true,
          //   msg: '放弃上传'
          // }
        },
        success: function (xhr, editor, result) { // 图片上传并返回结果，图片插入成功之后触发
          console.log(result)
        },
        fail: function (xhr, editor, result) { // 图片上传并返回结果，但图片插入错误时触发
          console.log(xhr, editor, result)
        },
        error: function (xhr, editor) { // 图片上传出错时触发
          console.log(xhr, editor)
        },
        timeout: function (xhr, editor) { // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        }
      }
      editor.customConfig.onfocus = function () {
        editor.txt.clear()
      }
      editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024
      editor.customConfig.pasteFilterStyle = false

      editor.create()
    }
  },
  components: {
    Confirm
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.editor
  .toolbar
    background-color $color-line
  .text
    background-color $color-white
    height 100px
  .w-e-toolbar
    .w-e-menu
      i
        color $color-search
      &:hover
        i
          color $color-light-blue
</style>
