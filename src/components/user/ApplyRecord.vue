<template>
<div>
  <div class="search-div">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item>
        <el-input v-model="applyRecord.name" size="small" clearable placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="是否审批">
        <el-input v-model="applyRecord.applyState" size="small"></el-input>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-date-picker v-model="applyRecord.applyTime" type="date" size="small"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="initApplyRecordList">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table-div">
    <template>
      <el-table
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{ textAlign: 'center' }"
          :data="applyRecordList"
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
            prop="applyReason"
            label="申请原因"
            width="220">
        </el-table-column>
        <el-table-column
            prop="applyTime"
            label="申请时间"
            width="220">
        </el-table-column>
        <el-table-column
            prop="days"
            label="申请天数"
            width="220">
        </el-table-column>
        <el-table-column
            prop="days"
            label="是否审批"
            width="220">
            <template slot-scope="scope">
              <el-switch
                  v-model="scope.row.applyState"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="260">
          <template slot-scope="scope">
            <el-button
                size="mini" type="success" @click="getDetail(scope.row)">查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
  <!--    弹出框-->
  <el-dialog
      title="申请"
      :visible.sync="dialogVisible"
      width="50%">
    <el-form ref="form" :model="applyRecord" size="mini">
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="申请人:">
            <el-input size="mini" v-model="applyRecord.name" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-switch
              v-model="applyRecord.state"
              active-text="已审批"
              inactive-text="未审批">
          </el-switch>
        </el-col>
        <el-col :span="20" :offset="2">
          <el-form-item label="原因:">
            <el-input type="textarea" v-model="applyRecord.approvalReason"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import {postRequest} from "../../utils/request";

export default {
  name: "ApplyRecord",
  mounted() {
    this.initApplyRecordList();
  },
  data(){
    return{
      applyRecordList: [
      ],
      applyRecord: {
        id: '',
        name: '',
        applyReason: '',
        applyTime: '',
        applyState: ''
      },
      dialogVisible: false
    }
  },
  methods:{
    initApplyRecordList(){
      postRequest('/applyInfo/getApplyRecordList',this.applyRecord).then(res=>{
        if (res){
          this.applyRecordList = res.data.list;
        }
      })
    },
    getDetail(applyRecord){
      this.dialogVisible = true;
      postRequest('/applyInfo/getApplyRecordDetail',applyRecord).then(res=>{
        if(res){
          this.applyRecord = res.data;
        }
      })
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