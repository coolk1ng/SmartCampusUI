<template>
  <div>
    <div class="search-div">
      <el-form :inline="true" class="demo-form-inline" :model="healthManage">
        <el-form-item label="姓名">
          <el-input type="text" size="small" maxlength="4" clearable v-model="healthManageParam.name"></el-input>
        </el-form-item>
        <el-form-item label="健康码颜色" style="margin-left: 20px">
          <el-select size="small" v-model="healthManageParam.healthCodeColor" placeholder="" clearable>
            <el-option label="绿色" value="1"></el-option>
            <el-option label="黄色" value="2"></el-option>
            <el-option label="红色" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="填报时间" style="margin-left: 20px" >
          <el-date-picker value-format="yyyy-MM-dd" type="date" v-model="healthManageParam.createTime"
                          size="small"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-tooltip content="查询" effect="dark">
            <el-button type="primary" size="small" @click="initList"><i class="fa fa-search"></i></el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-div">
      <template>
        <el-table
            :header-cell-style="{textAlign: 'center'}"
            :cell-style="{ textAlign: 'center' }"
            :data="healthManageList"
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
              prop="healthCodeColor"
              label="健康码颜色">
          </el-table-column>
          <el-table-column
              prop="temperature"
              label="体温">
          </el-table-column>
          <el-table-column
              prop="isFever"
              label="是否发热">
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="填报时间">
          </el-table-column>
          <el-table-column label="操作"
                           width="245 ">
            <template slot-scope="scope">
              <el-button
                  size="mini" type="text" @click="getDetail(scope.row)">查看
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
        title="申请信息"
        :visible.sync="dialogVisible"
        width="50%">
      <el-form ref="form" :model="healthManage" size="mini" disabled>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="姓名:">
              <el-input size="mini" v-model="healthManage.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="体温:">
              <el-input size="mini" v-model="healthManage.temperature"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="是否发热:">
              <el-input size="mini" v-model="healthManage.isFever"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="填报时间:" va>
              <el-input size="mini" v-model="healthManage.createTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="是否接触高风险人员或地区:">
              <el-input size="mini" v-model="healthManage.isContactRisk"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="当前所在地:">
              <el-input size="mini" v-model="healthManage.localToday"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="健康码颜色:">
              <el-input size="mini" v-model="healthManage.healthCodeColor"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="是否属实:">
              <el-input size="mini" v-model="healthManage.isTrue"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {postRequest} from "@/utils/request";

export default {
  name: "HealthManage",
  created() {
    this.initList();
  },
  data() {
    return {
      healthManageList: [],
      healthManageParam:{
        name: '',
        healthCodeColor: '',
        createTime: ''
      },
      healthManage: {
        id: '',
        userId: '',
        name: '',
        isFever: '',
        healthCodeColor: '',
        createTime: '',
        isContactRisk: '',
        isTrue: '',
        temperature: '',
        localToday: '',
        updateTime: ''
      },
      pageParam: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      dialogVisible : false
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
      const params = Object.assign(this.healthManageParam, this.pageParam);
      postRequest('/userHealth/getHealthListByManager', params).then(res => {
        if (res) {
          this.healthManageList = res.data.list;
          this.pageParam.total = res.data.total;
        }
      })
    },
    getDetail(param){
      this.dialogVisible = true;
      postRequest('/userHealth/getUserHealthDetail',param).then(res=>{
        this.healthManage = res.data;
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