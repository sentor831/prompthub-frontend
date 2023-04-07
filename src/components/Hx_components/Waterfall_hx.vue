<template>
    <Waterfall :list="list" style="margin-top:20px" width="320" :breakpoints="breakpoints" lazyload="false">
    <template #item="{ item, url }">
        <div @click="picInfo(item)" style="cursor: pointer;"
        class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group">
        <div class="overflow-hidden">
            <LazyImg :url="url" class="pic"></LazyImg>
        </div>
        </div>
    </template>
    </Waterfall>
</template>

<script>
import { LazyImg, Waterfall } from 'vue-waterfall-plugin'
import 'vue-waterfall-plugin/dist/style.css'
export default {
    name:"Waterfall_hx",
    components:{
        Waterfall,
        LazyImg
    },
    data(){
        return {
            imgsArr: [],         //存放所有已加载图片的数组（即当前页面会加载的所有图片）
            fetchImgsArr: [],     //存放每次滚动时下一批要加载的图片的数组
            list: [
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-14.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-12.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-10.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-11.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152318-8.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152319-9.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-7.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-6.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-14.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-12.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-10.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-11.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152318-8.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152319-9.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-7.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-6.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-14.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-12.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-10.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152320-11.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152318-8.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152319-9.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-7.jpg",
            },
            {
            src:
                "https://sucai.suoluomei.cn/sucai_zs/images/20201027152300-6.jpg",
            },
        ],
        breakpoints: { 3000: { rowPerView: 4 }, }
        }
    },
    methods: {
    picInfo(item) {
      // this.cookie.setCookie()
      this.$router.push('/picinfo')
    }
    }
}
</script>

<style>

</style>