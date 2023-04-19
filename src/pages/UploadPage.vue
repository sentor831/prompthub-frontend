<template>
  <div class="MainBack" style="height: 100vh; text-align: center;">
    <div class="SecondBack" style="height: 100%; margin-left: auto; margin-right: auto;">
      <el-upload class="Upload" drag action="http://upload.qiniu.com/putb64/-1" :on-preview="handlePreview"
        :on-remove="handleRemove" :file-list="fileList" list-type="picture" :http-request="UploadHttpRequest">
        <!-- <i class="el-icon-upload"></i> -->
        <img src='../../public/img/upload.png' width="75" style="margin:6vw 0 1vw 0; ">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <div>
        <el-button type="primary" @disabled="isUpload()" style="margin-top: 8vh">确认上传</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { get_qiniu_token } from '../api/index.js'

export default {
  name: 'Upload',
  bodyClass: 'profile-page',
  components: {

  },

  data() {
    return {
      uploadHeaders: {}
    }
  },
  computed: {
    "imgUrl"() {
      return document.querySelector("#app > div > div > div > div > ul > li > img").src;
    }
  },
  methods: {
    Upload() {
      alert("上传图片")
    },
    isUpload() {
      if (document.querySelector("#app > div > div > div > div > ul > li > img") == null) {
        return true;
      }
      else {
        return false;
      }
    },
    UploadHttpRequest(options) {
      this.isShowLoading = true;
      let fileReader = new FileReader();
      let _this = this;
      let maxsize = 512 * 512;
      let file = options.file
      // 开始读取上传文件
      if (file) {
        fileReader.readAsDataURL(file);
      };
      // 文件读取成功后触发
      fileReader.onload = (event) => {
        let imageSrc = event.target.result;
        // 上传到七牛云
        console.log('upload success')
        this.xRayUpload(imageSrc, options, file)
        // _this.UploadHttpRequest(imgSrc, options, file)
      };
    },
    xRayUpload(data, options, file) {
      get_qiniu_token().then(res => {
        console.log(res);
        const formdata = new FormData()
        formdata.append('file', data.split(',')[1])
        formdata.append('token', res.data.token)
        formdata.append('key', res.data.key)
        console.log(data)
        axios.post('http:///upload-z1.qiniup.com', formdata, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: false
        }).then(res => {
          console.log('success')
          console.log(res)
          console.log(res.data.key)
        }).catch(err => {
          console.log(err)
        })
      })
    },
    // 获取TOKEN
    getTokenValue() {
      getToken().then(res => {
        if (res.data.code == 0) {
          // 七牛云上传所需头
          this.uploadHeaders["Authorization"] = "UpToken" + res.data.data.token;
          this.imageUrlDomain = res.data.data.link;
        }
      }).catch((err) => {
        alert(err);
      });
    }
  }
}

// UploadHttpRequest(options){
//   this.isShowLoading = true;
//   let fileReader = new fileReader();
//   let _this = this;
//   let maxsize = 512 * 512;
//   // 开始读取上传文件
//   if (file){
//     fileReader.readAsDataURL(file);
//   };
//   // 文件读取成功后触发
//   fileReader.onload = (event) => {
//     let imageSrc = event.target.result;
//     // 上传到七牛云
//     _this.UploadHttpRequest(imgSrc, options, file)
//   };
// }

</script>

<style>
.MainBack {
  background: #eaebed;
}

.SecondBack {
  background: #F2F4F8;
  width: 60%;
  /* margin: 0 auto; */
}

.Upload {
  width: 40vw;
  height: 40vh;
  /* background: #FFFFFF;
    border: 2px dashed #BFBFBF; */
  margin: 0 auto;
  margin-top: 5vh;
}

.el-upload-dragger {
  background-color: #ffffff;
  border: 2px dashed #BFBFBF;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 40vw;
  height: 40vh;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  /* margin-left: -10vh; */
}

.el-upload-list--picture .el-upload-list__item {
  overflow: hidden;
  z-index: 0;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-top: 10px;
  margin-left: -10vh;
  padding: 10px 10px 10px 90px;
  height: 92px;
}
</style>