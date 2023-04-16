<template>
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in 6" :key="item">
        <img :src="item_src" alt="00">
      </el-carousel-item>
    </el-carousel>
  </template>

<script>
export default {
    name:"ProfileCarousel",
    data(){
        return {
            item_src : "https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg"
        }
    },

}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 400px;
    margin: 0;
    text-align: center;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
