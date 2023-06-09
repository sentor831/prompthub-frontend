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
    return axios.request({
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
        url: `/api/user/forget_password`,
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

export const getSelfPublished = (per_page, page_index) => {
    return axioss.request({
        url: `api/user/get_self_published_prompt?per_page=${per_page}&page_index=${page_index}`,
        method: 'get'
    })
}

// 获取自己上传的各种状态的作品
export const getAuditRecordList = (per_page, page_index, status) => {
    return axioss.request({
        url: `api/user/get_audit_record_list?per_page=${per_page}&page_index=${page_index}&status=${status}`,
        method: 'get'
    })
}

export const deleteAuditRecord = (params) => {
    return axioss.request({
        url: `api/user/delete_audit_record`,
        data: params,
        method: 'delete'
    })
}

export const getEditingPrompt = (id) => {
    return axioss.request({
        url: `api/prompt/get_editing_prompt?id=${id}`,
        method: 'get'
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
export const remove_from_collection = (params) => {
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
export const get_collection_list = (id) => {
    return axioss.request({
        url: `api/collection/get_collection_list?fetch_user_id=${id}`,
        method: 'get'
    })
}

// 获取收藏夹信息
export const get_collection_info = (collection_id) => {
    return axioss.request({
        url: `api/collection/get_collection_info?collection_id=${collection_id}`,
        method: 'get'
    })
}

// 获取收藏夹中收藏列表
export const get_collection_record_list = (id, per_page, page_index) => {
    return axioss.request({
        url: `api/collection/get_collection_record_list?id=${id}&per_page=${per_page}&page_index=${page_index}`,
        method: 'get'
    })
}


// ---------------4.7消息通知接口编写--------------
// 获取消息列表
export const get_notification_list = (nf_type, per_page, page_index) => {
    return axioss.request({
        url: `api/notification/get_notification_list?nf_type=${nf_type}&per_page=${per_page}&page_index=${page_index}`,
        method: 'get'
    })
}

// 获取未读消息数量
export const get_unread_notification_num = () => {
    return axioss.request({
        url: `api/notification/get_unread_notification_num`,
        method: 'get'
    })
}


// 更新通知列表
export const update_notification = (params) => {
    return axioss.request({
        url: `api/notification/update_notification`,
        method: 'post',
        data: params
    })
}

// 删除通知
export const delete_notification = (params) => {
    return axioss.request({
        url: `api/notification/delete_notification`,
        method: 'delete',
        data: params
    })
}

// ---------------- 4.8历史记录功能接口---------------
// 获取历史记录列表
export const get_history_list = () => {
    return axioss.request({
        url: `api/history/get_history_list?per_page=100`,
        method: 'get',
    })
}

export const get_my_prompt_list = (id, per_page, page_index) => {
    return axioss.request({
        url: `api/user/get_published_prompt_list?user_id=${id}&per_page=${per_page}&page_index=${page_index}`,
        method: 'get',
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
export const search_prompt_keyword = (params, reject) => {
    console.log(params);
    let baseUrl = `api/prompt_list/search_prompt_keyword?`
    baseUrl = baseUrl + `keyword=${params.keyword}`
    if (params.models != undefined) {
        baseUrl = baseUrl + `&models=${params.models}`
    }
    if (params.sortBy == undefined) {
        params.sortBy = 'hot'
    }
    baseUrl = baseUrl + `&sorted_by=${params.sortBy}`
    baseUrl = baseUrl + `&per_page=666`
    return axioss.request({
        url: baseUrl,
        method: 'get',
    })
}

// 按热度浏览
export const hot_prompt_list = (per_page, page_index) => {
    return axioss.request({
        url: `api/prompt_list/hot_prompt_list?per_page=${per_page}&page_index=${page_index}`,
        method: 'get'
    })
}

// 个性化浏览
export const personized_prompt_list = (per_page, page_index) => {
    return axioss.request({
        url: `api/prompt_list/personized_prompt_list?per_page=${per_page}&page_index=${page_index}`,
        method: 'get'
    })
}
// ***************************************黄新，http请求接口end*************************

// *********** Extra API ********************
export const getInfos = (id) => {
    return axioss.request({
        url: `api/user/get_user_simple_dict?id=${id}`,
        method: 'get'
    })
}

export const getIsFollowing = (target_user_id) => {
    return axioss.request({
        url: `api/user/is_following?target_user_id=${target_user_id}`,
        method: 'get'
    })
}

export const getFollowingNumber = (id) => {
    return axioss.request({
        url: `api/user/get_user_following_num?user_id=${id}`,
        method: 'get'
    })
}

export const getFollowedNumber = (id) => {
    return axioss.request({
        url: `api/user/get_user_follower_num?user_id=${id}`,
        method: 'get'
    })
}

export const getProductNumber = (id) => {
    return axioss.request({
        url: `api/user/get_published_prompt_num?user_id=${id}`,
        method: 'get'
    })
}

export const getAllCollectionList = (id) => {
    return axioss.request({
        url: `api/collection/get_user_prompt_collection_relation?prompt_id=${id}`,
        method: 'get'
    })
}

export const getUserfollowingList = (id, per_page, page_index) => {
    return axioss.request({
        url: `api/user/get_user_following_list?user_id=${id}&per_page=${per_page}&page_index=${page_index}`,
        method: 'get'
    })
}

export const getUserfollowerList = (id, per_page, page_index) => {
    return axioss.request({
        url: `api/user/get_user_follower_list?user_id=${id}&per_page=${per_page}&page_index=${page_index}`,
        method: 'get'
    })
}

export const ManageCollectionRecord = (params) => {
    return axioss.request({
        url: `api/collection/manage_collection_records`,
        method: 'post',
        data: params
    })
}

export const changeAvatar = (params) => {
    return axioss.request({
        url: `api/user/change_avatar`,
        method: 'post',
        data: params
    })
}

export const changeNickname = (params) => {
    return axioss.request({
        url: `api/user/change_nickname`,
        method: 'post',
        data: params
    })
}
