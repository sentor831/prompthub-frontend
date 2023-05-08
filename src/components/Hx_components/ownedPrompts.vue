<template>
    <div>
        <el-main>
            <h2> 作品合集 </h2>
            <p v-if="noWorks === 1">暂无作品</p>
            <Waterfall :list="tableData" style="margin-top:20px" :width="320" :breakpoints="breakpoints">
                <template #item="{ item }">
                    <div @click="picInfo(item.id)" style="cursor: pointer;"
                        class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group">
                        <div class="overflow-hidden">
                            <p> {{ dispTime(item.created_at) }}</p>
                            <LazyImg :url="item.picture" class="pic" alt="picture"></LazyImg>
                        </div>
                    </div>
                </template>
            </Waterfall>
            <div v-if="hasNext === 1" style="text-align: center;">
                <el-button btn btn-primary @click="getData()" style="margin-bottom: 1em ;">加载更多</el-button>
            </div>
        </el-main>
    </div>
</template>

<script>
import { LazyImg, Waterfall } from "vue-waterfall-plugin";
import { get_my_prompt_list } from "../../api";
import { Loading, Notification } from "element-ui";
import { formatTime } from "../../api/utils";
export default {
    name: 'OwnedPrompts',
    components: {
        Waterfall,
        LazyImg
    },
    data() {
        return {
            breakpoints: { 3000: { rowPerView: 4 }, },
            tableData: [],
            userId: -1,
            noWorks: 0,
            page: 1,
            hasNext: 1
        }
    },
    methods: {
        dispTime(t, detailed) {
            return formatTime(t, detailed)
        },
        picInfo(id) {
            this.$router.push({ path: '/picinfo', query: { picid: id } })
        },
        setUp() {
            this.userId = this.$route.query.userId;
            this.page = 1;
            this.getData();
        },
        getData() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            get_my_prompt_list(this.userId, 32, this.page).then((res) => {
                this.tableData = this.tableData.concat(res.data.prompt_list);
                if (!res.data.has_next) {
                    this.$refs.waterfall.waterfallOver();
                    this.hasNext = 0
                }
                if (res.data.prompt_list.length === 0 && this.page === 1) {
                    this.noWorks = 1
                }
            }).catch((err) => {
                console.log(err);
                Notification({
                    title: "失败",
                    message: err.response.data.msg,
                    type: "error",
                    duration: 2000,
                });
            }).finally(() => {
                loading.close()
            })
            this.page += 1
        }
    },
    mounted() {
        this.setUp()
    }
}
</script>