<template>
    <div>

        <div class="page-header clear-filter" filter-color="orange">
            <!-- 背景 -->
            <parallax class="page-header-image" style="background-image:url('image/bg5.jpg')">
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
                <a class="btn btn-primary" v-if="hasFollowed === 0" @click="follow()">+ 关注</a>
                <a class="btn btn-default" v-if="hasFollowed === 1" @click="follow()">已关注</a>
                <!-- 下面的三列内容 -->
                <div class="content">
                    <div class="social-description">
                        <h2>{{ following }}</h2>
                        <p @click="toMemberList(0)" style="cursor:pointer;">关注</p>
                    </div>
                    <div class="social-description">
                        <h2>{{ followed }}</h2>
                        <p @click="toMemberList(1)" style="cursor:pointer;">粉丝</p>
                    </div>
                    <div class="social-description">
                        <h2>{{ products }}</h2>
                        <p @click="toProduct()" style="cursor:pointer;">作品</p>
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
                    <p class="btn btn-primary btn-round btn-lg" v-if="isMe()" @click="toHistory" style="cursor:pointer">历史
                    </p>
                </div>
            </div>
            <router-view>使用router-view占位</router-view>
        </div>


        <!-- <Profile_subheader></Profile_subheader>
    <div class="container">
      
    <router-view></router-view>
    </div> -->


    </div>
</template>
<script>
import { followOthers, getInfos, getFollowedNumber, getFollowingNumber, getProductNumber, getIsFollowing } from '../api/index'
import { Notification } from 'element-ui';

export default {
    name: 'profile',
    bodyClass: 'profile-page',
    data() {
        return {
            userId: -1,
            nickname: '',
            avatar: '',
            following: 20,
            followed: 20,
            products: 0,
            hasFollowed: 0,
            login: null
        }
    },
    mounted() {
        this.setup()
    },
    watch: {
        // 监听路由发生改变
        $route() {
            this.setup()
        }
    },
    components: {
        // Tabs,
        // TabPane
    },
    methods: {
        isMe() {
            return this.userId == this.cookie.getCookie("userId");
        },
        setup() {
            this.userId = this.$route.query.userId;
            if (this.userId == undefined) {
                this.userId = this.cookie.getCookie("userId");
            }
            this.login = this.cookie.getCookie("token")
            getInfos(this.userId).then((res) => {
                console.log(res)
                this.nickname = res.data.user.nickname
                this.avatar = res.data.user.avatar
            })
                .catch((err) => {
                    Notification({ title: '获取信息失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
            if (this.login !== null) {
                getIsFollowing(this.userId).then((res) => {
                    console.log(res)
                    this.hasFollowed = res.data.is_following ? 1 : 0
                    if (this.isMe()) {
                        this.hasFollowed = 0
                    }
                })
                    .catch((err) => {
                        Notification({ title: '获取关注状态失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                    })
            }
            getFollowedNumber(this.userId).then((res) => this.followed = res.data.follower_num)
                .catch((err) => {
                    Notification({ title: '获取被关注数量失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
            getFollowingNumber(this.userId).then((res) => this.following = res.data.following_num)
                .catch((err) => {
                    Notification({ title: '获取关注数量失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
            getProductNumber(this.userId).then((res) => this.products = res.data.prompt_num)
                .catch((err) => {
                    Notification({ title: '获取作品数量失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
        },
        follow() {
            if (this.login !== null) {
                console.log(this.hasFollowed)
                if (this.hasFollowed == 1) {
                    followOthers({
                        user_id: eval(this.userId)
                    })
                        .then((res) => {
                            console.log(res)
                            Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
                            this.hasFollowed = 0
                        })
                        .catch((err) => {
                            console.log(err)
                            Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                        })
                } else {
                    followOthers({
                        user_id: eval(this.userId)
                    })
                        .then((res) => {
                            console.log(res)
                            Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
                            this.hasFollowed = 1
                        })
                        .catch((err) => {
                            console.log(err)
                            Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                        })
                }
            } else {
                Notification({ title: '请先登录', message: '', type: 'warning', duration: 2000 })
            }
        },
        toMemberList(type) {
            this.$router.push({ path: '/profile/memberlist', query: { userId: this.userId, type: type } })
        },
        toProduct() {
            this.$router.push({ path: '/profile/prompts', query: { userId: this.userId } })
        },
        toPieceList() {
            this.$router.push({ path: '/profile/prompts', query: { userId: this.userId } })
        },
        toCollection() {
            this.$router.push({ path: '/profile/collection', query: { userId: this.userId } })
        },
        toHistory() {
            this.$router.push({ path: '/profile/history', query: { userId: this.userId } })
        },
        toModInfo() {
            this.$router.push({ path: '/profile/modinfo', query: { userId: this.userId } })
        },
    }
};
</script>

<style></style>
