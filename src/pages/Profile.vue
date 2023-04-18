<template>
    <div>

        <div class="page-header clear-filter" filter-color="orange">
            <!-- 背景 -->
            <parallax class="page-header-image" style="background-image:url('img/bg5.jpg')">
            </parallax>
            <!-- 头像 -->
            <div class="container">
                <div class="photo-container">
                    <img :src="avatar" alt="" />
                </div>
                <!-- 姓名 -->
                <h3 class="title">{{ nickname }}</h3>
                <!-- 职业介绍 -->
                <p class="category"> Prompt Hero </p>
                <!-- 下面的三列内容 -->
                <div class="content">
                    <div class="social-description">
                        <h2>26</h2>
                        <p @click="toMemberList" style="cursor:pointer;">关注</p>
                    </div>
                    <div class="social-description">
                        <h2>26</h2>
                        <p @click="toMemberList" style="cursor:pointer;">粉丝</p>
                    </div>
                    <div class="social-description">
                        <h2>48</h2>
                        <p @click="toMemberList" style="cursor:pointer;">赞与收藏</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="container">
                <div class="button-container">
                    <!-- <router-link to="/Profile/MyHome" active-class="active"
            class="btn btn-primary btn-round btn-lg">主页</router-link> -->
                    <!-- <router-link to="/Profile/product" active-class="active"
            class="btn btn-primary btn-round btn-lg">作品</router-link>
          <router-link to="/Profile/collection" active-class="active"
            class="btn btn-primary btn-round btn-lg">收藏</router-link>
          <router-link to="/Profile/viewhistory" active-class="active"
            class="btn btn-primary btn-round btn-lg">历史</router-link> -->
                    <p class="btn btn-primary btn-round btn-lg" @click="toPieceList" style="cursor:pointer">作品</p>
                    <p class="btn btn-primary btn-round btn-lg" @click="toCollection" style="cursor:pointer">收藏</p>
                    <p class="btn btn-primary btn-round btn-lg" @click="toHistory" style="cursor:pointer">历史</p>
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
import { getName } from '../api/index'


export default {
    name: 'profile',
    bodyClass: 'profile-page',
    data() {
        return {
            userId: -1,
            nickname: '',
            avatar: '',
        }
    },
    mounted() {
        this.userId = this.$route.query.userId;
        this.avatar = this.cookie.getCookie('avatar')
        getName(this.userId).then((res) => this.nickname = res.data.nickname)
            .catch((err) => {
                Notification({ title: '获取通知失败', message: err.response.data.msg, type: 'error', duration: 2000 })
            })
        // 获取 关注数量 粉丝数量
    },
    components: {
        // Tabs,
        // TabPane
    },
    methods: {
        toMemberList() {
            this.$router.push('/profile/memberlist')
        },
        toPieceList() {
            this.$router.push({ path: '/profile/product', query: { userId: this.userId } })
        },
        toCollection() {
            this.$router.push({ path: '/profile/collection', query: { userId: this.userId } })
        },
        toHistory() {
            this.$router.push({ path: '/profile/history', query: { userId: this.userId } })
        }
    }
};
</script>

<style></style>
