<template>
  <div class="form-div">
    <el-form label-width="150px" :model="applyInfo" :rules="rules" ref="form">
      <el-form-item label="姓名" prop="name">
        <el-input size="mini" v-model="applyInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="班级" prop="className">
        <el-input v-model="applyInfo.className" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="学院" prop="college">
        <el-input v-model="applyInfo.college" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="telephone">
        <el-input v-model="applyInfo.telephone" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="交通工具" prop="trafficType">
        <el-select v-model="applyInfo.trafficType" size="mini" >
          <el-option label="飞机" value="1"></el-option>
          <el-option label="高铁" value="2"></el-option>
          <el-option label="轿车" value="3"></el-option>
          <el-option label="步行" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班次" prop="trafficNum">
        <el-input v-model="applyInfo.trafficNum" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址" prop="homeAddress">
        <el-input v-model="applyInfo.homeAddress" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="监护人联系方式" prop="guardianTel">
        <el-input v-model="applyInfo.guardianTel" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="申请原因" prop="applyReason">
        <el-input v-model="applyInfo.applyReason" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="申请天数" prop="days">
        <el-input v-model="applyInfo.days" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="选择时间" prop="returnTime">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="离校时间" v-model="applyInfo.leaveTime" style="width: 100%;"
                          size="mini"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="返校时间" v-model="applyInfo.returnTime" style="width: 100%;"
                          size="mini"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="success" @click="doApplication" style="margin-left: 100px">立即申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {postRequest} from "@/utils/request";

export default {
  name: "ApplyInfo",
  data() {
    return {
      applyInfo: {
        id: '',
        name: '', //姓名
        className: '', //班级
        college: '', //学院
        applyReason: '', //申请原因
        applyTime: '', //申请时间
        leaveTime: '', //离校时间
        returnTime: '', //返校时间
        days: '', //天数
        homeAddress: '', //家庭住址
        guardianTel: '', //监护人联系方式
        trafficType: '', //交通工具
        trafficNum: '', //交通工具班次
        telephone: '' //联系方式
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        className: [
          { required: true, message: '请输入班级', trigger: 'blur' }
        ],
        college: [
          { required: true, message: '请输入学院', trigger: 'blur' }
        ],
        applyReason: [
          { required: true, message: '请输入申请原因', trigger: 'blur' }
        ],
        applyTime: [
          { required: true, message: '请输入申请时间', trigger: 'blur' }
        ],
        days: [
          { required: true, message: '请输入天数', trigger: 'blur' }
        ],
        homeAddress: [
          { required: true, message: '请输入家庭住址', trigger: 'blur' }
        ],
        guardianTel: [
          { required: true, message: '请输入监护人电话', trigger: 'blur' }
        ],
        trafficType: [
          { required: true, message: '请输入交通方式', trigger: 'blur' }
        ],
        trafficNum: [
          { required: true, message: '请输入班次', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        returnTime: [
          { required: true, message: '请输入离校时间或返校时间', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    doApplication() {
      this.$refs.form.validate((valid)=>{
        if (valid){
          postRequest('/applyInfo/doApplication', this.applyInfo).then(res => {
            if (res) {
              this.$message.success('申请成功');
            }
          })
        }
      })

    }
  }
}
</script>

<style scoped>
.form-div {
  position: absolute;
  transform: translateX(-250px) translateY(-300px);
  width: 500px;
  height: 600px;
  left: 50%;
  top: 50%;
}
</style>