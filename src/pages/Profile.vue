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
            <p>Comments</p>
          </div>
          <div class="social-description">
            <h2>26</h2>
            <p>Comments</p>
          </div>
          <div class="social-description">
            <h2>48</h2>
            <p>Bookmarks</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container">
        <div class="button-container">
          <router-link to="/Profile/mycollection" active-class="active" class="btn btn-primary btn-round btn-lg">我的收藏</router-link>
          <router-link to="/Profile/thumbs" active-class="active" class="btn btn-primary btn-round btn-lg">我的点赞</router-link>
          <router-link to="/Profile/checking" active-class="active" class="btn btn-primary btn-round btn-lg">等待审核</router-link>
          <router-link to="/Profile/viewhistory" active-class="active" class="btn btn-primary btn-round btn-lg">浏览历史</router-link>
        </div>
        <!-- 使用router-view占位 -->
        <router-view>
        </router-view>

        <!-- <div class="row">
          <tabs
            pills
            class="nav-align-center"
            tab-content-classes="gallery"
            tab-nav-classes="nav-pills-just-icons"
            type="primary"
          >
            <tab-pane title="Profile">
              <i slot="label" class="now-ui-icons design_image"></i>

              <div class="col-md-10 ml-auto mr-auto">
                <div class="row collections">
                  <div class="col-md-6">
                    <img src="img/bg6.jpg" class="img-raised" />
                    <img src="img/bg11.jpg" alt="" class="img-raised" />
                  </div>
                  <div class="col-md-6">
                    <img src="img/bg7.jpg" alt="" class="img-raised" />
                    <img src="img/bg8.jpg" alt="" class="img-raised" />
                  </div>
                </div>
              </div>
            </tab-pane>

            <tab-pane title="Home">
              <i slot="label" class="now-ui-icons location_world"></i>

              <div class="col-md-10 ml-auto mr-auto">
                <div class="row collections">
                  <div class="col-md-6">
                    <img src="img/bg1.jpg" alt="" class="img-raised" />
                    <img src="img/bg3.jpg" alt="" class="img-raised" />
                  </div>
                  <div class="col-md-6">
                    <img src="img/bg8.jpg" alt="" class="img-raised" />
                    <img src="img/bg7.jpg" alt="" class="img-raised" />
                  </div>
                </div>
              </div>
            </tab-pane>

            <tab-pane title="Messages">
              <i slot="label" class="now-ui-icons sport_user-run"></i>

              <div class="col-md-10 ml-auto mr-auto">
                <div class="row collections">
                  <div class="col-md-6">
                    <img src="img/bg3.jpg" alt="" class="img-raised" />
                    <img src="img/bg8.jpg" alt="" class="img-raised" />
                  </div>
                  <div class="col-md-6">
                    <img src="img/bg7.jpg" alt="" class="img-raised" />
                    <img src="img/bg6.jpg" class="img-raised" />
                  </div>
                </div>
              </div>
            </tab-pane>
          </tabs>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
// import { Tabs, TabPane } from '@/components';

export default {
  name: 'profile',
  bodyClass: 'profile-page',
  components: {
    // Tabs,
    // TabPane
  }
};
</script>
<style></style>
