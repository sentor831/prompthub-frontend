import Vue from 'vue';
import Router from 'vue-router';
import Index from './pages/Index.vue';
import Landing from './pages/Landing.vue';
import Login from './pages/Login.vue';
import SignUp from './pages/SignUp.vue'
import Profile from './pages/Profile.vue';
import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';
import ForgetPass from './pages/ForgetPass.vue';
import Search from './pages/Search.vue';
import TheHeader from './components/TheHeader.vue';
import PicInfo from './pages/PicInfo.vue';
import NoticeSystem from './pages/NoticeSystem.vue';
import NoticeReply from './pages/NoticeReply.vue'
import UploadPage from './pages/UploadPage.vue';
import EditPage from './pages/EditPage.vue';
import CheckPage from './pages/CheckPage.vue';

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 300 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/landing',
      name: 'landing',
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/login',
      name: 'login',
      components: { default: Login, header: TheHeader },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      components: { default: SignUp, header: TheHeader },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/forgetpass',
      name: 'forgetpass',
      components: { default: ForgetPass, header: TheHeader },
      props: {
        header: { colorOnScroll: 0 }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/search',
      name: 'search',
      components: { default: Search, header: TheHeader, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/picinfo',
      name: 'picinfo',
      components: { default: PicInfo, header: TheHeader, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, transparent: true },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/system',
      name: 'system-notice',
      components: { default: NoticeSystem, header: TheHeader },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/reply',
      name: 'reply-notice',
      components: { default: NoticeReply, header: TheHeader },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/upload',
      name: 'upload',
      components: { default: UploadPage, header: TheHeader, footer: MainFooter },
      props: {
        header: { colorOnScroll: 0 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/edit',
      name: 'edit',
      components: { default: EditPage, header: TheHeader, footer: MainFooter },
      props: {
        header: { colorOnScroll: 0 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/check',
      name: 'check',
      components: { default: CheckPage, header: TheHeader, footer: MainFooter },
      props: {
        header: { colorOnScroll: 0 },
        footer: { backgroundColor: 'black' }
      }
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
