<template>
    <div class="container">
        <div class="row" style="margin-top: 14vh;">
            <div class="col-7">
                <img :src="pic" style="cursor: pointer; width: 100%" />
                <div class="row">
                    <div class="col" style="padding-left: 3vh; margin-top: 1vh;">
                        <p>{{ dispTime(uploadtime) }}</p>
                    </div>
                    <div class="col" style="text-align: right;">
                        <a class="btn btn-primary" @click="dialogVisible = true">+ 收藏</a>
                    </div>
                </div>

                <el-dialog title="添加到收藏夹" :visible.sync="dialogVisible" width="30%" center>
                    <div class="dialogdiv" style="height: 30vh; overflow-y: auto; overflow-x: hidden;">
                        <el-checkbox-group v-model="checkList" style="margin-left: 5%;">
                            <el-checkbox class="row" v-for="(item, index) in collectionRelation" :key="index"
                                :label="index"> {{
                                    dispVis(item.visibility) }} {{ item.name }}</el-checkbox>
                        </el-checkbox-group>
                    </div>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="chooseBag()">确 定</el-button>
                    </span>
                </el-dialog>

            </div>
            <div class="col" style="margin-left: 5vh;">
                <div class="row">
                    <div class="col col-md-auto">
                        <img :src="uploader_avatar" style="width: 6em; height: 6em; border-radius: 50%; cursor: pointer;" />
                    </div>
                    <div class="col col-md-auto" style=" padding-top: 3vh;">
                        <h5 class="username" style="cursor: pointer;">{{ uploader }}</h5>
                    </div>
                    <div class="col col-md-auto" style="padding-top: 1vh;">
                        <a class="btn btn-primary" v-if="hasFollowed == 0" @click="follow()">+ 关注</a>
                        <a class="btn btn-default" v-if="hasFollowed == 1" @click="follow()">已关注</a>
                    </div>
                </div>
                <h3 style="margin-top: 5vh; margin-bottom: 2vh;">Prompts</h3>
                <div class="row">
                    <p id="prompt-content" class="blockquote blockquote-default"
                        style="margin: 2vh; margin-bottom: 1vh; margin-top: 1vh; width: 100%;">
                        {{ prompts }}
                    </p>
                </div>
                <div class="row" style="margin-left: 83%">
                    <a id="copybtn" class=" btn btn-simple btn-primary" data-clipboard-target="#prompt-content"
                        @click="handleCopy(prompts)">复制</a>
                </div>
                <div>
                    <div class="row">
                        <h5 style="margin-left: 2vh">模 型</h5>
                    </div>
                    <div class="row">
                        <p style="margin-left: 3vh">
                            {{ model }}
                        </p>
                    </div>
                    <div class="row">
                        <h5 style="margin-left: 2vh">宽 度</h5>
                    </div>
                    <div class="row">
                        <p style="margin-left: 3vh;">
                            {{ width }}
                        </p>
                    </div>
                    <div class="row">
                        <h5 style="margin-left: 2vh">高 度</h5>
                    </div>
                    <div class="row">
                        <p style="margin-left: 3vh;">
                            {{ height }}
                        </p>
                    </div>
                    <div class="row">
                        <h5 style="margin-left: 2vh">其他信息</h5>
                    </div>
                    <div class="row">
                        <p style="margin-left: 3vh">
                            {{ others }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="comments">
            <div class="row">
                <h5>评 论 &nbsp;&nbsp;</h5>
                <p> {{ commentList.length }}</p>
            </div>
            <div class="input-group mb-3">
                <textarea class="form-control" aria-label="with texarea" placeholder="添加评论..."
                    v-model="commentcontent"></textarea>
                <div class="input-group-append">
                    <button class="btn btn-primary" type="button" id="button-addon2" style="margin: 0;"
                        @click="publishComment()">发布</button>
                </div>
            </div>
            <!-- TODO v-for -->
            <div class="comment" v-for="(comment, index) in commentList" :key="index">
                <div class="row">
                    <img :src="comment.user.avatar" style="width: 4em; height: 4em; border-radius: 50%; cursor: pointer;" />
                    <div class="col">
                        <h5 class="username" style="cursor: pointer;">{{ comment.user.nickname }}</h5>
                        <div class="row" v-if="comment.parent_comment"
                            style="background-color: whitesmoke; margin-left: auto; padding: 1em; padding-bottom: 0;">
                            <img :src="comment.parent_comment.user.avatar"
                                style="width: 3em; height: 3em; border-radius: 50%; cursor: pointer;" />
                            <div class="col">
                                <h5 class="username" style="cursor: pointer; font-size: medium;">{{
                                    comment.parent_comment.user.nickname }}
                                </h5>
                                <p style="word-break: break-all; word-wrap: break-word; font-size: medium;">
                                    {{ comment.parent_comment.content }}</p>
                                <div class="row" style="margin-left:auto">
                                    <p style="font-size: smaller;">{{ dispTime(comment.parent_comment.created_at) }}</p>
                                </div>
                            </div>
                        </div>
                        <p style="word-break: break-all; word-wrap: break-word">
                            {{ comment.content }}</p>
                        <div class="row" style="margin-left: auto;">
                            <p style="font-size: small;">{{ dispTime(comment.created_at) }}</p>
                            <a class="btn btn-link" style="margin-top: -0.6vh; margin-left: 3vh;"
                                @click="showReply(index)">回复</a>
                            <el-dropdown v-if="comment.belong_to == true">
                                <span class="el-dropdown-link">
                                    <el-button type="text" icon="el-icon-edit"
                                        style="padding: 0; margin-left: 3vh;"></el-button>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="deleteComment(comment.id)">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div class="row" v-show="index === show">
                            <div class="input-group mb-3" style="margin-right:2vh">
                                <textarea class="form-control" aria-label="with texarea" placeholder="回复..."
                                    v-model="commentcontent"></textarea>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button" id="button-addon2" style="margin: 0;"
                                        @click="publishReply(comment.id)">发布</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Clipboard from 'clipboard'
import { Notification } from 'element-ui';
import { syntaxHighlight, formatTime } from '../api/utils'
import { followOthers, NewComment, DelComment, GetComment, get_prompt, getAllCollectionList } from '../api';
export default {
    name: 'picinfo',
    bodyClass: 'picinfo-page',
    components: {
    },
    data() {
        return {
            dialogVisible: false,
            checkList: [],
            hasFollowed: 0,
            picid: 0,
            uploader: '',
            uploadtime: '',
            uploader_avatar: '',
            prompts: '',
            width: '',
            height: '',
            model: '',
            others: '',
            commentList: [],
            commentcontent: '',
            show: -1,
            pic: '',
            collectionRelation: []
        }
    },
    mounted() {
        // TODO 从后端获取 个人收藏夹、是否已关注；当前作品的作者、发布时间、详细信息、评论（自己的可删除）
        this.picid = this.$route.query.picid;
        this.getPicInfo()
        this.getCollections()
    },
    methods: {
        jsonBeautifulPrint(jsonString) {
            return syntaxHighlight(jsonString)
        },
        dispVis(v) {
            if (v == 0) {
                return "[公开] "
            } else {
                return "[私有] "
            }
        },
        getPicInfo() {
            // TODO
            get_prompt(this.picid)
                .then((res) => {
                    console.log(res)
                    this.pic = res.data.prompt.picture
                    this.uploaderId = res.data.prompt.uploader.id
                    this.uploader_avatar = res.data.prompt.uploader.avatar
                    this.uploader = res.data.prompt.uploader.nickname
                    this.uploadtime = res.data.prompt.created_at
                    this.hasFollowed = res.data.is_following
                    this.prompts = res.data.prompt.prompt
                    this.model = res.data.prompt.model
                    this.width = res.data.prompt.width
                    this.height = res.data.prompt.height
                    this.others = res.data.prompt.prompt_attribute
                    GetComment(this.picid)
                        .then((res) => {
                            console.log(res)
                            // Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
                            this.commentList = res.data.comment_list
                        })
                        .catch((err) => {
                            console.log(err)
                            Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                        })

                })

        },
        dispTime(t, detailed) {
            return formatTime(t, detailed)
        },
        getCollections() {
            // this.checkList = ['收藏夹 A']
            getAllCollectionList(this.picid).then((res) => {
                this.collectionRelation = res.data.collection_list
                // add already in Collection
                this.collectionRelation.forEach((item, index) => {
                    if (item.prompt_is_in) {
                        this.checkList = this.checkList.concat(index);
                    }
                })
            }).catch((err) => {
                console.log(err)
                Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
            })

        },
        follow() {
            if (this.hasFollowed == 1) {
                followOthers({
                    user_id: this.uploaderId
                })
                    .then((res) => {
                        console.log(res)
                        Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
                        this.hasFollowed = 0
                    })
                    .catch((err) => {
                        console.log(err)
                        Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                    })
            } else {
                followOthers({
                    user_id: this.uploaderId
                })
                    .then((res) => {
                        console.log(res)
                        Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
                        this.hasFollowed = 1
                    })
                    .catch((err) => {
                        console.log(err)
                        Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                    })
            }
        },
        handleCopy() {
            var clipboard = new Clipboard('#copybtn');
            clipboard.on('success', e => {
                Notification({ title: '复制成功', type: 'success', duration: 2000 })
                clipboard.destroy() // 释放内存 
            })
            clipboard.on('error', e => {
                Notification({ title: '复制失败', message: '该浏览器不支持自动复制', type: 'error', duration: 2000 })
                clipboard.destroy() // 释放内存
            })
        },
        showReply(index) {
            this.show = index
        },
        chooseBag() {
            // TODO 加入所选定的收藏夹checkList
            console.log(this.checkList)
            this.dialogVisible = false
        },
        publishComment() {
            NewComment({
                prompt_id: this.picid,
                content: this.commentcontent,
                // parent_comment_id: ''
            })
                .then((res) => {
                    console.log(res)
                    Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
                    GetComment(this.picid)
                        .then((res) => {
                            console.log(res)
                            // Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
                            this.commentList = res.data.comment_list
                            this.commentcontent = ''
                        })
                        .catch((err) => {
                            console.log(err)
                            Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                        })

                })
                .catch((err) => {
                    console.log(err)
                    Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
        },
        deleteComment(id) {
            DelComment({
                comment_id: id
            })
                .then((res) => {
                    console.log(res)
                    Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
                    GetComment(this.picid)
                        .then((res) => {
                            console.log(res)
                            // Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
                            this.commentList = res.data.comment_list
                        })
                        .catch((err) => {
                            console.log(err)
                            Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                        })
                })
                .catch((err) => {
                    console.log(err)
                    Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })

        },
        publishReply(parent_id) {
            NewComment({
                prompt_id: this.picid,
                content: this.commentcontent,
                parent_comment_id: parent_id
            })
                .then((res) => {
                    console.log(res)
                    Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
                    GetComment(this.picid)
                        .then((res) => {
                            console.log(res)
                            // Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
                            this.commentList = res.data.comment_list
                            this.commentcontent = ''
                        })
                        .catch((err) => {
                            console.log(err)
                            Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                        })
                })
                .catch((err) => {
                    console.log(err)
                    Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
                .finally(() => this.show = -1)

        },

    }
}
</script>

<style>
.username {
    width: 20vh;
    text-overflow: ellipsis;
    overflow: hidden;
}

.comments {
    border-style: solid;
    border-width: thin;
    border-color: gainsboro;
    margin-top: 5vh;
    margin-bottom: 20vh;
    padding-left: 5vh;
    padding-top: 2vh;
    padding-bottom: 2vh;
    padding-right: 5vh;
}

.comment {
    margin-top: 3vh;
}

.el-checkbox {
    margin-top: 3vh;
    font-size: medium;
}
</style>