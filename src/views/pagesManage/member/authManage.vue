<template>
  <div class="container">
    <el-card class="box-card">
      <el-form
        label-width="100px"
        :model="params"
        :rules="rules"
        ref="authManage"
      >
        <el-form-item label="原密码：" prop="oldPassword">
          <el-input
            size="small"
            v-model="params.oldPassword"
            placeholder="请输入原密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input
            size="small"
            v-model="params.newPassword"
            placeholder="请输入新密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="passwordCopy">
          <el-input
            size="small"
            v-model="params.passwordCopy"
            placeholder="请再输入新密码"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col class="text-right">
          <el-button type="primary" size="mini" @click="save">保存</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { md5 } from "@/utils/crypto"
import { mapGetters } from "vuex"
export default {
  name: "authManage",
  data() {
    return {
      type: this.$route.query.type,
      params: {},
      rules: {
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        passwordCopy: [
          { required: true, message: "请再输入新密码", trigger: "blur" },
        ],
      },
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {},
  methods: {
    validate(filed) {
      this.$refs["authManage"].validateField(filed)
    },
    save() {
      this.$refs["authManage"].validate((valid) => {
        if (valid) {
          let { oldPassword, newPassword, passwordCopy } = this.params
          if (newPassword != passwordCopy) {
            this.$message({
              message: "您要更改的密码不匹配",
              type: "error",
            })
          } else if (oldPassword == newPassword) {
            this.$message({
              message: "新密码与旧密码不能相同",
              type: "error",
            })
          } else {
            let _data = {
              oldPassword: md5(oldPassword),
              newPassword: md5(newPassword),
              username: this.userInfo.username,
            }
            this.$axios.post("/postwordChange", _data).then((res) => {
              let { status, hint } = res.data
              if (status == 1) {
                this.$message({
                  message: "新密码修改成功,即将跳转登陆页",
                  type: "error",
                  duration: 1,
                  onClose: () => {
                    this.$store.dispatch("user/resetToken")
                    this.$store.dispatch("user/resetUserInfo")
                    this.$router.push({ path: "/login" })
                  },
                })
              } else {
                this.$message({
                  message: hint,
                  type: "error",
                })
              }
            })
          }
        }
      })
    },
  },
}
</script>
<style lang="scss">
</style>