<template xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
  <div>
    <div class="search-div">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="pending.name" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="申请时间" style="margin-left: 20px">
          <el-date-picker
              value-format="yyyy-MM-dd"
              size="small"
              v-model="pending.applyTime"
              type="date">
          </el-date-picker>
        </el-form-item>
<!--        <el-form-item label="返校日期" style="margin-left: 20px">
          <el-date-picker
              value-format="yyyy-MM-dd"
              size="small"
              v-model="pending.returnTime"
              type="date">
          </el-date-picker>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" size="small" @click="initList">查询</el-button>
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
              type="index">
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名">
          </el-table-column>
          <el-table-column
              prop="leaveTime"
              label="离校时间">
          </el-table-column>
          <el-table-column
              prop="returnTime"
              label="返校时间">
          </el-table-column>
          <el-table-column
              prop="days"
              label="天数">
          </el-table-column>
          <el-table-column
              prop="applyTime"
              label="申请时间">
          </el-table-column>
          <el-table-column
              prop="applyReason"
              label="申请原因">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini  " type="text" @click="showApprovalPage(scope.row)">审批
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
        title="审批"
        :visible.sync="dialogVisible"
        width="50%">
      <el-form ref="form" :model="updatePending" size="mini">
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="申请人:">
              <el-input size="mini" v-model="updatePending.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-switch
                v-model="updatePending.state"
                active-text="批准"
                inactive-text="驳回">
            </el-switch>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="审批原因:">
              <el-input type="textarea" v-model="updatePending.approvalReason"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="8">
            <div>
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="approvalApplication">确 定</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {postRequest} from "@/utils/request";
import {Message} from "element-ui";

export default {
  name: "Pending",
  mounted() {
    this.initList();
  },
  data() {
    return {
      pendingList: [],
      pending: {
        name: '',
        leaveTime: '',
        returnTime: '',
        applyTime: ''
      },
      pageParam: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      updatePending: {
        id: '',
        applyNo: '',
        userId: '',
        name: '',
        state: true,
        approvalResult: '',
        approvalReason: ''
      },
      dialogVisible: false
    }
  },
  methods: {
    /**
     * 初始化列表
     */
    initList() {
      const params = Object.assign(this.pending, this.pageParam)
      postRequest('/pending/getPendingList', params).then(res => {
        if (res) {
          this.pendingList = res.data.list;
          this.pageParam.total = res.data.total;
        }
      })
    },
    handleSizeChange(val) {
      this.pageParam.pageSize = val;
      this.initList();
    },
    handleCurrentChange(val) {
      this.pageParam.pageNum = val;
      this.initList();
    },
    /**
     * 展示审批框
     * @param pending
     */
    showApprovalPage(pending) {
      Object.assign(this.updatePending, pending);
      this.dialogVisible = true;
    },

    /**
     * 审批
     */
    approvalApplication() {
      if (this.updatePending.state) {
        this.updatePending.approvalResult = '1';
      } else {
        this.updatePending.approvalResult = '0';
      }
      postRequest('/pending/approveApplication', this.updatePending).then(res => {
        if (res) {
          this.initList();
          this.dialogVisible = false;
          Message.success({message: "审批成功"});
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