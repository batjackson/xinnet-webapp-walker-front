'use strict'
const api = process.env.NODE_ENV === 'production' ? '' : '/api'
// 管家管理的客户列表
export const QUERY_USER_CUSTOMERS_LIST = api + '/client-api/client/user/userCustomers'
// 激活-step1
export const CHECK_VALID_USER = api + '/client-api/account/user/validUser'
// 激活验证码
export const ACTIVATION_VERIFICATIONCODE = api + '/client-api/server/message/send/activationCode'
// 激活账号-基本信息
export const SUBMIT_ACTIVATION_USER_INFO = api + '/client-api/account/user/activationUserInfo'
// 激活账号-密码
export const SUBMIT_ACTIVATION_USER_PWD = api + '/client-api/account/user/activationUserPwd'
// 登出
export const LOGIN_OUT = api + '/client-api/user/logout'
// 登录
export const LOGIN_SUBMIT = api + '/client-api/user/login'
// 登录_获取验证码
export const LOGIN_VERIFICATIONCODE = api + '/client-api/server/message/send/clientLogin'
// 获取当前账号信息
export const GET_CURRENT_USER_DATA = api + '/client-api/client/user/myUserInfo'
// 财务-消费统计
export const FINANCE_PAY_STATISTICS = api + '/client-api/client/finance/payStatistics'
// 财务-消费趋势
export const FINANCE_PAY_STATISTICS_TREND = api + '/client-api/client/finance/payStatisticsTrend'
// 财务-账单流水
export const QUERY_FINANCE_CUSTOMER_FLOW_LIST = api + '/client-api/client/finance/getCustomerFlowList'
// 财务-账单流水导出
export const EXPORT_FINANCE_CUSTOMER_FLOW_LIST = api + '/client-api/client/finance/exportCustomerFlow'
// 财务-信用额度统计
export const QUERY_PAY_STATISTICS_BALANCE = api + '/client-api/client/finance/payStatisticsBalance'
// 财务-未出账单
export const PAY_STATISTICS_UNBILLED = api + '/client-api/client/finance/payStatisticsUnBilled'
// 财务-往期账单
export const PAY_STATISTICS_HISTORY_BILL = api + '/client-api/client/finance/payStatisticsHistoryBill'
// 管家切换管理的客户
export const CHANGE_CUSTOMERS = api + '/client-api/client/user/changeCustomers'
// 角色列表
export const QUERY_ROLE_LIST = api + '/client-api/client/role/roleList'
// 企业列表
export const QUERY_COMPANY_LIST = api + '/client-api/client/company/companyList'
// 账号列表
export const QUERY_USER_LIST = api + '/client-api/client/user/userList'
// 修改账号信息
export const UPDATE_USER_INFO = api + '/client-api/client/user/updateUserInfo'
// 查询权限列表
export const QUERY_ROLE_MENUS = api + '/client-api/client/role/menus'
// 创建角色
export const ROLE_CREATE = api + '/client-api/client/role/roleCreate'
// 修改角色
export const ROLE_UPDATE = api + '/client-api/client/role/roleUpdate'
// 删除角色
export const ROLE_DELETE = api + '/client-api/client/role/roleDelete'
// 发送原手机号的验证码
export const GET_OLD_PHONE_CODE = api + '/client-api/server/message/send/oldPhoneCode'
// 发送修改手机号码验证码
export const GET_UPDATE_PHONE_CODE = api + '/client-api/server/message/send/updatePhoneCode'
// 验证原手机号的验证码
export const CHECK_OLD_PHONE_CODE = api + '/client-api/server/message/check/oldPhoneCode'
// 修改密码
export const UPDATE_USER_PASSWORD = api + '/client-api/client/user/updateUserPassword'
// 订单管理
export const QUERY_ORDER_LIST = api + '/client-api/client/order/orderManage'
// 导出订单管理
export const EXPORT_ORDER_LIST = api + '/client-api/client/order/exportOrder'
// 客户可用角色列表
export const GET_USER_ROLES = api + '/client-api/client/user/userRoles'
// 客户可用用户列表
export const GET_USERS = api + '/client-api/client/user/users'
// 客户可用企业列表
export const GET_COMPANYS = api + '/client-api/client/user/companys'
// 账号管理-按域名管理权筛选
export const GET_USER_AUTH_GROUPS = api + '/client-api/client/user/userAuthGroups'
// 账号管理-按公司筛选
export const QUERY_USER_COMPANYS = api + '/client-api/client/user/userCompanys'
// 新建账号
export const ADD_USER = api + '/client-api/client/user/addUser'
// 工单管理
export const QUERY_WORK_ORDER_MANAGE_LIST = api + '/client-api/client/workOrder/workOrderManage'
// 工单提交
export const SUBMIT_WORK_ORDER = api + '/client-api/client/workOrder/workOrderSubmit'
// 工单详情
export const QUERY_WORK_ORDER_DETAIL = api + '/client-api/client/workOrder/workOrderDetail'
// 删除账号
export const DELETE_USER_INFO = api + '/client-api/client/user/deleteUserInfo'
// 账号详情
export const QUERY_USER_INFO = api + '/client-api/client/user/userInfo'
// 修改角色权限
export const UPDATE_USER_AUTH = api + '/client-api/client/user/updateUserAuth'
// 修改员工信息
export const UPDATE_USER = api + '/client-api/client/user/updateUser'
// 创建企业
export const CREATE_COMPANY = api + '/client-api/client/company/companyCreate'