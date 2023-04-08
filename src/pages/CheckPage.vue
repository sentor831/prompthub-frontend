<template>
    <div class="SecondBack">
        <div class="CheckBox">
            <br>
            <CheckMyWorks></CheckMyWorks>
            <hr>
            <CheckMyWorks></CheckMyWorks>
            <hr>
        </div>
    </div>
</template>
  
<script>
import CheckMyWorks from './components/CheckMyWorks.vue'

export default {
    name: 'CheckPage',
    bodyClass: 'profile-page',
    components:{
      CheckMyWorks,
    },
    data(){
        return{

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
    .SecondBack{
        background: #F2F4F8;
        padding-top:15vh;
        padding-bottom: 5vh;
    }
    .CheckBox{
        background: #FFFFFF;
        width:100vh;
        height:70vh;
        margin:0 auto;
    }
</style>