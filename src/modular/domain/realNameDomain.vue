<template lang="pug">
.contRealNameDomain
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span @click="toBackList" class="backlist">域名实名制管理</span>
    <span v-show="showSubmit"> > 实名信息详情</span>
    .tR(v-show="!showSubmit")
      span 搜索
      Input(style="width:200px",placeholder="请输入域名/域名所有者", name="", v-model.trim="value")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
  .secMain
    Alert.alert1(type="warning", show-icon) 温馨提示：
      Icon(custom="i-icon i-icon-notice_", size="16", slot="icon")
      template(slot="desc") 1、请准确上传与域名所有人证件号码一致的扫描件或照片，证件需要在有效期内。<br />2、请准确选择域名所有人证件类型，避免由于证件类型不符影响网站备案审核。<br />3、可使用已保存模板信息快速填充，但仍需进行实名审核。

    .filter(v-show="!showSubmit")
      Collapse(v-model="colllapseValue")
        Panel(name="1") 按公司筛选
          div(slot="content")
            Tree(:data="userCompanys", show-checkbox, ref="Tree",)
        Panel(name="2") 按域名管理权限筛选
          div(slot="content")
            Tree(:data="userCompanys", show-checkbox, ref="Tree2",)
    <!-- 列表主体 -->
    .secTable(v-show="!showSubmit")
      <Table :columns="columns" :data="list" :loading="loadingTable" ref="selection" @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange"></Table>
      .tableTool
        a(href="javascript:;", @click="handleSelectAll(true)") 全选
        a(href="javascript:;", @click="handleSelectAll(false)") 取消全选
        Button(@click="batchRealName", :disabled="btnRealNameDisabled") 批量实名
        Button(@click="batchUpdate", :disabled="btnUpdateStatusDisabled") 更新状态

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20, v-show="!showSubmit")

  <!-- 提交资料 -->
  comp-domain-real-name-detail(
    v-if="showSubmit",
    :templateList="templateList",
    :organizeNameCn = "organizeNameCn",
    :domainIds = "getDomainId",
    @refreshData = "searchListData"
  )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compDomainRealNameDetail from '@/components/compDomainRealNameDetail'

export default {
  components: {
    compDomainRealNameDetail
  },
  data () {
    return {
      value: '',
      refresh: false,
      selectData: [],
      organizeNameCn: '',
      btnRealNameDisabled: true,
      btnUpdateStatusDisabled: true,
      loadingTable: true,
      loadingBtn: false,
      colllapseValue: '',
      templateList: [],
      list: [],
      userCompanys: [],
      domainIds: '',
      showSubmit: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '域名',
          key: 'domainName',
          className: 'col1'
        },
        {
          title: '域名所有者',
          key: 'organizeNameCn',
          className: 'col2',
        },
        {
          title: '联系邮箱',
          key: 'userEmail',
          className: 'col3'
        },
        {
          title: '提交日期',
          key: 'verifyTime',
          className: 'col4'
        },
        {
          title: '实名状态',
          key: 'rnvcStatus',
          className: 'col5',
          render: (h, params) => {
            if (this.list[params.index].rnvcStatus===3) {
              return h('Tooltip', {
                  props: {
                    content: this.list[params.index].rnvcFaildReason,
                    placement: "top"
                  }
                },
                [
                  h('Icon', {
                    props: {
                      custom: 'i-icon i-icon-tips',
                      size: "16"
                    },
                    style: {
                      margin: "0 5px 0 0",
                      color: "#48affe"
                    }
                  }),
                  h('a', {
                    props: {
                      href: ''
                    },
                    style: {
                      color: "#f00"
                    }
                  }, '审核拒绝')
                ]
              )
            } else {
              return h('div', [
                h('span', {
                }, this.DATAS.REAL_NAME_VERIFY_STATUS[this.list[params.index].rnvcStatus])
              ])
            }
          }
        },
        {
          title: '命名状态',
          key: 'dnvcStatus',
          className: 'col6',
          render: (h, params) => {
            if (this.list[params.index].dnvcStatus===3) {
              return h('Tooltip', {
                  props: {
                    content: this.list[params.index].dnvcFaildReason,
                    placement: "top"
                  }
                },
                [
                  h('Icon', {
                    props: {
                      custom: 'i-icon i-icon-tips',
                      size: "16"
                    },
                    style: {
                      margin: "0 5px 0 0",
                      color: "#48affe"
                    }
                  }),
                  h('a', {
                    props: {
                      href: ''
                    },
                    style: {
                      color: "#f00"
                    }
                  }, '审核拒绝')
                ]
              )
            } else {
              return h('div', [
                h('span', {
                }, this.DATAS.DOMAIN_NAME_VERIFY_STATUS[this.list[params.index].dnvcStatus])
              ])
            }
          }
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          render: (h, params) => {
            if (this.list[params.index].rnvcStatus===0 || this.list[params.index].rnvcStatus===3) {
              return h('div', [
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      this.showRealNameSubmit(this.list[params.index])
                    }
                  }
                }, '提交资料')
              ])
            }
          }
        }
      ]
    }
  },
  methods: {
    searchListData () {
      this.showSubmit = false
      this.btnRealNameDisabled = true
      this.btnUpdateStatusDisabled = true
      this.queryList(this.queryListParam({pageNum: 1}))
    },
    pageChange: function (curPage) {
      this.queryList(this.queryListParam({pageNum: curPage}))
    },
    toBackList () {
      this.showSubmit = false
    },
    showRealNameSubmit (item) {
      this.selectData = [item]
      this.organizeNameCn = item.organizeNameCn
      this.showSubmit = true
    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    tableSelectChange (selected) {
      this.selectData = selected
      this.btnUpdateStatusDisabled = selected.length ? false : true
      var result = false
      if (selected.length>1) {
        this.btnRealNameDisabled = function (vm) {
          selected.reduce(function(cur, next) {
            if (cur.organizeNameCn !== next.organizeNameCn) {
              vm.$Message.error('不同域名所有者，请重选')
              result = true
            }
            if (cur.rnvcStatus===1 || cur.rnvcStatus===2 || next.rnvcStatus===1 || next.rnvcStatus===2) {
              vm.$Message.error('审核状态不符，请重选')
              result = true
            }
            return next
          })
          return result
        }(this)
      } else if (selected.length===1) {
        if (selected[0].rnvcStatus===1 || selected[0].rnvcStatus===2) {
          this.$Message.error('审核状态不符，请重选')
          this.btnRealNameDisabled = true
        } else {
          this.btnRealNameDisabled = false
        }
      }
    },
    batchRealName () {
      this.organizeNameCn = this.selectData[0].organizeNameCn
      this.showSubmit = true
    },
    batchUpdate () {
      this.loadingBtn = true
      let params = {
        param: {
          domainIds: this.getDomainId
        },
        callback: (response) => {
          this.loadingBtn = false
          if (response.data.code === '1000'){
            this.$Message.success('更新成功')
            this.searchListData()
          } else {
            this.$Message.error('更新失败')
          }
        }
      }
      this.updateDomainAuditStatus(params)
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          domainName: this.value,
          groupIds: '',
          serviceState: '',
          rnvcStatus: '',
          dnvcStatus: '',
          verifyDay: ''
        },
        callback: (response) => {
          this.loadingBtn = false
          this.loadingTable = false
          if (response.data.code === '1000'){
            this.list = response.data.data.list
            this.page.pageItems = response.data.data.totalNum
          } else {
          }
        }
      }
      return params
    },
    ...mapActions({
      queryList: types.QUERY_DOMAIN_VERIFY_LIST,
      queryTemplates: types.QUERY_TEMPLATES,
      updateDomainAuditStatus: types.UPDATE_DOMAIN_AUDIT_STATUS
    })
  },
  computed: {
    getDomainId () {
      console.log(this.selectData)
      return this.selectData.map((v) => {
        return v.id
      }).join(",")
    },
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {
    let params = {
      param: {

      },
      callback: (response) => {
        if( response.data.code === '1000' ){
          this.templateList = this.GLOBALS.CONVERT_SELECT(response.data.data, {
            label: 'templateName',
            value: 'id'
          })
        } else {
        }
      }
    }
    this.queryTemplates(params)
  },
  mounted () {
    this.queryList(this.queryListParam({pageNum: 1}))
  }
}
</script>

<style>
.contRealNameDomain .secMain{
  background:none;
}
.contRealNameDomain .backlist{
  cursor:pointer;
}
.contRealNameDomain .alert1{
  padding: 10px 10px 10px 32px;
  margin-bottom: 30px;
}
.contRealNameDomain .alert1 .ivu-alert-icon{
  top: -3px;
  left: 10px;
  margin:0px;
}
.contRealNameDomain .alert1 .ivu-alert-icon i{
  color: #ffad02;
}
.contRealNameDomain .alert1 .ivu-alert-message{
  float: left;
  font-size: 12px;
  font-weight: 600;
  color: #666;
}
.contRealNameDomain .alert1 .ivu-alert-desc{
  overflow: hidden;
}
.contRealNameDomain .filter{
  float:left;
  width:220px;
  background:#fff;
  margin-right:20px;
}

.contRealNameDomain .secTable{
  overflow:hidden;
  background:none;
}
.contRealNameDomain .ivu-page{
  padding-top:20px;
}
.contRealNameDomain .tableTool {
  background:#fff;
  padding: 10px 20px;
}
.contRealNameDomain .tableTool .ivu-btn{
  margin: 0 5px;
}
.contRealNameDomain .tableTool .ivu-btn span{
  color:#333;
}
.contRealNameDomain .tableTool a{
  display:inline-block;
  margin: 0 10px;
}
</style>
