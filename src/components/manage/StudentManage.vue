<template>
<div>
  <div class="search-div">
    <el-form :inline="true"  class="demo-form-inline" :model="searchParam">
      <el-form-item label="姓名">
        <el-input v-model="searchParam.name" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="searchParam.sex" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="searchParam.class" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="initList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="showAddPage">添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" size="small" @click="deleteByUserIds">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table-div">
    <template>
      <el-table
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{ textAlign: 'center' }"
          :data="studentList"
          @selection-change="handleSelectChange"
          stripe
          style="width: 100%">
        <el-table-column
            type="index"
            width="30">
        </el-table-column>
        <el-table-column
            type="selection"
            width="30">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="135">
        </el-table-column>
        <el-table-column
            prop="className"
            label="班级"
            width="120">
        </el-table-column>
        <el-table-column
            prop="college"
            label="学院"
            width="150">
        </el-table-column>
        <el-table-column
            prop="telephone"
            label="电话号码"
            width="150">
        </el-table-column>
        <el-table-column
            prop="updateTime"
            label="更新时间"
            width="150">
        </el-table-column>
        <el-table-column label="操作"
        width="300">
          <template slot-scope="scope">
            <el-button
                size="mini" type="primary" @click="getDetail(scope.row)">详情
            </el-button>
            <el-button
                size="mini" type="success" @click="showEditPage(scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger" @click="deleteByUserId(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
  <!--    弹出框-->
  <el-dialog
      title="学生详情"
      :visible.sync="dialogVisible"
      width="50%">
    <el-form ref="form" :model="student" size="mini" :disabled="disabled">
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="姓名:">
            <el-input v-model="student.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="性别:">
            <el-input v-model="student.sex"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="班级:">
            <el-input v-model="student.className"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="学院:">
            <el-input v-model="student.college"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="任职情况:">
            <el-input v-model="student.cognition"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="学号:">
            <el-input v-model="student.studentId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="身份证号:">
            <el-input v-model="student.idCardNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="联系方式:">
            <el-input v-model="student.telephone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="户籍地:">
            <el-input v-model="student.domicile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="出生日期:">
            <el-date-picker type="date" placeholder="选择日期" v-model="student.birthTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="父亲联系方式:">
            <el-input v-model="student.fatherTel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="母亲联系方式:">
            <el-input v-model="student.motherTel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="政治面貌:">
            <el-input v-model="student.politicalStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="年龄:">
            <el-input v-model="student.age"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="8">
          <div v-if="hasButton">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editStudent">确 定</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import {postRequest} from "@/utils/request";

export default {
  name: "StudentManage",
  mounted() {
    this.initList();
  },
  data(){
    return{
      studentList:[],
      searchParam:{
        name: '',
        sex: '',
        className: ''
      },
      student:{
        userId: '',
        name: '',
        className: '', //班级
        studentId: '', //学号
        college: '', //学院
        sex: '', //性别
        telephone: '', //联系方式
        idCardNum: '', //身份证号
        domicile: '', //户籍地
        birthTime: '', //出生日期
        fatherTel: '', //父亲联系方式
        motherTel: '', //母亲联系方式
        politicalStatus: '', //政治面貌
        age: '', //年龄
        cognition: '', //任职情况
        pageNum: '',
        pageSize: ''
      },
      disabled: true,
      hasButton: false,
      dialogVisible: false,
      userIds: {
        userIds:''
      },
      multipleSelection: []
    }
  },
  methods:{
    initList(){
      postRequest('/userInfo/getStudentList',this.searchParam).then(res=>{
        if (res){
          this.studentList = res.data.list;
        }
      })
    },

    /**
     * 详情
     * @param student
     */
    getDetail(student){
      this.dialogVisible = true;
      postRequest('/userInfo/getDetail',student).then(res=>{
          this.dialogVisible = true;
          this.student = res.data;
      })
    },

    /**
     * 显示编辑框
     * @param student
     */
    showEditPage(student){
      //拷贝
      this.getDetail(student);
      this.disabled =false;
      this.hasButton = true;
      this.dialogVisible = true;
    },

    /**
     * 显示添加框
     */
    showAddPage(){
      this.hasButton = true;
      this.dialogVisible = true;
      this.disabled = false;
    },

    /**
     * 多选操作
     * @param value
     */
    handleSelectChange(value){
      this.multipleSelection = value;
    },

    /**
     * 编辑
     */
    editStudent(){
      postRequest('/userInfo/addAndEditStudent',this.student).then(res=>{
        this.dialogVisible = false;
        this.initList();
      })
    },

    /**
     * 删除
     * @param student
     */
    deleteByUserId(student){
      this.$confirm('你将删除这些信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //let userIds={'userIds': student.userId};
        this.userIds.userIds= student.userId;
        postRequest('/userInfo/deleteStudent',this.userIds).then(res=>{
          this.initList();
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    /**
     * 批量删除
     */
    deleteByUserIds(){
      this.$confirm('你将删除这些信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.multipleSelection.toString());
          this.multipleSelection.forEach(item=>{
            this.userIds.userIds +=item.userId+",";
          })
        postRequest('/userInfo/deleteStudent',this.userIds).then(res=>{
          this.initList();
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  }
}
</script>

<style scoped>
.search-div{
  margin-bottom: 20px;
  margin-top: 5px;
}
</style>