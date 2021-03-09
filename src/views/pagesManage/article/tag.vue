<template>
  <div class="container">
    <div class="filter-form">
      <el-form :inline="true" :model="params" label-position="left">
        <el-form-item label="标签名称：">
          <el-input
            size="small"
            v-model.trim="params.name"
            placeholder="请输入标签名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="query()"
            >查询</el-button
          >
          <el-button size="small" @click="initParams(true)">重置</el-button>
          <el-button size="small" v-rules="1" @click="fnJump('add')"
            >新建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrap">
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
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="code" label="编号" width="180"></el-table-column>
        <el-table-column label="tag名称" width="260">
          <template slot-scope="scope">
            <div style="text-align: left">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="关联文章">
          <template slot-scope="scope">
            <el-tag
              v-for="(item, index) in scope.row.acticle"
              size="mini"
              type="success"
              :key="index"
              style="margin-right: 10px"
              >{{ item.name }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="text"
              @click="delTag(scope.row._id)"
              v-rules="1"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="params.pageNum"
      :page-size="params.pageSize"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      title="新建tag"
      :visible.sync="isDialogOpen"
      @close="closeDialog"
      :close-on-click-modal="false"
    >
      <el-form
        :inline="true"
        ref="tagParams"
        :model="tagParams"
        label-position="left"
        :rules="rules"
      >
        <el-form-item label="tag名称：" prop="name">
          <el-input
            size="small"
            v-model.trim="tagParams.name"
            @input="inputChange"
            placeholder="请输入tag名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="saveAddTag"
            >保存</el-button
          >
          <el-button size="mini" @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tag",
  data() {
    return {
      isSave: false,
      queryTime: [],
      tagArr: [],
      params: {
        pageSize: 10,
        pageNum: 1,
        name: "",
      },
      tableLoading: false,
      tableData: [],
      tagList: [],
      total: 0,
      isDialogOpen: false,
      tagParams: {
        name: "",
      },
      postError: "noRes",
      rules: {
        name: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) return callback(new Error("tag名不能为空"))
              if (this.postError != "noRes") {
                return callback(new Error(this.postError))
              }
              return callback()
            },
            trigger: "blur",
          },
        ],
      },
    }
  },
  created() {},

  methods: {
    validate(filed) {
      this.$refs["tagParams"].validateField(filed)
    },
    loadData() {
      this.tableLoading = true
      this.$axios.get("/tagList", { params: this.params }).then((it) => {
        if (it.code == 200) {
          this.tableData = it.data.list
          this.total = it.data.total
          this.tableLoading = false
        }
      })
    },
    query() {
      this.params.pageNum = 1
      this.loadData()
    },
    sizeChange(size) {
      this.params.pageSize = size
      this.loadData()
    },
    currentChange(page) {
      this.params.pageNum = page
      this.loadData()
    },
    fnJump(type) {
      if (type == "add") {
        this.isDialogOpen = true
      }
    },
    inputChange(val) {
      this.postError = "noRes"
      this.validate("name")
    },
    saveAddTag() {
      this.postError = "noRes"
      this.$refs["tagParams"].validate((valid) => {
        if (valid) {
          this.$axios.post("/tagAdd", this.tagParams).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "新增成功!",
                duration: 1000,
                onClose: () => {
                  this.tagParams.name = ""
                  this.closeDialog()
                  this.loadData()
                },
              })
            } else {
              this.postError = res.msg
              this.validate("name")
            }
          })
        }
      })
    },
    closeDialog() {
      this.$refs["tagParams"].resetFields()
      this.isDialogOpen = false
    },
    delTag(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.post("/tagDel", { _id: id }).then((res) => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功",
              })
              this.loadData()
            }else{
              this.$message({
                type: "error",
                message: res.msg,
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          })
        })
    },
    initParams(isReset) {
      this.params = {
        pageSize: 10,
        pageNum: 1,
        name: "",
      }
      if (isReset) {
        this.loadData()
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    // if (from.name == "articlesDetali") {
    //   to.meta.isBack = true
    //   to.meta.isEdit = from.meta.isEdit
    // } else {
    //   to.meta.isBack = false
    // }
    to.meta.isBack = false
    next()
  },
  activated() {
    if (
      !this.$route.meta.isBack ||
      (this.$route.meta.isBack && this.$route.meta.isEdit)
    ) {
      this.loadData()
    }
    this.initParams()
    // 请求完后进行初始化
    this.$route.meta.isBack = false
    this.$route.meta.isEdit = false
  },
}
</script>
