<template>
  <div class="container authManage">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="userTit"
            >您的身份为：<span class="userStatus">{{ userAnth }}</span></span
          >
        </div>
      </template>
      <template v-if="userInfo.auth_status == 1">
        <div>列表</div>
      </template>
      <template v-if="userInfo.auth_status == 2">
        <div>发布文章</div>
      </template>
      <template v-if="userInfo.auth_status == 3">
        <div>申请发布文章权限</div>
      </template>
    </el-card>
  </div>
</template>
<script>
import { md5 } from "@/utils/crypto"
import { mapGetters } from "vuex"
export default {
  name: "authManage",
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["userInfo"]),
    userAnth() {
      let auth = this.userInfo.auth_status
      return auth == 1 ? "超级管理员" : auth == 2 ? "管理员" : "游客"
    },
  },
  mounted() {},
  methods: {
    validate(filed) {
      // this.$refs["authManage"].validateField(filed)
    },
    save() {},
  },
}
</script>
<style lang="scss">
.authManage {
  .userTit{
    font-size: 16px;
    color: #333;
    font-weight: bold;
    .userStatus{
      color: rgb(78, 180, 248);
    }
  }
}
</style>