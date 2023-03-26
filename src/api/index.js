import { get, post, put } from './http'
import axios from "axios"

// =======================> 用户 API
// 登录
export const login = (params) => post(`/api/token-auth`, params)

// 发送邮件
export const sendRegisterEmail = (params) => post(`/api/user/create`, params)

// 注册
export const register = (params) => put(`/api/user/create`, params)

// 忘记密码发送邮件
export const sendForgetPassEmail = (params) => post(`/api/user/forget-password`, params)

// 修改新密码
export const modifyPass = (params) => put(`/api/user/forget-password`, params)