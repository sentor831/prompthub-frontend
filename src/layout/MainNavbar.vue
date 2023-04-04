<template>
  <navbar position="fixed" type="primary" :transparent="transparent" :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto">
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        PROMPTHUB
      </router-link>
    </template>
    <template slot="navbar-menu">

      <li class="nav-item">
        <a class="nav-link" href="/#/login">
          <p>登 录</p>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link btn btn-neutral" href="/#/signup">
          <p> 加 入</p>
        </a>
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
  }
};
</script>

<style scoped></style>
