<template>
  <div class="siteHeader" :style="{ background: styleSetting.lightBg }">
    <div class="siteLe">
      <span class="collapseControl" @click="collapseControl">
        <template v-if="!isCollapse">
          <i class="el-icon-s-fold"></i>
        </template>
        <template v-else>
          <i class="el-icon-s-unfold"></i>
        </template>
      </span>
      <div class>
        <Breadcrumb></Breadcrumb>
      </div>
    </div>
    <div class="siteRi">
      <span class="username">{{ userInfo.username }}</span>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :size="35" :src="circleUrl" shape="square"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "./Breadcrumb"
import { mapGetters } from "vuex"
import styleSetting from "@/assets/styles/setting.scss"
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    }
  },
  components: {
    Breadcrumb,
  },
  computed: {
    ...mapGetters(["isCollapse", "userInfo"]),
    styleSetting() {
      return styleSetting
    },
  },
  methods: {
    collapseControl() {
      this.$store.dispatch("app/updateCollapse", !this.isCollapse)
    },
    quit() {
      // console.log("quit")
      this.$store.dispatch("user/resetToken")
      this.$store.dispatch("user/resetUserInfo")
    },
    handleCommand(e) {
      if (e == "quit") {
        this.$confirm("您确定退出登录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$store.dispatch("user/resetToken")
            this.$store.dispatch("user/resetUserInfo")
            this.$router.push({ path: "/login" })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消退出",
            })
          })
      } else if (e == "changePassword") {
        this.$router.push({ path: "/accountManage" })
      }
    },
  },
}
</script>
<style lang="scss">
.siteHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  color: #000;
  .siteLe {
    display: flex;
    align-items: center;
  }
  .collapseControl {
    font-size: 20px;
    color: #000;
    margin: 0 20px;
  }
  .el-avatar {
    cursor: pointer;
  }
  .siteRi {
    display: flex;
    align-items: center;
    margin-right: 30px;
  }
  .username {
    font-weight: bold;
    font-size: 14px;
    margin-right: 20px;
  }
}
</style>