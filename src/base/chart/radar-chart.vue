<template>
<div :id="name">

</div>
</template>

<script>
import G2 from '@antv/g2'
import { DataSet } from '@antv/data-set'

export default {
  name: 'g2-chart',
  data () {
    return {

    }
  },
  props: {
    name: {
      type: String,
      default: 'radar'
    },
    height: {
      type: Number,
      default: 300
    },
    fieldsText: {
      type: Array,
      default: () => ['a', 'b']
    },
    itemText: {
      type: String,
      default: 'item'
    },
    keyText: {
      type: String,
      default: 'user'
    },
    valueText: {
      type: String,
      default: 'score'
    },
    sourceData: {
    }
  },
  mounted () {
    const ds = new DataSet()
    const dv = ds.createView().source(this.sourceData)
    dv.transform({
      type: 'fold',
      fields: this.fieldsText,
      key: this.keyText,
      value: this.valueText
    })
    const chart = new G2.Chart({
      container: this.name,
      height: this.height,
      padding: [20, 0, 40, 0],
      forceFit: true
    })
    chart.source(dv, {
      score: {
        min: 0,
        max: 80
      }
    })
    chart.coord('polar', {
      radius: 0.8
    })
    chart.axis(this.itemText, {
      line: null,
      tickLine: null,
      grid: {
        lineStyle: {
          stroke: 'rgba(255, 255, 255, 0.17)',
          lineDash: null
        },
        hideFirstLine: false
      },
      label: {
        textStyle: {
          fill: '#bfbfbf'
        }
      }
    })
    chart.axis(this.valueText, {
      line: null,
      tickLine: null,
      grid: {
        type: 'polygon',
        lineStyle: {
          stroke: 'rgba(255, 255, 255, 0.17)',
          lineDash: null
        }
      },
      label: {
        textStyle: {
          fill: '#bfbfbf'
        }
      }
    })
    chart.legend(this.keyText, {
      marker: 'circle',
      offset: 30
    });
    chart.line().position(`${this.itemText}*${this.valueText}`).color(this.keyText).size(2)
    chart.point().position(`${this.itemText}*${this.valueText}`).color(this.keyText).shape('circle').size(4).style({
      stroke: '#fff',
      lineWidth: 1,
      fillOpacity: 1
    });
    chart.area().position(`${this.itemText}*${this.valueText}`).color(this.keyText)
    chart.render()

  },
  methods: {
    formatter (val) {
      if (this.isPercent) {
        return val + '%'
      }
      return val
    }
  }
}
</script>

<style>

</style>
