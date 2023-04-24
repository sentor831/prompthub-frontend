<template>
    <div>
        <div class="container" style="margin-top: 14vh;">
            <div class="row">
                <NoticeSideBar></NoticeSideBar>
                <div class="col">
                    <h5 style="text-align: left; margin-left: 2vh;">评 论 通 知</h5>
                    <ul class="list-group list-group-flush" style="overflow-y: auto; height: 75vh;">

                        <li class="list-group-item" v-for="(item, index) in noticeList" :key="index">
                            <div class="row">
                                <h4 class="noticeTitle" style="margin-left: 2vh;" @click="jumptoPic(item.prompt_id)"> {{
                                    item.title }}
                                </h4>
                                <i class="now-ui-icons ui-1_simple-remove" style="margin-left: auto; cursor: pointer;"
                                    @click="deleteNotice(item.notification_id)"></i>
                            </div>
                            <p>{{ item.content }}</p>
                            <p style="text-align: right; font-size: small;"> {{ dispTime(item.created_at, true) }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NoticeSideBar from '../components/NoticeSideBar.vue';
import Card from '../components/Cards/Card.vue';
import { get_notification_list, delete_notification, get_unread_notification_num } from '../api';
import { formatTime } from '../api/utils';
import { Notification } from 'element-ui';
export default {
    name: 'noticereply',
    bodyClass: 'notice-reply-page',
    components: {
        NoticeSideBar,
    },
    data: function () {
        return {
            noticeList: [],
            page: 1,
            per_page: 30,
        }
    },
    mounted() {
        this.getNoticeList()
    },
    methods: {
        dispTime(t, detailed) {
            return formatTime(t, detailed)
        },
        getNoticeList() {
            get_notification_list(1, this.per_page, this.page)
                .then((res) => {
                    this.noticeList = res.data.notification_list
                }).catch((err) => {
                    console.log(err)
                    Notification({ title: '获取通知列表失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
        },
        jumptoPic(id) {
            this.$router.push({ path: '/picinfo', query: { picid: id } })
        },

        deleteNotice(id) {
            delete_notification({
                id: id,
            })
                .then((res) => {
                    Notification({ title: '删除成功', message: '', type: 'success', duration: 2000 })
                })
                .catch((err) => {
                    console.log(err)
                    Notification({ title: '删除失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
                .finally(() => {
                    this.getNoticeList()
                });
        }
    }
}

</script>

<style>
.noticeTitle {
    cursor: pointer;
    ;
}

.noticeTitle:hover {
    color: darkblue
}
</style>