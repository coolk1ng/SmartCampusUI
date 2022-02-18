<template>
  <div>
    <el-descriptions class="margin-top" title="个人信息" :column="2" border>
      <template slot="extra">
        <el-tooltip content="操作" effect="dark">
          <el-button type="primary" size="small" @click="showEditPage"><i class="fa fa-pencil"></i></el-button>
        </el-tooltip>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{personalInfo.userName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-address-card-o"></i>
          姓名
        </template>
        {{personalInfo.name}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-eye"></i>
          密码
        </template>
        {{personalInfo.password!='' ? '********': ''}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-male"></i>
          性别
        </template>
        {{personalInfo.sex}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-id-card"></i>
          身份证号
        </template>
        {{personalInfo.idCardNum}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-frown-o"></i>
          学号
        </template>
        {{personalInfo.studentId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-graduation-cap"></i>
          学院
        </template>
        {{personalInfo.college}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-globe"></i>
          专业
        </template>
        {{personalInfo.professional}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-users"></i>
          班级
        </template>
        {{personalInfo.className}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-mobile"></i>
          联系方式
        </template>
        {{personalInfo.telephone}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-newspaper-o"></i>
          政治面貌
        </template>
        {{personalInfo.politicalStatus}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-thumb-tack"></i>
          年龄
        </template>
        {{personalInfo.age}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-handshake-o"></i>
          任职情况
        </template>
        {{personalInfo.cognition}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-hourglass"></i>
          入学时间
        </template>
        {{personalInfo.enterTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-phone"></i>
          父亲联系方式
        </template>
        {{personalInfo.fatherTel}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-phone"></i>
          母亲联系方式
        </template>
        {{personalInfo.motherTel}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-hourglass-end"></i>
          出生日期
        </template>
        {{personalInfo.birthTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        {{personalInfo.remark}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-home"></i>
          户籍地
        </template>
        {{personalInfo.domicile}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="fa fa-map-marker"></i>
          现居住地
        </template>
        {{personalInfo.currentAddress}}
      </el-descriptions-item>
    </el-descriptions>
    <!--    弹出框-->
    <el-dialog
        title="个人信息"
        :visible.sync="dialogVisible"
        width="50%">
      <el-form ref="form" size="mini" :rules="rules">
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="用户名:" prop="userName">
              <el-input v-model="personalInfo.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="personalInfo.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="密码:" prop="password">
              <el-input type="password" v-model="personalInfo.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="性别:" prop="sex">
              <el-input v-model="personalInfo.sex"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="身份证号:" prop="idCardNum">
              <el-input v-model="personalInfo.idCardNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="学号:" prop="studentId">
              <el-input v-model="personalInfo.studentId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="学院:" prop="college">
              <el-input v-model="personalInfo.college"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="专业:" prop="professional">
              <el-input v-model="personalInfo.professional"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="班级:" prop="className">
              <el-input v-model="personalInfo.className"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="联系方式:" prop="telephone">
              <el-input v-model="personalInfo.telephone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="政治面貌:" prop="politicalStatus">
              <el-select v-model="personalInfo.politicalStatus">
                <el-option label="中共党员" value="1"></el-option>
                <el-option label="中共预备党员" value="2"></el-option>
                <el-option label="共青团员" value="3"></el-option>
                <el-option label="群众" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="年龄:" prop="age">
              <el-input v-model="personalInfo.age"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="任职情况:" prop="cognition">
              <el-select v-model="personalInfo.cognition">
                <el-option label="班长" value="1"></el-option>
                <el-option label="学习委员" value="2"></el-option>
                <el-option label="体育委员" value="3"></el-option>
                <el-option label="生活委员" value="4"></el-option>
                <el-option label="文艺委员" value="5"></el-option>
                <el-option label="寝室长" value="6"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="入学时间:" prop="enterTime">
              <el-date-picker v-model="personalInfo.enterTime" type="date" placeholder="选择日期"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="父亲联系方式:" prop="fatherTel">
              <el-input v-model="personalInfo.fatherTel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="母亲联系方式:" prop="motherTel">
              <el-input v-model="personalInfo.motherTel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="出生日期:" prop="birthTime">
              <el-date-picker value-format="yyyy-MM-dd" v-model="personalInfo.birthTime" type="date" placeholder="选择日期"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="备注:" prop="remark">
              <el-input v-model="personalInfo.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="户籍地:" prop="domicile">
              <el-input v-model="personalInfo.domicile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="现居住地:" prop="currentAddress">
              <el-input v-model="personalInfo.currentAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="8">
            <div>
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateUserInfo">确 定</el-button>
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
  name: "PersonalInfo",
  data() {
    return {
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' },
        ],
        idCardNum: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ],
        studentId: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 10, max: 10, message: '长度为10个字符', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      personalInfo: {
        id: '',
        userId: '',
        userName: '',
        password: '',
        name: '',
        studentId: '',
        sex: '',
        idCardNum: '',
        birthTime: '',
        college: '',
        professional: '',
        className: '',
        telephone: '',
        politicalStatus: '',
        age: '',
        cognition: '',
        enterTime: '',
        fatherTel: '',
        motherTel: '',
        remark: '',
        currentAddress: '',
        domicile: ''
      }
    }
  },
  created() {
    this.getPersonalInfo();
  },
  methods: {
    showEditPage() {
      this.dialogVisible = true;
      this.getPersonalInfo();
    },
    getPersonalInfo(){
      postRequest('/user/getPersonalInfo').then(res=>{
        if (res){
          this.personalInfo = res.data;
        }
      })
    },
    updateUserInfo(){
      postRequest('/user/updatePersonalInfo',this.personalInfo).then(res=>{
        if (res){
          this.dialogVisible = false;
          Message.success({message: "编辑成功"});
        }
      })
    }
  }
}
</script>

<style scoped>
.margin-top {
  margin-top: 10px;
}
</style>