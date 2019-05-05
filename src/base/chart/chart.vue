<template>
  <div :id="name">

  </div>
</template>

<script>
import G2 from '@antv/g2'
import { DataSet } from '@antv/data-set'

export default {
  data () {
    return {
      chart: null
    }
  },
  props: {
    name: {
      type: String,
      default: 'c1'
    },
    height: {
      type: Number,
      default: 300
    },
    fieldsText: {
      type: Array,
      default: () => ['a', 'b']
    },
    keyText: {
      type: String,
      default: 'city'
    },
    timeText: {
      type: String,
      default: 'time'
    },
    valueText: {
      type: String,
      default: 'yField'
    },
    sourceData: {
      type: Array,
      default: () => []
    },
    tickCount: {
      type: Number,
      default: 4
    },
    timeCount: {
      type: Number,
      default: 2
    },
    textColor: {
      type: String,
      default: '#bfbfbf'
    },
    keyColor: {
      type: Array,
      default: () => ['rgb(6, 238, 254)', 'rgb(109, 81, 255)']
    },
    isPercent: {
      type: Boolean,
      default: false
    },
    guideData: {
      type: Array,
      default: () => []
    },
    tooltips: {
      type: String,
      default: '<li>{value}</li>'
    }
  },
  mounted () {
    this.createChart()
  },
  methods: {
    createChart () {
      this.chart && this.chart.destroy()
      const dv = new DataSet.View().source(this.sourceData)
      dv.transform({
        type: 'fold',
        fields: this.fieldsText,
        key: this.keyText,
        value: this.valueText
      })
      this.chart = new G2.Chart({
        container: this.name,
        height: this.height,
        padding: [10, 10, 26, 36],
        forceFit: true
      })
      this.chart.source(dv, {
        'time': {
          type: 'time',
          tickCount: this.timeCount
        },
        'yField': {
          tickCount: this.tickCount
        }
      })
      this.chart.tooltip({
        crosshairs: {
          type: 'y',
          style: {
            stroke: '#fff',
            lineWidth: 1,
            lineDash: [2, 3]
          }
        }
      })
      this.chart.axis(this.valueText, {
        title: null,
        label: {
          formatter: this.formatter,
          offset: 36,
          textStyle: {
            textAlign: 'left',
            fill: this.textColor
          }
        },
        grid: {
          type: 'line',
          lineStyle: {
            stroke: 'rgba(255, 255, 255, 0.17)',
            lineWidth: 1,
            lineDash: [1, 0]
          }
        },
        line: {
          lineWidth: 1,
          stroke: 'rgba(255, 255, 255, 0.17)'
        }
      })
      this.chart.axis(this.timeText, {
        title: null,
        tickLine: null,
        label: {
          textStyle: {
            fill: this.textColor,
            fontSize: 11
          }
        },
        line: {
          lineWidth: 1,
          stroke: 'rgba(255, 255, 255, 0.17)'
        }
      })

      this.chart.tooltip(true, {
        itemTpl: this.tooltips
      })
      this.chart.line().position(`${this.timeText}*${this.valueText}`).color(this.keyText, this.keyColor).shape('smooth')
      for (var i = 0; i < this.guideData.length; i++) {
        this.chart.guide().dataMarker({
          position: this.guideData[i].point,
          content: this.guideData[i].pointValue,
          style: {
            text: {
              textAlign: 'left',
              fill: '#fff',
              stroke: 'rgb(67, 67, 128)',
              lineWidth: 2
            }
          }
        })
      }
      this.chart.render()
    },
    formatter (val) {
      if (this.isPercent) {
        return val + '%'
      }
      return val
    }
  },
  watch: {
    sourceData (val, oldVal) {
      this.chart.changeData(val)
    }
  }
}
</script>

<style>

</style>
