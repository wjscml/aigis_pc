<template>
  <div class="market">
    <div class="market-nav" v-show="marketNav.length">
      <row-nav :nav="marketNav" @change="change"></row-nav>
    </div>
    <market-column @change="subNavChange" @addFavor="addFavor" @showConfirm="showConfirm" :data="notipsData" :type="subType" :subNavData="subNavData" ref="marketColumn"></market-column>
    <loading v-show="isLoading"></loading>
    <no-result tips="您还没有自选行情~" v-show="isNoResult"></no-result>
    <confirm @confirm="deleteFavor" :text="confirmText" ref="confirm"></confirm>
  </div>
</template>

<script>
import NoResult from 'base/no-result/no-result'
import Confirm from 'components/confirm/confirm'
import RowNav from 'base/row-nav/row-nav'
import Loading from 'base/loading/loading'
import MarketColumn from 'components/market-column/market-column'
import { getIndicators, addFavorIndicator, getFavorIndicatorList } from 'api'
import { addClass, removeClass } from 'common/js/dom.js'
import { mapGetters } from 'vuex'
import WebSocketClass from 'api/socket.js'

export default {
  data () {
    return {
      type: 0,
      subType: 0,
      marketNav: [],
      subNavData: [],
      nameData: [],
      notipsData: [],
      isFirst: true,
      confirmText: '',
      isNoResult: null,
      isLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this._getIndicators()
  },
  methods: {
    toggleFavor (item, n) {
      addFavorIndicator({
        indicatorId: item.id,
        session: this.userInfo.session,
        action: n
      }).then(res => {
        item.favor = res.favor
        this.socket.closeMyself()
        this.isFirst = true
        this._getIndicators()
      })
    },
    addFavor (item) {
      this.toggleFavor(item, 1)
    },
    deleteFavor () {
      this.toggleFavor(this.item, 2)
    },
    showConfirm (item) {
      this.item = item
      this.confirmText = `是否不再关注 "${item.name}"`
      this.$refs.confirm.show()
    },
    getConfigResult (res) {
      this.isLoading = false
      if (res.length) {
        let valueData = res
        if (this.isFirst) {
          this.isFirst = !this.isFirst
          for (let n in this.nameData) {
            this.notipsData.push({
              name: this.nameData[n].indicator_name,
              code: this.nameData[n].indicator_code,
              id: this.nameData[n].indicator_id,
              favor: this.nameData[n].favor,
              value: valueData[n]
            })
          }
        } else {
          // console.log(valueData)
          for (let n in this.nameData) {
            if (valueData[n] !== '--') {
              let oldValue = parseFloat(this.notipsData[n].value[6])
              let newValue = parseFloat(valueData[n][6])
              let m = parseFloat(n) + 1
              let changeDom = this.$refs.marketColumn.$refs.content[m]
              if (oldValue < newValue) {
                this.notipsData[n].value = valueData[n]
                addClass(changeDom, 'shadowUp')
                setTimeout(() => {
                  removeClass(changeDom, 'shadowUp')
                }, 500)
              } else {
                this.notipsData[n].value = valueData[n]
                addClass(changeDom, 'shadowDown')
                setTimeout(() => {
                  removeClass(changeDom, 'shadowDown')
                }, 500)
              }
              //console.log(this.notipsData[n].value, valueData[n])
            }
          }
        }
      }
    },
    _getIndicators () {
      getIndicators({
        session: this.userInfo.session
      }).then(res => {
        //console.log(res)
        //this.marketNav = Object.keys(res)
        let marketNav = []
        for (let n in res) {
          marketNav.push(res[n].cateName)
        }
        marketNav.push('自选')
        this.marketNav = marketNav
        this.originData = []
        for (var i in res) {
          if (!res[i].exchange) {
            this.originData.push(res[i].indicators)
          } else {
            this.originData.push({
              exchange: res[i].exchange,
              indicators: res[i].indicators
            })
          }
        }
        this._getMarketsData()
      })
    },
    _getMarketsData () {
      this.notipsData = []
      this.subNavData = []
      this.isLoading = true
      this.isNoResult = false
      if (this.type < 3) {
        let nameData = this.originData[this.type]
        if (!nameData.exchange) {
          for (let i in nameData) {
            nameData[i].indicator_id = nameData[i].id
          }
          this.nameData = nameData
          this.sendSocketData()
        } else {
          let addTypeAll = [{ exchange_code: "全部" }]
          this.subNavData = addTypeAll.concat(nameData.exchange)
          for (let i in nameData.indicators) {
            nameData.indicators[i].indicator_id = nameData.indicators[i].id
          }
          let exchangeNameData = []
          for (let a in nameData.exchange) {
            exchangeNameData[a] = []
            for (let b in nameData.indicators) {
              if (nameData.exchange[a].id === nameData.indicators[b].exchange_id) {
                exchangeNameData[a].push(nameData.indicators[b])
              }
            }
          }
          exchangeNameData.unshift(nameData.indicators)
          this.nameData = exchangeNameData[this.subType]
          this.sendSocketData()
        }
      } else {
        getFavorIndicatorList({
          session: this.userInfo.session
        }).then(res => {
          if (res.length !== 0) {
            this.nameData = res
            this.sendSocketData()
          } else {
            this.isNoResult = true
            this.isLoading = false
          }
        })
      }
    },
    sendSocketData () {
      var agentData = []
      for (var o in this.nameData) {
        agentData.push(this.nameData[o].table_name)
      }
      this.socket = new WebSocketClass('markets', agentData, this.getConfigResult)
      this.socket.connect()
    },
    change (i) {
      this.type = i
      this.socket.closeMyself()
      this.isFirst = true
      this._getMarketsData()
    },
    subNavChange (i) {
      this.subType = i
      this.socket.closeMyself()
      this.isFirst = true
      this._getMarketsData()
    }
  },
  destroyed () {
    this.socket.closeMyself()
  },
  components: {
    MarketColumn,
    RowNav,
    Loading,
    Confirm,
    NoResult
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
.market
  margin 0 30px 30px 0
  min-width 780px
  .market-nav
    display flex
    justify-content center
    margin 0 30px 30px 0
  .no-result-wrapper
    margin-top 100px
</style>
