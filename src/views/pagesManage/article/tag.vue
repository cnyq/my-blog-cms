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
          <el-button size="small" v-rules="2" @click="fnJump('add')"
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
        <el-table-column label="tag名称">
          <template slot-scope="scope">
            <div style="text-align: left">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="关联文章">
          <template slot-scope="scope">
            <el-tag
              v-for="(item, index) in scope.row.tag"
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
              @click="fnJump('del', scope.row)"
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
    }
  },
  created() {},

  methods: {
    getTagList() {
      return new Promise((res, rej) => {
        this.$axios.get("/tagList").then((it) => {
          if (it.code == 200) {
            this.tagList = it.data.list
            res(true)
          }
        })
      })
    },
    loadData() {
      this.tableLoading = true
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
    delArticles(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // this.$axios.post("/acticleDel", { _id: id }).then((res) => {
          //   if (res.code == 200) {
          //     this.$message({
          //       type: "success",
          //       message: "删除成功!",
          //     })
          //     this.loadData()
          //   }
          // })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          })
        })
    },
    initParams(isReset) {
      this.queryTime = []
      this.tagArr = []
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
      this.getTagList().then((res) => {
        if (res) {
          this.loadData()
        }
      })
    }
    this.initParams()
    // 请求完后进行初始化
    this.$route.meta.isBack = false
    this.$route.meta.isEdit = false
  },
}
</script>
