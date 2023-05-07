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

            <!-- TODO: 按钮还是滚动条到底部 -->
            <Waterfall :list="imgsArr" style="margin-top:20px" :breakpoints="breakpoints">
                <template #item="{ item, url }">
                    <div @click="picInfo(item.id)" style="cursor: pointer;"
                        class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group">
                        <div class="overflow-hidden">
                            <i v-if="item.collection_count > 0" style="color: crimson" class="el-icon-star-on">{{
                                item.collection_count }}</i>
                            <LazyImg :url="url" class="pic"></LazyImg>
                            <!-- <img :src="url" class="pic" /> -->
                        </div>
                    </div>
                </template>
            </Waterfall>

            <div v-if="hasNext === 1" style="text-align: center;">
                <el-button btn btn-primary @click="getData(currentType)" style="margin-bottom: 1em ;">加载更多</el-button>
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
        LazyImg,
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
            options: {
                breakpoints: { 3000: { rowPerView: 4 }, },
                animationDuration: 1000,
                // 动画延迟
                animationDelay: 300,
            },
            breakpoints: { 3000: { rowPerView: 4 }, },
            currentType: 1,
            hasNext: 1
        }
    },
    mounted() {
        this.login = this.cookie.getCookie("token");
        this.getData(1);
    },
    methods: {
        picInfo(id) {
            this.$router.push({ path: '/picinfo', query: { picid: id } })
        },
        chooseHot() {
            this.btntypeH = 'primary'
            this.btntypeR = ''
            this.stateH = 1
            this.stateR = 0
            this.page = 1
            this.currentType = 1
            this.imgsArr = []
            this.getData(1)
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
            this.page = 1
            this.currentType = 2
            this.imgsArr = []
            this.getData(2)
        },
        getData(type) {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            if (type === 1) {
                hot_prompt_list(4 * 32, this.page)
                    .then((res) => {
                        for (let i = 0; i < res.data.prompt_list.length; ++i) {
                            res.data.prompt_list[i].src = res.data.prompt_list[i].picture;
                        }
                        this.imgsArr = this.imgsArr.concat(res.data.prompt_list)
                        console.log(res.data.has_next);
                        if (!res.data.has_next) {
                            this.$refs.waterfall.waterfallOver();
                            this.hasNext = 0
                        }
                    })
                    .catch((err) => { })
                    .finally(() => { loading.close() })
                this.page += 1;
            } else if (type === 2) {
                personized_prompt_list(4 * 32, this.page)
                    .then((res) => {
                        console.log(res)
                        for (let i = 0; i < res.data.prompt_list.length; ++i) {
                            res.data.prompt_list[i].src = res.data.prompt_list[i].picture;
                        }
                        this.imgsArr = this.imgsArr.concat(res.data.prompt_list)
                        console.log(res.data.has_next);
                        if (!res.data.has_next) {
                            this.$refs.waterfall.waterfallOver();
                            this.hasNext = 0
                        }
                    })
                    .catch((err) => { })
                    .finally(() => { loading.close() })
                this.page += 1
            }

            // if (this.page == 6) {
            //   this.$refs.waterfall.waterfallOver();
            // } else {
            //   this.imgsArr = this.imgsArr.concat(list);
            // }
        },
        goSearch() {
            if (this.keyword !== '') {
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
