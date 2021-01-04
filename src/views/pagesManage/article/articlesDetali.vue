<template>
  <div class="detail-wrap">
    <el-card class="box-card">
      <el-form
        label-width="100px"
        :model="form"
        :rules="rules"
        ref="articleDetaliForm"
      >
        <el-form-item label="文章名称：" prop="name">
          <el-input
            size="small"
            v-model="form.name"
            placeholder="请输入文章名称"
            :maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章简介：" prop="synopsis">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入文章简介"
            v-model="form.synopsis"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="作者：" prop="author">
          <el-input
            size="small"
            v-model="form.author"
            placeholder="请输入作者名称"
            :maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="写作日期：" prop="writing_time">
          <el-date-picker
            v-model="form.writing_time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="关联tag：" prop="tag">
          <template v-if="!form.tag || form.tag.length == 0">
            <el-link type="primary" @click="openTagPop">选择关联tag</el-link>
          </template>
          <template v-else v-for="(item, index) in form.tag">
            <el-tag size="medium" closable :key="index" @close="delChoiceTag">{{
              item
            }}</el-tag>
          </template>
        </el-form-item>
        <el-form-item label="上传文档：" prop="mdPath">
          <upLoadMd
            v-model="form.mdPath"
            @reuseValidate="reuseValidate"
          ></upLoadMd>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col class="text-right">
          <el-button type="primary" size="mini" @click="save">保存</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="tag选择"
      :visible.sync="tagListOpen"
      @close="closeTagList"
    >
      <el-button type="primary" size="mini" @click="addTag" class="addTag"
        >新建tag</el-button
      >
      <template v-if="isAddTag">
        <el-form :inline="true" :model="tagParsms" label-position="left">
          <el-form-item label="tag名称：">
            <el-input
              size="small"
              v-model.trim="tagParsms.name"
              placeholder="请输入文章名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="saveAddTag"
              >保存</el-button
            >
            <el-button size="mini" @click="cancelAddTag">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <el-table
          :data="tableData"
          border
          style
          stripe
          v-loading="tableLoading"
          element-loading-text="努力加载中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0.5)"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column prop="name" label="tag"></el-table-column>
          <el-table-column label="操作" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="choiceTag(scope.name)"
                >选择</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "articleDetali",
  data() {
    return {
      form: {
        name: "",
        synopsis: "",
        author: "",
        writing_time: "",
        tag: [],
        mdPath: "",
      },
      rules: {
        name: [{ required: true, message: "请输入文章名称", trigger: "blur" }],
        synopsis: [
          { required: true, message: "请输入文章简介", trigger: "blur" },
        ],
        author: [
          { required: true, message: "请输入作者名称", trigger: "blur" },
        ],
        writing_time: [
          { required: true, message: "请输入选择写作时间", trigger: "change" },
        ],
        // mdPath: [{ required: true, message: "请上传文档", trigger: "change" }],
      },
      isEdit: false,
      tagList: [],
      tagListOpen: false,
      isAddTag: false,
      tagParsms: {
        name: "",
      },
      tableLoading: false,
      tableData: [],
    }
  },
  methods: {
    validate(filed) {
      this.$refs["articleDetaliForm"].validateField(filed)
    },
    save() {
      this.$refs["articleDetaliForm"].validate((valid) => {
        if (valid) {
          this.form.writing_time = this.form.writing_time - 0
          this.$axios.post("/acticleAdd", this.form).then((res) => {
            this.isEdit = true
            if (res.code == 200) {
              this.$alert("保存成功", "提示", {
                confirmButtonText: "确定",
                callback: () => {
                  this.$router.back(-1)
                },
              })
            }
          })
        }
      })
    },
    reuseValidate(val) {
      if (val) this.validate("mdPath")
    },
    openTagPop() {
      this.tagListOpen = true
      this.getTagList()
    },
    getTagList() {
      this.tableLoading = true
      this.$axios.get("/tagList").then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list
          this.tableLoading = false
        }
      })
    },
    delChoiceTag() {},
    closeTagList() {
      // console.log('aaa')
    },
    addTag() {
      this.isAddTag = true
    },
    saveAddTag() {
      this.$axios.post("/tagAdd", this.tagParsms).then((res) => {
        if (res.code == 200) {
          this.isAddTag = false
          this.getTagList()
        }
      })
    },
    cancelAddTag() {
      this.isAddTag = false
    },
    choiceTag() {},
  },
  beforeRouteLeave(to, from, next) {
    from.meta.isEdit = this.isEdit
    next()
  },
}
</script>
<style lang="scss">
.el-dialog__body {
  padding: 0px 20px 30px;
}
.addTag {
  margin-bottom: 20px;
}
</style>