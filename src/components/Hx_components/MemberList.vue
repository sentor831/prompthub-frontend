<template>
    <div>
        <el-main>
            <h2>{{ title() }}</h2>
        </el-main>
        <div>
            <div class="MemberList-table">
                <el-table :data="tableData" style="width: 100%" :header-cell-style="{ textAlign: 'center' }"
                    :cell-style="{ textAlign: 'center' }">
                    <el-table-column label="头像" style="width: 60%">
                        <template slot-scope="scope">
                            <div class="photo-container">
                                <img :src="scope.row.avatar" />
                            </div>
                            <!-- width="100" height="100" -->
                            <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
                        </template>
                    </el-table-column>
                    <el-table-column label="用户名" style="width: 20%">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <p style="font-size: 200%;">{{ scope.row.nickname }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" style="width: 20%">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger"
                                @click="handleOpen(scope.$index, scope.row)">查看信息</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block" style="text-align: center">
                <el-pagination layout="prev, pager, next" :total="totalNum" :current-page="currentPage"
                    :page-size="pageSize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getUserfollowerList, getUserfollowingList } from '../../api';

export default {
    name: 'Memberlist',
    components: {

    },
    data() {
        return {
            tableData: [],
            userId: 0,
            type: 0,
            totalNum: 0,
            currentPage: 1,
            pageSize: 10
        }
    },
    watch: {
        // 监听路由发生改变
        $route() {
            this.getData()
        }
    },
    mounted() {
        //mounted
        this.getData()
    },
    methods: {
        title() {
            if (this.type == 0) { return "关注列表" } else { return "粉丝列表" }
        },
        getData() {
            this.userId = this.$route.query.userId;
            this.type = this.$route.query.type;
            if (this.type == 0) {
                getUserfollowingList(this.userId, this.pageSize, this.currentPage).then((res) => {
                    console.log(res.data);
                    this.tableData = res.data.following_list;
                }).catch((err) => {
                    Notification({ title: '页面出错', message: err.response.data.msg, type: 'error', duration: 2000 })
                })

            }
            if (this.type == 1) {
                getUserfollowerList(this.userId, this.pageSize, this.currentPage).then((res) => {
                    console.log(res.data);
                    this.tableData = res.data.follower_list
                }).catch((err) => {
                    Notification({ title: '页面出错', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
            }
        },
        handleOpen(index, row) {
            this.$router.push({
                path: '/profile/prompts', query: {
                    userId: row.id
                }
            })
        },
    }
};
</script>

<style scoped>
.MemberList-table {
    width: 100%;
    margin: auto;
}
</style>
