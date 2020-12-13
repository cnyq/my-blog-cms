<template>
  <div class="detail-wrap">
    <el-card class="box-card">
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="文章名称：" prop="name">
          <el-input
            size="small"
            v-model="form.name"
            placeholder="请输入内容"
            :maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章简介：" prop="synopsis">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.synopsis"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="作者：" prop="author">
          <el-input
            size="small"
            v-model="form.author"
            placeholder="请输入内容"
            :maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="写作日期：" prop="time">
          <el-date-picker v-model="form.time" type="date" placeholder="选择日期">
          </el-date-picker>
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
export default {
  name: "articleDetali",
  data() {
    return {
      form: {},
      rules: {},
      isEdit: false,
    }
  },
  methods: {
    save() {
      this.$axios.post("/acticleAdd", this.form)
    },
  },
  beforeRouteLeave(to, from, next) {
    from.meta.isEdit = this.isEdit
    next()
  },
}
</script>