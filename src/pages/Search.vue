<template>
  <div>
    <!-- <the-header></the-header> -->
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    <div style="margin-left: 90px; margin-top: 100px;">
      <h3>
        "{{ keyword }}"的搜索结果
      </h3>
    </div>
    <div>
      <el-row style="margin-left: 90px; margin-top: 40px;">
        <el-button round @click="chooseD()" :type="btntypeD">DALL-E</el-button>
        <el-button round @click="chooseM()" :type="btntypeM">Midjourney</el-button>
        <el-button round @click="chooseS()" :type="btntypeS">Stable Diffusion</el-button>
        <el-dropdown style="margin-left: 20px">
          <el-button id="sort">
            综合排序<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="chooseDefault">综合排序</el-dropdown-item>
            <el-dropdown-item @click.native="chooseGood">最多点赞</el-dropdown-item>
            <el-dropdown-item @click.native="chooseNew">最新发布</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div>当前登录人：{{ loginname }}</div>
      </el-row>
      <!-- <drop-down class="nav-item" title="综合排序" id="sort">
        <a class="dropdown-item" @click="chooseDefault">综合排序</a>
        <a class="dropdown-item" @click="chooseGood">最多点赞</a>
        <a class="dropdown-item" @click="chooseNew">最新发布</a>
      </drop-down> -->

      <Waterfall :list="list" style="margin-top:20px" width="320" :breakpoints="breakpoints" lazyload="false">
        <template #item="{ item, url }">
          <div @click="picInfo(item)" style="cursor: pointer;"
            class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group">
            <div class="overflow-hidden">
              <LazyImg :url="url" class="pic"></LazyImg>
            </div>
          </div>
        </template>
      </Waterfall>
    </div>

  </div>
</template>
<script>
import { Parallax } from '@/components';
import { FormGroupInput as FgInput } from '../components'
import vueWaterfallEasy from 'vue-waterfall-easy';
import { DropDown, Navbar, NavLink } from '@/components';
import TheHeader from '../components/TheHeader.vue'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin'
import 'vue-waterfall-plugin/dist/style.css'

export default {
  name: 'search',
  bodyClass: 'search-page',
  components: {
    // TheHeader,
    Waterfall,
    LazyImg,
  },
  data() {
    return {
      loginname: '',
      keyword: '',
      imgsArr: [],
      page: 0,
      btntypeD: 'primary',
      btntypeM: 'primary',
      btntypeS: 'primary',
      stateD: 1,
      stateM: 1,
      stateS: 1,
      stateSort: 1,
      list: [
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-14.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-12.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-10.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-11.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152318-8.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152319-9.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-7.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-6.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-14.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-12.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-10.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-11.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152318-8.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152319-9.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-7.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-6.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-14.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-12.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-10.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-11.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152318-8.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152319-9.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-7.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-6.jpg",
        },
      ],
      breakpoints: { 3000: { rowPerView: 4 }, }
    }
  },
  mounted() {
    this.loginname = this.cookie.getCookie("userName");
    this.keyword = this.cookie.getCookie("keyword");
    this.getData();
  },
  methods: {
    chooseD() {
      this.stateD = 1 - this.stateD
      console.log(this.stateD)
      if (this.stateD == 1) {
        this.btntypeD = 'primary'
      } else {
        this.btntypeD = ''
      }

    },
    chooseM() {
      this.stateM = 1 - this.stateM
      if (this.stateM == 1) {
        this.btntypeM = 'primary'
      } else {
        this.btntypeM = ''
      }

    },
    chooseS() {
      this.stateS = 1 - this.stateS
      if (this.stateS == 1) {
        this.btntypeS = 'primary'
      } else {
        this.btntypeS = ''
      }

    },
    chooseDefault() {
      this.stateSort = 1
      document.getElementById('sort').innerHTML = '综合排序<i class="el-icon-arrow-down el-icon--right"></i>'

    },
    chooseGood() {
      this.stateSort = 2
      document.getElementById('sort').innerHTML = '最多点赞<i class="el-icon-arrow-down el-icon--right"></i>'

    },
    chooseNew() {
      this.stateSort = 3
      document.getElementById('sort').innerHTML = '最新发布<i class="el-icon-arrow-down el-icon--right"></i>'

    },
    getData() {
      var list = [
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-14.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-12.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-10.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-11.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152318-8.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152319-9.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-7.jpg",
        },
        {
          src:
            "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-6.jpg",
        }
      ];
      this.page += 1;
      if (this.page == 6) {
        // this.$refs.waterfall.waterfallOver();
      } else {
        this.imgsArr = this.imgsArr.concat(list);
      }
    },
  }
};
</script>
<style>
.pic:hover {
  opacity: 0.5;
  transition: 0.2s;
  transform: scale(1.1);
}
</style>
