<template>
  <div>
    
    <div class="page-header clear-filter" filter-color="orange">
      <!-- 背景 -->
      <parallax
        class="page-header-image"
        style="background-image:url('img/bg5.jpg')"
      >
      </parallax>
      <!-- 头像 -->
      <div class="container">
        <div class="photo-container">
          <img src="img/ryan.jpg" alt="" />
        </div>
        <!-- 姓名 -->
        <h3 class="title">Ryan Scheinder</h3>
        <!-- 职业介绍 -->
        <p class="category">Photographer</p>
        <!-- 下面的三列内容 -->
        <div class="content">
          <div class="social-description">
            <h2>26</h2>
            <p @click="toMenberList">关注</p>
          </div>
          <div class="social-description">
            <h2>26</h2>
            <p @click="toMenberList">粉丝</p>
          </div>
          <div class="social-description">
            <h2>48</h2>
            <p @click="toMenberList">赞与收藏</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section" >
      <div class="container">
        <div class="button-container">
          <router-link to="/Profile/MyHome" active-class="active" class="btn btn-primary btn-round btn-lg">主页</router-link>
          <router-link to="/Profile/product" active-class="active" class="btn btn-primary btn-round btn-lg">作品</router-link>
          <router-link to="/Profile/collection" active-class="active" class="btn btn-primary btn-round btn-lg">收藏</router-link>
          <router-link to="/Profile/viewhistory" active-class="active" class="btn btn-primary btn-round btn-lg">历史</router-link>
        </div>
        <router-view>使用router-view占位</router-view>

      </div>
    </div>
    <!-- <Profile_subheader></Profile_subheader>
    <div class="container">
      
    <router-view></router-view>
    </div> -->

  <div class="MemberList-table">
    <el-table
    :data="tableData"
    style="width: 100%"
    :header-cell-style="{ textAlign: 'center' }"
    :cell-style="{ textAlign: 'center' }"
    >
    <el-table-column
      label="头像"
      style="width: 20%">
      <template slot-scope="scope">
        <img :src="scope.row.picture" width="100" height="100" style="margin-left:0; padding: 1vh" />
        <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
      </template>
    </el-table-column>
    <el-table-column
      label="用户名"
      style="width: 20%">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" style="width: 20%">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">取消关注</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</div>

</template>

<script>


export default {
  name: 'memberlist',
  bodyClass: 'profile-page',
  components: {
    
  },
  data() {
      return {
        tableData: [{
          picture: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          picture: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          picture: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          picture: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
  methods:{
    toMenberList(){
      this.$router.push('/memberlist')
    },
    handleEdit(index, row) {
        console.log(index, row);
      },
    handleDelete(index, row) {
        console.log(index, row);
    }
  }
};
</script>

<style scoped>
.MemberList-table {
  width : 70%;
  margin : auto;

}
</style>
