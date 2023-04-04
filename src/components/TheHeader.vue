<template>
    <navbar menu-classes="ml-auto" position="fixed" type="info" :transparent=false>
        <a class="navbar-brand" href="/#/">PROMPTHUB</a>

        <template slot="navbar-menu">
            <li class="nav-item">
                <el-input class="input" placeholder="搜索..." v-model="keyword" @focus="focus" @keyup.enter="goSearch()"
                    style="width:600px; margin-right:100px">
                    <el-button slot="append" icon="el-icon-search" @click="goSearch()"></el-button>
                </el-input>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="/#/login">
                    <p>登 录</p>
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link btn btn-neutral" href="/#/signup">
                    <!-- <i class="now-ui-icons arrows-1_share-66"></i> -->
                    <p> 加 入</p>
                </a>
            </li>
        </template>
    </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from '@/components';

export default {
    name: "the-header",
    components: {
        Navbar
    },
    data() {
        return {
            keyword: ''
        }
    },
    mounted() {
        this.keyword = this.cookie.getCookie("keyword");
    },
    methods: {
        goSearch() {
            let searchInfo = {
                keyword: this.keyword,
            }
            this.cookie.setCookie(searchInfo, 1)
            this.$router.push({ path: '/search', query: { keyword: this.keyword } })
        }
    }
}
</script>