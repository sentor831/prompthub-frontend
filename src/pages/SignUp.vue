<template>
  <div class="section section-signup"
    style="background-image: url('image/signup.jpg'); background-size: cover; background-position: top center; min-height: 700px;">
    <div class="container">
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="orange" style="opacity: 80%;">
          <template slot="header">
            <h3 class="card-title title-up"><strong>注册账号</strong></h3>
          </template>
          <template>

            <fg-input style="display: inline-table; min-width:250px;" class="no-border" placeholder="邮箱..." type="email"
              addon-left-icon="now-ui-icons ui-1_email-85" prop="email" v-model="email" aria-describedby="basic-addon2">
            </fg-input>

            <fg-input class="no-border" placeholder="昵称..." addon-left-icon="now-ui-icons users_circle-08"
              v-model="nickname">
            </fg-input>

            <fg-input type="password" class="no-border" placeholder="密码..." addon-left-icon="now-ui-icons objects_key-25"
              v-model="password">
            </fg-input>

            <fg-input type="password" class="no-border" placeholder="确认密码..."
              addon-left-icon="now-ui-icons text_caps-small" v-model="confirmpassword">
            </fg-input>

          </template>
          <td>
            <fg-input class="no-border" placeholder="验证码..." addon-left-icon="now-ui-icons ui-1_lock-circle-open"
              v-model="verifycode">
            </fg-input>
          </td>
          <td>
            <n-button type="neutral" round v-bind:disabled="verifyDisabled" id="sendbtn"
              style="display:inline-table;width:150px" @click="handleSendVerify()">获取验证码</n-button>
          </td>
          <div class="text-center">
            <n-button style="display:inline-table;width:150px" type="neutral" round @click="handleSignUp()">注 册</n-button>
          </div>

          <div class="">
            <a class="btn btn-simple btn-link" href="#/login">已有账户，去登录 >>></a>

          </div>

        </card>
      </div>
    </div>
  </div>
</template>


<script>
import { Card, FormGroupInput, Button } from '@/components';
import { Notification } from 'element-ui';
import { sendRegisterEmail, register } from '../api/index.js'

export default {
  name: 'signup-page',
  bodyClass: 'signup-page',
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data: function () {
    return {
      nickname: '',
      password: '',
      confirmpassword: '',
      email: '',
      verifycode: '',
      verifyDisabled: false,
      timer: 0,
      timer2: null,
      gap: 60,
      rules: {
        email: {
          rule: /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/,
          msg: '请输入正确的邮箱地址'
        }
      }
    }
  },
  methods: {
    handleSendVerify() {
      if (this.email === '') {
        Notification({ title: '提示', message: '请输入邮箱', type: 'warning', duration: 2000 })
      } else if (this.nickname === '') {
        Notification({ title: '提示', message: '昵称不能为空', type: 'warning', duration: 2000 })
      } else if (this.password === '') {
        Notification({ title: '提示', message: '请输入密码', type: 'warning', duration: 2000 })
      } else if (this.confirmpassword === '') {
        Notification({ title: '提示', message: '请输入确认密码', type: 'warning', duration: 2000 })
      } else if (this.password !== this.confirmpassword) {
        Notification({ title: '提示', message: '密码与确认密码不一致', type: 'warning', duration: 2000 })
      } else if (this.validate('email')) {
        sendRegisterEmail({
          email: this.email
        })
          .then((res) => {
            console.log(res)
            this.timer2 = window.setTimeout(() => {
              Notification({ title: '邮件发送成功', message: '快去查看吧', type: 'success', duration: 2000 })
            }, 0)
            this.timer2 = window.setTimeout(() => {
              Notification({ title: '如果没有收到邮件，请检查邮箱是否输入错误', message: '', type: 'info', duration: 0 })
            }, 0)
            this.verifyDisabled = true
            this.timer = setInterval(() => {
              this.gap--
              document.getElementById('sendbtn').innerHTML = this.gap.toString() + '秒'
              if (this.gap == 0 || this.gap < 0) {
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
    handleSignUp() {
      register({
        email: this.email,
        password: this.password,
        nickname: this.nickname,
        code: this.verifycode
      })
        .then((res) => {
          console.log(res)
          this.$router.push('/login')
          Notification({ title: '注册成功', message: '快去登录吧！', type: 'success', duration: 2000 })
        })
        .catch((err) => {
          console.log(err)
          Notification({ title: '注册失败', message: err.response.data.msg, type: 'error', duration: 2000 })
        })
    },
    validate(key) {
      let bool = true
      if (!this.rules[key].rule.test(this[key])) {
        Notification({ title: '邮件发送失败', message: this.rules[key].msg, type: 'error', duration: 2000 })
        bool = false
      }
      return bool
    }
  }
};
</script>
<style></style>
  