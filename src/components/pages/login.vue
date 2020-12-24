<template>
  <div class="loginPage">
    <el-form :model="params" class="loginBox" :rules="rules" ref="loginForm">
      <el-form-item class="tit">
        <div class="hint">请登录</div>
      </el-form-item>
      <el-form-item prop="user_name">
        <el-input
          size="small"
          v-model.trim="params.user_name"
          placeholder="请输入用户名"
        >
          <i slot="prefix" class="el-input__icon el-icon-user"> </i>
        </el-input>
      </el-form-item>
      <el-form-item prop="certificate">
        <el-input
          size="small"
          v-model.trim="params.certificate"
          placeholder="请输入密码"
        >
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="login()" class="subBtn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      params: {},
      rules:{
        user_name:[{ required: true, message: "请输入用户名", trigger: "blur" }],
        certificate:[{ required: true, message: "请输入密码", trigger: "blur" }],
      }
    }
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate((valid) => {
        if(valid){
          console.log(this.params)
        }
      })
    },
    validate(filed) {
      this.$refs["loginForm"].validateField(filed)
    },

  },
}
</script>
<style lang="scss">
.loginPage {
  background: #dce7f8;
  height: 100vh;
  position: relative;
  .loginBox {
    background: #fff;
    width: 300px;
    padding: 20px;
    box-shadow: 0 0 4px #ccc;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
  }
  .tit {
    // margin-bottom: 0;
    .hint {
      font-weight: 600;
      font-size: 16px;
      color: #606266;
    }
  }
  .subBtn{
    width: 100%;
  }
}
</style>