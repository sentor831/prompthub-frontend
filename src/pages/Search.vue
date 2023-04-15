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
            最高热度<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="chooseGood">最高热度</el-dropdown-item>
            <el-dropdown-item @click.native="chooseNew">最新发布</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>

      <Waterfall :list="list" style="margin-top:20px" :breakpoints="breakpoints">
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
      breakpoints: { 3000: { rowPerView: 4 }, },
    }
  },
  mounted() {
    this.keyword = this.cookie.getCookie("keyword");
    // TODO 根据关键词获取数据
    this.getData();
  },
  watch: {
    // 监听路由发生改变
    '$route': {
      handler(newVal) {
        if (newVal.query.keyword) {
          this.keyword = this.cookie.getCookie("keyword");
          this.getData()
          console.log(this.keyword)
        }
      }
    }
  },
  methods: {
    picInfo(item) {
      // TODO 设置cookie
      // this.cookie.setCookie()
      // this.$router.push({ path: '/picinfo', query: { picid: item.id } })
      this.$router.push('/picInfo')
    },
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
    chooseGood() {
      this.stateSort = 2
      document.getElementById('sort').innerHTML = '最高热度<i class="el-icon-arrow-down el-icon--right"></i>'

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
