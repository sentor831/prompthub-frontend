<template>
    <div>
        <el-main>
            <h2> 历史记录 </h2>
            <Waterfall :list="tableData" style="margin-top:20px" width=320 :breakpoints="breakpoints">
                <template #item="{ item }">
                    <div @click="picInfo(item.prompt.id)" style="cursor: pointer;"
                        class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group">
                        <div class="overflow-hidden">
                            <p> {{ dispTime(item.created_at)}}</p>
                            <LazyImg :url="item.prompt.picture" class="pic"></LazyImg>
                        </div>
                    </div>
                </template>
            </Waterfall>
        </el-main>
    </div>
</template>


<script>
import { LazyImg, Waterfall } from "vue-waterfall-plugin";
import { get_history_list } from "../../api";
import { Notification } from "element-ui";
import { formatTime } from "../../api/utils";
export default {
    name: 'History',
    components: {
        Waterfall,
        LazyImg
    },
    data() {
        return {
            breakpoints: { 3000: { rowPerView: 4 }, },
            tableData: {

            }
        }
    },
    methods: {
        dispTime(t, detailed) {
            return formatTime(t, detailed)
        },
        picInfo(id) {
            let picInfo = {
                picId: id
            }
            this.cookie.setCookie(picInfo, 1)
            this.$router.push({ path: '/picinfo', query: { picid: id } })
            // this.$router.push('/picInfo')
        },
        setUp() {
            get_history_list().then((res) => {
                this.tableData = res.data.history_list;
            }).catch((err) => {
                console.log(err);
                Notification({
                    title: "失败",
                    message: err.response.data.msg,
                    type: "error",
                    duration: 2000,
                });
            })
        },
    },
    mounted() {
        this.setUp()
    }
}
</script>