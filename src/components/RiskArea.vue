<template>
  <div>
    <div class="search-div">
      <el-form :inline="true" class="demo-form-inline" :model="riskAreaParam">
        <el-form-item label="地区">
          <el-input size="small" clearable v-model="riskAreaParam.area"></el-input>
        </el-form-item>
        <el-form-item label="风险等级" style="margin-left: 20px">
          <el-select size="small" v-model="riskAreaParam.riskLevel" clearable placeholder="">
            <el-option label="低风险" value="1"></el-option>
            <el-option label="中风险" value="2"></el-option>
            <el-option label="高风险" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-tooltip content="查询" effect="dark">
            <el-button type="primary" size="small" @click="initList" style="margin-left: 20px"><i class="fa fa-search"></i></el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-div">
      <template>
        <el-table
            :header-cell-style="{textAlign: 'center'}"
            :cell-style="{ textAlign: 'center' }"
            :data="riskAreaList"
            stripe
            style="width: 100%">
          <el-table-column
              type="index">
          </el-table-column>
          <el-table-column
              prop="area"
              label="地区">
          </el-table-column>
          <el-table-column
              prop="riskLevel"
              label="风险等级">
          </el-table-column>
          <el-table-column
              prop="remark"
              label="备注">
          </el-table-column>
          <el-table-column
              prop="updateTime"
              label="发布时间">
          </el-table-column>
          <el-table-column
              prop="updateTime"
              label="更新时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini" type="text" @click="getDetail(scope.row)">查看
              </el-button>
              <el-button
                  size="mini" type="text" @click="showEditPage(scope.row)" v-if="editButton">编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
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
    <!--    弹出框-->
    <el-dialog
        title="风险地区"
        :visible.sync="dialogVisible"
        width="50%">
      <el-form ref="form" :model="riskArea" size="mini" :disabled="disabled">
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="地区:">
              <el-input size="mini" v-model="riskArea.area"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="区划编码:">
              <el-input size="mini" v-model="riskArea.areaCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="风险等级:">
              <el-input size="mini" v-model="riskArea.riskLevel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="发布时间:">
              <el-date-picker size="mini" type="date" value-format="yyyy-MM-dd" v-model="riskArea.createTime" disabled></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="备注:">
              <el-input size="mini" type="textarea" v-model="riskArea.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="9">
            <div v-if="hasButton">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateRiskArea">确 定</el-button>
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
  name: "RiskArea",
  created() {
    this.initList();
    this.cancelEditButton();
  },
  data() {
    return {
      riskAreaParam: {
        id: '',
        area: '',
        riskLevel: ''
      },
      pageParam: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      riskAreaList: [],
      riskArea: {
        id: '',
        area: '',
        areaCode: '',
        riskLevel: '',
        remark: '',
        updateTime: '',
        createTime: ''
      },
      dialogVisible: false,
      disabled: false,
      hasButton: false,
      editButton: true,
      userInfo:{
        userId: ''
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
    initList() {
      const params = Object.assign(this.riskAreaParam, this.pageParam);
      postRequest('/riskArea/getRiskAreaList', params).then(res => {
        if (res) {
          this.riskAreaList = res.data.list;
          this.pageParam.total = res.data.total;
        }
      })
    },
    getDetail(param) {
      this.dialogVisible = true;
      this.disabled = true;
      this.hasButton = false;
      postRequest('/riskArea/getRiskAreaDetail', param).then(res => {
        this.riskArea = res.data;
      })
    },
    showEditPage(param) {
      this.getDetail(param);
      this.dialogVisible = true;
      this.disabled = false;
      this.hasButton = true;
    },
    updateRiskArea() {
      postRequest('/riskArea/updateRiskArea', this.riskArea).then(res => {
        if (res) {
          this.dialogVisible = false;
          this.initList();
          this.dialogVisible = false;
        }
        this.$message.success("编辑成功");
      })
    },
    cancelEditButton(){
      this.userInfo = JSON.parse(window.sessionStorage.getItem('user')).data;
      postRequest('/user/getPersonalInfo',this.userInfo).then(res=>{
        console.log(res)
        if (res.data.roleId==='2'){
          this.editButton = true;
        }else{
          this.editButton = false;
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