<template>
  <div>

    <div class="page-header clear-filter" filter-color="orange">
      <!-- 背景 -->
      <parallax class="page-header-image" style="background-image:url('img/bg5.jpg')">
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

    <div class="section">
      <div class="container">
        <div class="button-container">
          <router-link to="/Profile/MyHome" active-class="active"
            class="btn btn-primary btn-round btn-lg">主页</router-link>
          <router-link to="/Profile/product" active-class="active"
            class="btn btn-primary btn-round btn-lg">作品</router-link>
          <router-link to="/Profile/collection" active-class="active"
            class="btn btn-primary btn-round btn-lg">收藏</router-link>
          <router-link to="/Profile/viewhistory" active-class="active"
            class="btn btn-primary btn-round btn-lg">历史</router-link>
        </div>
        <router-view>使用router-view占位</router-view>

      </div>
    </div>
    <!-- <Profile_subheader></Profile_subheader>
    <div class="container">
      
    <router-view></router-view>
    </div> -->


  </div>
</template>
<script>


export default {
  name: 'profile',
  bodyClass: 'profile-page',
  components: {
    // Tabs,
    // TabPane

  },
  methods: {
    toMenberList() {
      this.$router.push('/memberlist')
    }
  }
};
</script>

<style></style>
