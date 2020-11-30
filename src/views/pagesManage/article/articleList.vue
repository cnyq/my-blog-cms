<template>
  <div class="container">
    <div class="filter-form">
      <el-form :inline="true" :model="params" label-position="left">
        <el-form-item label="活动名称：">
          <el-input
            size="small"
            v-model.trim="params.presentName"
            placeholder="请输入活动名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="起止时间：">
          <el-date-picker
            size="small"
            v-model="queryTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['00:00:00', '23:59:59']"
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
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column
          prop="presentName"
          label="新人礼名称"
        ></el-table-column>
        <el-table-column
          width="220"
          prop="startTime"
          label="开始时间"
        ></el-table-column>
        <el-table-column
          width="220"
          prop="endTime"
          label="结束时间"
        ></el-table-column>
        <el-table-column
          prop="registerCount"
          label="注册总人数"
        ></el-table-column>
        <el-table-column
          width="220"
          prop="createTime"
          label="创建时间"
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
  name: "articleList",
  data() {
    return {
      queryTime: [],
      isSave: false,
      params: {},
      tableLoading: false,
      tableData: [],
      total: 10,
    }
  },
  created(){
  },
  methods: {
    loadData() {
      // this.tableLoading = true
      let queryTime = this.queryTime || []
      this.params.startTime = queryTime.length > 0 ? queryTime[0] * 1 : ""
      this.params.endTime = queryTime.length > 0 ? queryTime[1] * 1 : ""
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
          name: "articleDetali",
          query: { type },
        })
      }
    },
    initParams(isReset) {
      this.queryTime = []
      this.params = {
        marketId: +sessionStorage.getItem("marketId"),
        presentName: "",
        startTime: "",
        endTime: "",
        presentStatus: "",
        pageSize: 10,
        pageNum: 1,
      }
      if (isReset) {
        this.loadData()
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    if (
      from.name == "articleDetali"
    ) {
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
