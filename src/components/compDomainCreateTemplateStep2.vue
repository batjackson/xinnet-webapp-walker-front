<template lang="pug">
.step2
  Alert.alert1(type="warning", show-icon) 温馨提示：
    Icon(custom="i-icon i-icon-notice_", size="16", slot="icon")
    template(slot="desc") 1、请准确上传与域名所有人证件号码一致的扫描件或照片，证件需要在有效期内。<br />2、请准确选择域名所有人证件类型，避免由于证件类型不符影响网站备案审核。<br />3、可使用已保存模板信息快速填充，但仍需进行实名审核。
  .status 资料认证状态：
    span(v-if="templateData.verifyStatus===0") 未提交资料
    span(v-if="templateData.verifyStatus===1") 审核中
    span(v-if="templateData.verifyStatus===2", style="color:#45a305") 审核通过
    span(v-if="templateData.verifyStatus===3", style="color:#f00") 审核拒绝
    p.reason(v-if="templateData.verifyStatus===3") 审核失败原因：{{templateData.faildReason}}


  Form(:label-width="180")
    FormItem(label="模板名称：")
      span.text {{templateData.templateName}}
      input(type="hidden", ref="userCode", :value="templateData.userCode")
    FormItem(label="域名所有者：")
      span.text {{templateData.organizeNameCn}}
    FormItem(label="域名所有者类型：", v-if="type==='view'")
      span.text {{templateData.registrantType==="I"?"个人":"企业"}}
    FormItem(label="证件类型：", v-if="type==='view'")
      span.text {{templateData.registrantType==="I"?this.DATAS.REGISTRANT_ID_TYPE_I[templateData.idType]:this.DATAS.REGISTRANT_ID_TYPE_E[templateData.idType]}}
    FormItem(label="域名所有者证件号码：", v-if="type==='view'")
      span.text {{templateData.fileCode}}


    FormItem(label="域名所有者类型：", required, v-if="type!=='view'")
      comp-radio(:list="registrantTypeList", :onParentmethod="changeRegistrantType", ref="registrantType", :defaultValue="(type!=='create'?templateData.registrantType:'I')")
      Tooltip(placement="top-start")
        span(slot="content", style="color:#fff") 模板名称用作区别同一账户下的不同模板，<br />可填写域名所有人名称、企业名称等。<br />填写样例：行者科技北京分公司
        Icon(custom="i-icon i-icon-tips", size="16")
    FormItem(label="证件类型：", required, v-if="type!=='view'")
      compSelect(styles="width:300px;",:list="idTypeListI", ref="idTypeI",v-show="registrantType==='I'", :defaultValue="(type!=='create'?templateData.idType:'')")
      compSelect(styles="width:300px;",:list="idTypeListE", ref="idTypeE",v-show="registrantType==='E'", :defaultValue="(type!=='create'?templateData.idType:'')")
    FormItem(label="域名所有者证件号码：", required, v-if="type!=='view'")
      comp-input(name='idCode',label="域名所有者证件号码",ref="idCode",styles="width:300px",:maxLength="100", :defaultValue="(type!=='create'?templateData.fileCode:'')")
    FormItem(label="域名所有人证件扫描件：", required, v-if="type!=='view'")
      comp-img-upload(:status="status",ref="upfile",name="upfile",errorText="请上传证件扫描件！",tips="支持jpg、jpge格式，图片需大于50k，小于1M",:uploadAction="uploadAction", :on-beforecallback="changeUploadStatus", :showCover="showCover", :modify="modify", creatText="点击上传", )
        p(slot="unit") 请确保上传的<span style="color:#f00">证件图片与证件类型及证件号码完全一致</span>；若不一致将会导致域名实名不通过
        p.example(slot="last")
          span 示例
          img(src="../../static/img/idCard.png")

    FormItem(label="", v-if="type!=='view'")
      Button(type="primary",@click="formSubmit",:loading="loadingBtn") 提交审核
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
import compSelect from './compSelect'
import compRadio from './compRadio'
import compImgUpload from './compImgUpload'
import validateFormResult from '@/global/validateForm'
import * as links from '../global/linkdo.js'
export default {
  components: {
    compInput,
    compSelect,
    compRadio,
    compImgUpload
  },
  props: {
    onClose: {
      type: Function
    },
    type: {
      type: String,
      defaulte: ''
    },
    status: {
      type: String,
      defaulte: 'creat'
    },
    showCover: {
      type: Boolean,
      defaulte: false
    },
    modify: {
      type: Boolean,
      defaulte: false
    },
    templateData: {
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
      value:'',
      loadingBtn: false,
      uploadAction: links.UPLOAD_FILE_TEMPLATE,
      registrantType: 'I',
      registrantTypeList: [
        {
          label: 'I',
          value: '个人'
        },
        {
          label: 'E',
          value: '企业'
        }
      ],
      idTypeListI: [],
      idTypeListE: [],
    }
  },
  methods: {
    changeRegistrantType (v) {
      this.registrantType = v
    },
    changeUploadStatus () {
      this.status = 'view'
      this.modify = true
    },
    formSubmit () {
      console.log(this.$refs.upfile.$refs.upload.fileList[0])
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.registrantType,
        this.$refs['idType'+this.$refs.registrantType.value],
        this.$refs.idCode,
        this.$refs.upfile
      ])
      if (result) {
        let params = {
          param: {
            userCode: this.$refs.userCode.value,
            registrantType: this.$refs.registrantType.value,
            idCode: this.$refs.idCode.value,
            idFileUrl: this.$refs.upfile.$refs.upload.fileList[0].file,
            idFileName: this.$refs.upfile.$refs.upload.fileList[0].name
          },
          callback: (response) => {
            this.loadingBtn = false
            if (response.data.code === '1000'){
              this.$Message.success('模板资料提交成功')
              this.$emit("refreshData")
            } else {
              this.$Message.error('模板资料提交失败')
            }
          }
        }

        if (this.$refs.registrantType.value==='I') {
          params.param.idType = this.$refs.idTypeI.value
        } else {
          params.param.idType = this.$refs.idTypeE.value
        }
        console.log(params.param)
        this.submitTemplate(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      submitTemplate: types.SUBMIT_TEMPLATE
    })
  },
  computed: {

  },
  beforeMount () {
    this.idTypeListI = function (vm) {
      let array = []
      for (var i in vm.DATAS.REGISTRANT_ID_TYPE_I) {
        array.push({
          label: vm.DATAS.REGISTRANT_ID_TYPE_I[i],
          value: i
        })
      }
      return array
    }(this)
    this.idTypeListE = function (vm) {
      let array = []
      for (var i in vm.DATAS.REGISTRANT_ID_TYPE_E) {
        array.push({
          label: vm.DATAS.REGISTRANT_ID_TYPE_E[i],
          value: i
        })
      }
      return array
    }(this)
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style>
.compDomainCreateTemplate{
  padding: 0 30px 30px 30px;
}
.compDomainCreateTemplate .step2 .alert1{
  padding: 10px 10px 10px 32px;
}
.compDomainCreateTemplate .step2 .alert1 .ivu-alert-icon{
  top: -3px;
  left: 10px;
  margin:0px;
}
.compDomainCreateTemplate .step2 .alert1 .ivu-alert-icon i{
  color: #ffad02;
}
.compDomainCreateTemplate .step2 .alert1 .ivu-alert-message{
  float: left;
  font-size: 12px;
  font-weight: 600;
  color: #666;
}
.compDomainCreateTemplate .step2 .alert1 .ivu-alert-desc{
  overflow: hidden;
}
.compDomainCreateTemplate .step2 .ivu-form-item.title{
  margin-bottom: 5px;
}
.compDomainCreateTemplate .step2 .ivu-form-item.title .ivu-form-item-label{
  text-align: left;
  color: #aaa;
  font-size: 14px;
}
.compDomainCreateTemplate .step2 .status{
  font-size: 14px;
  font-weight:500;
  padding: 20px 0;
  border-bottom:1px solid #f0f0f0;
}
.compDomainCreateTemplate .step2 .status span{
  color: #999;
}
.compDomainCreateTemplate .step2 .status p{
  font-size:12px;
  line-height:20px;
  padding-top:5px;
}
.compDomainCreateTemplate .step2 .ivu-form-item-content .text{
  padding-left:0px;
}
.compDomainCreateTemplate .step2 form{
  padding: 30px 0;
}
.compDomainCreateTemplate .step2 .ivu-tooltip{
  vertical-align: top;
}
.compDomainCreateTemplate .step2 .ivu-tooltip .ivu-icon{
  color: #4aafff;;
}
.compDomainCreateTemplate .demo-upload-list{
  width: 210px!important;
  height: 150px!important;
  line-height: 150px;
  vertical-align: middle;
}
.compDomainCreateTemplate .demo-upload-list img{
  max-width: 100%;
  max-height: 100%;
  width: auto!important;
  height: auto!important;
  vertical-align: middle;
}
.compDomainCreateTemplate .ivu-upload{
  width: 210px!important;
  height: 150px!important;
  border: 1px solid #e0e0e0;
}
.compDomainCreateTemplate .ivu-upload-select{
  cursor: pointer;
  border:none;
}
.compDomainCreateTemplate .ivu-upload-select div{
  width: 100%!important;
  height: 100%!important;
  text-align:center;
  line-height: 150px!important;
}
.compDomainCreateTemplate .modify .ivu-upload{
  position: absolute;
  left: 0px;
  top: 0px;
}
.compDomainCreateTemplate .modify .ivu-upload .ivu-upload-select{
  background: none;
}
.compDomainCreateTemplate .modify .ivu-upload .ivu-upload-select div{
  display:none;
}
.compDomainCreateTemplate .modify .ivu-upload .ivu-upload-select:hover div{
  background: rgba(0,0,0,0.2);
  display:block;
}
.compDomainCreateTemplate .modify .ivu-upload .ivu-upload-select:hover div span{
  color:#fff;
}
.compDomainCreateTemplate .compImgUpload .example{
  position: absolute;
  left: 230px;
  top: 0px;
}
.compDomainCreateTemplate .compImgUpload .example span{
  display:block;
  color:#999;
}
</style>