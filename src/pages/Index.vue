<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax class="page-header-image" style="background-image:url('img/header2.jpg')">
      </parallax>
      <div class="container">
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
        <el-button round v-if="login !== null" @click="chooseRecommend()" :type="btntypeR">个性化推荐</el-button>
      </el-row>

      <!-- <div class="waterfall" style="height:400px; margin-top: 20px;">
        <vue-waterfall-easy ref="waterfall" :imgsArr="imgsArr" @scrollReachBottom="getData">
          <div class="info" slot-scope="props" style="text-align: center;">第{{ props.index + 1 }}张图片</div>
        </vue-waterfall-easy>
      </div> -->

      <!-- TODO: 按钮还是滚动条到底部 -->
      <Waterfall :list="imgsArr" style="margin-top:20px" :breakpoints="breakpoints">
        <template #item="{ item }">
          <div @click="picInfo(item.id)" style="cursor: pointer;"
            class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group">
            <div class="overflow-hidden">
              <!-- <LazyImg :url="item.picture" class="pic"></LazyImg> -->
              <img :src="item.picture" class="pic" />
            </div>
          </div>
        </template>
      </Waterfall>
      <div style="text-align: center;">
        <el-button btn btn-primary @click="getData" style="margin-bottom: 1em ;">加载更多</el-button>
      </div>

    </div>




  </div>
</template>
<script>
import { Parallax } from '@/components';
import { FormGroupInput as FgInput } from '../components'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin'
import 'vue-waterfall-plugin/dist/style.css'
import { modifyPass, hot_prompt_list, personized_prompt_list } from '../api/index'
import { Notification } from 'element-ui';

export default {
  name: 'index',
  bodyClass: 'index-page',
  components: {
    Parallax,
    Waterfall,
    // LazyImg,
  },
  data() {
    return {
      login: null,
      keyword: '',
      imgsArr: [],         //存放所有已加载图片的数组（即当前页面会加载的所有图片）
      fetchImgsArr: [],     //存放每次滚动时下一批要加载的图片的数组
      page: 1,
      btntypeH: 'primary',
      btntypeR: '',
      stateH: 1,
      stateR: 0,
      list: [],
      breakpoints: { 3000: { rowPerView: 4 }, }
    }
  },
  mounted() {
    this.login = this.cookie.getCookie("token");
    // TODO 获取热门推荐
    this.getData();
  },
  methods: {
    picInfo(id) {
      // TODO 设置cookie 
      let picInfo = {
        picId: id
      }
      this.cookie.setCookie(picInfo, 1)
      this.$router.push({ path: '/picinfo', query: { picid: id } })
      // this.$router.push('/picInfo')
    },
    chooseHot() {
      this.btntypeH = 'primary'
      this.btntypeR = ''
      this.stateH = 1
      this.stateR = 0
      // TODO 热门推荐
    },
    chooseRecommend() {
      this.stateR = 1 - this.stateR
      if (this.stateR == 1) {
        this.btntypeR = 'primary'
        this.btntypeH = ''
        this.stateH = 0
      } else {
        this.btntypeR = ''
        this.btntypeH = 'primary'
        this.stateH = 1
      }
      // TODO 个性化推荐
    },
    getData() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      hot_prompt_list(28, this.page)
        .then((res) => {
          this.imgsArr = this.imgsArr.concat(res.data.prompt_list)
          console.log(res.data.has_next);
          if (!res.data.has_next) {
            this.$refs.waterfall.waterfallOver();
          }
        })
        .catch((err) => { })
        .finally(() => { loading.close() })

      this.page += 1;


      // if (this.page == 6) {
      //   this.$refs.waterfall.waterfallOver();
      // } else {
      //   this.imgsArr = this.imgsArr.concat(list);
      // }
    },
    goSearch() {
      if (this.keyword !== '') {
        let searchInfo = {
          keyword: this.keyword,
        }
        this.cookie.setCookie(searchInfo, 1)
        this.$router.push({ path: '/search', query: { keyword: this.keyword } })
      } else {
        Notification({ title: '提示', message: '请输入搜索内容', type: 'warning', duration: 2000 })
      }
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
