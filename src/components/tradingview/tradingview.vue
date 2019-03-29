<template>
  <div class="TVChartContainer" :id="containerId"/>
</template>

<script>
import { getHistory, getSearch, getRefresh } from 'api'
import { widget } from 'src/charting_library.min'

function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  results = regex.exec(location.search)
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

const supportedResolutions = ['1', '5', '60', 'D', 'W', 'M']
const config = {
  supported_resolutions: supportedResolutions,
  supports_group_request: false
}

var history = {}
var subcribeArr = {}
var Datafeed = {
  //此方法旨在提供填充配置数据的对象
  onReady: function(callback) {
    setTimeout(function() {
      callback(config)
    }, 0)
  },
  //提供一个匹配用户搜索的商品列表
  searchSymbols: function(
    userInput,
    exchange,
    symbolType,
    onResultReadyCallback
  ) {
    var qs = {
      q: userInput.toUpperCase()
    }
    getSearch(qs).then(data => {
      onResultReadyCallback(data)
    })
  },

  //通过商品名称解析商品信息(SymbolInfo)。
  resolveSymbol: function(
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) {
    let symbol_stub = {
      name: symbolName.split(':')[0] || symbolName, //商品名称。您的用户将看到它(作为一个字符串)
      ticker: symbolName.split(':')[0] || symbolName, //它是您的商品体系中此商品的唯一标识符
      description: symbolName.split(':')[1], //描述 params.description
      type: 'stock', //仪表的可选类型:stock, index, forex, futures, bitcoin, expression, spread, cfd
      session: '24x7', //商品交易时间(7*24小时)
      timezone: 'Asia/Shanghai', //时区
      exchange: '', //listed_exchange 现在，这两个字段都为某个交易所的略称
      //minmov(最小波动), pricescale(价格精度), minmove2, fractional(分数)
      minmov: 1,
      pricescale: 10000,
      has_no_volume: true,
      has_intraday: true, //布尔值显示商品是否具有日内（分钟）历史数据
      intraday_multipliers: ['1'], //这是一个包含日内分辨率(分钟单位)的数组
      volume_precision: 8, //整数显示此商品的成交量数字的小数位。0表示只显示整数。1表示保留小数位的1个数字字符
      data_status: 'streaming', //数据状态(streaming(实时),endofday(已收盘),pulsed(脉冲),delayed_streaming(延迟流动中))
      has_intraday: true,
      timeframe: '1D'
    };
    setTimeout(function() {
      onSymbolResolvedCallback(symbol_stub)
    }, 0)
  },

  //通过日期范围获取历史K线数据。图表库希望通过onHistoryCallback仅一次调用，接收所有的请求历史。而不是被多次调用。
  getBars: function(
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest
  ) {
    var symbolName = symbolInfo.name
    var reso = 'day'
    switch (resolution) {
      case '1':
        reso = 'minute'
        break;
      case '1D':
      case 'D':
        reso = 'day'
        break
    }
    var qs = {
      code: symbolName.split(':')[0] || symbolName,
      timeTo: to ? to : '',
      reso: reso
    }
    getHistory(qs).then(data => {
      var bars = []
      if (data.length) {
        bars = data.map(el => {
          return {
            time: el.time * 1000, //TradingView requires bar time in ms
            low: el.low,
            high: el.high,
            open: el.open,
            close: el.close
          };
        });
        onHistoryCallback(bars, { noData: false })
      } else {
        onHistoryCallback(bars, { noData: true })
      }
    })
  },
  //订阅K线数据
  subscribeBars: function(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) {
    var symbolName = symbolInfo.name
    var reso = 'day'
    switch (resolution) {
      case '1':
        reso = 'minute'
        break
      case '1D':
      case 'D':
        reso = 'day'
        break
    }

    var ajaxObj = setInterval(function() {
      getRefresh({
        code: symbolName.split(':')[0] || symbolName,
        reso: reso
      }).then(el => {
        var bar = {
          time: el.time * 1000, //TradingView requires bar time in ms
          low: el.low,
          high: el.high,
          open: el.open,
          close: el.close
        };
        onRealtimeCallback(bar)
      })
    }, 3000)
    subcribeArr[subscriberUID] = ajaxObj
  },

  //取消订阅K线数据
  unsubscribeBars: function(subscriberUID) {
    var ajaxObj = subcribeArr[subscriberUID]
    clearInterval(ajaxObj);
  },

  //图表库在它要请求一些历史数据的时候会调用这个函数，让你能够覆盖所需的历史深度
  calculateHistoryDepth: function(resolution, resolutionBack, intervalBack) {
    return undefined
  },

  //图书馆调用这个函数来获得可见的K线范围的标记。 图表预期每调用一次getMarks就会调用一次onDataCallback。
  getMarks: function(
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution
  ) {
    //optional
  },

  //图表库调用此函数获取可见K线范围的时间刻度标记。图表预期您每个调用getTimescaleMarks会调用一次onDataCallback。
  getTimescaleMarks: function(
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution
  ) {
    //optional
  },

  //当图表需要知道服务器时间时，如果配置标志supports_time设置为true，则调用此函数
  getServerTime: function(cb) {}
}
export default {
  name: "TVChartContainer",
  props: {
    symbol: {
      default: '000001.SH',
      type: String
    },
    interval: {
      default: "D",
      type: String
    },
    containerId: {
      default: "tv_chart_container",
      type: String
    },
    datafeedUrl: {
      default: "https://demo_feed.tradingview.com",
      type: String
    },
    libraryPath: {
      default: "/charting_library/",
      type: String
    },
    chartsStorageUrl: {
      default: "https://saveload.tradingview.com",
      type: String
    },
    chartsStorageApiVersion: {
      default: "1.1",
      type: String
    },
    clientId: {
      default: "tradingview.com",
      type: String
    },
    userId: {
      default: "public_user_id",
      type: String
    },
    fullscreen: {
      default: true,
      type: Boolean
    },
    autosize: {
      default: true,
      type: Boolean
    },
    studiesOverrides: {
      type: Object
    }
  },
  tvWidget: null,
  mounted() {
    const widgetOptions = {
      debug: false,
      symbol: this.symbol,
      datafeed: Datafeed, // our datafeed object
      interval: this.interval,
      container_id: this.containerId,
      library_path: this.libraryPath,
      hideideas: true,
      allow_symbol_change: false,
      locale: 'zh',
      timezone:"Asia/Shanghai",
      loading_screen: { backgroundColor: '#171633' },
      disabled_features: [
        'use_localstorage_for_settings',
        'header_compare',
        'header_undo_redo',
        'header_saveload',
        'scales_context_menu',
        'legend_context_menu',
        'header_interval_dialog_button'
      ],
      enabled_features: [
        'keep_left_toolbar_visible_on_small_screens',
        'side_toolbar_in_fullscreen_mode',
        'widgetbar'
      ],
      client_id: 'test',
      user_id: 'public_user_id',
      fullscreen: false,
      autosize: true,
      // toolbar_bg: '#242448',
      overrides: {
        'paneProperties.background': 'rgba(36, 36, 72, 1)',
        'paneProperties.vertGridProperties.color': 'rgba(255, 255, 255, 0.07)',
        'paneProperties.horzGridProperties.color': 'rgba(255, 255, 255, 0.07)',
        'paneProperties.crossHairProperties.color': 'rgba(67, 67, 128, 1)',
        'scalesProperties.lineColor': 'rgba(255, 255, 255, 0.17)',
        'scalesProperties.textColor': 'rgba(191, 191, 191, 1)',
        //    K线图样式
        'mainSeriesProperties.candleStyle.upColor': 'rgba( 230, 67, 64, 1)',
        'mainSeriesProperties.candleStyle.downColor': 'rgba( 9, 187, 7, 1)',
        'mainSeriesProperties.candleStyle.wickUpColor': 'rgba( 230, 67, 64, 1)',
        'mainSeriesProperties.candleStyle.wickDownColor': 'rgba( 9, 187, 7, 1)',
        'mainSeriesProperties.candleStyle.drawBorder': false,
        //    空心K线图样式
        'mainSeriesProperties.hollowCandleStyle.upColor': 'rgba( 230, 67, 64, 1)',
        'mainSeriesProperties.hollowCandleStyle.downColor': 'rgba( 9, 187, 7, 1)',
        'mainSeriesProperties.hollowCandleStyle.wickUpColor': 'rgba( 230, 67, 64, 1)',
        'mainSeriesProperties.hollowCandleStyle.wickDownColor': 'rgba( 9, 187, 7, 1)',
        'mainSeriesProperties.hollowCandleStyle.drawBorder': false,
        //    美国线样式
        'mainSeriesProperties.barStyle.upColor': 'rgba( 230, 67, 64, 1)',
        'mainSeriesProperties.barStyle.downColor': 'rgba( 9, 187, 7, 1)',
        //    线形图样式
        'mainSeriesProperties.lineStyle.color': 'rgba(37, 97, 239, 1)',
        'mainSeriesProperties.lineStyle.linewidth': 2,
        //    面积图样式
        'mainSeriesProperties.areaStyle.color1': 'rgba(37, 97, 239, 0.1)',
        'mainSeriesProperties.areaStyle.color2': 'rgba(37, 97, 239, 0.1)',
        'mainSeriesProperties.areaStyle.linecolor': 'rgba(37, 97, 239, 1)',
        'mainSeriesProperties.areaStyle.linewidth': 2,
        // 基准线样式
        'mainSeriesProperties.baselineStyle.topFillColor1': 'rgba( 230, 67, 64, 0.1)',
        'mainSeriesProperties.baselineStyle.topFillColor2': 'rgba( 230, 67, 64, 0.1)',
        'mainSeriesProperties.baselineStyle.bottomFillColor1': 'rgba( 9, 187, 7, .1)',
        'mainSeriesProperties.baselineStyle.bottomFillColor2': 'rgba( 9, 187, 7, .1)',
        'mainSeriesProperties.baselineStyle.topLineColor': 'rgba( 230, 67, 64, 1)',
        'mainSeriesProperties.baselineStyle.bottomLineColor': 'rgba( 9, 187, 7, 1)',
        'mainSeriesProperties.baselineStyle.topLineWidth': 2,
        'mainSeriesProperties.baselineStyle.bottomLineWidth': 2,
        'linetoolicon.color': 'rgba( 230, 67, 64, 1)'
      },
      custom_css_url: '/charting_library/static/bundles/chart.css'
    }

    //

    const tvWidget = new widget(widgetOptions)
    this.tvWidget = tvWidget
    tvWidget.onChartReady(() => {
      const button = tvWidget
        .createButton()
        .attr("title", "Click to show a notification popup")
        .addClass("apply-common-tooltip")
        .on("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              // eslint-disable-next-line no-console
              console.log("Noticed!")
            }
          })
        );
      button[0].innerHTML = "Check API"
    })
  },
  methods: {},
  destroyed() {
    // if (this.tvWidget !== null) {
    //   this.tvWidget.remove();
    //   this.tvWidget = null;
    // }
  }
};
</script>

<style lang="stylus" scoped>
.TVChartContainer
  width 100%
  height 100%
</style>
