<template lang="pug">
  Form.accountMobileModify(:label-width="150")
    .step1(v-show="step===1")
      FormItem(label="")
        p.tips 请使用账号{{userName}}（{{userCode}}）绑定手机号<em>{{userMobile}}</em> <br />接收短信验证码
      FormItem(label="")
        comp-input(name='verificationCode',label="短信验证码",ref="verificationCode1",defaultValue="",placeholder="短信验证码",styles="width:118px",:maxLength="6")
          Button.verificationCode(@click="getVerificationCode1", :loading="loadingBtn",slot="right") 获取短信验证码
      FormItem(label="")
        Button(type="primary",@click="nextForm",:loading="loadingBtn") 下一步
    .step2(v-show="step===2")
      FormItem(label="")
        comp-input(name='userMobile',label="新手机号码",ref="userMobile",defaultValue="",placeholder="请输入新手机号码",:maxLength="11")
      FormItem(label="")
        comp-input(name='verificationCode',label="短信验证码",ref="verificationCode2",defaultValue="",placeholder="短信验证码",styles="width:118px",:maxLength="6")
          Button.verificationCode(@click="getVerificationCode2", :loading="loadingBtn",slot="right") 获取短信验证码
      FormItem(label="")
        Button(type="primary",@click="updateForm",:loading="loadingBtn") 完成
    input(type="hidden",ref="userCode",:value="userCode")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput
  },
  props: {
    onClose: {
      type: Function
    },
    userMobile: {
      type: String,
      default: ''
    },
    userCode: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loadingBtn: false,
      step: 1
    }
  },
  methods: {
    close () {
      this.onClose();
    },
    getVerificationCode1 () {
      this.loadingBtn = true
      let vm = this
      let params = {
        param: {
        },
        callback: function (response) {
          vm.loadingBtn = false
          if( response.data.code === '1000' ){
            vm.$Message.success('发送成功')
          } else {
            if (response.data.code === '300') {
              vm.$Message.error('短信验证码已发送')
            } else if (response.data.code === '500') {
              vm.$Message.error('手机号码错误')
            } else {
              vm.$Message.error('发送失败')
            }
          }
        }
      }
      this.getOldPhoneCode(params)
    },
    getVerificationCode2 () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userMobile
      ])
      if (result) {
        let vm = this
        let params = {
          param: {
            userMobile: this.$refs.userMobile.value
          },
          callback: function (response) {
            vm.loadingBtn = false
            if( response.data.code === '1000' ){
              vm.$Message.success('发送成功')
            } else {
              if (response.data.code === '300') {
                vm.$Message.error('短信验证码已发送')
              } else if (response.data.code === '500') {
                vm.$refs.userMobile.showValidateResult({text:'手机号码错误'})
              } else {
                vm.$Message.error('发送失败')
              }
            }
          }
        }
        this.getUpdatePhoneCode(params)
      } else {
        this.loadingBtn = false
      }
    },
    nextForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.verificationCode1
      ])
      if (result) {
        let vm = this
        var params = {
          param: {
            verificationCode: this.$refs.verificationCode1.value
          },
          callback: function (response) {
            vm.loadingBtn = false
            if( response.data.code === '1000' ){
              vm.$Message.success('验证成功')
              vm.step = 2
            } else {
              vm.$Message.error('验证失败')
            }
          }
        }
        this.checkOldPhoneCode(params)
      } else {
        this.loadingBtn = false
      }
    },
    updateForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userMobile,
        this.$refs.verificationCode2
      ])
      if (result) {
        let vm = this
        var params = {
          param: {
            userCode: this.$refs.userCode.value,
            userMobile: this.$refs.userMobile.value,
            verificationCode: this.$refs.verificationCode2.value
          },
          callback: function (response) {
            vm.loadingBtn = false
            if( response.data.code === '1000' ){
              vm.$Message.success('手机更新成功')
              vm.$store.commit(types.UPDATE_USER_MOBILE, vm.$refs.userMobile.value)
              vm.close()
            } else {
              if (response.data.code === '200') {
                vm.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                vm.$Message.error('用户被锁定')
              } else if (response.data.code === '400') {
                vm.$refs.verificationCode2.showValidateResult({text:'手机验证码错误'})
              } else {
                vm.$Message.error('验证失败')
              }
            }
          }
        }
        this.updateUserInfo(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      updateUserInfo: types.UPDATE_USER_INFO,
      getOldPhoneCode: types.GET_OLD_PHONE_CODE,
      getUpdatePhoneCode: types.GET_UPDATE_PHONE_CODE,
      checkOldPhoneCode: types.CHECK_OLD_PHONE_CODE
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
<style scoped>
form.accountMobileModify{
  padding:50px 0 0 0;
}
form.accountMobileModify .tips{
  font-size:15px;
  text-align:left;
}
form.accountMobileModify .tips em{
  color:#ff7101;
}
</style>