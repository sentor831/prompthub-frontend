<template>
    <div class="SubCheckBox">
        <img src='../../../public/img/dog1.jpeg' width="180vh" class="img-thumbnail">
        <div class="CheckText">
            <div class="SubCheckText1">
                <p class="CheckDescribe">{{ Prompt }}</p>
            </div>
            <div class="SubCheckText2">
                <p class="CheckDescribe">模型：{{ Model }}</p>
            </div>
            <div class="SubCheckText3">
                <p class="CheckDescribe">上传日期：{{ UploadDate }}
                    <span class="CheckDescribe" style="color:#BFBFBF" v-if="isUnderReview">丨
                        <img src='../../../public/img/under-review.png' width="22vh" style="margin-top:-0.3vh">
                        <span class="CheckDescribe" style="color:#00A1D6"> 审核中</span>
                    </span>
                    
                </p>
            </div>
        </div>
        <button type="button" class="btn btn-default" 
        style="width:13vh; height:5vh; margin-left:-10vh; margin-top:7vh; background: #F2F4F8; color:#505050" 
        @click=Edit()>
        <img src='../../../public/img/edit.png' width="22vh" style="margin-left:-3vh">
            编 辑
        </button>
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
          alert("编辑作品")
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