<template>
    <div class="MainBack" style="text-align: center;">
        <!-- <div class="SecondBack"> -->
        <div class="card" style="width: 60vw; padding: 5%; margin-top: 5vh;">
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

                <el-form :model="form" ref="form" :inline="true" style="margin-top: 3vh">
                    <el-form-item label="Prompt" prop="prompt"
                        :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
                        <el-input type="textarea" :autosize="{ minRows: 5 }" placeholder="请输入Prompt" v-model="form.prompt"
                            style="width:40vw"></el-input>
                    </el-form-item>
                    <el-form-item label="模型">
                        <el-select v-model="form.modelName" placeholder="请选择模型">
                            <el-option label="其他模型" value=""></el-option>
                            <el-option label="DALL-E" value="DALL-E"></el-option>
                            <el-option label="Midjourney" value="Midjourney"></el-option>
                            <el-option label="Stable Diffusion" value="Stable Diffusion"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="form.modelName === ''" prop="model"
                        :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
                        <el-input :disabled="form.modelName !== ''" placeholder="模型名称" v-model="form.model"></el-input>
                    </el-form-item>

                    <el-row v-for="(attribute, index) in form.attributes" :key="index">
                        <el-form-item label="新属性" :prop="'attributes[' + index + '].name'" :rules="{
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
                <el-button type="primary" @click="submitForm('form')">立即上传</el-button>
                <!-- <button type="button" class="btn btn-primary" style="width:10vw; background:#FFFFFF; color:#000000"
                    @click="SaveDraft()">存草稿</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { get_qiniu_token, create_prompt, edit_prompt, getEditingPrompt } from '../api/index.js'
import { Notification } from 'element-ui'
export default {
    name: 'EditPage',
    bodyClass: 'profile-page',
    components: {
    },
    data() {
        return {
            picture: '',
            hasPic: 0,
            form: {
                prompt: '',
                width: '0',
                height: '0',
                modelName: '',
                model: '',
                attributes: [],
            },
            label: '',
            imgUrl: '',
            dialogVisible: false,
            dialogUrl: '',
            key: '',
            attrJson: {},
            first: true,
            picid: -1
        }
    },
    mounted() {
        if (this.$route.query.picid) {
            this.first = false
            this.hasPic = 1
            console.log('not first')
            this.picid = this.$route.query.picid
            getEditingPrompt(this.picid)
                .then((res) => {
                    console.log(res)
                    this.imgUrl = res.data.prompt.picture
                    this.form.prompt = res.data.prompt.prompt
                    this.form.width = res.data.prompt.width
                    this.form.height = res.data.prompt.height
                    if (['DALL-E', 'Midjourney', 'Stable Diffusion'].indexOf(res.data.prompt.model) === -1) {
                        this.form.modelName = ''
                        this.form.model = res.data.prompt.model
                    } else {
                        this.form.modelName = res.data.prompt.model
                    }
                    let toJson = this.strToJson(res.data.prompt.prompt_attribute)
                    let keys = Object.keys(toJson[0])
                    for (var i = 0; i < keys.length; i++) {
                        this.form.attributes.push({
                            name: keys[i],
                            value: toJson[0][keys[i]]
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    Notification({ title: '获取作品信息失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
        }
    },
    methods: {
        strToJson: function (str) {
            var json = eval('[' + str + ']');
            return json;
        },
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
            this.hasPic = 0
        },

        addAttribute() {
            this.form.attributes.push({
                name: '',
                value: '',
                // key: Date.now()
            });
        },
        removeAttribute(item) {
            var index = this.form.attributes.indexOf(item)
            if (index !== -1) {
                this.form.attributes.splice(index, 1)
            }
        },
        submitForm(formName) {
            if (this.hasPic === 0) {
                Notification({ title: '请上传图片', message: '', type: 'warning', duration: 2000 })
            } else {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.form.attributes)
                        //使用for循环编辑数组，向jsonObject中赋值
                        for (let itemindex = 0; itemindex < this.form.attributes.length; itemindex++) {
                            //$set()方法第一个参数是对象，第二个参数是key值，第三个参数是value值
                            this.$set(this.attrJson, this.form.attributes[itemindex].name, this.form.attributes[itemindex].value);
                        }
                        console.log(this.attrJson)
                        console.log(JSON.stringify(this.attrJson))
                        let model = ''
                        if (this.form.modelName !== '') {
                            model = this.form.modelName
                        } else {
                            model = this.form.model
                        }
                        if (this.first === false) {
                            edit_prompt({
                                "id": this.picid,
                                "picture": this.imgUrl,
                                "prompt": this.form.prompt,
                                "model": model,
                                "width": this.form.width,
                                "height": this.form.height,
                                prompt_attribute: this.attrJson
                            }).then((res => {
                                let id = res.data.id;
                                console.log(res)
                                Notification({ title: '修改成功', message: '请等待审核', type: 'success', duration: 2000 })
                                this.$router.push('/check')
                            })).catch((err) => {
                                console.log(err)
                                Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                            })
                        } else {
                            create_prompt({
                                "picture": this.key,
                                "prompt": this.form.prompt,
                                "model": model,
                                "width": this.form.width,
                                "height": this.form.height,
                                prompt_attribute: this.attrJson
                            }).then((res => {
                                let id = res.data.id;
                                console.log(res)
                                Notification({ title: '上传成功', message: '请等待审核', type: 'success', duration: 2000 })
                                this.$router.push('/check')
                            })).catch((err) => {
                                console.log(err)
                            })
                        }

                    } else {
                        console.log('error submit!!');
                        Notification({ title: '上传失败', message: '请填写缺少项', type: 'error', duration: 2000 })
                        return false;
                    }
                });
            }
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
                    this.hasPic = 1
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
/* .uploader-avatar>>>.el-upload {
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
} */

.img-show {
    position: relative;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
    /* overflow: hidden; */
    margin-left: auto;
    margin-right: auto;
}

/* .uploader-avatar>>>.el-upload:hover {
    border-color: #409EFF;
} */

/* .uploader-avatar>>>i {
    font-size: 28px;
    color: #8c939d;
} */

.avatar {
    /* width: 148px; */
    height: 40vh;
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
</style>
