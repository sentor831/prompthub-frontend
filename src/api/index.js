import axios from 'axios'
import HttpRequest from '@/api/axios'

export const refreshTokenReq = (refreshToken) => {
    const url = '/api/auth/refresh_token'
    const headers = refreshToken ? { Authorization: 'Bearer ' + refreshToken } : {}
    console.log('refreshtoken:' + refreshToken)
    return axios.request({
        url,
        method: 'get',
        headers
    })
}

const axioss = new HttpRequest('')

// =======================> 用户 API
// 登录
export const login = (params) => {
    return axioss.request({
        url: `/api/auth/user_obtain_token`,
        data: params,
        method: 'post'
    })
}

// 发送邮件
export const sendRegisterEmail = (params) => {
    return axioss.request({
        url: `/api/user/sign_up`,
        data: params,
        method: 'post'
    })
}

// 注册
export const register = (params) => {
    return axioss.request({
        url: `/api/user/confirm_and_create`,
        data: params,
        method: 'put'
    })
}

// 忘记密码发送邮件
export const sendForgetPassEmail = (params) => {
    return axioss.request({
        url: `/api/user/confirm_and_create`,
        data: params,
        method: 'post'
    })
}

// 修改忘记的密码
export const modifyForgetPass = (params) => {
    return axioss.request({
        url: `/api/user/confirm_forget_password`,
        data: params,
        method: 'put'
    })
}

// 修改密码
export const modifyPass = (params) => {
    return axioss.request({
        url: `api/user/change_password`,
        data: params,
        method: 'post'
    })

}

export const followOthers = (params) => {
    return axioss.request({
        url: `api/user/follow`,
        data: params,
        method: 'post'
    })
}

export const NewComment = (params) => {
    return axioss.request({
        url: `api/comment/create_comment`,
        data: params,
        method: 'post'
    })
}

export const DelComment = (params) => {
    return axioss.request({
        url: `api/comment/delete_comment`,
        data: params,
        method: 'delete'
    })
}

export const GetComment = (id) => {
    return axioss.request({
        url: `api/comment/get_comment_list?prompt_id=${id}`,
        // data: params,
        method: 'get'
    })
}


// 上传图片，获取图片key以及七牛token
export const get_qiniu_token = (params) => {
    return axioss.request({
        url: `api/image/get_qiniu_token`,
        method: 'get'
    })
}


// ***************************************黄新，http请求接口begin*************************
// 收藏作品
export const add_to_collection = (params) => {
    return axioss.request({
        url: `api/collection/add_to_collection`,
        method: 'post',
        data: params
    })
}

// 取消收藏
export const romve_from_collection = (params) => {
    return axioss.request({
        url: `api/collection/remove_from_collection`,
        method: 'post',
        data: params
    })
}

// 创建收藏夹
export const create_collection = (params) => {
    return axioss.request({
        url: `api/collection/create_collection`,
        method: 'post',
        data: params
    })
}

// 删除收藏夹
export const delete_collection = (params) => {
    return axioss.request({
        url: `api/collection/delete_collection`,
        method: 'post',
        data: params
    })
}

// 编辑收藏夹
export const modify_collection = (params) => {
    return axioss.request({
        url: `api/collection/modify_collection`,
        method: 'put',
        data: params
    })
}

// 获取收藏夹列表
export const get_collection_list = (params) => {
    return axioss.request({
        url: `api/collection/get_collection_list`,
        method: 'get',
        data: params
    })
}

// 获取收藏夹中收藏列表
export const get_collection_record_list = (params) => {
    return axioss.request({
        url: `api/collection/get_collection_record_list`,
        method: 'get',
        data: params
    })
}


// ---------------4.7消息通知接口编写--------------
// 获取消息列表
export const get_notification_list = (params) => {
    return axioss.request({
        url: `api/notificatio/get_notification_list`,
        method: 'get',
        data: params
    })
}

// 获取未读消息数量
export const get_unread_notification_num = (params) => {
    return axioss.request({
        url: `api/notificatio/get_unread_notification_num`,
        method: 'get',
        data: params
    })
}


// 更新通知列表
export const update_notification = (params) => {
    return axioss.request({
        url: `api/notificatio/update_notification`,
        method: 'post',
        data: params
    })
}

// 删除通知
export const delete_notification = (params) => {
    return axioss.request({
        url: `api/notificatio/delete_notification`,
        method: 'delete',
        data: params
    })
}

// ---------------- 4.8历史记录功能接口---------------
// 获取历史记录列表
export const get_history_list = (params) => {
    return axioss.request({
        url: `api/history/get_history_list`,
        method: 'get',
        data: params
    })
}

// 删除历史记录
export const delete_history = (params) => {
    return axioss.request({
        url: `api/history/delete_history`,
        method: 'delete',
        data: params
    })
}

// -----------------4.9作品相关接口-------------------
// 新建作品
export const create_prompt = (params) => {
    return axioss.request({
        url: `api/prompt/create_prompt`,
        method: 'post',
        data: params
    })
}

// 编辑作品
export const edit_prompt = (params) => {
    return axioss.request({
        url: `api/prompt/edit_prompt`,
        method: 'post',
        data: params
    })
}

// 删除作品
export const delete_prompt = (params) => {
    return axioss.request({
        url: `api/prompt/delete_prompt`,
        method: 'delete',
        data: params
    })
}

// 获取作品内容
export const get_prompt = (id) => {
    return axioss.request({
        url: `api/prompt/get_prompt?id=${id}`,
        method: 'get'
    })
}

// --------------- 4.10 关键字搜索--------------
// 关键字搜索
export const search_prompt_keyword = (params) => {
    return axioss.request({
        url: `api/prompt_list/search_prompt_keyword`,
        method: 'get',
        data: params
    })
}

// 按热度搜索
export const hot_prompt_list = (per_page, page_index) => {
    return axioss.request({
        url: `api/prompt_list/hot_prompt_list?per_page=${per_page}&page_index=${page_index}`,
        method: 'get'
    })
}

// 个性化浏览
export const personized_prompt_list = (params) => {
    return axioss.request({
        url: `api/prompt_list/personized_prompt_list`,
        method: 'get',
        data: params
    })
}
// ***************************************黄新，http请求接口end*************************










