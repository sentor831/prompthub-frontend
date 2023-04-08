<template>
  <div class="MainBack">
        <div class="SecondBack" style="padding-top: 15vh;">
          <div class="Upload">
            <img src='../../public/img/upload.png' width="75vh" style="margin:9vh 0 0 39.3vh">
            <p class="text1">拖拽到此处也可上传</p>
            <button type="button" class="btn btn-primary" style="width:20vh; margin-left:34.5vh; margin-top:-1vh; background:#00A1D6" @click=Upload()>上传图片</button>
          </div>
          <br><br>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Upload',
  bodyClass: 'profile-page',
  components:{

  },
  data(){
      return{

        }
    },
  methods:{
    Upload(){
      alert("上传图片")
    }
  }
}
</script>

<style>
  .MainBack{
      background: #eaebed;
  }
  .SecondBack{
      background: #F2F4F8;
      width: 60%;
      margin: 0 auto;
  }
  .Upload{
    width:90vh;
    height:40vh;
    background: #FFFFFF;
    border: 2px dashed #BFBFBF;
    margin: 0 auto;
  }
  .text1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 1.5vh;
    line-height: 110%;
    text-align: center;
    color: #BFBFBF;
    margin-top:1vh;
  }
</style>