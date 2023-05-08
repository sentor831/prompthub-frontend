<template>
    <div>
        <el-main>
            <h2> 收藏 </h2>
        </el-main>
        <el-container style="height: 800px; border: 1px solid #eee">
            <!-- 原rgb为(238,241,246) -->
            <el-aside width="220px" style="background-color: rgb(255, 255, 255)">
                <div style="text-align: center;" v-if="isMe()">
                    <p style="width: 80%;" class="btn btn-primary" @click="createCollectionVisible = true">新建收藏</p>
                </div>

                <el-menu :default-openeds="['1', '2']">
                    <el-submenu index="1" v-if="isMe()">
                        <template slot="title"><i class="el-icon-folder"></i>私密收藏夹</template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item, index) in private_collection_list" :key="index"
                                @click="showCollection(item.id)">
                                {{ item.name }}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-folder"></i>公开收藏夹</template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item, index) in public_collection_list" :key="index"
                                @click="showCollection(item.id)">
                                {{ item.name }}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <!-- 创建收藏 -->

            <el-dialog title="新建收藏夹" :visible.sync="createCollectionVisible" width="33%" center>
                <div class="dialogdiv" style="height: auto; overflow-y: auto; overflow-x: hidden">
                    <el-form ref="form" :model="form" label-width="120px" label-position="left">
                        <el-form-item label="收藏夹名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="是否公开">
                            <el-switch v-model="form.visibility"></el-switch>
                        </el-form-item>
                    </el-form>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="createCollectionVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitCreateCollection()">确 定</el-button>
                </span>
            </el-dialog>

            <el-container v-if="collectionId !== -1">
                <el-header style="text-align: right; font-size: 15px; background-color: rgb(244, 245, 247)">
                    <el-dropdown v-if="isMe()">
                        <i class="el-icon-setting" style="margin-right: 1vw">设置</i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <div @click="toEdit()">编辑</div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click="deleteCollection()">删除</div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>

                <el-main>
                    <p v-if="noItems === 1">收藏夹空空如也</p>
                    <Waterfall :list="collectionRecordList" style="margin-top:20px" :width="320" :breakpoints="breakpoints">
                        <template #item="{ item }">
                            <div style="cursor: pointer;"
                                class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group">
                                <div class="overflow-hidden">
                                    <i v-if="isMe()" class="now-ui-icons ui-1_simple-remove"
                                        style="cursor: pointer; margin-top: 1vh;"
                                        @click="deleteCollectionItem(item.id)"></i>
                                    <div @click="picInfo(item.prompt.id)">
                                        <LazyImg :url="item.prompt.picture" class="pic" alt="picture">
                                        </LazyImg>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </Waterfall>
                </el-main>
                <div class="block" style="text-align: center">
                    <el-pagination layout="prev, pager, next" :total="totalNum" :current-page="currentPage"
                        :page-size="pageSize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>

            </el-container>
            <el-dialog title="编辑收藏夹" :visible.sync="dialogVisible" width="33%" center>
                <div class="dialogdiv" style="height: auto; overflow-y: auto; overflow-x: hidden">
                    <el-form ref="form" :model="newform" label-width="120px" label-position="left">
                        <el-form-item label="收藏夹名称">
                            <el-input v-model="newform.name"></el-input>
                        </el-form-item>
                        <el-form-item label="是否公开">
                            <el-switch v-model="newform.visibility"></el-switch>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitEditCollection()">确 定</el-button>
                </span>
            </el-dialog>
        </el-container>

    </div>
</template>

<script>
import { LazyImg, Waterfall } from "vue-waterfall-plugin";
import "vue-waterfall-plugin/dist/style.css";
import { get_collection_list, create_collection, get_collection_record_list, delete_collection, modify_collection, get_collection_info, remove_from_collection } from "../../api";
import { Notification } from "element-ui";
export default {
    name: "ProfileColleciton",
    data() {
        return {
            breakpoints: { 3000: { rowPerView: 4 }, },
            form: {
                name: "",
                visibility: true,
            },
            newform: {
                name: "",
                visibility: true,
            },
            imgsArr: [], //存放所有已加载图片的数组（即当前页面会加载的所有图片）
            fetchImgsArr: [], //存放每次滚动时下一批要加载的图片的数组
            dialogVisible: false,
            dialogVisible_type: false,
            collection_name: "",
            createCollectionVisible: false,
            private_collection_list: [],
            public_collection_list: [],
            collectionRecordList: [],
            userId: -1,
            totalNum: 50,
            currentPage: 1,
            pageSize: 12,
            collectionId: -1,
            noItems: 0,
            firstCollection: -1
        };
    },
    components: {
        Waterfall,
        LazyImg
    },
    mounted() {
        this.setUp()
    },
    watch: {
        // 监听路由发生改变
        $route() {
            this.setUp()
        }
    },
    methods: {
        setUp() {
            this.userId = this.$route.query.userId;
            if (this.userId === undefined) {
                this.userId = -1
            }
            this.getCollectionInfo();

        },
        isMe() {
            // console.log(this.userId);
            // console.log(this.cookie.getCookie("userId"));
            return this.userId == this.cookie.getCookie("userId");
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        picInfo(id) {
            this.$router.push({ path: '/picinfo', query: { picid: id } })
        },
        getCollectionInfo() {
            this.private_collection_list = [];
            this.public_collection_list = [];
            get_collection_list(this.userId)
                .then((res) => {
                    for (let i = 0; i < res.data.collection_list.length; i++) {
                        const item = res.data.collection_list[i];
                        if (item.visibility == 1) {
                            this.private_collection_list = this.private_collection_list.concat(item);
                        } else {
                            this.public_collection_list = this.public_collection_list.concat(item);
                        }
                    }
                    if (this.public_collection_list.length > 0) {
                        this.firstCollection = this.public_collection_list[0].id
                    } else if (isMe() && this.private_collection_list.length > 0) {
                        this.firstCollection = this.private_collection_list[0].id
                    } else {
                        this.firstCollection = -1
                    }
                    this.showCollection(this.firstCollection);
                })
                .catch((err) => {
                    Notification({
                        title: "失败",
                        message: err.response.data.msg,
                        type: "error",
                        duration: 2000,
                    });
                });
        },
        submitCreateCollection() {
            let name = this.form.name;
            console.log(this.form.visibility);
            let visibility = this.form.visibility === true ? 0 : 1;
            create_collection({
                name,
                visibility,
            })
                .then((res) => {
                    Notification({
                        title: "成功",
                        message: res.data.msg,
                        type: "success",
                        duration: 2000,
                    });
                    this.form.name = ""
                    this.visibility = true
                })
                .catch((err) => {
                    console.log(err);
                    Notification({
                        title: "失败",
                        message: err.response.data.msg,
                        type: "error",
                        duration: 2000,
                    });
                })
                .finally(() => {
                    this.createCollectionVisible = false;
                    this.getCollectionInfo();
                });
        },
        handleCloseAlert(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => { });
        },
        deleteCollection() {
            delete_collection({
                id: this.collectionId
            })
                .then((res) => {
                    Notification({ title: '成功', message: res.data.msg, type: 'success', duration: 2000 })
                })
                .catch((err) => {
                    console.log(err)
                    Notification({ title: '失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
                .finally(() => {
                    this.getCollectionInfo()
                    this.showCollection(-1)
                });
        },
        toEdit() {
            this.dialogVisible = true
            get_collection_info(this.collectionId)
                .then((res) => {
                    this.newform.name = res.data.collection_info.name
                    this.newform.visibility = res.data.collection_info.visibility === 0 ? true : false;
                })
                .catch((err) => {
                    console.log(err);
                    Notification({
                        title: "失败",
                        message: err.response.data.msg,
                        type: "error",
                        duration: 2000,
                    });
                })

        },
        submitEditCollection() {
            let visibility = this.newform.visibility === true ? 0 : 1;
            modify_collection({
                id: this.collectionId,
                name: this.newform.name,
                visibility: visibility
            })
                .then((res) => {
                    Notification({
                        title: "成功",
                        message: res.data.msg,
                        type: "success",
                        duration: 2000,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    Notification({
                        title: "失败",
                        message: err.response.data.msg,
                        type: "error",
                        duration: 2000,
                    });
                })
                .finally(() => {
                    this.dialogVisible = false;
                    this.getCollectionInfo();
                });
        },
        showCollection(id) {
            if (id === -1) {
                this.collectionRecordList = []
                this.totalNum = 0
            } else {
                this.collectionId = id
                get_collection_record_list(id, this.pageSize, this.currentPage).then((res) => {
                    this.collectionRecordList = res.data.collection_record_list;
                    this.totalNum = res.data.collection_record_list.length;
                    if (this.totalNum === 0) {
                        this.noItems = 1
                    } else {
                        this.noItems = 0
                    }
                }).catch((err) => {
                    console.log(err);
                    Notification({
                        title: "失败",
                        message: err.response.data.msg,
                        type: "error",
                        duration: 2000,
                    });
                })
            }
        },
        deleteCollectionItem(id) {
            // TODO 删除不成功
            remove_from_collection({
                id: id
            })
                .then((res) => {
                    Notification({ title: '删除成功', message: '', type: 'success', duration: 2000 })
                })
                .catch((err) => {
                    console.log(err)
                    Notification({ title: '删除失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
                .finally(() => {
                    this.showCollection(this.collectionId)
                });
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            showCollection(this.collectionId)
        }
    },
};
</script>

<style scoped>
.el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>
