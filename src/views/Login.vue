<template>
  <div class="login-div">
    <el-form :rules="rules"
             ref="form"
             :model="loginForm"
             class="formStyle">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码"
                  style="width: 240px"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha" style="margin-left: 10px" width="100px" height="39px">
      </el-form-item>
      <el-checkbox v-model="checked" class="remember">记住我</el-checkbox>
      <el-button type="primary" style="width:100%" @click="submitForm">登录</el-button>
    </el-form>
  </div>
</template>

<script>


import {postRequest} from "@/utils/request";
import {Message} from "element-ui";

export default {
  name: "Login",
  data() {
    return {
      captchaUrl: '/smart-campus/captcha?time=' + new Date(),
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      checked: true,
      loading: false,
      rules: {
        username: [
          {required: true, message: '用户名不为空', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 ~ 10个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不为空', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 ~ 10个字符', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '验证码不为空', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    //更新验证码
    updateCaptcha() {
      this.captchaUrl = '/smart-campus/captcha?time=' + new Date();
    },
    //登录
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          postRequest('/login', this.loginForm).then(resp => {
            if (resp.data) {
              //alert(JSON.stringify(resp));
              //存储用户token
              const tokenStr = resp.data.tokenHead + resp.data.token;
              window.sessionStorage.setItem('tokenStr', tokenStr);
              /**
               * 如果访问首页则跳转首页,如果直接访问其他路由信息,
               * 请求拦截器会先判断是否有token,没有则跳转到登录页,
               * 登录后则直接跳转到对应路由
               */
              let path = this.$route.query.redirect;
              this.$router.replace(path === '/' || path === undefined ? '/student' : path);
              Message.success({message: resp.message});
            }else{
              Message.error({message: resp.message});
            }
          })
        } else {
          this.$message.error('请输入所有字段');
          return false;
        }
      });
    },
  }
}
</script>

<style>
.formStyle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-175px) translateY(-170px);
  border-radius: 20px;
  background-clip: padding-box;
  /*margin: 180px auto;*/
  width: 300px;
  padding: 15px 35px 15px 35px;
  background: #f1f8fa;
  border: 1px solid #9d9696;
  box-shadow: 0 0 20px #cac6c6;
  height: 320px;
}

.loginTitle {
  margin: 0px auto 20px auto;
  text-align: center;
}

.remember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}

.el-form-item__content {
  display: flex;
  align-items: center;
}

.login-div {
  height: 100%;
  background: url("../assets/2.jpeg");
  background-size: cover;
}
</style>