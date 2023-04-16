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
      <el-menu :default-openeds="['1', '2']">
        <el-submenu index="0">
          <template slot="title"><i class="el-icon-plus" @click="createCollectionVisible = true"></i>新建收藏</template>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-folder"></i>私密收藏夹</template>
          <el-menu-item-group>
            <el-menu-item v-for="(item, index) in private_collection_list" :key="index" @click="showCollection(item.id)">
              {{ item.name }}
            </el-menu-item>
          </el-menu-item-group>

      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-folder"></i>公开收藏夹</template>
        <el-menu-item-group>
          <el-menu-item v-for="(item, index) in public_collection_list" :key="index" @click="showCollection(item.id)">
            {{ item.name }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>

    <!-- 创建收藏 -->


    <el-dialog title="新建收藏夹" :visible.sync="createCollectionVisible" width="33%" center>
      <div class="dialogdiv" style="height: auto; overflow-y: auto; overflow-x: hidden;">
        <el-form ref="form" :model="form" label-width="120px" label-position="left">
          <el-form-item label="收藏夹名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="是否公开">
            <el-switch v-model="form.visibility"></el-switch>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="createCollectionVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCreateCollection()">确 定</el-button>
      </span>
    </el-dialog>

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

      <!-- <el-main>
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
                                                                  </el-main> -->

    </el-container>
  </el-container>
</template>

<script>
import { LazyImg, Waterfall } from 'vue-waterfall-plugin'
import 'vue-waterfall-plugin/dist/style.css'
import { get_collection_list, create_collection } from '../../api'
import { Notification } from 'element-ui'
export default {
  name: "ProfileColleciton",
  data() {
    return {
      form: {
        name: '',
        visibility: true
      },
      createCollectionVisible: false,
      private_collection_list: [],
      public_collection_list: [],
      userId: -1,
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
  mounted() {
    this.userId = this.$route.query.userId;
    this.getCollectionInfo()
  },
  components: {
    // Waterfall,
    // LazyImg
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
    },
    getCollectionInfo() {
      this.private_collection_list = []
      this.public_collection_list = []
      get_collection_list(1)
        .then((res) => {
          for (let i = 0; i < res.data.collection_list.length; i++) {
            const item = res.data.collection_list[i];
            if (item.visibility == 1) {
              this.private_collection_list = this.private_collection_list.concat(item)
            } else {
              this.public_collection_list = this.public_collection_list.concat(item)
            }
          }
        }).catch((err) => {
          Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
        })
    },
    submitCreateCollection() {
      let name = this.form.name
      console.log(this.form.visibility);
      let visibility = this.form.visibility === true ? 0 : 1
      create_collection({
        name, visibility
      }).then((res) => {
        Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
      }).catch((err) => {
        console.log(err)
        Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
      }).finally(() => {
        this.createCollectionVisible = false
        this.getCollectionInfo()
      })
    },
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