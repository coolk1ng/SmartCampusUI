<template>
  <div>
    <div class="search-div">
      <el-form :inline="true" class="demo-form-inline" :model="recordForm">
        <el-form-item label="姓名">
          <el-input v-model="recordForm.name" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="审批结果" style="margin-left: 20px">
          <el-select v-model="recordForm.approvalResult" size="small">
            <el-option label="批准" value="1"></el-option>
            <el-option label="驳回" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchList">查询</el-button>
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
              type="index">
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名">
          </el-table-column>
          <el-table-column
              prop="approvalPerson"
              label="审批人">
          </el-table-column>
          <el-table-column
              prop="approvalResult"
              label="审批结果">
          </el-table-column>
          <el-table-column
              prop="approvalReason"
              label="审批原因">
          </el-table-column>
          <el-table-column
              prop="approvalTime"
              label="审批时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini" type="text" @click="getDetail(scope.row)">详情
              </el-button>
              <el-button
                  size="mini" type="text" @click="showEditPage(scope.row)">编辑
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
            layout="total, prev, pager, next">
        </el-pagination>
      </div>
    </div>
    <!--    弹出框-->
    <el-dialog
        title="审批管理"
        :visible.sync="dialogVisible"
        width="50%">
      <el-form ref="form" :model="record" size="mini" :disabled="disabled">
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="姓名:">
              <el-input v-model="record.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="审批人:">
              <el-input v-model="record.approvalPerson" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="审批结果:">
              <el-input v-model="record.approvalResult"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="审批时间:">
              <el-date-picker type="date" placeholder="选择日期" v-model="record.approvalTime"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="审批原因:">
              <el-input type="textarea" v-model="record.approvalReason"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="8">
            <div v-if="hasButton">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editRecord">确 定</el-button>
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
  name: "ApprovalRecord",
  mounted() {
    this.initList();
  },
  data() {
    return {
      recordList: [],
      recordForm: {
        name: '',
        approvalResult: '',
      },
      pageParam: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      record: {
        id: '',
        userId: '',
        applyNo: '',
        name: '',
        approvalPerson: '',
        approvalResult: '',
        approvalTime: '',
        approvalReason: '',
      },
      updateRecord: {},
      dialogVisible: false,
      disabled: true,
      hasButton: false
    }
  },
  methods: {
    /**
     * 分页数量改变
     * @param val
     */
    handleSizeChange(val) {
      this.pageParam.pageSize = val;
      this.initList();
    },
    /**
     * 分页页数改变
     * @param val
     */
    handleCurrentChange(val) {
      this.pageParam.pageNum = val;
      this.initList();
    },
    /**
     * 初始化列表
     */
    initList() {
      const params = Object.assign(this.recordForm, this.pageParam)
      postRequest('/approvalRecord/getApprovalRecordList', params).then(res => {
        if (res) {
          this.recordList = res.data.list;
          this.pageParam.total = res.data.total;
        }
      })
    },
    /**
     * 查询
     */
    searchList() {
      this.initList();
    },
    /**
     * 详情
     */
    getDetail(record) {
      postRequest('/approvalRecord/getApprovalRecordDetail', record).then(res => {
        this.hasButton = false;
        this.disabled = true;
        this.dialogVisible = true;
        this.record = res.data;
      })
    },
    /**
     * 显示dialog
     */
    showEditPage(record) {
      this.disabled = false;
      this.hasButton = true;
      //拷贝
      Object.assign(this.record, record);
      this.dialogVisible = true;
    },
    /**
     * 编辑
     */
    editRecord() {
      postRequest('/approvalRecord/editApprovalRecord', this.record).then(res => {
        if (res) {
          this.dialogVisible = false;
          this.initList();
          Message.success({message: "编辑成功"});
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