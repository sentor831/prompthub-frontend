<!-- <template>
<el-row class="tac">
  <el-col :span="4">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#fafafa"
      text-color="#1e1e1e"
      active-text-color="#00a1d6">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template> -->

<template>
<el-container style="height: 800px; border: 1px solid #eee">
    <!-- 原rgb为(238,241,246) -->
  <el-aside width="220px" style="background-color: rgb(255,255,255)">
    <el-menu :default-openeds="['1','2']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-folder"></i>私人收藏夹</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">收藏夹1</el-menu-item>
          <el-menu-item index="1-2">收藏夹2</el-menu-item>
          <el-menu-item index="1-3">收藏夹3</el-menu-item>
          <el-menu-item index="1-4">收藏夹4</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-folder"></i>公开收藏夹</template>
        <el-menu-item-group>
          <el-menu-item index="2-1">收藏夹1</el-menu-item>
          <el-menu-item index="2-2">收藏夹2</el-menu-item>
          <el-menu-item index="2-3">收藏夹3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 15px ;background-color: rgb(244,245,247);">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 10px"> 设置</i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改名称</el-dropdown-item>
          <el-dropdown-item>类型</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    
    <el-main>
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
    </el-main>

  </el-container>
</el-container>
</template>

<script>
import { LazyImg, Waterfall } from 'vue-waterfall-plugin'
import 'vue-waterfall-plugin/dist/style.css'
export default {
    name:"ProfileColleciton",
    data(){
        return {
            imgsArr: [],         //存放所有已加载图片的数组（即当前页面会加载的所有图片）
            fetchImgsArr: [],     //存放每次滚动时下一批要加载的图片的数组
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
    components:{
        Waterfall,
        LazyImg
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      picInfo(item) {
      // this.cookie.setCookie()
      this.$router.push('/picinfo')
    }
    }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>