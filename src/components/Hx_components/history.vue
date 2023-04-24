<template>
    <div>
        <el-main>
            <h2> 历史记录 </h2>
            <Waterfall :list="tableData" style="margin-top:20px" :width="320" :breakpoints="breakpoints">
                <template #item="{ item }">
                    <div style="cursor: pointer;"
                        class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group">
                        <div class="overflow-hidden">
                            <div class="row" style=" margin-left: auto;">
                                <div class="col-10">
                                    <p> {{ dispTime(item.created_at) }} </p>
                                </div>
                                <div class="col">
                                    <i class="now-ui-icons ui-1_simple-remove" style="cursor: pointer; margin-top: 1vh;"
                                        @click="deleteHistory(item.id)"></i>
                                </div>
                            </div>
                            <div @click="picInfo(item.prompt.id)">
                                <LazyImg :url="item.prompt.picture" class="pic"></LazyImg>
                            </div>
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
import { delete_history } from "../../api";
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
            this.$router.push({ path: '/picinfo', query: { picid: id } })
        },
        setUp() {
            get_history_list().then((res) => {
                console.log(res)
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
        deleteHistory(id) {
            delete_history({
                history_id: id
            })
                .then((res) => {
                    Notification({ title: '删除成功', message: '', type: 'success', duration: 2000 })
                })
                .catch((err) => {
                    console.log(err)
                    Notification({ title: '删除失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
                .finally(() => {
                    this.setUp()
                });
        }
    },
    mounted() {
        this.setUp()
    }
}
</script>