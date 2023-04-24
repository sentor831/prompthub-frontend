<template>
  <div>
    <!-- 头像 -->
    <div class="container" style="margin-top: 13vh; text-align: center;">
      <el-upload class="avatar-uploader" :show-file-list="false" list-type="picture" :before-upload="beforeAvatarUpload"
        :http-request="UploadHttpRequest" action="#">
        <div class="photo-container" style="cursor: pointer;">
          <img :src="avatar" alt="" />
        </div>
        <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
      </el-upload>
      <p>点击头像修改</p>
      <el-button type="success" @click="submitAvatar">修改头像</el-button>
    </div>
    <div class="container" style="margin-top: 5vh;">
      <el-row type="flex" justify="center" align="middle">
        <el-input v-model="nickname" placeholder="请输入昵称" style="width: 200px"></el-input>
        <!-- 提交按钮 -->
        <el-button type="success" @click="submitNickname">修改昵称</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getInfos, get_qiniu_token, changeAvatar, changeNickname } from '../api';
import { Notification } from 'element-ui';
export default {
  name: 'ModInfo',
  bodyClass: 'profile-page',
  components: {
    // Tabs,
    // TabPane
  },
  data() {
    return {
      form: {
        nickname: '',
      },
      nickname: '',
      avatar: '',
      key: '',
    }
  },
  mounted() {
    this.userId = this.$route.query.userId;
    this.getInfo();
  },
  methods: {
    getInfo() {
      getInfos(this.userId)
        .then((res) => {
          this.avatar = res.data.user.avatar
          this.nickname = res.data.user.nickname
        })
        .catch((err) => {
          console.log(err)
          Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
        });
    },
    beforeAvatarUpload(file) {
      const isJpg = file.type === "image/jpeg";
      const isPng = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJpg && !isPng) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }

      return true;
    },
    UploadHttpRequest(options) {
      console.log('.................')
      this.isShowLoading = true;
      let fileReader = new FileReader();
      let file = options.file
      if (file) {
        fileReader.readAsDataURL(file);
      };
      fileReader.onload = (event) => {
        console.log(event.target)
        let imageSrc = event.target.result;
        this.xRayUpload(imageSrc)
      };
    },
    xRayUpload(data) {
      get_qiniu_token().then(res => {
        const formdata = new FormData()
        formdata.append('file', this.base64ToBlob(data))
        formdata.append('token', res.data.token)
        formdata.append('key', res.data.key)
        axios.post('http:///upload-z1.qiniup.com', formdata, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: false
        }).then(res => {
          console.log(res.data.key)
          this.avatar = 'img/' + res.data.key
        }).catch(err => {
          Notification({ title: '图片上传错误', message: err.response.data.msg, type: 'error', duration: 2000 })
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
    },
    submitAvatar() {
      changeAvatar({
        user_id: this.userId,
        new_avatar: this.avatar
      })
        .then((res => {
          console.log(res)
          Notification({ title: '修改成功', message: '', type: 'success', duration: 2000 })
        })).catch((err) => {
          console.log(err)
          Notification({ title: '修改失败', message: err.response.data.msg, type: 'error', duration: 2000 })
        })
    },
    submitNickname() {
      changeNickname({
        user_id: this.userId,
        new_nickname: this.nickname
      })
        .then((res => {
          console.log(res)
          Notification({ title: '修改成功', message: '', type: 'success', duration: 2000 })
        })).catch((err) => {
          console.log(err)
          Notification({ title: '修改失败', message: err.response.data.msg, type: 'error', duration: 2000 })
        })
    }
  }
};

</script>
<style scoped></style>
  