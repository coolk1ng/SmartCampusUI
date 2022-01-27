<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">疫情期间进出校园管理系统</div>
        <div>
          <el-link class="userInfo" type="info">用户: {{userInfo.username}}</el-link>
          <el-link class="userInfo" type="info" v-if="userInfo.studentId!=null">学号: {{userInfo.studentId}}</el-link>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="homeAside">
          <el-menu router style="background-color: #3a566b">
            <el-menu-item :index="item.path" v-for="(item,index) in menus" :key="index">
              <i :class="item.icon"></i>
              <span slot="title" class="menuTitle">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main-div">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {postRequest} from "@/utils/request";

export default {
  name: "Home",
  created() {
    this.getMenu();
    this.getUserInfo();
  },
  data() {
    return {
      menus: [],
      userInfo:{}
    }
  },
  methods: {
    /**
     * 获取菜单
     */
    getMenu() {
      postRequest('/menu/getMenusByUserId').then(result => {
        this.menus = result.data;
      })
    },

    /**
     * 获取用户信息
     */
    getUserInfo(){
      this.userInfo = JSON.parse(window.sessionStorage.getItem('user')).data;
      console.log(this.userInfo);
    }
  }
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
  color: white;
  margin-left: 20px;
}
.homeAside {
  height: 100vh;
  background-color: #3a566b;
}
.userInfo{
  margin-right: 20px;
  font-size: 1px;
  color: #1a1818;
}
.menuTitle{
  font-weight: bold;
  color: #4becec;
}
</style>