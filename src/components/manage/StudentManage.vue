<template>
<div>
  <div class="search-div">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item>
        <el-input v-model="student.name" size="small" clearable placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="student.sex" size="small" clearable placeholder="性别"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="student.class" size="small" clearable placeholder="班级"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small">添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" size="small">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table-div">
    <template>
      <el-table
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{ textAlign: 'center' }"
          :data="studentList"
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
                size="mini" type="primary">详情
            </el-button>
            <el-button
                size="mini" type="success">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</div>
</template>

<script>
export default {
  name: "StudentManage",
  data(){
    return{
      studentList:[
        {
          id: '',
          name: '张三',
          sex: '男',
          className: '计科1801',
          college: '电信学院',
          telephone: '18156418655',
          updateTime: '2022-01-20'
        },
        {
          id: '',
          name: '张三',
          sex: '男',
          className: '计科1801',
          college: '电信学院',
          telephone: '18156418655',
          updateTime: '2022-01-20'
        }
      ],
      student:{
        name: '',
        className: '',
        college: '',
        sex: ''
      }
    }
  }
}
</script>

<style scoped>
.search-div{
  margin-bottom: 20px;
  margin-top: 5px;
}
</style>