<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">疫情期间进出校园管理系统</div>
        <div>
          <el-button disabled class="userInfo" type="text"><i class="fa fa-user"></i> : {{ userInfo.username }}
          </el-button>
          <el-button class="logout" type="text" @click="logout"><i class="fa fa-power-off" style="color:firebrick"></i>
          </el-button>
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
      userInfo: {}
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
    getUserInfo() {
      this.userInfo = JSON.parse(window.sessionStorage.getItem('user')).data;
      console.log(this.userInfo);
    },

    /**
     * 注销
     */
    logout() {
      this.$confirm('你将注销该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postRequest('/logout').then(res => {
          sessionStorage.clear();
          this.$router.push('/');
          if (res){
            this.$notify({
              title: '成功',
              message: '注销成功',
              type: 'success'
            });
          }
        }).catch(() => {
          this.$notify.info({
            title: '消息',
            message: '已取消'
          });
        })
      });
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

.userInfo {
  margin-right: 5px;
  color: #1a1818;
}

.menuTitle {
  font-weight: bold;
  color: #4becec;
}
</style>