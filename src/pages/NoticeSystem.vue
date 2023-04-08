<template>
    <div>
        <div class="container" style="margin-top: 14vh;">
            <div class="row">
                <NoticeSideBar></NoticeSideBar>
                <div class="col">
                    <h5 style="text-align: left; margin-left: 2vh;">系 统 通 知</h5>
                    <ul class="list-group list-group-flush" style="overflow-y: auto; height: 75vh;">
                        <li class="list-group-item" style="cursor: pointer;">
                            <h4>审核通过</h4>
                            <p>您的作品（id：xxx）通过审核。</p>
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
export default {
    name: 'notice-system',
    bodyClass: 'notice-system-page',
    components: {
        NoticeSideBar
    },
    data: function () {
        return {

        }
    },
}

</script>

<style></style>