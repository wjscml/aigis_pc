<template>
  <div class="news-wrapper">
    <div class="news-top">
      <div class="title">
        <i class="icon-news"></i>
        <span>新闻视点</span>
      </div>
      <row-nav :nav="newsNav" @change="_getNewsList"></row-nav>
    </div>
    <div class="news-content" >
      <div class="news-column" v-for="(column, index) in news" :key="index" v-show="news.length">
        <div class="col-image" :title="column.title" :style="{backgroundImage: 'url('+column.thumb+')'}"></div>
        <div class="col-text">
          <h1 class="title">{{column.title}}</h1>
          <p class="summary">{{column.summary}}</p>
        </div>
        <p class="info">{{column.author_name}} · {{column.publish_time}}</p>
      </div>
      <load-more :tips="tips" :isLoad="isLoad" @loadMore="loadMore"></load-more>
    </div>
  </div>
</template>

<script>
import RowNav from 'base/row-nav/row-nav'
import LoadMore from 'base/load-more/load-more'
import { getCategories, getNewsList } from 'api'

export default {
  name: 'news',
  data () {
    return {
      newsNav: [],
      news: [],
      page: 0,
      tips: '点击加载更多',
      isLoad: null
    }
  },
  created () {
    this.getNewsNav()
    this._getNewsList(0)
  },
  methods: {
    getNewsNav () {
      getCategories().then(res => {
        this.newsNav = res.splice(0, 5)
      })
    },
    _getNewsList (type) {
      getNewsList({
        page: 0,
        type: type
      }).then((res) => {
        if (res) {
          this.news = res
          this.tips = '点击加载更多'
        } else {
          this.news = []
          this.tips = '暂无数据'
        }
      })
    },
    loadMore () {
      this.tips = '加载中...'
      this.isLoad = true
      this.page++
      getNewsList({
        page: this.page,
        type: this.type
      }).then((res) => {
        this.isLoad = false
        if (res) {
          this.news = this.news.concat(res)
          this.tips = '点击加载更多'
        } else {
          this.tips = '没有更多数据了~'
        }
      })
    }
  },
  components: {
    RowNav,
    LoadMore
  }
}
</script>

<style lang="stylus" scoped>
.news-wrapper
  margin-right 26px
  .news-top
    display flex
    align-items center
    .title
      display flex
      align-items center
      flex 1
      font-size 16px
      .icon-news
        margin 0 10px
        font-size 18px
  .news-content
    margin-top 16px
    padding 10px 24px
    border-radius 10px
    background-color $color-light-background
    .news-column
      position relative
      overflow hidden
      padding 20px 0
      border-bottom 1px solid $color-line
      .col-image
        float left
        width 30%
        height 0
        padding-bottom 22%
        background-repeat  no-repeat
        background-position left center
        background-size cover
      .col-text
        float left
        box-sizing border-box
        padding-left 18px
        width 70%
        .title
          margin-bottom 8px
          line-height 24px
          font-weight 600
          font-size 16px
          color $color-white
        .summary
          flex 1
          line-height 20px
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
          overflow: hidden
      .info
        position absolute
        bottom 20px
        line-height 20px
        left calc(30%+18px)
</style>
