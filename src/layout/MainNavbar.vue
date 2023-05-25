<template>
  <navbar position="fixed" type="primary" :transparent="transparent" :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto">
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        PROMPTHUB
      </router-link>
    </template>
    <template slot="navbar-menu">

      <li class="nav-item" v-if="login === null">
        <a class="nav-link" href="/#/login">
          <p>登 录</p>
        </a>
      </li>

      <li class="nav-item" v-if="login === null">
        <a class="nav-link btn btn-neutral" href="/#/signup">
          <p> 加 入</p>
        </a>
      </li>

      <li class="nav-item" v-if="login !== null" style="margin-right: 3vw; cursor: pointer;" @click="toManage()">
        <el-dropdown trigger="hover" style="margin-top: 2vh">
          <el-dropdown-link>
            <i class="el-icon-document-checked" style="font-size: 20px; color: whitesmoke;"></i>
          </el-dropdown-link>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toManage">管理作品</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <div v-popover:popover3 style="margin-top: 2vh">
          <i class="el-icon-document-checked" style="font-size: 20px;"></i>
        </div>
        <el-popover ref="popover3" popper-class="popover" placement="bottom" trigger="hover">
          <div class="popover-body">
            管理作品
          </div>
        </el-popover> -->
      </li>

      <li class="nav-item" v-if="login !== null" style="margin-right: 3vw; cursor: pointer;" @click="toCreate()">
        <el-dropdown trigger="hover" style="margin-top: 2vh">
          <el-dropdown-link>
            <div>
              <i class="el-icon-brush" style="font-size: 20px; color: whitesmoke;"></i>
            </div>
          </el-dropdown-link>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toCreate">上传作品</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- <div v-popover:popover1 style="margin-top: 2vh">
          <i class="el-icon-brush" style="font-size: 20px;"></i>
        </div>
        <el-popover ref="popover1" popper-class="popover" placement="bottom" trigger="hover">
          <div class="popover-body">
            上传作品
          </div>
        </el-popover> -->
      </li>

      <li class="nav-item" v-if="login !== null" style="margin-right: 3vw; cursor: pointer;" @click="toNotice()">
        <el-dropdown trigger="hover" style="margin-top: 2vh">
          <el-dropdown-link>
            <el-badge :hidden="noticenum == 0" :value=noticenum>
              <i class="el-icon-bell" style="font-size: 20px; color: whitesmoke;"></i>
            </el-badge>
          </el-dropdown-link>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toNotice">查看通知</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- <div v-popover:popover2 style="margin-top: 2vh">
          <el-badge :hidden="noticenum == 0" :value=noticenum>
            <i class="el-icon-bell" style="font-size: 20px;"></i>
          </el-badge>
        </div>
        <el-popover ref="popover2" popper-class="popover" placement="bottom" trigger="hover">
          <div class="popover-body">
            查看通知
          </div>
        </el-popover> -->

      </li>
      <li class="nav-item" v-if="login !== null">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link">
            <img :src=avatar style="width: 4em; height: 4em; border-radius: 50%; cursor: pointer;" @click="toMyself()">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="now-ui-icons ui-1_settings-gear-63"
              @click.native="toModifyInfo">修改信息</el-dropdown-item>
            <el-dropdown-item icon="now-ui-icons ui-1_lock-circle-open"
              @click.native="toModifyPass">修改密码</el-dropdown-item>
            <el-dropdown-item icon="now-ui-icons users_single-02" @click.native="handlelogOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>

    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
import { get_unread_notification_num, getInfos } from '../api';
import { Notification } from 'element-ui';
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    // DropDown,
    Navbar,
    // NavLink,
    [Popover.name]: Popover
  },
  data() {
    return {
      login: null,
      noticenum: 0,
      userId: -1,
      avatar: ''
    }
  },
  watch: {
    $route() {
      this.setUp()
    }
  },
  mounted() {
    this.setUp()
  },
  methods: {
    setUp() {
      this.login = this.cookie.getCookie("token")
      if (this.login !== null) {
        this.userId = this.cookie.getCookie("userId")
        this.getNoticeNum()
        this.getAvatar()
      }
    },
    getNoticeNum() {
      get_unread_notification_num().then((res) => {
        console.log(res);
        this.noticenum = res.data.unread_notification_num;
      }).catch((err) => {
        console.log(err)
        Notification({ title: '获取通知失败', message: err.response.data.msg, type: 'error', duration: 2000 })
      })
    },
    getAvatar() {
      getInfos(this.userId)
        .then((res) => {
          this.avatar = res.data.user.avatar
        })
        .catch((err) => {
          console.log(err)
          Notification({ title: '获取个人信息失败', message: err.response.data.msg, type: 'error', duration: 2000 })
        });
    },
    handlelogOut() {
      console.log('logout')
      this.cookie.clearCookie('token')
      this.cookie.clearCookie('refresh-token')
      this.cookie.clearCookie('userId')
      this.login = null
      this.$router.push('/')
    },
    toModifyInfo() {
      this.$router.push({ path: '/modinfo', query: { userId: this.userId } })
    },
    toModifyPass() {
      this.$router.push('/modipass')
    },
    toCreate() {
      this.$router.push('/edit')
    },
    toManage() {
      this.$router.push('/check')
    },
    toNotice() {
      this.$router.push('/system')
      this.noticenum = 0
    },
    toMyself() {
      this.$router.push({ path: '/profile/prompts', query: { userId: this.userId } })
    },
  },
  destroyed() {
    clearTimeout(this.timer)
  }
};
</script>

<style lang="scss" scoped>
.el-popover {
  min-width: 75px;
}
</style>
