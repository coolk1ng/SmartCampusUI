<template>
<div>
  <div class="search-div">
    <el-form :inline="true" class="demo-form-inline" :model="userHealthParam">
      <el-form-item label="姓名">
        <el-input v-model="userHealthParam.name" size="small" clearable maxlength="4"></el-input>
      </el-form-item>
      <el-form-item label="健康码颜色" style="margin-left: 20px">
        <el-select v-model="userHealthParam.healthCodeColor" size="small" clearable placeholder="">
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
        <el-tooltip content="查询" effect="dark">
          <el-button type="primary" size="small" @click="initUserHealthList" style="margin-left: 20px"><i class="fa fa-search"></i></el-button>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-tooltip content="填报" effect="dark">
          <el-button type="success" size="small" @click="showInsertPage" v-if="!userHealthToday"><i class="fa fa-paint-brush"></i></el-button>
        </el-tooltip>
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
            label="体温/℃">
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
    <el-form ref="form" :rules="rules" :model="userHealth" size="mini">
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="姓名:" prop="name">
            <el-input size="mini" v-model="userHealth.name" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="体温/℃:" prop="temperature">
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
                active-value="0"
                inactive-value="1"
                active-text="否"
                inactive-text="是"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="当前所在地:" prop="localToday">
            <el-input size="mini" v-model="userHealth.localToday"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="健康码颜色:" prop="healthCodeColor">
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
        <el-col :offset="11">
          <el-form-item>
            <el-button size="mini" type="success"  @click="updateUserHealth">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
<!--  填报弹出框-->
  <el-dialog
      title="填报信息"
      :visible.sync="dialogVisible2"
      width="50%">
    <el-form ref="form" :rules="rules" :model="userHealth" size="mini">
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="体温/℃:" prop="temperature">
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
                active-value="0"
                inactive-value="1"
                active-text="否"
                inactive-text="是"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-form-item label="当前所在地:" prop="localToday">
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
        <el-col :offset="11">
          <el-form-item>
            <el-button size="mini" type="success" @click="insertHealthInfo">填报</el-button>
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
  name: "HealthSituation",
  created() {
    this.initUserHealthList()
    this.getHealthInfoToday()
  },
  data(){
    return {
      userHealthParam: {
        isFever: '',
        healthCodeColor: '',
        createTime: '',
        name: ''
      },
      userHealthToday:{
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
      dialogVisible2: false,
      rules:{
        temperature: [
          { required: true, message: '请输入体温', trigger: 'blur' }
        ],
        localToday: [
          { required: true, message: '请输入体温', trigger: 'blur' }
        ]
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
      this.$refs.form.validate((valid)=>{
        if (valid){
          postRequest('/userHealth/updateUserHealth',this.userHealth).then(res=>{
            if (res){
              this.$notify({
                title: '成功',
                message: '编辑成功',
                type: 'success'
              });
            }else{
              this.$notify.error({
                title: '错误',
                message: '编辑失败',
              });
            }
            this.dialogVisible = false;
            this.initUserHealthList();
          })
        }
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
    insertHealthInfo(){
      this.$refs.form.validate((valid)=>{
        if (valid){
          postRequest('/userHealth/insertHealthInfo',this.userHealth).then(res=>{
            if (res){
              this.$notify({
                title: '成功',
                message: res.message,
                type: 'success'
              });
            }else{
              this.$notify.error({
                title: '错误',
                message: '填报失败',
              });
            }
            this.dialogVisible2 = false;
            this.initUserHealthList();
          })
        }
      })
    },
    /**
     * 查询当日健康信息
     */
    getHealthInfoToday(){
      postRequest('/userHealth/getHealthInfoToday',null).then(res=>{
        if (res){
          this.userHealthToday = res.data;
          console.log(this.userHealthToday)
        }
      })
    }
  }
}
</script>

<style scoped>
.switch{
  margin-top: 4px;
}
</style>