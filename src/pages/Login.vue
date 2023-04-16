<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div class="page-header-image" style="background-image:url('img/login2.jpg')"></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <h3 class="card-title title-up"><strong>登录账号</strong></h3>
          <card type="login" plain>
            <!-- <div slot="header" class="logo-container">
              <img v-lazy="'img/now-logo.png'" alt="" />
            </div> -->

            <fg-input type="email" class="no-border input-lg" addon-left-icon="now-ui-icons users_circle-08"
              placeholder="邮箱..." v-model="email">
            </fg-input>

            <fg-input type="password" class="no-border input-lg" addon-left-icon="now-ui-icons objects_key-25"
              placeholder="密码..." v-model="password">
            </fg-input>

            <!-- <template slot="raw-content"> -->
            <div class="card-footer text-center">
              <a class="btn btn-primary btn-round btn-lg btn-block" @click="handleLogin()">登 录</a>
            </div>
            <div class="pull-left">
              <h6>
                <a class="btn btn-neutral btn-link btn-block" href="#/signup">立即注册</a>
              </h6>
            </div>
            <div class="pull-right">
              <h6>
                <a class="btn btn-simple btn-link btn-block" href="#/forgetpass">忘记密码</a>
              </h6>
            </div>
            <!-- </template> -->
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput } from '@/components';
import { Notification } from 'element-ui';
import { login } from '../api/index';
import { getRefreshToken, getToken, setRefreshToken, setToken } from '@/utils/token.js'

export default {
  name: 'login-page',
  bodyClass: 'login-page',
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  data: function () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    handleLogin() {
      if (this.email === '') {
        Notification({ title: '提示', message: '邮箱不能为空', type: 'warning', duration: 2000 })
      } else if (this.password === '') {
        Notification({ title: '提示', message: '请输入密码', type: 'warning', duration: 2000 })
      } else {
        login({
          email: this.email,
          password: this.password
        })
          .then((res) => {
            console.log(res)
            setToken(res.data.access_token)
            setRefreshToken(res.data.refresh_token)
            let loginInfo = {
              userId: res.data.user.id,
              nickName: res.data.user.nickname,
              avatar: res.data.user.avatar
            }
            this.cookie.setCookie(loginInfo, 1)

            this.$router.push('/')

            Notification({ title: '登录成功', message: '欢迎您！', type: 'success', duration: 2000 })
          })
          .catch((err) => {
            console.log(err)
            Notification({ title: '登录失败', message: err.response.data.msg, type: 'error', duration: 2000 })
          });
      }
    },
  }
};
</script>
<style></style>
