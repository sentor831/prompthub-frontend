<template>
    <div>
        <div class="container" style="margin-top: 14vh;">
            <div class="row">
                <NoticeSideBar></NoticeSideBar>
                <div class="col">
                    <h5 style="text-align: left; margin-left: 2vh;">评 论 通 知</h5>
                    <ul class="list-group list-group-flush" style="overflow-y: auto; height: 75vh;">
                        <li class="list-group-item">
                            <h4>xxx评论了您的作品（id：111）</h4>
                            <p>hhh</p>
                            <p style="text-align: right; font-size: small;">2023-01-06 20:52:23</p>
                        </li>
                        <li class="list-group-item">
                            <h4>y回复了您</h4>
                            <p>hhh</p>
                            <p style="text-align: right; font-size: small;">2023-01-06 20:52:23</p>
                        </li>
                        <li class="list-group-item">
                            <h4>yyy回复了您</h4>
                            <p>hhh</p>
                            <p style="text-align: right; font-size: small;">2023-01-06 20:52:23</p>
                        </li>
                        <li class="list-group-item">
                            <h4>xxx评论了您的作品（id：134）</h4>
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

        }
    },

}

</script>

<style></style>