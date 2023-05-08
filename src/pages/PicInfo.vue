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
                        <a class="btn btn-primary" @click="toCollect()">+ 收藏</a>
                    </div>
                </div>

                <el-dialog title="添加到收藏夹" :visible.sync="dialogVisible" width="30%" center>
                    <p style="width: 30%; margin-left: auto; margin-right: auto;" class="btn btn-primary"
                        @click="createCollectionVisible = true">新建收藏</p>
                    <div class="dialogdiv" style="height: 30vh; overflow-y: auto; overflow-x: hidden;">
                        <el-checkbox-group v-model="checkList" style="margin-left: 5%;">
                            <el-checkbox class="row" v-for="(item, index) in collectionRelation" :key="index"
                                :label="item.name"> {{
                                    dispVis(item.visibility) }} {{ item.name }}</el-checkbox>
                        </el-checkbox-group>
                    </div>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="chooseBag()">确 定</el-button>
                    </span>
                </el-dialog>

                <el-dialog title="新建收藏夹" :visible.sync="createCollectionVisible" width="33%" center>
                    <div class="dialogdiv" style="height: auto; overflow-y: auto; overflow-x: hidden">
                        <el-form ref="form" :model="form" label-width="120px" label-position="left">
                            <el-form-item label="收藏夹名称">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="是否公开">
                                <el-switch v-model="form.visibility"></el-switch>
                            </el-form-item>
                        </el-form>
                    </div>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="createCollectionVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitCreateCollection()">确 定</el-button>
                    </span>
                </el-dialog>

            </div>
            <div class="col-5">
                <div class="row">
                    <div class="col col-md-auto">
                        <img :src="uploader_avatar" style="width: 6em; height: 6em; border-radius: 50%; cursor: pointer;"
                            @click="toUploader()" />
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
                        <h5 style="margin-left: 1vw">模 型</h5>
                    </div>
                    <div class="row">
                        <p style="margin-left: 2vw">
                            {{ model }}
                        </p>
                    </div>
                    <div class="row">
                        <h5 style="margin-left: 1vw">宽 度</h5>
                    </div>
                    <div class="row">
                        <p style="margin-left: 2vw;">
                            {{ width }}
                        </p>
                    </div>
                    <div class="row">
                        <h5 style="margin-left: 1vw">高 度</h5>
                    </div>
                    <div class="row">
                        <p style="margin-left: 2vw;">
                            {{ height }}
                        </p>
                    </div>
                    <div class="row">
                        <h5 style="margin-left: 1vw">其他信息</h5>
                    </div>
                    <div class="row" style="overflow-x: scroll;">
                        <p style="margin-left: 2vw;">
                        <pre>{{ others }}</pre>
                        <!-- {{ jsonBeautifulPrint(others) }} -->
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
                                    v-model="replycontent"></textarea>
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
import { followOthers, NewComment, DelComment, GetComment, get_prompt, getAllCollectionList, ManageCollectionRecord, create_collection } from '../api';
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
            replycontent: '',
            show: -1,
            pic: '',
            collectionRelation: [],
            form: {
                name: "",
                visibility: true,
            },
            createCollectionVisible: false,
            login: null,
        }
    },
    mounted() {
        // TODO 从后端获取 个人收藏夹、是否已关注；当前作品的作者、发布时间、详细信息、评论（自己的可删除）
        this.picid = this.$route.query.picid;
        this.getPicInfo()
        this.login = this.cookie.getCookie("token")
        if (this.login !== null) {
            this.getCollections()
        }
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
                    this.prompts = res.data.prompt.prompt
                    this.model = res.data.prompt.model

                    let img = new Image()
                    img.src = res.data.prompt.picture
                    this.width = img.width
                    this.height = img.height

                    this.others = eval('[' + res.data.prompt.prompt_attribute + ']')[0]

                    if (this.login !== null) {
                        this.hasFollowed = res.data.is_following
                    } else {
                        this.hasFollowed = 0
                    }

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
                        this.checkList = this.checkList.concat(item.name);
                    }
                })
            }).catch((err) => {
                console.log(err)
                Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
            })

        },
        toUploader() {
            this.$router.push({ path: '/profile/prompts', query: { userId: this.uploaderId } })
        },
        follow() {
            if (this.login !== null) {
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
            } else {
                Notification({ title: '请先登录', message: '', type: 'warning', duration: 2000 })
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
        toCollect() {
            if (this.login !== null) {
                this.dialogVisible = true
            } else {
                Notification({ title: '请先登录', message: '', type: 'warning', duration: 2000 })
            }
        },
        submitCreateCollection() {
            let name = this.form.name;
            console.log(this.form.visibility);
            let visibility = this.form.visibility === true ? 0 : 1;
            create_collection({
                name,
                visibility,
            })
                .then((res) => {
                    Notification({
                        title: "成功",
                        message: res.data.msg,
                        type: "success",
                        duration: 2000,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    Notification({
                        title: "失败",
                        message: err.response.data.msg,
                        type: "error",
                        duration: 2000,
                    });
                })
                .finally(() => {
                    this.createCollectionVisible = false;
                    this.getCollections()
                });
        },
        chooseBag() {
            this.dialogVisible = false
            //Post API
            let ls = [] // collection_id & is_in
            this.collectionRelation.forEach((item) => {
                let is_in = this.checkList.indexOf(item.name) > -1;
                ls = ls.concat({
                    "collection_id": item.id,
                    is_in,
                })
            })
            ManageCollectionRecord({
                "prompt_id": this.picid,
                "collection_list": ls,
            }).then((res) => {
                Notification({ title: '成功', message: res.msg, type: 'success', duration: 2000 })
            }).catch((err) => {
                Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
            })
        },
        publishComment() {
            if (this.login !== null) {
                if (this.commentcontent === '') {
                    Notification({ title: '请输入内容', message: '', type: 'warning', duration: 2000 })
                } else {
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
                }
            } else {
                Notification({ title: '请先登录', message: '', type: 'warning', duration: 2000 })
            }

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
            if (this.login !== null) {
                if (this.replycontent === '') {
                    Notification({ title: '请输入内容', message: '', type: 'warning', duration: 2000 })
                } else {
                    NewComment({
                        prompt_id: this.picid,
                        content: this.replycontent,
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
                                    this.replycontent = ''
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
                }
            } else {
                Notification({ title: '请先登录', message: '', type: 'warning', duration: 2000 })
            }


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