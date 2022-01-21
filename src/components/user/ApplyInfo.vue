<template>
<div class="form-div">
  <el-form :label-position="left" label-width="150px" :model="applyInfo">
      <el-form-item label="姓名">
        <el-input size="mini" v-model="applyInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="applyInfo.class" size="mini"></el-input>
      </el-form-item>
    <el-form-item label="学院">
      <el-input v-model="applyInfo.college" size="mini"></el-input>
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model="applyInfo.telephone" size="mini"></el-input>
    </el-form-item>
    <el-form-item label="交通工具">
      <el-select v-model="applyInfo.trafficType" size="mini">
        <el-option label="飞机" value="1"></el-option>
        <el-option label="高铁" value="2"></el-option>
        <el-option label="轿车" value="3"></el-option>
        <el-option label="步行" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="班次">
      <el-input v-model="applyInfo.trafficNum" size="mini" ></el-input>
    </el-form-item>
    <el-form-item label="家庭住址">
      <el-input v-model="applyInfo.homeAddress" size="mini" ></el-input>
    </el-form-item>
    <el-form-item label="监护人联系方式">
      <el-input v-model="applyInfo.guardianTel" size="mini" ></el-input>
    </el-form-item>
    <el-form-item label="申请原因">
      <el-input v-model="applyInfo.applyReason" size="mini"></el-input>
    </el-form-item>
    <el-form-item label="申请天数">
      <el-input v-model="applyInfo.days" size="mini" ></el-input>
    </el-form-item>
    <el-form-item label="选择时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="离校时间" v-model="applyInfo.leaveTime" style="width: 100%;" size="mini"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker placeholder="返校时间" v-model="applyInfo.returnTime" style="width: 100%;" size="mini"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button size="mini" type="success">立即申请</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "ApplyInfo",
  data(){
    return{
      applyInfo: {
        id: '',
        name: '', //姓名
        class: '', //班级
        college: '', //学院
        applyReason: '', //申请原因
        leaveTime: '', //离校时间
        returnTime: '', //返校时间
        days: '', //天数
        homeAddress: '', //家庭住址
        guardianTel: '', //监护人联系方式
        trafficType: '', //交通工具
        trafficNum: '', //交通工具班次
        telephone: '' //联系方式
      }
    }
  }
}
</script>

<style scoped>
.form-div{
  width: 500px;
  margin-left: 300px;
}
</style>