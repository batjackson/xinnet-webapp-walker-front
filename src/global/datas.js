'use strict'
const REGISTRANT_ID_TYPE_I = {
  SFZ: '身份证',
  HZ: '护照',
  TXZ: '港澳居民来往内地通行证',
  TWSFZ: '台湾居民来往大陆通行证',
  GWSFZ: '外国人永久居留身份证'
}
const REGISTRANT_ID_TYPE_E = {
  ORG: '组织机构代码证',
  YYZZ: '工商营业执照',
  TYDMZ: '统一社会信用代码证书',
  BDDH: '部队代号',
  JDXKZ: '军队单位对外有偿服务许可证',
  SYZS: '事业单位法人证书',
  GWCZDJZ: '外国企业常驻代表机构登记证',
  STDJZ: '社会团体法人登记证书',
  ZJDJZ: '宗教活动场所登记证',
  MBDJZ: '民办非企业单位登记证书',
  JJDJZ: '基金会法人登记证书',
  LSXKZ: '律师事务所执业许可证',
  GWZHDJZ: '外国在华文化中心登记证',
  GWLYDJZ: '外国政府旅游部门常驻代表机构批准登记证',
  SFXKZ: '司法鉴定许可证',
  GWJGZJ: '外国机构证件',
  SHFWJGZ: '社会服务机构登记证书',
  MBXXXKZ: '民办学校办学许可证',
  YLJGXKZ: '医疗机构执业许可证'
}
const DOMAIN_TRANSFER_STATUS = {
  1: '待转移',
  2: '转移中',
  3: '转移成功',
  4: '转移失败',
  5: '转移成功信息更新中',
  6: '转移成功信息更新完成',
  7: '转移成功信息更新失败'
}
const ORDER_TYPE = {
  1: '新开',
  2: '续费',
  3: '退费',
  4: '转入'
}
const DOMAIN_CHANGE_TYPE = {
  0: '待过户',
  1: '过户中',
  2: '过户完成',
  3: '过户失败'
}
const REAL_NAME_VERIFY_STATUS = {
  0: '未提交资料',
  1: '审核中',
  2: '审核通过',
  3: '审核拒绝'
}
const DOMAIN_NAME_VERIFY_STATUS = {
  0: '未审核',
  1: '审核中',
  2: '审核通过',
  3: '审核拒绝'
}
const IMPORTANT_FLAG = {
  0: '一般保护',
  1: '重点保护',
  2: '不支持'
}
const RENEWFLAG = {
  0: '未开通',
  1: '已开通',
  2: '不支持'
}
const UPDATEFLAG = {
  0: '未开通',
  1: '已开通',
  2: '不支持'
}
const BACKENDLOCKFLAG = {
  0: '未开通',
  1: '已开通',
  2: '不支持',
  3: '未购买',
  4: '已到期'
}
const SERVICE_TYPE = {
  'renewFlag': '自动续费',
  'updateFlag': '禁止更新',
  'backendLockFlag': '注册局锁'
}
const SERVICE_STATE = {
  0: '服务期',
  1: '续费期',
  2: '偿还期'
}
const RECORD_DOMAIN_EVENT_TYPE = {
  1: '域名到期时间提醒',
  2: '域名状态修改',
  3: '域名DNS修改',
  4: '域名信息修改',
  5: '域名过户',
  6: '域名解析修改',
  7: '域名所属管理公司修改',
  8: '域名安全设置',
  9: '域名实名认证',
  10: '域名转入'
}
const RECORD_USER_EVENT_TYPE = {
  1: '修改登录密码',
  2: '修改账号信息',
  3: '修改角色信息',
  4: '修改企业信息',
  5: '修改分组信息',
  6: '域名注册',
  7: '域名续费',
  8: '域名转入',
  9: '域名信息修改',
  10: '域名安全设置'
}
export default
{
  ORDER_TYPE,
  REGISTRANT_ID_TYPE_I,
  REGISTRANT_ID_TYPE_E,
  DOMAIN_TRANSFER_STATUS,
  DOMAIN_CHANGE_TYPE,
  REAL_NAME_VERIFY_STATUS,
  DOMAIN_NAME_VERIFY_STATUS,
  IMPORTANT_FLAG,
  RENEWFLAG,
  UPDATEFLAG,
  BACKENDLOCKFLAG,
  SERVICE_TYPE,
  SERVICE_STATE,
  RECORD_USER_EVENT_TYPE,
  RECORD_DOMAIN_EVENT_TYPE
}