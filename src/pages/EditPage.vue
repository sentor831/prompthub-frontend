<template>
    <div class="MainBack">
        <div class="SecondBack">
            <div class="GroupBox">
                <p class="Characters">图 片</p>
                <!-- 缩略图显示-->
                <div class="img-show" v-if="imgUrl">
                    <img :src="imgUrl" class="avatar">
                    <span class="actions">
                        <!-- 放大 -->
                        <span class="item">
                            <i class="el-icon-zoom-in" @click="enlarge()"></i>
                        </span>
                        <!-- 删除 -->
                        <span class="item">
                            <i class="el-icon-delete" @click="del()"></i>
                        </span>
                    </span>
                </div>
                <!-- 图片上传 -->
                <el-upload 
                v-else
                style="margin: 0 0 0 40vh"
                action="#"
                class="uploader-avatar" 
                list-type="picture"
                :auto-upload="false" 
                :show-file-list="false"
                :on-change="imgPreview">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <!-- 图片显示对话框 -->
                 <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogUrl" alt="">
                </el-dialog> 
            </div>
            <br><br>

            <div class="GroupBox">
                <p class="Characters">Prompt</p>
                <!-- <textarea class="PromptInput" placeholder="请输入Prompt" v-model="Prompt"></textarea> -->
                <el-input type="textarea" class="PromptInput" :rows="6" placeholder="请输入Prompt"  v-model="Prompt">
                </el-input>
            </div>
            <br><br>

            <div class="GroupBox">
                <p class="Characters">模 型</p>
                <!-- <input type="text" class="ModelInput" placeholder="请输入模型名称" v-model="Model"> -->
                <el-input class="ModelInput" placeholder="请输入模型名称" v-model="Model" clearable>
                </el-input>

            </div>
            <br><br>
            
            <div class="GroupBox">
                <p class="Characters">标 签</p>
                <!-- <input type="text" class="ModelInput" placeholder="请输入图片标签" v-model="Label"> -->
                <el-input class="ModelInput" placeholder="请输入图片标签" v-model="Label" clearable></el-input>
            </div>
            <br><br>

            <div class="GroupBox">
                <button type="button" class="btn btn-primary" style="width:15vh; margin-left:20vh; background:#00A1D6" @click=Subbmit()>立即上传</button>
                <button type="button" class="btn btn-primary" style="width:15vh; margin-left:5vh; background:#FFFFFF; color:#000000" @click="SaveDraft()">存草稿</button>
            </div>
            <br><br>
        </div>
    </div>

</template>

<script>
export default {
    name: 'EditPage',
    bodyClass: 'profile-page',
    components: {
    },
    data() {
        return {
            Picture:'',
            Prompt:'',
            Model:'',
            Label:'',
            imgUrl: '',
            dialogVisible: false,
            dialogUrl: ''
        }
    },
    methods: {
        //图片缩略图
        imgPreview: function(file){
                //生成临时缩略图
                this.imgUrl =  URL.createObjectURL(file.raw);
        },
        enlarge: function(){
            this.dialogVisible = true;
            this.dialogUrl = this.imgUrl;
        },
        del: function(){
            this.imgUrl =  '';
            this.dialogUrl = '';
        }
    }
}
</script>

<style scoped>

.uploader-avatar>>>.el-upload {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
    overflow: hidden;
}
.img-show{
    position: relative;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    overflow: hidden;
    margin: 0 0 0 40vh;
}
.uploader-avatar>>>.el-upload:hover {
    border-color: #409EFF;
}
.uploader-avatar>>>i {
    font-size: 28px;
    color: #8c939d;
}
.avatar{
    width: 148px;
    height: 148px;
    display: block;
}

.actions{
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 148px;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0,0,0,.5);
    transition: opacity .3s;
}
.actions:hover{
    opacity: 1;
}
.actions:hover span{
    display: inline-block;
}
.actions span{
    display: none;
    margin: 0 16px;
    cursor: pointer;
}
.MainBack{
        background: #eaebed;
    }
    .SecondBack{
        background: #F2F4F8;
        width: 60%;
        margin: 0 auto;
    }
    .Characters{
        /* position: absolute; */
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 2vh;
        line-height: 100%;
        color: #212121;
        margin: 2% 0 0 5%;
    }
    .GroupBox{
        display: flex;
        /* justify-content: space-around; */
    }
    .Picture{
        display: inline;
        box-sizing: border-box;
        /* width: 204vh; */
        /* height: 146px; */
        background: #FFFFFF;
        border: 2px dashed #BFBFBF;
        margin: 0 0 0 30%;
        /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
    }
    .PromptInput{
        /* border: 1.5px solid #BFBFBF; */
        /* border-radius: 8px; */
        width: 90vh;
        height: 20vh;
        margin: 0 0 0 7.5vh;
        resize: none;
    }
    .ModelInput{
        /* border: 1.5px solid #BFBFBF; */
        /* border-radius: 8px; */
        width: 90vh;
        height: 5vh;
        margin: 0 0 0 9.5vh;
        resize: none;
    }
    .button1{
        margin-left:20vh;
        width: 123px;
        height: 42px;
        background: #00A1D6;
        border-radius: 5px;
    }
    .button2{
        margin-left:5vh;
        width: 123px;
        height: 42px;
        background: #FFFFFF;
        border: 1px solid #BFBFBF;
        border-radius: 5px;
    }
</style>
