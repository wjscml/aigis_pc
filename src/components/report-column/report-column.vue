<template>
  <div class="report-column">
    <div class="report-column-time">
      <div class="title">
        {{name}}
      </div>
    </div>
    <div class="report-column-main">
      <div class="column" v-for="(column, index) in data" :key="index" v-show="data.length">
        <h1 class="title">{{column.title}}</h1>
        <div class="content">
          <div class="image" v-if="hasImg" :title="column.title" :style="{backgroundImage: 'url('+column.thumb+')'}"></div>
          <p class="summary">{{column.summary}}</p>
          <span class="enter">查看全文 ></span>
          <span class="time">{{column.publish_time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '2019年01月'
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    hasImg: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="stylus">
.report-column
  .report-column-time
    display flex
    justify-content center
    margin-right 30px
    margin-bottom 30px
    .title
      display flex
      align-items center
      justify-content center
      width 120px
      height 32px
      border-radius 16px
      color $color-white
      background-color $color-blue
  .report-column-main
    display flex
    flex-wrap: wrap
    .column
      margin 0 26px 26px 0
      padding 20px 24px
      width calc(50% - 74px)
      min-width 332px
      border-radius 12px
      background-color $color-light-background
      .title
        margin-bottom 16px
        line-height 24px
        font-size 16px
        font-weight 600
        color $color-white
      .content
        overflow hidden
        position relative
        .image
          float left
          width 38.8%
          height 0
          padding-top 25%
          background-repeat  no-repeat
          background-position left center
          background-size cover
        .summary
          float left
          box-sizing border-box
          padding-left 18px
          width 61.2%
          line-height 20px
          display: -webkit-box
          -webkit-line-clamp: 4
          -webkit-box-orient: vertical
          overflow: hidden
        @media screen and (min-width: 1440px)
          .summary
            -webkit-line-clamp: 3
        @media screen and (min-width: 1700px)
          .summary
            -webkit-line-clamp: 4
        .enter
          position absolute
          left calc(38.8% + 18px)
          bottom 0
          color $color-light-blue
        .time
          position absolute
          right 0
          bottom 0

</style>
