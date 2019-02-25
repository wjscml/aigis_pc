<template>
  <div class="report-column">
    <div class="report-column-content" v-for="(content, index) in data" :key="index" v-show="data.length">
      <div class="report-column-time">
        <div class="title">
          {{timeKey[index] | format}}
        </div>
      </div>
      <div class="report-column-main">
        <div class="column" v-for="(column, index) in content" :key="index">
          <h1 @click="toDetail(column.id)" class="title">{{column.title}}</h1>
          <div class="content">
            <div class="image" v-if="hasImg" :title="column.title" :style="{backgroundImage: 'url('+column.thumb+')'}"></div>
            <div class="summary"><p class="text">{{column.summary}}</p></div>
            <span @click="toDetail(column.id)" class="enter">查看全文 ></span>
            <span class="time">{{column.publish_time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  filters: {
    format (str) {
      return str.replace(/-/g, '年') + '月'
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    timeKey: {
      type: Array,
      default: () => []
    },
    hasImg: {
      type: Boolean,
      default: true
    }
  },
  created () {
    console.log(this.$route.path)
  },
  methods: {
    toDetail (id) {
      this.$router.push(`${this.$route.path}/${id}`)
    }
  }
}
</script>

<style lang="stylus">
.report-column-content
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
        cursor pointer
        &:hover
          color $color-light-blue
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
          .text
            line-height 20px
            display: -webkit-box
            -webkit-line-clamp: 3
            -webkit-box-orient: vertical
            overflow: hidden
          @media screen and (max-width: 1048px) and (min-width: 850px)
            .text
              -webkit-line-clamp: 5
        .enter
          position absolute
          left calc(38.8% + 18px)
          bottom 0
          color $color-light-blue
          &:hover
            cursor pointer
            text-decoration underline
        .time
          position absolute
          right 0
          bottom 0

</style>
