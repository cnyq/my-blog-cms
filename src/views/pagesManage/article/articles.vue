<template>
  <div class="container">
    <div class="filter-form">
      <el-form :inline="true" :model="params" label-position="left">
        <el-form-item label="文章名称：">
          <el-input
            size="small"
            v-model.trim="params.name"
            placeholder="请输入文章名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者名称：">
          <el-input
            size="small"
            v-model.trim="params.author"
            placeholder="请输入作者名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="写作时间：">
          <el-date-picker
            size="small"
            v-model="queryTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="query()"
            >查询</el-button
          >
          <el-button size="small" @click="initParams(true)">重置</el-button>
          <el-button size="small" @click="fnJump('add')">新建</el-button>
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
        <el-table-column label="文章名称">
          <template slot-scope="scope">
            <div style="text-align:left">{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="写作时间">
          <template slot-scope="scope">
            <div>{{scope.row.writing_time | filterFormatTime("yyyy年MM月dd日")}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者名称"
          width="200"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="text"
              @click="fnJump('view', scope.row)"
              >查看</el-button
            >
            <el-button
              size="small"
              type="text"
              @click="fnJump('edit', scope.row)"
              >编辑</el-button
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
  name: "articles",
  data() {
    return {
      isSave: false,
      queryTime: [],
      params: {
        pageSize: 10,
        pageNum: 1,
        name: "",
        author: "",
        startTime: "",
        endTime: "",
      },
      tableLoading: false,
      tableData: [],
      total: 0,
    }
  },
  created() {},

  methods: {
    loadData() {
      this.params.startTime =
        this.queryTime && this.queryTime.length == 2
          ? this.queryTime[0] - 0
          : ""
      this.params.endTime =
        this.queryTime && this.queryTime.length == 2
          ? this.queryTime[1] - 0
          : ""
      this.$axios.get("/acticleList", { params: this.params }).then(res=>{
        this.tableData = res.data.list
        this.total = res.data.total
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
    //新建查看编辑
    fnJump(type, row) {
      let id = row ? row.id : ""
      if (type == "add") {
        this.$router.push({
          name: "articlesDetali",
          query: { type },
        })
      }
    },
    initParams(isReset) {
      this.queryTime = []
      this.params = {
        pageSize: 10,
        pageNum: 1,
        name: "",
        author: "",
        startTime: "",
        endTime: "",
      }
      if (isReset) {
        this.loadData()
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "articleDetali") {
      to.meta.isBack = true
      to.meta.isEdit = from.meta.isEdit
    } else {
      to.meta.isBack = false
    }
    next()
  },
  activated() {
    if (
      !this.$route.meta.isBack ||
      (this.$route.meta.isBack && this.$route.meta.isEdit)
    ) {
      this.queryTime = []
      this.initParams()
      this.loadData()
    }
    // 请求完后进行初始化
    this.$route.meta.isBack = false
    this.$route.meta.isEdit = false
  },
}
</script>
