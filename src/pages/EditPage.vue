<template>
    <div class="MainBack">
        <div class="SecondBack">

            <div class="GroupBox" style="padding-top: 15vh;">
                <p class="Characters">图 片</p>
                <div class="Picture">
                    <img src='../../public/img/dog1.jpeg' width="200vh" class="img-thumbnail">
                </div>
            </div>
            <br><br>

            <div class="GroupBox">
                <p class="Characters">Prompt</p>
                <textarea class="PromptInput" placeholder="请输入Prompt" v-model="Prompt"></textarea>
            </div>
            <br><br>

            <div class="GroupBox">
                <p class="Characters">模 型</p>
                <input type="text" class="ModelInput" placeholder="请输入模型名称" v-model="Model">
            </div>
            <br><br>
            
            <div class="GroupBox">
                <p class="Characters">标 签</p>
                <input type="text" class="ModelInput" placeholder="请输入图片标签" v-model="Label">
            </div>
            <br><br>

            <div class="GroupBox">
                <button type="button" class="btn btn-primary" style="width:13vh; margin-left:20vh; background:#00A1D6" @click=Subbmit()>立即上传</button>
                <button type="button" class="btn btn-primary" style="width:13vh; margin-left:5vh; background:#FFFFFF; color:#000000" @click="SaveDraft()">存草稿</button>
            </div>
            <br><br>

        </div>
    </div>
</template>

<script>
export default {
    name: 'EditPage',
    bodyClass: 'profile-page',
    components: {
    },
    data() {
        return {
            Picture:'',
            Prompt:'',
            Model:'',
            Label:'',
        }
    },
    methods:{
        Submmit(){
            alert(1)
        },
        SaveDraft(){
            alert(2)
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
    .Characters{
        /* position: absolute; */
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 2vh;
        line-height: 100%;
        color: #212121;
        margin: 2% 0 0 5%;
    }
    .GroupBox{
        display: flex;
        /* justify-content: space-around; */
    }
    .Picture{
        display: inline;
        box-sizing: border-box;
        /* width: 204vh; */
        /* height: 146px; */
        background: #FFFFFF;
        border: 2px dashed #BFBFBF;
        margin: 0 0 0 30%;
        /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
    }
    .PromptInput{
        border: 1.5px solid #BFBFBF;
        border-radius: 8px;
        width: 90vh;
        height: 20vh;
        margin: 0 0 0 8vh;
        resize: none;
    }
    .ModelInput{
        border: 1.5px solid #BFBFBF;
        border-radius: 8px;
        width: 90vh;
        height: 5vh;
        margin: 0 0 0 9.5vh;
        resize: none;
    }
    .button1{
        margin-left:20vh;
        width: 123px;
        height: 42px;
        background: #00A1D6;
        border-radius: 5px;
    }
    .button2{
        margin-left:5vh;
        width: 123px;
        height: 42px;
        background: #FFFFFF;
        border: 1px solid #BFBFBF;
        border-radius: 5px;
    }
</style >
