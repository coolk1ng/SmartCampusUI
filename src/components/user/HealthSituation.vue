<template>
<div>
  <div class="search-div">
    <el-form :inline="true" class="demo-form-inline" :model="userHealthParam">
      <el-form-item label="姓名">
        <el-input v-model="userHealthParam.name" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item label="健康码颜色" style="margin-left: 20px">
        <el-select v-model="userHealthParam.healthCodeColor" size="small" clearable>
          <el-option label="绿色" value="1"></el-option>
          <el-option label="黄色" value="2"></el-option>
          <el-option label="红色" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="填报日期" style="margin-left: 20px">
        <el-date-picker v-model="userHealthParam.createTime" value-format="yyyy-MM-dd" type="date"
                        size="small"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="initUserHealthList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="showInsertPage" v-if="healthInfoToday ='1'">填报</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table-div">
    <template>
      <el-table
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{ textAlign: 'center' }"
          :data="userHealthList"
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
            prop="temperature"
            label="体温">
        </el-table-column>
        <el-table-column
            prop="isFever"
            label="是否发热">
        </el-table-column>
        <el-table-column
            prop="isContactRisk"
            label="是否接触高风险地区或人群">
        </el-table-column>
        <el-table-column
            prop="healthCodeColor"
            label="健康码颜色"
            width="180">
        </el-table-column>
        <el-table-column
            prop="localToday"
            label="当前所在地">
        </el-table-column>
        <el-table-column
            prop="isTrue"
            label="是否属实">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="填报时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini" type="text" @click="showUpdateHealthPage(scope.row)">编辑
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
    <el-form ref="form" :model="userHealth" size="mini">
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="姓名:">
            <el-input size="mini" v-model="userHealth.name" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="体温:">
            <el-input size="mini" v-model="userHealth.temperature"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="是否发热:">
            <el-switch
                class="switch"
                v-model="userHealth.isFever"
                active-value="0"
                inactive-value="1"
                active-text="正常"
                inactive-text="发热"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="填报时间:">
            <el-input size="mini" v-model="userHealth.createTime" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="是否接触高风险人员或地区:">
            <el-switch
                class="switch"
                v-model="userHealth.isContactRisk"
                active-value="1"
                inactive-value="0"
                active-text="是"
                inactive-text="否"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="当前所在地:">
            <el-input size="mini" v-model="userHealth.localToday"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="健康码颜色:">
            <el-select v-model="userHealth.healthCodeColor" size="mini">
              <el-option label="绿色" value="1"></el-option>
              <el-option label="黄色" value="2"></el-option>
              <el-option label="红色" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="是否属实:">
            <el-switch
                class="switch"
                v-model="userHealth.isTrue"
                active-value="1"
                inactive-value="0"
                active-text="属实"
                inactive-text="不属实"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button size="mini" type="success" style="margin-left: 380px" @click="updateUserHealth">保存</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
<!--  填报弹出框-->
  <el-dialog
      title="申请信息"
      :visible.sync="dialogVisible2"
      width="50%">
    <el-form ref="form" :model="userHealth" size="mini">
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="体温:">
            <el-input size="mini" v-model="userHealth.temperature"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="是否发热:">
            <el-switch
                class="switch"
                v-model="userHealth.isFever"
                active-value="0"
                inactive-value="1"
                active-text="正常"
                inactive-text="发热"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="是否接触高风险人员或地区:">
            <el-switch
                class="switch"
                v-model="userHealth.isContactRisk"
                active-value="1"
                inactive-value="0"
                active-text="是"
                inactive-text="否"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="当前所在地:">
            <el-input size="mini" v-model="userHealth.localToday"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="健康码颜色:">
            <el-select v-model="userHealth.healthCodeColor" size="mini">
              <el-option label="绿色" value="1"></el-option>
              <el-option label="黄色" value="2"></el-option>
              <el-option label="红色" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="是否属实:">
            <el-switch
                class="switch"
                v-model="userHealth.isTrue"
                active-value="1"
                inactive-value="0"
                active-text="属实"
                inactive-text="不属实"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button size="mini" type="success" style="margin-left: 380px" @click="InsertHealthInfo">填报</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import {postRequest} from "../../utils/request";

export default {
  name: "HealthSituation",
  created() {
    this.initUserHealthList();
  },
  data(){
    return {
      userHealthParam: {
        isFever: '',
        healthCodeColor: '',
        createTime: '',
        name: ''
      },
      userHealth: {
        id: '',
        userId: '',
        isFever: '',
        healthCodeColor: '',
        createTime: '',
        isContactRisk: '',
        isTrue: '',
        temperature: '',
        localToday: '',
        updateTime: ''
      },
      userHealthList: [],
      pageParam: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      dialogVisible: false,
      dialogVisible2: false
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

    initUserHealthList(){
      const params = Object.assign(this.userHealthParam,this.pageParam);
      postRequest('/userHealth/getUserHealthList',params).then(res=>{
        if (res){
          this.userHealthList = res.data.list;
          this.pageParam.total = res.data.total;
        }
      })
    },
    showUpdateHealthPage(userHealth){
      this.dialogVisible = true;
      postRequest('/userHealth/getUserHealthDetail',userHealth).then(res=>{
        if (res){
          this.userHealth = res.data;
        }
      })
    },
    updateUserHealth(){
      postRequest('/userHealth/updateUserHealth',this.userHealth).then(res=>{
        if (res){
          this.$message.success("编辑成功");
        }else{
          this.$message.error("编辑失败");
        }
        this.dialogVisible = false;
        this.initUserHealthList();
      })
    },

    /**
     * 弹出填报页面
     */
    showInsertPage(){
      this.dialogVisible2 = true;
      this.userHealth = {};
    },

    /**
     * 填报
     */
    InsertHealthInfo(){
      postRequest('/userHealth/insertHealthInfo',this.userHealth).then(res=>{
        if (res){
          this.$message.success(res.data.message);
        }
        this.dialogVisible2 = false;
        this.initUserHealthList();
      })
    },
  }
}
</script>

<style scoped>
.switch{
  margin-top: 4px;
}
</style>