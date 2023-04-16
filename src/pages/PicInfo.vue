<template>
    <div class="container">
        <div class="row" style="margin-top: 14vh;">
            <div class="col-7">
                <img src="../../public/img/dog1.jpeg" style="cursor: pointer;" />
                <div class="row">
                    <div class="col-10" style="padding-left: 3vh; margin-top: 1vh;">
                        <p>{{ uploadtime }}</p>
                    </div>
                    <div class="col">
                        <a class="btn btn-primary" @click="dialogVisible = true">+ 收藏</a>
                    </div>
                </div>

                <el-dialog title="添加到收藏夹" :visible.sync="dialogVisible" width="25%" center>
                    <div class="dialogdiv" style="height: 30vh; overflow-y: auto; overflow-x: hidden;">
                        <el-checkbox-group v-model="checkList" style="margin-left: 5%;">
                            <el-checkbox class="row" label="收藏夹 A"></el-checkbox>
                            <el-checkbox class="row" label="收藏夹 B"></el-checkbox>
                            <el-checkbox class="row" label="收藏夹 C"></el-checkbox>
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
                        <img src="https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg"
                            style="width: 10vh; height: 10vh; border-radius: 50%; cursor: pointer;" />
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
                        style="margin: 2vh; margin-bottom: 1vh; margin-top: 1vh">
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
                <p> {{ commentnum }}</p>
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
            <div class="comment">
                <div class="row">
                    <img src="https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg"
                        style="width: 7vh; height: 7vh; border-radius: 50%; cursor: pointer;" />
                    <div class="col">
                        <h5 class="username" style="cursor: pointer;">{{ commenter }}</h5>
                        <p style="word-break: break-all; word-wrap: break-word">
                            {{ comment }}</p>
                        <div class="row" style="margin-left: 0.5vh;">
                            <p style="font-size: small;">{{ commenttime }}</p>
                            <a class="btn btn-link" style="margin-top: -0.6vh; margin-left: 3vh;"
                                @click="showReply()">回复</a>
                            <el-dropdown v-if="mycomment == 1">
                                <span class="el-dropdown-link">
                                    <el-button type="text" icon="el-icon-edit"
                                        style="padding: 0; margin-left: 3vh;"></el-button>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="deleteComment()">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div class="row" v-show="show">
                            <div class="input-group mb-3" style="margin-right:2vh">
                                <textarea class="form-control" aria-label="with texarea" placeholder="回复..."
                                    v-model="commentcontent"></textarea>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button" id="button-addon2" style="margin: 0;"
                                        @click="publishReply()">发布</button>
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
            uploader: 'uploaffffffffffffffffffffffder',
            uploadtime: '2023-01-05 15:09:35',
            prompts: 'beautiful, building, jjjjjjjjjjjjjj, aaaaaaaaaaaaaaaa, uuuuuuuuuuuuuuu',
            width: '480',
            height: '960',
            model: 'DALL-E',
            others: 'some json: {seed: 100, lr: 0.001}',
            mycomment: 1, // 是否是我的评论
            commentnum: 1,
            commentcontent: '',
            commenter: 'me',
            comment: 'commenwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwt',
            commenttime: '2023-01-06 20:52:23',
            show: false,
        }
    },
    mounted() {
        // TODO 从后端获取 个人收藏夹、是否已关注；当前作品的作者、发布时间、详细信息、评论（自己的可删除）
        this.checkList = ['收藏夹 A']
        this.hasFollowed = 1
    },
    methods: {
        follow() {
            if (this.hasFollowed == 1) {
                // TODO 取关
                this.hasFollowed = 0
            } else {
                // TODO 关注
                this.hasFollowed = 1
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
        showReply() {
            this.show = !this.show
        },
        chooseBag() {
            // TODO 加入所选定的收藏夹checkList
            console.log(this.checkList)
            this.dialogVisible = false
        },
        publishComment() {
            // TODO 发布评论，重新获取
        },
        deleteComment() {
            // TODO 删除评论，重新获取
        },
        publishReply() {
            // TODO 发布回复，重新获取
        }
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