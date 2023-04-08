<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax class="page-header-image" style="background-image:url('img/header.jpg')">
      </parallax>
      <div class="container">

        <div>当前登录人：{{ loginname }}</div>

        <div class="content-center brand">
          <h2>欢迎使用Prompthub</h2>
          <el-input class="input" placeholder="搜索..." v-model="keyword" @keyup.enter="goSearch()">
            <el-button slot="append" icon="el-icon-search" @click="goSearch()"></el-button>
          </el-input>
        </div>

      </div>
    </div>

    <div>
      <el-row style=" margin-left: 90px; margin-top: 30px;">
        <el-button round @click="chooseHot()" :type="btntypeH">热门推荐</el-button>
        <el-button round @click="chooseRecommend()" :type="btntypeR">个性化推荐</el-button>
      </el-row>

      <!-- <div class="waterfall" style="height:400px; margin-top: 20px;">
        <vue-waterfall-easy ref="waterfall" :imgsArr="imgsArr" @scrollReachBottom="getData">
          <div class="info" slot-scope="props" style="text-align: center;">第{{ props.index + 1 }}张图片</div>
        </vue-waterfall-easy>
      </div> -->
      <a class="btn btn-simple btn-link btn-block" @click="change()">修改密码</a>

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
import { LazyImg, Waterfall } from 'vue-waterfall-plugin'
import 'vue-waterfall-plugin/dist/style.css'
import { modifyPass } from '../api/index'

export default {
  name: 'index',
  bodyClass: 'index-page',
  components: {
    Parallax,
    Waterfall,
    LazyImg,
  },
  data() {
    return {
      loginname: '',
      keyword: '',
      imgsArr: [],         //存放所有已加载图片的数组（即当前页面会加载的所有图片）
      fetchImgsArr: [],     //存放每次滚动时下一批要加载的图片的数组
      page: 0,
      btntypeH: 'primary',
      btntypeR: '',
      stateH: 1,
      stateR: 0,
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
    this.loginname = this.cookie.getCookie("email");
    this.getData();
  },
  methods: {
    change() {
      modifyPass({
        old_password: '123',
        new_password: '345'
      }).then((res) => {
        console.log(res)
      })
    },
    picInfo(item) {
      // this.cookie.setCookie()
      // this.$router.push({ path: '/picinfo', query: { picid: item.id } })
      this.$router.push('/picInfo')
    },
    chooseHot() {
      this.btntypeH = 'primary'
      this.btntypeR = ''
      this.stateH = 1
    },
    chooseRecommend() {
      this.stateR = 1 - this.stateR
      if (this.stateR == 1) {
        this.btntypeR = 'btn btn-primary'
        this.btntypeH = ''
        this.stateH = 0
      } else {
        this.btntypeR = ''
        this.btntypeH = 'primary'
        this.stateH = 1
      }
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
        this.$refs.waterfall.waterfallOver();
      } else {
        this.imgsArr = this.imgsArr.concat(list);
      }
    },
    goSearch() {
      let searchInfo = {
        keyword: this.keyword,
      }
      this.cookie.setCookie(searchInfo, 1)
      this.$router.push({ path: '/search', query: { keyword: this.keyword } })
    }
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
