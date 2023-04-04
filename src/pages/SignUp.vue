<template>
  <div class="section section-signup"
    style="background-image: url('img/bg11.jpg'); background-size: cover; background-position: top center; min-height: 700px;">
    <div class="container">
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="orange">
          <template slot="header">
            <h3 class="card-title title-up"><strong>注册账号</strong></h3>
            <!-- <div class="social-line">
                <a
                  class="btn btn-neutral btn-facebook btn-icon btn-round"
                >
                  <i class="fab fa-facebook-square"></i>
                </a>
                <a
                  class="btn btn-neutral btn-twitter btn-icon btn-lg btn-round"
                >
                  <i class="fab fa-twitter"></i>
                </a>
                <a
                  class="btn btn-neutral btn-google btn-icon btn-round"
                >
                  <i class="fab fa-google-plus"></i>
                </a>
              </div> -->
          </template>
          <template>

            <!-- <td> -->
            <fg-input style="display: inline-table; min-width:250px;" class="no-border" placeholder="邮箱..."
              addon-left-icon="now-ui-icons ui-1_email-85" prop="email" v-model="email" aria-describedby="basic-addon2">
            </fg-input>
            <!-- </td> -->



            <fg-input class="no-border" placeholder="用户名..." addon-left-icon="now-ui-icons users_circle-08"
              v-model="username">
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
            <a class="btn btn-simple btn-link" @click="toLogin()">已有账户，去登录 >>></a>

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
      username: '',
      password: '',
      confirmpassword: '',
      email: '',
      verifycode: '',
      verifyDisabled: false,
      timer: 0,
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
      } else if (this.username === '') {
        Notification({ title: '提示', message: '用户名不能为空', type: 'warning', duration: 2000 })
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
            Notification({ title: '邮件发送成功', message: '快去查看吧', type: 'success', duration: 2000 })
            this.verifyDisabled = true
            this.timer = setInterval(() => {
              this.gap--
              document.getElementById('sendbtn').innerHTML = this.gap.toString() + '秒'
              if (this.gap == 0 || this.gap < 0) {
                clearInterval(this.timer)
                this.verifyDisabled = false
                document.getElementById('sendbtn').innerHTML = '注 册'
                this.gap = 60
              }
            }, 1000)
          })
          .catch((err) => {
            console.log(err)
            // 用户名冲突时后端检查
            if (err.data.error_msg === "ErrorCode.ITEM_ALREADY_EXISTS: Username conflicted.") {
              Notification({ title: '邮件发送失败', message: '请更换用户名', type: 'error', duration: 2000 })
            } else if (err.data.error_msg === "ErrorCode.ITEM_ALREADY_EXISTS: Email conflicted.") {
              Notification({ title: '邮件发送失败', message: '邮箱已被注册', type: 'error', duration: 2000 })
            } else {
              Notification({ title: '邮件发送失败', message: '其他错误', type: 'error', duration: 2000 })
            }
          })

      }
    },
    handleSignUp() {
      register({
        username: this.username,
        password: this.password,
        email: this.email,
        code: this.verifycode
      })
        .then((res) => {
          console.log(res)
          let loginInfo = {
            userName: this.username,
            // userId: res.userMsg.id
          }
          this.cookie.setCookie(loginInfo, 1)
          this.$router.push('/')
          Notification({ title: '注册成功', message: '已登录，欢迎您！', type: 'success', duration: 2000 })
        })
        .catch((err) => {
          console.log(err)
          // TODO
          if (err.data.error_msg === '') {
            Notification({ title: '注册失败', message: '验证码错误', type: 'error', duration: 2000 })
          } else {
            Notification({ title: '注册失败', message: '其他错误', type: 'error', duration: 2000 })
          }
        })
    },
    toLogin() {
      this.$router.push('/login')
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
  