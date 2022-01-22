<template>
<div>
  <div class="search-div">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item>
        <el-input v-model="pending.name" size="small" clearable placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
            size="mini"
            v-model="pending.leaveTime"
            type="date"
            placeholder="离校日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
            size="mini"
            v-model="pending.returnTime"
            type="date"
            placeholder="返校日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table-div">
    <template>
      <el-table
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{ textAlign: 'center' }"
          :data="pendingList"
          stripe
          style="width: 100%">
        <el-table-column
            type="index"
            width="40">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="220">
        </el-table-column>
        <el-table-column
            prop="leaveTime"
            label="离校时间"
            width="220">
        </el-table-column>
        <el-table-column
            prop="returnTime"
            label="返校时间"
            width="220">
        </el-table-column>
        <el-table-column
            prop="days"
            label="天数"
            width="220">
        </el-table-column>
        <el-table-column label="操作"
                         width="260">
          <template slot-scope="scope">
            <el-button
                size="mini" type="success">批准
            </el-button>
            <el-button
                size="mini" type="danger">驳回
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
  name: "Pending",
  data(){
    return{
      pendingList: [
        {
          id: '',
          name: '张三',
          leaveTime: '2022-01-20',
          returnTime: '2022-01-21',
          days: '2'
        },
        {
          id: '',
          name: '张三',
          leaveTime: '2022-01-20',
          returnTime: '2022-01-21',
          days: '2'
        }
      ],
      pending: {
        name: '',
        leaveTime: '',
        returnTime: ''
      }
    }
  }
}
</script>

<style scoped>
.search-div{
  margin-top: 5px;
  margin-bottom: 20px;
}
</style>