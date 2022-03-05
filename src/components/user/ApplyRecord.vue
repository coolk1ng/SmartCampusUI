<template>
  <div>
    <div class="search-div">
      <el-form :inline="true" class="demo-form-inline" :model="applyParam">
        <el-form-item label="姓名">
          <el-input v-model="applyParam.name" size="small" clearable maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="审批结果" style="margin-left: 20px">
          <el-select v-model="applyParam.applyState" size="small">
            <el-option label="待审批" value="1"></el-option>
            <el-option label="已审批" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间" style="margin-left: 20px">
          <el-date-picker v-model="applyParam.applyTime" value-format="yyyy-MM-dd" type="date"
                          size="small"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-tooltip content="查询" effect="dark">
            <el-button type="primary" size="small" @click="initApplyRecordList" style="margin-left: 20px"><i class="fa fa-search"></i></el-button>
          </el-tooltip>
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
              type="index">
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名">
          </el-table-column>
          <el-table-column
              prop="applyReason"
              label="申请原因">
          </el-table-column>
          <el-table-column
              prop="applyTime"
              label="申请时间">
          </el-table-column>
          <el-table-column
              prop="days"
              label="申请天数">
          </el-table-column>
          <el-table-column
              prop="days"
              label="是否审批">
            <template slot-scope="scope">
              <el-switch
                  disabled
                  v-model="scope.row.applyState"
                  active-value="0"
                  inactive-value="1"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
              prop="approvalResult"
              label="审批结果">
            <template slot-scope="scope">
              <el-switch
                  disabled
                  v-model="scope.row.applyState"
                  active-value="0"
                  inactive-value="1"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini" type="text" @click="getDetail(scope.row)">查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div style="float: right">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageParam.pageNum"
            :page-size="pageParam.pageSize"
            :total="pageParam.total"
            background
            layout="total,prev, pager, next">
        </el-pagination>
      </div>
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
                v-model="applyRecord.applyState"
                active-value="0"
                inactive-value="1"
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
            <el-form-item label="申请原因:">
              <el-input type="textarea" v-model="applyRecord.applyReason"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="审批原因:">
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
        managerId: '',
        approvalReason: ''
      },
      applyParam: {
        name: '',
        applyState: '',
        applyTime: ''
      },
      dialogVisible: false,
      pageParam: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    /**
     * 分页数量改变
     * @param val
     */
    handleSizeChange(val) {
      this.pageParam.pageSize = val;
      this.initApplyRecordList();
    },
    /**
     * 分页页数改变
     * @param val
     */
    handleCurrentChange(val) {
      this.pageParam.pageNum = val;
      this.initApplyRecordList();
    },
    initApplyRecordList() {
      const params = Object.assign(this.applyParam, this.pageParam);
      postRequest('/applyInfo/getApplyRecordList', params).then(res => {
        if (res) {
          this.applyRecordList = res.data.list;
          this.pageParam.total = res.data.total;
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