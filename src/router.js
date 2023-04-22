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
import ModiPass from './pages/ModiPass.vue';
import Search from './pages/Search.vue';
import TheHeader from './components/TheHeader.vue';
import PicInfo from './pages/PicInfo.vue';
import NoticeSystem from './pages/NoticeSystem.vue';
import NoticeReply from './pages/NoticeReply.vue'
import UploadPage from './pages/UploadPage.vue';
import EditPage from './pages/EditPage.vue';
import CheckPage from './pages/CheckPage.vue';

// 黄新引入部分
// 引入组件
import Waterfall_hx from "./components/Hx_components/Waterfall_hx"
import ProfileCarousel from "./components/Hx_components/ProfileCarousel"
import ProfileCollection from "./components/Hx_components/ProfileCollection"
import history from "./components/Hx_components/history"
import MemberList from "./components/Hx_components/MemberList"
import ownedPrompts from "./components/Hx_components/ownedPrompts"
// 引入页面
import ModInfo from "./pages/ModInfo"
// 黄新引入部分end

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
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/modipass',
      name: 'modipass',
      components: { default: ModiPass, header: TheHeader },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      // 修改个人信息
      path: '/modinfo',
      name: 'modinfo',
      components: { default: ModInfo, header: TheHeader },
    },
    {
      path: '/profile',
      name: 'profile',
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      children: [
        {
          path: "",
          component: ProfileCarousel
        },
        {
          path: 'MyHome',
          component: ProfileCarousel
        },
        {
          path: 'product',
          // component: Thumbs
          component: Waterfall_hx
        },
        {
          path: 'collection',
          // component: Checking
          component: ProfileCollection
        },
        {
          path: 'history',
          component: history
        },
        {
          path: 'prompts',
          component: ownedPrompts
        },
        {
          path: 'viewhistory',
          // component: Viewhistory
          component: Waterfall_hx
        },
        {
          // 关注列表
          path: 'memberlist',
          component: MemberList
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      components: { default: Search, header: TheHeader, footer: MainFooter },
      props: {
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/picinfo',
      name: 'picinfo',
      components: { default: PicInfo, header: TheHeader, footer: MainFooter },
      props: {
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/system',
      name: 'system-notice',
      components: { default: NoticeSystem, header: TheHeader }
    },
    {
      path: '/reply',
      name: 'reply-notice',
      components: { default: NoticeReply, header: TheHeader }
    },
    {
      path: '/upload',
      name: 'upload',
      components: { default: UploadPage, header: TheHeader },
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
      components: { default: CheckPage, header: TheHeader },
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
