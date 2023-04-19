<template>
    <div class="MainBack" style="text-align: center;">
        <!-- <div class="SecondBack"> -->
        <div class="card" style="width: 60vw; padding: 5%;">
            <div class="col">
                <div class="GroupBox">
                    <p>图 片</p>
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
                    <el-upload v-else action="#" :http-request="UploadHttpRequest" drag class="Upload" list-type="picture"
                        :show-file-list="false" :on-change="imgPreview">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <!-- 图片显示对话框 -->
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogUrl" alt="">
                    </el-dialog>
                </div>
                <el-form style="margin-top: 3vh">
                    <el-form-item label="Prompt">
                        <el-input type="textarea" :autosize="{ minRows: 5 }" placeholder="请输入Prompt"
                            v-model="prompt"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true">
                    <el-form-item label="宽度">
                        <el-input v-model="width" placeholder="宽度"></el-input>
                    </el-form-item>
                    <el-form-item label="高度">
                        <el-input v-model="height" placeholder="高度"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true">
                    <el-form-item label="模型">
                        <el-select v-model="modelName" placeholder="请选择模型">
                            <el-option label="DALL-E" value="1"></el-option>
                            <el-option label="Midjourney" value="2"></el-option>
                            <el-option label="Stable Diffusion" value="3"></el-option>
                            <el-option label="其他模型" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :prop="model" :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
                        <el-input :disabled="modelName !== '4'" placeholder="模型名称" v-model="form.model"></el-input>
                    </el-form-item>
                </el-form>

                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" :inline="true">
                    <el-row v-for="(attribute, index) in dynamicValidateForm.attributes" :key="attribute.key">
                        <el-form-item label="新属性" :prop="'attributes.' + index + '.value'" :rules="{
                            required: true, message: '不能为空', trigger: 'blur'
                        }">
                            <el-input v-model="attribute.name" placeholder="属性名称"></el-input>
                        </el-form-item>
                        <el-form-item :prop="'attributes.' + index + '.value'" :rules="{
                            required: true, message: '不能为空', trigger: 'blur'
                        }">
                            <el-input v-model="attribute.value" placeholder="属性值"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.prevent="removeAttribute(attribute)">删除</el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
                <el-button @click="addAttribute()" type="button">增加属性</el-button>
                <el-button type="primary" @click=Submit()>立即上传</el-button>
                <!-- <button type="button" class="btn btn-primary" style="width:10vw; background:#FFFFFF; color:#000000"
                    @click="SaveDraft()">存草稿</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { get_qiniu_token, create_prompt } from '../api/index.js'
export default {
    name: 'EditPage',
    bodyClass: 'profile-page',
    components: {
    },
    data() {
        return {
            picture: '',
            prompt: '',
            width: '',
            height: '',
            modelName: '',
            form: {
                model: ''

            },
            dynamicValidateForm: {
                attributes: [],
            },
            label: '',
            imgUrl: '',
            dialogVisible: false,
            dialogUrl: '',
            key: ''
        }
    },
    methods: {
        //图片缩略图
        imgPreview: function (file) {
            //生成临时缩略图
            this.imgUrl = URL.createObjectURL(file.raw);
        },
        enlarge: function () {
            this.dialogVisible = true;
            this.dialogUrl = this.imgUrl;
        },
        del: function () {
            this.imgUrl = '';
            this.dialogUrl = '';
        },

        addAttribute() {
            this.dynamicValidateForm.attributes.push({
                name: '',
                value: '',
                key: Date.now()
            });
        },
        removeAttribute(item) {
            var index = this.dynamicValidateForm.attributes.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.attributes.splice(index, 1)
            }
        },
        Submit() {
            create_prompt({
                "picture": this.key,
                "prompt": this.Prompt,
                "model": this.Model,
                "width": 512,
                "height": 512,
                prompt_attribute: {}
            })
        },

        UploadHttpRequest(options) {
            console.log('.................')
            this.isShowLoading = true;
            let fileReader = new FileReader();
            let _this = this;
            let file = options.file
            // 开始读取上传文件
            if (file) {
                // console.log('--------------------------')
                // console.log(file)
                fileReader.readAsDataURL(file);
            };
            // 文件读取成功后触发
            fileReader.onload = (event) => {
                console.log(event.target)
                let imageSrc = event.target.result;
                // console.log(imageSrc)
                // 上传到七牛云
                // console.log('upload success')
                this.xRayUpload(imageSrc, options, file)
                // _this.UploadHttpRequest(imgSrc, options, file)
            };
        },
        xRayUpload(data, options, file) {
            get_qiniu_token().then(res => {
                // console.log(res);
                const formdata = new FormData()
                formdata.append('file', this.base64ToBlob(data))
                formdata.append('token', res.data.token)
                formdata.append('key', res.data.key)
                // console.log(data)
                axios.post('http:///upload-z1.qiniup.com', formdata, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: false
                }).then(res => {
                    console.log('success')
                    // console.log(res)
                    console.log(res.data.key)
                    this.key = res.data.key
                }).catch(err => {
                    console.log(err)
                })
            })
        },
        base64ToBlob(base64) {
            var arr = base64.split(',');
            var mime = arr[0].match(/:(.*?);/)[1];
            var bstr = atob(arr[1]);
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
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

.img-show {
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

.avatar {
    width: 148px;
    height: 148px;
    display: block;
}

.actions {
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
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s;
}

.actions:hover {
    opacity: 1;
}

.actions:hover span {
    display: inline-block;
}

.actions span {
    display: none;
    margin: 0 16px;
    cursor: pointer;
}

/* .MainBack {
    background: #eaebed;
} */

/* .SecondBack {
    background: #F2F4F8;
    width: 60%;
    margin: 0 auto;
} */

.Characters {
    /* position: absolute; */
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 2vh;
    line-height: 100%;
    color: #212121;
    margin: 2% 0 0 5%;
}

.GroupBox {
    display: flex;
    /* justify-content: space-around; */
}

.Picture {
    display: inline;
    box-sizing: border-box;
    /* width: 204vh; */
    /* height: 146px; */
    background: #FFFFFF;
    border: 2px dashed #BFBFBF;
    margin: 0 0 0 30%;
    /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
}

.PromptInput {
    /* border: 1.5px solid #BFBFBF; */
    /* border-radius: 8px; */
    width: 90vh;
    height: 20vh;
    margin: 0 0 0 7.5vh;
    resize: none;
}

.ModelInput {
    /* border: 1.5px solid #BFBFBF; */
    /* border-radius: 8px; */
    width: 90vh;
    height: 5vh;
    margin: 0 0 0 9.5vh;
    resize: none;
}

.button1 {
    margin-left: 20vh;
    width: 123px;
    height: 42px;
    background: #00A1D6;
    border-radius: 5px;
}

.button2 {
    margin-left: 5vh;
    width: 123px;
    height: 42px;
    background: #FFFFFF;
    border: 1px solid #BFBFBF;
    border-radius: 5px;
}
</style>
