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
      <li class="nav-item" v-if="login !== null" style="margin-right: 5vh; cursor: pointer;" @click="toCreate()">
        <div v-popover:popover1 style="margin-top: 2vh">
          <i class="el-icon-brush" style="font-size: 20px;"></i>
        </div>
        <el-popover ref="popover1" popper-class="popover" placement="bottom" trigger="hover">
          <div class="popover-body">
            创作中心
          </div>
        </el-popover>
      </li>

      <li class="nav-item" v-if="login !== null" style="margin-right: 5vh; cursor: pointer;" @click="toNotice()">
        <div v-popover:popover2 style="margin-top: 2vh">
          <el-badge :hidden="noticenum == 0" :value=noticenum>
            <i class="el-icon-bell" style="font-size: 20px;"></i>
          </el-badge>
        </div>
        <el-popover ref="popover2" popper-class="popover" placement="bottom" trigger="hover">
          <div class="popover-body">
            通知
          </div>
        </el-popover>
      </li>
      <li class="nav-item" v-if="login !== null">
        <!-- <img :src="attachImageUrl(avator)" alt=""> -->
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link">
            <img :src=avator style="width: 7vh; height: 7vh; border-radius: 50%; cursor: pointer;" @click="toMyself()">
          </span>
          <el-dropdown-menu slot="dropdown">
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
      keyword: this.cookie.getCookie("keyword"),
      login: null,
      noticenum: 1,
      avator: ''
    }
  },
  watch: {
    list() {
      this.timer()
    }
  },
  mounted() {
    this.login = this.cookie.getCookie("token")
    if (this.login !== null) {
      this.getNoticeNum()
      this.getAvator()
    }
  },
  methods: {
    getNoticeNum() {
      // TODO 获取通知数量

    },
    getAvator() {
      // TODO 获取头像
      this.avator = "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg"
    },
    handlelogOut() {
      console.log('logout')
      this.cookie.clearCookie('token')
      this.cookie.clearCookie('refresh-token')
      this.login = null
    },
    toModifyPass() {
      this.$router.push('/modipass')
    },
    toCreate() {
      this.$router.push('/upload')
    },
    toNotice() {
      this.$router.push('/system')
      this.noticenum = 0
    },
    toMyself() {
      // TODO
      this.$router.push('/profile')
    },
    timer() {
      return setTimeout(() => {
        this.getNoticeNum()
        this.getAvator()
      }, 5000)
    }
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
