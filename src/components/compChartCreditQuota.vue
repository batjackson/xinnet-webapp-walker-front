<template lang="pug">
  .creditQuota
    div(id="myChart",style="width:450px;height:260px;")
    p.text 剩余额度：{{charData.unUsedCreditBalance}} 元　　总额度：{{charData.totalCreditBalance}} 元　　已用额度：{{charData.usedCreditBalance}} 元
</template>

<script>
export default {
  name: 'compChartCreditQuota',
  props: {
    charData: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    drawChart (datas) {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title : {
          text: '',
          subtext: '',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          right: '12%',
          top: 'center',
          data: ['信用消费','剩余额度']
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '60%',
            center: ['30%', '50%'],
            data:[
              {value:datas.usedCreditBalance, name:'信用消费'},
              {value:datas.unUsedCreditBalance, name:'剩余额度'}
            ],
            label: {
              normal: {
                show: true,
                position: 'inner',
                formatter: '{d}%'
              }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  },
  beforeMount () {

  },
  mounted () {
  },
  computed: {
  },
  watch: {
    charData: function (val, oldVal) {
      this.drawChart(val)
    }
  }
}
</script>
<style scoped>
.creditQuota{
  margin:0 auto;
}
.creditQuota p.text{
  color:#666;
  font-size:12px;
}
</style>
