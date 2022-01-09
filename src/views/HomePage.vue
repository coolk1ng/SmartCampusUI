<template>
  <div>
    <el-container>
      <el-header class="homeHeader"><div class="title">疫情期间进出校园管理系统</div></el-header>
      <el-container>
        <el-aside width="200px" class="homeAside">
          <el-menu
              router
              unique-opened
              default-active="1"
              class="el-menu-vertical-demo"
              background-color="#3a566b"
              text-color="#fff"
              active-text-color="#ffd04b">
            <el-menu-item index="userManage">
              <i class="el-icon-location"></i>
              <span slot="title">系统用户</span>
            </el-menu-item>
            <el-menu-item index="studentManage">
              <i class="el-icon-menu"></i>
              <span slot="title">学生管理</span>
            </el-menu-item>
            <el-menu-item index="unapproved">
              <i class="el-icon-document"></i>
              <span slot="title">审批管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>
.homeHeader {
  background: #3a566b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.homeHeader .title {
  font-size: 25px;
  font-family: AppleSystemUIFont;
  color: white;
  margin-left: 20px;
}
.homeAside{
  height: 100vh;
  background-color: #3a566b;
}
</style>