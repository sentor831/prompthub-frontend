<template>
    <div class="container">
        <div class="row" style="margin-top: 14vh;">
            <div class="col-7">
                <img src="https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg" style="cursor: pointer;" />
                <div class="row">
                    <div class="col-10" style="padding-left: 3vh; margin-top: 1vh;">
                        <p>{{ uploadtime }}</p>
                    </div>
                    <div class="col">
                        <a class="btn btn-primary">+ 收藏</a>
                    </div>
                </div>

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
                        <a class="btn btn-primary">+ 关注</a>
                    </div>
                </div>
                <h3 style="margin-top: 5vh; margin-bottom: 2vh;">Prompts</h3>
                <div class="row">
                    <p class="blockquote blockquote-default" style="margin: 2vh; margin-bottom: 1vh; margin-top: 1vh">
                        {{ prompts }}
                    </p>
                </div>
                <div class="row" style="margin-left: 83%">
                    <a class=" btn btn-simple btn-primary">复制</a>
                </div>
                <div>
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
                        <h5 style="margin-left: 2vh">模 型</h5>
                    </div>
                    <div class="row">
                        <p style="margin-left: 3vh">
                            {{ model }}
                        </p>
                    </div>
                    <div class="row">
                        <h5 style="margin-left: 2vh">seed</h5>
                    </div>
                    <div class="row">
                        <p style="margin-left: 3vh">
                            {{ seed }}
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
                    <button class="btn btn-primary" type="button" id="button-addon2" style="margin: 0;">发布</button>
                </div>
            </div>
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
                            <a class="btn btn-link" style="margin-top: -0.6vh; margin-left: 3vh;">回复</a>
                        </div>

                        <div class="reply" style="margin-left: 2vh;">
                            <div class="row">
                                <img src="https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg"
                                    style="width: 4vh; height: 4vh; border-radius: 50%; cursor: pointer;" />
                                <div class="col" style="margin-left: 0.5vh;">
                                    <h5 class="username" style="cursor: pointer; width:40vh;">{{
                                        replyer }}</h5>
                                    <p style="word-break: break-all; word-wrap: break-word">
                                        {{ reply }}
                                    </p>
                                    <div class="row" style="margin-left: 0.5vh;">
                                        <p style="font-size: small;">{{ replytime }}</p>
                                        <a class="btn btn-link" style="margin-top: -0.6vh; margin-left: 3vh;">回复</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-group mb-3" style="margin-right:2vh">
                                <textarea class="form-control" aria-label="with texarea" placeholder="回复..."
                                    v-model="commentcontent"></textarea>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button" id="button-addon2"
                                        style="margin: 0;">发布</button>
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
export default {
    name: 'picinfo',
    bodyClass: 'picinfo-page',
    components: {

    },
    data() {
        return {
            uploader: 'uploaffffffffffffffffffffffder',
            uploadtime: '2023-01-05 15:09:35',
            prompts: 'beautiful, building, jjjjjjjjjjjjjj, aaaaaaaaaaaaaaaa, uuuuuuuuuuuuuuu',
            width: '480',
            height: '960',
            model: 'DALL-E',
            seed: '100',
            commentnum: 2,
            commentcontent: '',
            commenter: 'me',
            comment: 'commenwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwt',
            commenttime: '2023-01-06 20:52:23',
            replyer: 'uploaffffffffffffffffffffffder',
            reply: 'commenwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwt',
            replytime: '2023-01-07 12:22:10',
        }
    },

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
</style>