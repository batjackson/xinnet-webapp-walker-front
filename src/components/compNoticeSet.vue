<template lang="pug">
.compNoticeSet
  Form(:label-width="120", ref="type3")
    h3
      span 域名信息修改
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range3")
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way3")

  Form(:label-width="120", ref="type4") <!-- 4,5 -->
    h3
      span 域名过户/实名认证
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range4") <!-- 4,5 -->
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way4") <!-- 4,5 -->

  Form(:label-width="120", ref="type8")
    h3
      span 域名安全设置
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range8")
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way8")

  Form(:label-width="120", ref="type2")
    h3
      span 域名状态变化
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range2")
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way2")

  Form(:label-width="120", ref="type6") <!-- 6,7 -->
    h3
      span 域名解析/DNS服务器修改
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range6") <!-- 6,7 -->
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way6") <!-- 6,7 -->

  Form(:label-width="120", ref="type1")
    h3
      span 域名到期时间通知
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range1")
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way1")

  Form(:label-width="120", ref="type9")
    h3
      span 域名转入
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range9")
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way9")

  .btn
    Button(type="primary",@click="saveForm",:loading="loadingBtn") 保存
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compRadio from './compRadio'
import compSelect from './compSelect'

export default {
  components: {
    compRadio,
    compSelect
  },
  props: {
  },
  data () {
    return {
      loadingBtn: false,
      rangeList: [
        {
          value: '仅通知域名所在分组负责人',
          label: 1
        },
        {
          value: '通知域名所在分组全部管理人员',
          label: 2
        }
      ],
      wayList: [
        {
          label: '不通知',
          value: 1
        },
        {
          label: '短信通知',
          value: 2
        },
        {
          label: '邮件通知',
          value: 3
        },
        {
          label: '短信和邮件通知',
          value: 4
        }
      ]
    }
  },
  methods: {
    saveForm () {
      let params = {
        param: {
          notifyInfo: function (vm) {
            let arr = []
            for(var i=1; i<=9; i++ ) {
              if (i===5) {
                arr.push({
                  type: i,
                  way: vm.$refs.way4.value,
                  range: vm.$refs.way4.value,
                })
              } else if (i===7) {
                arr.push({
                  type: i,
                  way: vm.$refs.way6.value,
                  range: vm.$refs.way6.value,
                })
              } else {
                arr.push({
                  type: i,
                  way: vm.$refs['way'+i].value,
                  range: vm.$refs['range'+i].value
                })
              }
            }
            return arr
          }(this)
        }
      }
      console.log(params.param)
    },
    ...mapActions({
      setNotify: types.SET_NOTIFY
    })
  },
  computed: {
  },
  beforeMount () {
  },
  watch: {
  }
}
</script>

<style>
.compNoticeSet{
  padding: 30px;
}
.compNoticeSet form{
  background: #f9f9f9;
  margin-bottom: 20px;
}
.compNoticeSet form h3{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e2e2e2;
  margin-bottom: 10px;
}
.compNoticeSet form h3 span{
  border-left: 3px solid #2271f4;
  padding-left: 18px;
  font-weight: normal;
}
.compNoticeSet form .ivu-form-item{
  padding-left: 20px;
  margin: 0px;
  padding-bottom: 15px;
}
.compNoticeSet form .ivu-form-item-label{
  text-align: left;
}
.compNoticeSet form .radioRange .ivu-radio-group-item{
  display: block;
  padding: 0px;
}
.compNoticeSet .btn{
  text-align: center;
  border-top: 1px solid #f0f0f0;
  padding-top: 30px;
}
</style>