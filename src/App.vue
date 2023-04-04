<template>
  <div id="app">
    <router-view name="header" />
    <div class="wrapper">
      <router-view />
    </div>
    <router-view name="footer" />
    <el-backtop :bottom="30"></el-backtop>
  </div>
</template>
<script>
export default {};
</script>
