<template>
    <div class="noticesidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" text-color="#B0B3B2" active-text-color="#000000"
            unique-opened router style="height: 100%;">
            <template v-for="item in items">
                <template>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'notice-side-bar',
    bodyClass: 'notice-sidebar-page',
    components: {

    },
    data: function () {
        return {
            items: [
                {
                    icon: 'el-icon-s-data',
                    index: 'system',
                    title: '系统通知'
                },
                {
                    icon: 'el-icon-user-solid',
                    index: 'reply',
                    title: '评论通知'
                }
            ]
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '')
        }
    },
}

</script>

<style>
.sidebar {
    display: block;
    position: absolute;
    /* top: 70px; */
    /* bottom: 0; */
    /* overflow-y: scroll; */
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 25vh;
}

.sidebar>ul {
    height: 100%;
}
</style>