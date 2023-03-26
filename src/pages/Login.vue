<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
      style="background-image:url('img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">  
        <div class="col-md-5 ml-auto mr-auto">
          <h3 class="card-title title-up"><strong>登录账号</strong></h3>
          <card type="login" plain>
            <!-- <div slot="header" class="logo-container">
              <img v-lazy="'img/now-logo.png'" alt="" />
            </div> -->
            
            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="用户名..."
              v-model="username"
            >
            </fg-input>

            <fg-input
              type="password"
              class="no-border input-lg"
              addon-left-icon="now-ui-icons objects_key-25"
              placeholder="密码..."
              v-model="password"
            >
            </fg-input>

            <!-- <template slot="raw-content"> -->
              <div class="card-footer text-center">
                <a
                  class="btn btn-primary btn-round btn-lg btn-block"
                  @click="handleLogin()"
                  >登 录</a
                >
              </div>
              <div class="pull-left">
                <h6>
                  <a class="btn btn-neutral btn-link btn-block"
                  @click="toSignUp()">立即注册</a>
                </h6>
              </div>
              <div class="pull-right">
                <h6>
                  <a class="btn btn-simple btn-link btn-block"
                  @click="forgetPass()">忘记密码</a>
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
import { login } from '../api/index'

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
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      if (this.username === '') {
        Notification({title: '提示', message: '用户名不能为空', type: 'warning', duration: 2000})
      } else if (this.password === '') {
        Notification({title: '提示', message: '请输入密码', type: 'warning', duration: 2000})
      } else {
        login({
          username: this.username,
          password: this.password
        })
        .then((res) => {
            console.log(res)
            let loginInfo = {
                userName: this.username,
                // userId: res.userMsg.id
              }
              this.cookie.setCookie(loginInfo, 1)
              this.$router.push('/')
              Notification({title: '登录成功', message: '欢迎您！', type: 'success', duration: 2000})
          })
          .catch((err) => {
            console.log(err)
            // TODO
            if (err.data.error_msg === '') {
              Notification({title: '登录失败', message: '用户不存在', type: 'error', duration: 2000})
            } else if (err.data.error_msg === '') {
              Notification({title: '登录失败', message: '用户名与密码不匹配', type: 'error', duration: 2000})
            }
          });
      }
    },
    toSignUp() {
      this.$router.push('/signup')
    },
    forgetPass() {
      this.$router.push('/forgetpass')
    }
  }
};
</script>
<style></style>
