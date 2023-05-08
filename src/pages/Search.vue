<template>
    <div>
        <!-- <the-header></the-header> -->
        <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
        <div style="margin-left: 90px; margin-top: 100px;">
            <h3>
                "{{ keyword }}" 的搜索结果
            </h3>
        </div>
        <div>
            <el-row style="margin-left: 90px; margin-top: 40px;">
                <el-button round @click="All()" :type="btntypeA">全部</el-button>
                <el-button round @click="chooseD()" :type="btntypeD">DALL-E</el-button>
                <el-button round @click="chooseM()" :type="btntypeM">Midjourney</el-button>
                <el-button round @click="chooseS()" :type="btntypeS">Diffusion</el-button>
                <el-dropdown style="margin-left: 20px">
                    <el-button id="sort">
                        热度排序<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="chooseGood">热度排序</el-dropdown-item>
                        <el-dropdown-item @click.native="chooseNew">时间排序</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-row>

            <Waterfall :list="tableData" style="margin-top:20px" :breakpoints="breakpoints">
                <template #item="{ item }">
                    <div @click="picInfo(item.id)" style="cursor: pointer;"
                        class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group">
                        <div class="overflow-hidden">
                            <LazyImg :url="item.picture" class="pic" alt="picture"></LazyImg>
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
import { DropDown, Navbar, NavLink } from '@/components';
import TheHeader from '../components/TheHeader.vue'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin'
import 'vue-waterfall-plugin/dist/style.css'
import { search_prompt_keyword } from '../api';
import { Notification } from 'element-ui';

export default {
    name: 'search',
    bodyClass: 'search-page',
    components: {
        // TheHeader,
        Waterfall,
        LazyImg,
    },
    data() {
        return {
            loginname: '',
            keyword: '',
            imgsArr: [],
            page: 0,
            btntypeD: 'primary',
            btntypeM: 'primary',
            btntypeS: 'primary',
            btntypeA: 'primary',
            stateD: 1,
            stateM: 1,
            stateS: 1,
            stateA: 1,
            modelStates: [],
            stateSort: 1,
            tableData: [],
            breakpoints: { 3000: { rowPerView: 4 }, },
            sortType: 0,
        }
    },
    mounted() {
        this.getData();
    },
    watch: {
        // 监听路由发生改变
        $route() {
            this.getData()
        }
    },
    methods: {
        genRoute() {
            this.tableData = []
            let keyword = this.keyword;
            let sortBy = undefined;
            let Tmodels = '';

            if (this.sortType == 0) {
                sortBy = 'hot'
            }
            if (this.sortType == 1) {
                sortBy = 'date'
            }

            let firstModel = true;

            if (this.stateD == 1) {
                Tmodels = Tmodels + "dall";
                firstModel = false
            }
            if (this.stateM == 1) {
                if (!firstModel) {
                    Tmodels = Tmodels + '_';
                }
                Tmodels = Tmodels + "journey";
                firstModel = false
            }
            if (this.stateS == 1) {
                if (!firstModel) {
                    Tmodels = Tmodels + '_';
                }
                Tmodels = Tmodels + "diffusion";
                firstModel = false
            }

            this.$router.push({
                path: '/search',
                query: {
                    keyword, models: Tmodels, sortBy
                }
            })
        },
        picInfo(id) {
            // TODO 设置cookie
            // this.cookie.setCookie()
            this.$router.push({ path: '/picinfo', query: { picid: id } })
            // this.$router.push('/picInfo')
        },
        All() {
            this.stateD = 1;
            this.stateM = 1;
            this.stateS = 1;
            this.btntypeD = 'primary'
            this.btntypeM = 'primary'
            this.btntypeS = 'primary'
            this.updateAll()
        },
        updateAll() {
            if (this.stateD == 0 && this.stateM == 0 && this.stateS == 0) {
                this.All()
            }
            if (this.stateD != 1 || this.stateM != 1 || this.stateS != 1) {
                this.stateA = 0
                this.btntypeA = ''
            }
            if (this.stateD == 1 && this.stateM == 1 && this.stateS == 1) {
                this.stateA = 1
                this.btntypeA = 'primary'
            }
            // refresh 
            this.genRoute();
        },
        chooseD() {
            this.stateD = 1 - this.stateD
            console.log(this.stateD)
            if (this.stateD == 1) {
                this.btntypeD = 'primary'
            } else {
                this.btntypeD = ''
            }
            this.updateAll()
        },
        chooseM() {
            this.stateM = 1 - this.stateM
            if (this.stateM == 1) {
                this.btntypeM = 'primary'
            } else {
                this.btntypeM = ''
            }
            this.updateAll()
        },
        chooseS() {
            this.stateS = 1 - this.stateS
            if (this.stateS == 1) {
                this.btntypeS = 'primary'
            } else {
                this.btntypeS = ''
            }
            this.updateAll()
        },
        chooseGood() {
            // this.stateSort = 2
            document.getElementById('sort').innerHTML = '热度排序<i class="el-icon-arrow-down el-icon--right"></i>'
            this.sortType = 0;
            this.genRoute();
        },
        chooseNew() {
            // this.stateSort = 3
            document.getElementById('sort').innerHTML = '时间排序<i class="el-icon-arrow-down el-icon--right"></i>'
            this.sortType = 1;
            this.genRoute();
        },
        getData() {
            let model = this.$route.query.models;
            this.keyword = this.$route.query.keyword;
            let sortedBy = this.$route.query.sortBy;
            console.log('Sort method: ' + sortedBy);
            if (sortedBy != undefined) {
                if (sortedBy == 'hot') {
                    document.getElementById('sort').innerHTML = '热度排序<i class="el-icon-arrow-down el-icon--right"></i>'
                }
                if (sortedBy == 'date') {
                    document.getElementById('sort').innerHTML = '时间排序<i class="el-icon-arrow-down el-icon--right"></i>'
                }
            }
            search_prompt_keyword({
                models: model,
                keyword: this.keyword,
                sortBy: sortedBy
            }).then((res) => {
                console.log(res);
                this.tableData = res.data.prompt_list;
            }).catch((err) => {
                console.log(err)
                Notification({ title: '查询失败', message: err.response.data.msg, type: 'error', duration: 2000 })
            })
        },
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
