<template>
  <div class="loginPage">
    <el-form :model="params" class="loginBox" :rules="rules" ref="loginForm">
      <el-form-item class="tit">
        <div class="hint">{{ isLogin ? "请登录" : "请注册" }}</div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          size="small"
          v-model.trim="params.username"
          placeholder="请输入用户名"
        >
          <i slot="prefix" class="el-input__icon el-icon-user"> </i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          size="small"
          v-model.trim="params.password"
          placeholder="请输入密码"
        >
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <template v-if="isLogin">
          <el-button size="small" type="primary" @click="login()" class="subBtn"
            >登录</el-button
          >
          <el-link type="primary" @click="toRegister()">去注册</el-link>
        </template>
        <template v-else>
          <el-button
            size="small"
            type="primary"
            @click="register()"
            class="subBtn"
            >注册</el-button
          >
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { md5 } from "@/utils/crypto"
export default {
  data() {
    return {
      params: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      isLogin: true,
    }
  },
  name: "login",
  mounted() {
    this.isLogin = true
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          console.log(this.params)
          let _data = {
            username: this.params.username,
            password: md5(this.params.password),
          }
          this.$axios.post("/login", _data).then((res) => {
            if (res.data.status == 1) {
              this.$store.dispatch("user/setToken", res.data.token)
              this.$store.dispatch("user/setUserInfo", res.data.userInfo)
              this.$router.push({ path: "/home" })
            } else {
              this.$message({
                message: res.data.hint,
                type: "error",
              })
            }
          })
        }
      })
    },
    toRegister() {
      this.isLogin = false
    },
    register() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          console.log(this.params)
          let _data = {
            username: this.params.username,
            password: md5(this.params.password),
          }
          this.$axios.post("/register", _data).then((res) => {
            if (res.data.status == 1) {
              this.$message({
                message: "注册成功",
                type: "info",
              })
               this.isLogin = true
            } else {
              this.$message({
                message: res.data.hint,
                type: "error",
              })
            }
          })
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
  .subBtn {
    width: 100%;
  }
}
</style>