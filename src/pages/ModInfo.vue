<template>
    <div>
      
      <div class="page-header clear-filter" filter-color="orange">
        <!-- 背景 -->
        <parallax
          class="page-header-image"
          style="background-image:url('img/bg5.jpg')"
        >
        </parallax>
        <!-- 头像 -->
        <div class="container">
          <div class="photo-container">
            <img src="img/ryan.jpg" alt="" />
          </div>
          <!-- 姓名 -->
          <h3 class="title">Ryan Scheinder</h3>
          <!-- 职业介绍 -->
          <p class="category">Photographer</p>
          <!-- 下面的三列内容 -->
          <div class="content">
            <div class="social-description">
              <h2>26</h2>
              <p>Comments</p>
            </div>
            <div class="social-description">
              <h2>26</h2>
              <p>Comments</p>
            </div>
            <div class="social-description">
              <h2>48</h2>
              <p>Bookmarks</p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section">
        <div class="container ">
            <el-row type="flex" justify="center" align="middle">
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="昵称">
            <el-input v-model="form.name" style="width:400px"></el-input>
        </el-form-item>

        <el-form-item label="用户名">
            <el-col :span="11">1231231231232</el-col>
        </el-form-item>

        <el-form-item label="邮箱">
            <el-input v-model="form.name" style="width:400px"></el-input>
        </el-form-item>
        
        <el-form-item label="性别">
            <el-radio v-model="radio" label="1">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
            <el-radio v-model="radio" label="3">保密</el-radio>
        </el-form-item>
       
        <el-form-item label="出生日期">
            <el-col :span="11">12312312@qq.com</el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
    </el-row>
    </div>

        </div>
      </div>

  </template>

<script>
  
  export default {
    name: 'ModInfo',
    bodyClass: 'profile-page',
    components: {
      // Tabs,
      // TabPane
    },
    data(){
        return{
        form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
        radio:"1"
        }
    }
  };

</script>
<style scoped>

</style>
  