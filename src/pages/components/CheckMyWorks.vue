<template>
  <div class="SubCheckBox">
    <div class="row">
      <img :src=picture width="180vh" class="img-thumbnail">
      <div class="CheckText">
        <div class="prompts">
          <p class="CheckDescribe">{{ prompt }}</p>
        </div>
        <div style="margin-top:1vh">
          <p class="CheckDescribe">{{ dispTime(uploadTime) }}
            <span class="CheckDescribe" style="color:#BFBFBF" v-if="status === 2">
              <el-divider direction="vertical"></el-divider>
              <!-- <img src='../../../public/img/under-review.png' width="20"> -->
              <i class="el-icon-refresh" style="color:#00A1D6"></i>
              <span class="CheckDescribe" style="color:#00A1D6">审核中</span>
            </span>
            <span class="CheckDescribe" style="color:#BFBFBF" v-else-if="status === 1">
              <el-divider direction="vertical"></el-divider>
              <i class="el-icon-close" style="color:crimson"></i>
              <span class="CheckDescribe" style="color:crimson">未通过审核</span>
            </span>
            <span class="CheckDescribe" style="color:#BFBFBF" v-else-if="status === 0">
              <el-divider direction="vertical"></el-divider>
              <i class="el-icon-check" style="color:green"></i>
              <span class="CheckDescribe" style="color:green">已通过审核</span>
            </span>
          </p>
        </div>
      </div>
      <div class="col">
        <el-button type="default" icon="el-icon-edit" @click=editWork() style="margin-left:auto; margin-right:auto">
          编辑 </el-button>
        <el-button type="danger" icon="el-icon-delete" style="margin-top: 1vh;margin-left:auto; margin-right:auto"
          @click=deleteWork()>
          删除 </el-button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { formatTime } from "../../api/utils";
import { delete_prompt } from "../../api";
import { Notification } from "element-ui";
export default {
  name: 'MyWorks',
  bodyClass: 'profile-page',
  components: {
  },
  props: {
    prompt: String,
    picture: String,
    uploadTime: String,
    picid: Number,
    status: Number
  },
  data() {
    return {
      isUnderReview: true,
    }
  },
  mounted() {
    console.log(this.status)
  },
  methods: {
    dispTime(t, detailed) {
      return formatTime(t, detailed)
    },
    editWork() {
      this.$router.push({ path: '/edit', query: { picid: this.picid } });
    },
    deleteWork() {
      delete_prompt({
        id: this.picid
      })
        .then((res) => {
          console.log(res)
          Notification({ title: '删除成功', message: '', type: 'success', duration: 2000 })
        })
        .catch((err) => {
          console.log(err)
          Notification({ title: '删除失败', message: err.response.data.msg, type: 'error', duration: 2000 })
        })
        .finally(() => {
          this.$emit('flush')
        })
    }
  }
}
</script>
  
<style>
.SubCheckBox {
  display: flex;
  padding: 2vh 0 2vh 2vw
    /* justify-content: space-around; */
}

.CheckDescribe {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 2vh;
  /* line-height: 10vh; */
  color: #505050;
}

.CheckText {
  margin-left: 3vw;
  /* margin-top: 1vh; */
  width: 30vw;
  height: 18vh;
}

.prompts {
  border: thin solid gainsboro;
  border-radius: 4px;
  width: 25vw;
  height: 13vh;
  overflow-y: auto;
  padding: 1%;
}

.SubCheckText2 {
  width: 40vh;
  height: 4vh;
  margin-top: 1vh;

}

.SubCheckText3 {
  width: 40vh;
  height: 4vh;
  margin-top: 1vh;
}
</style>