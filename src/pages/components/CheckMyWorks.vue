<template>
    <div class="SubCheckBox">
        <!-- <img src='../../../public/img/dog1.jpeg' width="180vh" class="img-thumbnail"> -->
        <el-upload
  action="#"
  list-type="picture-card"
  :auto-upload="false">
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
        <div class="CheckText">
            <div class="SubCheckText1">
                <p class="CheckDescribe">{{ Prompt }}</p>
            </div>
            <div class="SubCheckText2">
                <p class="CheckDescribe">模型：{{ Model }}</p>
            </div>
            <div class="SubCheckText3">
                <p class="CheckDescribe">上传日期：{{ UploadDate }}
                    <span class="CheckDescribe" style="color:#BFBFBF" v-if="isUnderReview">
                        <el-divider direction="vertical"></el-divider>
                        <img src='../../../public/img/under-review.png' width="22vh" style="margin-top:-0.3vh">
                        <span class="CheckDescribe" style="color:#00A1D6"> 审核中</span>
                    </span>
                    
                </p>
            </div>
        </div>
        <!-- <button type="button" class="btn btn-default" 
        style="width:13vh; height:5vh; margin-left:-10vh; margin-top:7vh; background: #F2F4F8; color:#505050" 
        @click=Edit()>
        <img src='../../../public/img/edit.png' width="22vh" style="margin-left:-3vh">
            编 辑
        </button> -->
        <el-button type="info" icon="el-icon-edit" 
        style="height:5vh; margin:7vh 0 0 -12vh; background-color: #F2F4F8; color:#505050"
        @click=Edit()> 编辑 </el-button>
    </div>
</template>
  
<script>
export default {
      name: 'MyWorks',
      bodyClass: 'profile-page',
      components:{
      },
      data(){
          return{
            Prompt:'Prompt; Prompt; Prompt; Prompt; Prompt; Prompt; Prompt; Prompt; ',
            Model:'Stable Diffusion',
            UploadDate:'2023-04-08',
            isUnderReview:true,
          }
      },
      methods:{
        Edit(){
            this.$router.push('/edit'); 
        }
      }
  }
</script>
  
<style>
    .SubCheckBox{
        display: flex;
        padding: 2vh 0 2vh 5vh
        /* justify-content: space-around; */
    }
    .CheckDescribe{
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 2vh;
        /* line-height: 10vh; */
        color: #505050;
    }
    .CheckText{
        margin-left: 3vh;
        margin-top: 1vh;
        width: 60vh;
        height: 18vh;
    }
    .SubCheckText1{
        border: 1.5px solid #BFBFBF;
        border-radius: 4px;
        width:40vh;
        height: 9vh;
        overflow-y:auto;
    }
    .SubCheckText2{
        width: 40vh;
        height: 4vh;
        margin-top: 1vh;
    }
    .SubCheckText3{
        width: 40vh;
        height: 4vh;
        margin-top: 1vh;
    }
    
</style>