<template>
  <div>
    <!-- 头像 -->
    <div class="container" style="margin-top: 13vh; text-align: center;">
      <div class="photo-container" @click.stop="modiAvatar()" style="cursor: pointer;">
        <img :src="avatar" alt="" />
      </div>
      <p style="margin-top: 1vh;">点击头像更换</p>
    </div>
    <div class="container" style="margin-top: 5vh;">
      <el-row type="flex" justify="center" align="middle">
        <el-form ref="form" :model="form" label-width="3vw">
          <el-form-item label="昵称">
            <el-input v-model="form.nickname" style="width:20vw"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit()">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getInfos } from '../api';
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
      avatar: ''
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
          this.form.nickname = res.data.user.nickname
        })
    },
    modiAvatar() {
      // TODO
    },
    onSubmit() {
      // TODO
    }
  }
};

</script>
<style scoped></style>
  