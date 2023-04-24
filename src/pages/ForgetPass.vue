<template>
  <div class="section section-signup"
    style="background-image: url('img/bg11.jpg'); background-size: cover; background-position: top center; min-height: 700px;">
    <div class="container">
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="gray">
          <template slot="header">
            <h3 class="card-title title-up"><strong>找回密码</strong></h3>
          </template>
          <template>

            <!-- <td> -->
            <fg-input style="display: inline-table; min-width:250px;" class="no-border" placeholder="注册邮箱..."
              addon-left-icon="now-ui-icons ui-1_email-85" prop="email" v-model="email" aria-describedby="basic-addon2">
            </fg-input>
            <!-- </td> -->

            <fg-input type="password" class="no-border" placeholder="新密码..." addon-left-icon="now-ui-icons objects_key-25"
              v-model="password">
            </fg-input>

            <fg-input type="password" class="no-border" placeholder="新确认密码..."
              addon-left-icon="now-ui-icons text_caps-small" v-model="confirmpassword">
            </fg-input>

          </template>

          <td>
            <fg-input class="no-border" placeholder="验证码..." addon-left-icon="now-ui-icons ui-1_lock-circle-open"
              v-model="verifycode">
            </fg-input>
          </td>
          <td>
            <div class="text-center">
              <n-button type="primary" round v-bind:disabled="verifyDisabled" id="sendbtn" style="width:150px"
                @click="handleSendForget()">获取验证码</n-button>
            </div>
          </td>
          <div class="text-center">
            <n-button style="display:inline-table;width:150px" type="primary" round
              @click="handleModify()">确认修改</n-button>
          </div>
          <div class="">
            <a class="btn btn-simple btn-link" href="#/login">去登录 >>></a>

          </div>

        </card>
      </div>
    </div>
  </div>
</template>


<script>
import { Card, FormGroupInput, Button } from '@/components';
import { Notification } from 'element-ui';
import { sendForgetPassEmail, modifyPass, modifyForgetPass } from '../api/index.js'

export default {
  name: 'forgetpass-page',
  bodyClass: 'forgetpass-page',
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data: function () {
    return {
      password: '',
      confirmpassword: '',
      email: '',
      verifycode: '',
      verifyDisabled: false,
      timer: 0,
      gap: 60,
    }
  },
  methods: {
    handleSendForget() {
      if (this.email === '') {
        Notification({ title: '提示', message: '请输入邮箱', type: 'warning', duration: 2000 })
      } else if (this.password === '') {
        Notification({ title: '提示', message: '请输入新密码', type: 'warning', duration: 2000 })
      } else if (this.confirmpassword === '') {
        Notification({ title: '提示', message: '请输入新确认密码', type: 'warning', duration: 2000 })
      } else if (this.password !== this.confirmpassword) {
        Notification({ title: '提示', message: '新密码与新确认密码不一致', type: 'warning', duration: 2000 })
      } else {
        sendForgetPassEmail({
          email: this.email,
        })
          .then((res) => {
            console.log(res)
            Notification({ title: '邮件发送成功', message: '快去查看吧', type: 'success', duration: 2000 })
            this.verifyDisabled = true
            this.timer = setInterval(() => {
              this.gap--
              document.getElementById('sendbtn').innerHTML = this.gap.toString() + '秒'
              if (this.gap <= 0) {
                clearInterval(this.timer)
                this.verifyDisabled = false
                document.getElementById('sendbtn').innerHTML = '获取验证码'
                this.gap = 60
              }
            }, 1000)
          })
          .catch((err) => {
            console.log(err)
            Notification({ title: '邮件发送失败', message: err.response.data.msg, type: 'error', duration: 2000 })
          })
      }
    },
    handleModify() {
      modifyForgetPass({
        email: this.email,
        password: this.password,
        code: this.verifycode
      })
        .then((res) => {
          console.log(res)
          this.$router.push('/login')
          this.gap = 0
          Notification({ title: '修改密码成功', message: '快去登录吧', type: 'success', duration: 2000 })
        })
        .catch((err) => {
          console.log(err)
          Notification({ title: '修改密码失败', message: err.response.data.msg, type: 'error', duration: 2000 })
        })
    }
  }
};
</script>
<style></style>
  