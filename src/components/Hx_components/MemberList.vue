<template>
  <div>
  <div class="MemberList-table">
    <el-table
    :data="tableData"
    style="width: 100%"
    :header-cell-style="{ textAlign: 'center' }"
    :cell-style="{ textAlign: 'center' }"
    >
    <el-table-column
      label="头像"
      style="width: 20%">
      <template slot-scope="scope">
        <img :src="scope.row.picture" width="100" height="100" style="margin-left:0; padding: 1vh" />
        <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
      </template>
    </el-table-column>
    <el-table-column
      label="用户名"
      style="width: 20%">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" style="width: 20%">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">取消关注</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</div>

</template>

<script>


export default {
  name: 'Memberlist',
  components: {
    
  },
  data() {
      return {
        tableData: [{
          picture: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          picture: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          picture: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          picture: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
  methods:{
    toMenberList(){
      this.$router.push('/memberlist')
    },
    handleEdit(index, row) {
        console.log(index, row);
      },
    handleDelete(index, row) {
        console.log(index, row);
    }
  }
};
</script>

<style scoped>
.MemberList-table {
  width : 100%;
  margin : auto;
}
</style>
