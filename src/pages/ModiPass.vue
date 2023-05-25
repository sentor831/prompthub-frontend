<template>
  <div class="section section-signup"
    style="background-image: url('image/bg11.jpg'); background-size: cover; background-position: top center; min-height: 700px;">
    <div class="container">
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="gray">
          <template slot="header">
            <h3 class="card-title title-up"><strong>修改密码</strong></h3>
          </template>
          <template>

            <fg-input type="password" class="no-border" placeholder="旧密码..."
              addon-left-icon="now-ui-icons ui-1_lock-circle-open" v-model="old_password">
            </fg-input>

            <fg-input type="password" class="no-border" placeholder="新密码..." addon-left-icon="now-ui-icons objects_key-25"
              v-model="new_password">
            </fg-input>

            <fg-input type="password" class="no-border" placeholder="新确认密码..."
              addon-left-icon="now-ui-icons text_caps-small" v-model="confirmnew_password">
            </fg-input>

          </template>

          <div class="text-center" style="margin-bottom: 5vh;">
            <n-button style="display:inline-table;width:150px" type="primary" round
              @click="handleModifyPass()">确认修改</n-button>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>


<script>
import { Card, FormGroupInput, Button } from '@/components';
import { Notification } from 'element-ui';
import { modifyPass } from '../api/index.js'
import { getRefreshToken, getToken, setRefreshToken, setToken } from '@/utils/token.js'

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
      old_password: '',
      new_password: '',
      confirmnew_password: ''
    }
  },
  methods: {
    handleModifyPass() {
      if (this.new_password !== this.confirmnew_password) {
        Notification({ title: '提示', message: '密码与确认密码不一致', type: 'warning', duration: 2000 })
      } else {
        modifyPass({
          old_password: this.old_password,
          new_password: this.new_password
        })
          .then((res) => {
            console.log(res)
            this.$router.push('/')
            Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
          })
          .catch((err) => {
            console.log(err)
            Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
          })
      }
    }
  }
};
</script>
<style></style>
  