<template>
  <div>
    <el-container>
      <el-header class="homeHeader"><div class="title">疫情期间进出校园管理系统</div></el-header>
      <el-container>
        <el-aside width="200px" class="homeAside">
          <el-menu router unique-opened>
            <el-menu-item :index="item.path" v-for="(item,index) in menus" :key="index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
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
import {postRequest} from "@/utils/request";

export default {
  name: "Home",
  created(){
    this.getMenu();
  },
  data(){
    return{
      menus:[]
    }
  },
  methods:{
    //获取菜单
    getMenu(){
      postRequest('/menu/getMenusByUserId').then(result=>{
        this.menus=result.data;
      })
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
  font-family: AppleSystemUIFont;
  color: white;
  margin-left: 20px;
}
.homeAside{
  height: 100vh;
  background-color: #3a566b;
}

</style>