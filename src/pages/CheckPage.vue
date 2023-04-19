<template>
    <div class="SecondBack" style="width: 60vw; margin-left: auto; margin-right: auto;">
        <el-tabs>
            <el-tab-pane>
                <div slot="label" @click="getWorkList(-1)">全部作品</div>
                <div class="CheckBox">
                    <div class="col-7">
                        <CheckMyWorks v-for="(work, index) in work_list" :key="index" :picture="work.prompt.picture"
                            :prompt="work.prompt.prompt" :upload-time="work.created_at" :picid="work.prompt.id"
                            :status="work.status">
                        </CheckMyWorks>
                        <div class="block" style="text-align: center;">
                            <el-pagination background layout="prev, pager, next" :total="totalNum"
                                :current-page="currentPage" :page-size="pageSize"
                                @current-change="handleCurrentChange"></el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <div slot="label" @click="getWorkList(0)">已通过审核</div>
                <div class="CheckBox">
                    <div class="col-7">
                        <CheckMyWorks v-for="(work, index) in work_list" :key="index" :picture="work.prompt.picture"
                            :prompt="work.prompt.prompt" :upload-time="work.created_at" :picid="work.prompt.id"
                            :status="work.status">
                        </CheckMyWorks>
                        <div class="block" style="text-align: center;">
                            <el-pagination background layout="prev, pager, next" :total="totalNum"
                                :current-page="currentPage" :page-size="pageSize"
                                @current-change="handleCurrentChange"></el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <div slot="label" @click="getWorkList(1)">未通过审核</div>
                <div class="CheckBox">
                    <div class="col-7">
                        <CheckMyWorks v-for="(work, index) in work_list" :key="index" :picture="work.prompt.picture"
                            :prompt="work.prompt.prompt" :upload-time="work.created_at" :picid="work.prompt.id"
                            :status="work.status">
                        </CheckMyWorks>
                        <div class="block" style="text-align: center;">
                            <el-pagination background layout="prev, pager, next" :total="totalNum"
                                :current-page="currentPage" :page-size="pageSize"
                                @current-change="handleCurrentChange"></el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <div slot="label" @click="getWorkList(2)">审核中</div>
                <div class="CheckBox">
                    <div class="col-7">
                        <CheckMyWorks v-for="(work, index) in work_list" :key="index" :picture="work.prompt.picture"
                            :prompt="work.prompt.prompt" :upload-time="work.created_at" :picid="work.prompt.id"
                            :status="work.status">
                        </CheckMyWorks>
                        <div class="block" style="text-align: center;">
                            <el-pagination background layout="prev, pager, next" :total="totalNum"
                                :current-page="currentPage" :page-size="pageSize"
                                @current-change="handleCurrentChange"></el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>
  
<script>
import CheckMyWorks from './components/CheckMyWorks.vue'
import { getAuditRecordList } from '../api'
import { Notification } from 'element-ui'

export default {
    name: 'CheckPage',
    bodyClass: 'profile-page',
    components: {
        CheckMyWorks,
    },
    data() {
        return {
            totalNum: 100,
            pageSize: 10,
            currentPage: 1,
            work_list: [],
            status: -1
        }
    },
    mounted() {
        this.getWorkList(-1)
    },
    provide() {
        return {
            pageFlush: this.getWorkList(this.status)
        }
    },
    methods: {
        getWorkList(status) {
            if (status !== this.status) {
                this.currentPage = 1
            }
            this.status = status
            getAuditRecordList(this.pageSize, this.currentPage, status)
                .then((res) => {
                    console.log(res)
                    this.work_list = res.data.audit_record_list
                })
                .catch((err) => {
                    Notification({ title: '获取作品列表失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            this.getWorkList(this.status)
        },
    }
}
</script>
  
<style>
.el-tabs__content {
    height: 75vh;
    overflow-y: auto;
}

.SecondBack {
    /* background: #F2F4F8; */
    background-color: #FFFFFF;
    padding-top: 13vh;
}

.CheckBox {
    background: #FFFFFF;
    width: 100vw;
    height: 70vh;
    margin: 0 auto;
}
</style>