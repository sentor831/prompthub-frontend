<template>
    <div>
        <div class="container" style="margin-top: 14vh;">
            <div class="row">
                <NoticeSideBar></NoticeSideBar>
                <div class="col">
                    <h5 style="text-align: left; margin-left: 2vh;">评 论 通 知</h5>
                    <ul class="list-group list-group-flush" style="overflow-y: auto; height: 75vh;">
                        <!-- TODO v-for -->
                        <li class="list-group-item">
                            <div class="row">
                                <h4 class="noticeTitle" style="margin-left: 2vh;" @click="jumptoPic()">xxx评论了您的作品（id：111）
                                </h4>
                                <i class="now-ui-icons ui-1_simple-remove" style="margin-left: auto; cursor: pointer;"
                                    @click="deleteNotice()"></i>
                            </div>
                            <p>hhh</p>
                            <p style="text-align: right; font-size: small;">2023-01-06 20:52:23</p>
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

export default {
    name: 'noticereply',
    bodyClass: 'notice-reply-page',
    components: {
        NoticeSideBar,
    },
    data: function () {
        return {
            noticeList: []
        }
    },
    mounted() {
        this.getNoticeList()
    },
    methods: {
        getNoticeList() {
            // TODO

        },
        jumptoPic() {
            // TODO
            this.$router.push({ path: '/picinfo' })
        },

        deleteNotice() {
            // TODO

            this.getNoticeList()
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