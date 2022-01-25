<template>
  <div>
    <div class="search-div">
      <el-form :inline="true" class="demo-form-inline" :model="applyParam">
        <el-form-item label="姓名">
          <el-input v-model="applyParam.name" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="审批结果">
          <el-select v-model="applyParam.applyState" size="small">
            <el-option label="待审批" value="1"></el-option>
            <el-option label="已审批" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker v-model="applyParam.applyTime" value-format="yyyy-MM-dd" type="date" size="small"></el-date-picker>
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
              width="180">
          </el-table-column>
          <el-table-column
              prop="applyReason"
              label="申请原因"
              width="180">
          </el-table-column>
          <el-table-column
              prop="applyTime"
              label="申请时间"
              width="180">
          </el-table-column>
          <el-table-column
              prop="days"
              label="申请天数"
              width="180">
          </el-table-column>
          <el-table-column
              prop="days"
              label="是否审批"
              width="180">
            <template slot-scope="scope">
              <el-switch
                  v-model="scope.row.applyState"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           width="245 ">
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
        title="申请信息"
        :visible.sync="dialogVisible"
        width="50%">
      <el-form ref="form" :model="applyRecord" size="mini" disabled>
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
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="离校时间:">
              <el-input size="mini" v-model="applyRecord.leaveTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="返校时间:">
              <el-input size="mini" v-model="applyRecord.returnTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="离校天数:">
              <el-input size="mini" v-model="applyRecord.days"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="家庭住址:">
              <el-input size="mini" v-model="applyRecord.homeAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="监护人联系方式:">
              <el-input size="mini" v-model="applyRecord.guardianTel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="交通工具:">
              <el-input size="mini" v-model="applyRecord.trafficType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="申请时间:">
              <el-input size="mini" v-model="applyRecord.applyTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="交通工具班次:">
              <el-input size="mini" v-model="applyRecord.trafficNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
  data() {
    return {
      applyRecordList: [],
      applyRecord: {
        id: '',
        name: '',
        applyReason: '',
        applyTime: '',
        applyState: '',
        leaveTime: '',
        returnTime: '',
        days: '',
        homeAddress: '', //家庭住址
        guardianTel: '', //监护人联系方式
        trafficType: '',
        trafficNum: '',
        managerId: ''
      },
      applyParam: {
        name: '',
        applyState: '',
        applyTime: ''
      },
      dialogVisible: false
    }
  },
  methods: {
    initApplyRecordList() {
      postRequest('/applyInfo/getApplyRecordList', this.applyParam).then(res => {
        if (res) {
          this.applyRecordList = res.data.list;
        }
      })
    },
    getDetail(applyRecord) {
      this.dialogVisible = true;
      postRequest('/applyInfo/getApplyRecordDetail', applyRecord).then(res => {
        if (res) {
          this.applyRecord = res.data;
        }
      })
    }
  }
}
</script>

<style scoped>
.search-div {
  margin-top: 5px;
  margin-bottom: 20px;
}
</style>