<template>
<div>
  <div class="search-div">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item>
        <el-input v-model="record.name" size="small" clearable placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="record.approvalResult" size="small" clearable placeholder="审批结果"></el-input>
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
          :data="recordList"
          stripe
          style="width: 100%">
        <el-table-column
            type="index"
            width="40">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="190">
        </el-table-column>
        <el-table-column
            prop="approvalPerson"
            label="审批人"
            width="190">
        </el-table-column>
        <el-table-column
            prop="approvalResult"
            label="审批结果"
            width="190">
        </el-table-column>
        <el-table-column
            prop="approvalReason"
            label="审批原因"
            width="190">
        </el-table-column>
        <el-table-column
            prop="approvalTime"
            label="审批时间"
            width="190">
        </el-table-column>
        <el-table-column label="操作"
                         width="190">
          <template slot-scope="scope">
            <el-button
                size="mini" type="primary">详情
            </el-button>
            <el-button
                size="mini" type="success">编辑
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
  name: "ApprovalRecord",
  data(){
    return{
      recordList: [
        {
          id: '',
          name: '张三',
          approvalPerson: '李四',
          approvalResult: '批准',
          approvalTime: '2022-01-21',
          approvalReason: '理由充分,可以批准'
        }
      ],
      record: {
        id: '',
        name: '',
        approvalPerson: '',
        approvalResult: '',
        approvalTime: '',
        approvalReason: ''
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