<template>
  <div id="login-page">
    <div class="canvasBg" @click="clickBg()">
      <canvas id="c1" width="1920" height="969"></canvas>
      <canvas id="c2" width="1920" height="969"></canvas>
    </div>
    <div class="container">
      <div :class="[showBox === 'login' ? 'box showBox' : 'box hiddenBox']">
        <div class="title">管理员登录</div>
        <el-form :model="loginParams" :rules="loginRules" ref="loginForm">
          <el-form-item prop="username">
            <el-input
              size="small"
              v-model.trim="loginParams.username"
              placeholder="请输入用户名"
            >
              <i slot="prefix" class="el-input__icon el-icon-user"> </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              size="small"
              v-model.trim="loginParams.password"
              placeholder="请输入密码"
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <div class="bottom">
            <span class="subBtn" @click="login()">登录</span>
            <span class="switchBtn" @click="goback('register')">去注册</span>
          </div>
        </el-form>
        <div class="footer">
          <div>欢迎登陆权限管理系统</div>
        </div>
      </div>
      <div :class="[showBox === 'register' ? 'box showBox' : 'box hiddenBox']">
        <div class="title">管理员注册</div>
        <el-form
          :model="registerParams"
          :rules="registerRules"
          ref="registerForm"
        >
          <el-form-item prop="username">
            <el-input
              size="small"
              v-model.trim="registerParams.username"
              placeholder="请输入用户名"
            >
              <i slot="prefix" class="el-input__icon el-icon-user"> </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              size="small"
              v-model.trim="registerParams.password"
              placeholder="请输入密码"
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <div class="bottom">
            <span class="subBtn" @click="register()">注册并登陆</span>
            <span class="switchBtn" @click="goback('login')">去登陆</span>
          </div>
        </el-form>
        <div class="footer">
          <div>欢迎注册权限管理系统</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { md5 } from "@/utils/crypto"
import CanvasBg from "@/utils/canvasBg"
let canvasBg = new CanvasBg("c1", "c2")
export default {
  data() {
    return {
      loginParams: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      registerParams: { username: "", password: "" },
      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      showBox: "login",
    }
  },
  name: "login",
  mounted() {
    canvasBg.init()
    window.addEventListener("resize", this.onWindowResize)
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          let _data = {
            username: this.loginParams.username,
            password: md5(this.loginParams.password),
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
    register() {
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          let _data = {
            username: this.registerParams.username,
            password: md5(this.registerParams.password),
          }
          this.$axios.post("/register", _data).then((res) => {
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
    goback(type) {
      this.$refs[`${type}Form`].resetFields()
      this.showBox = type
    },
    clickBg(){
      canvasBg.create()
    },
    onWindowResize() {
      canvasBg.resize()
    },
  },
  destroyed() {
    canvasBg.unmount()
    window.removeEventListener("resize", this.onWindowResize)
  },
}
</script>
<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
#login-page {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #def3f4;
  z-index: 99;

  .container {
    position: relative;
    width: 240px;
    height: 300px;
    padding: 100px 40px 40px 40px;
    box-sizing: content-box;
  }

  .box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 90px 40px 40px 40px;
    backface-visibility: hidden;
    background: linear-gradient(
      230deg,
      rgba(53, 57, 74, 0) 0%,
      rgb(0, 0, 0) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='rgba(53, 57, 74, 0)', endColorstr='rgb(0, 0, 0)', GradientType=1);
    box-shadow: -15px 15px 15px rgba(0, 0, 0, 0.4);
    transition: all 1s;
  }

  .showBox {
    transform: rotateY(0deg);
  }

  .hiddenBox {
    transform: rotateY(180deg);
  }

  .bottom {
    display: flex;
    height: 42px;
    justify-content: space-between;
    align-items: center;
    padding-top: 40px;

    .subBtn {
      padding: 10px 50px;
      border: 2px solid #767eb9;
      border-radius: 50px;
      background: transparent;
      font-size: 11px;
      color: #d3d7f7;
      line-height: 18px;
      transition: all 0.2s;
      &:hover {
        color: white;
        background: #767eb9;
        cursor: pointer;
      }
    }

    .switchBtn {
      color: #d3d7f7;
      font-size: 14px;
      &:hover {
        color: #d9dafd;
        cursor: pointer;
      }
    }
  }

  .title {
    height: 60px;
    color: #d3d7f7;
    font-size: 16px;
    margin-bottom: 0;
  }

  .footer {
    position: absolute;
    bottom: 20px;
    left: 35px;
    width: 250px;
    color: #d3d7f7;
    font-size: 10px;
  }
  .el-form-item__content {
    line-height: 30px;
  }
  .el-input {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    box-shadow: none;
  }
  .el-input--small .el-input__icon {
    color: #d3d7f7;
    font-size: 14px;
  }
  input {
    color: #d3d7f7;
    border: none;
    outline: none;
    box-shadow: none;
    background: transparent;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition-delay: 99999s;
    -webkit-transition-delay: 99999s;
    transition: color 99999s ease-out, background-color 99999s ease-out;
    -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
  }
}

.canvasBg {
  background: #000;
  overflow: hidden;

  canvas {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  #c1 {
    opacity: 0;
  }

  #c2 {
    background: #000;
  }
}
</style>