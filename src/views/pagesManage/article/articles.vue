<template>
  <div class="container article">
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
        <el-form-item label="上传者名称：">
          <el-input
            size="small"
            v-model.trim="params.username"
            placeholder="请输入上传者名称"
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
        <el-form-item label="发布状态：">
          <el-select
            v-model="params.publishStatus"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in selectMenu"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-form-item label="关联tag：" v-show="tagList.length != 0">
            <el-checkbox-group v-model="tagArr" @change="choiceTag">
              <el-checkbox
                v-for="(tag, index) in tagList"
                :label="tag.code"
                :key="index"
                >{{ tag.name }}</el-checkbox
              >
            </el-checkbox-group>
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
        </div>
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
        <el-table-column label="文章名称" width="300">
          <template slot-scope="scope">
            <div style="text-align: left">
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="作者名称"
          prop="author"
          width="120"
        ></el-table-column>
        <el-table-column label="写作时间" width="160">
          <template slot-scope="scope">
            <div>
              {{ scope.row.writing_time | filterFormatTime("yyyy年MM月dd日") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发布状态">
          <template slot-scope="scope">
            <div>
              {{ scope.row.publishStatus == 1 ? "已发布" : "未发布" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="关联tag" width="200">
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
        <el-table-column label="文章简介" width="400">
          <template slot-scope="scope">
            <div style="text-align: left">{{ scope.row.synopsis }}</div>
          </template>
        </el-table-column>
        <el-table-column label="上传人员">
          <template slot-scope="scope">
            <div style="text-align: left">{{ scope.row.username }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <template v-if="userInfo.auth_status == 1">
              <el-button
                size="small"
                type="text"
                @click="fnJump('view', scope.row)"
                >{{
                  scope.row.publishStatus == 1 ? "取消发布" : "发布"
                }}</el-button
              >
            </template>
            <template
              v-if="
                userInfo.auth_status == 2 &&
                scope.row.publishStatus == 2 &&
                userInfo.username == scope.row.username
              "
            >
              <el-button
                size="small"
                type="text"
                @click="applyPublish(scope.row)"
                >申请发布</el-button
              >
            </template>
            <el-button
              size="small"
              type="text"
              @click="fnJump('view', scope.row)"
              >查看</el-button
            >
            <el-button
              size="small"
              type="text"
              v-rules="2"
              @click="fnJump('edit', scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="text"
              v-rules="2"
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
    <!-- 申请发布弹窗 -->
    <el-dialog
      title="申请发布"
      :visible.sync="applyPublishVisible"
      :close-on-click-modal="false"
      :before-close="cancelDialog"
      width="1200px"
    >
      <el-form :model="dialogParams" label-position="left">
        <div class="dialogTit">
          您当前申请发布的文章为：{{ dialogParams.name }}
        </div>
        <div class="dialogHint">您可以下方留言，限制50个字</div>
        <el-form-item label="申请留言：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入申请留言"
            :maxlength="50"
            v-model="dialogParams.message"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <div class="text-right">
          <el-button size="mini" @click="cancelDialog">取消</el-button>
          <el-button size="mini" type="primary" @click="cancelDialog"
            >确认申请</el-button
          >
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "articles",
  data() {
    return {
      isSave: false,
      queryTime: [],
      tagArr: [],
      params: {
        pageSize: 10,
        pageNum: 1,
        name: "",
        author: "",
        startTime: "",
        endTime: "",
        tag: "",
        publishStatus: -1,
        username: "",
      },
      tableLoading: false,
      tableData: [],
      tagList: [],
      total: 0,
      selectMenu: [
        {
          lable: "全部",
          value: -1,
        },
        {
          lable: "已发布",
          value: 1,
        },
        {
          lable: "未发布",
          value: 2,
        },
      ],
      applyPublishVisible: false,
      dialogParams: {
        username: "",
        name: "",
        _id: "",
        message: "",
      },
    }
  },
  created() {},
  computed: {
    ...mapGetters(["userInfo"]),
  },
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
      this.params.startTime =
        this.queryTime && this.queryTime.length == 2
          ? this.queryTime[0] - 0
          : ""
      this.params.endTime =
        this.queryTime && this.queryTime.length == 2
          ? this.queryTime[1] - 0
          : ""
      // let tagArr = this.params.tag || []
      this.params.tag = this.tagArr.join(",")
      this.$axios.get("/acticleList", { params: this.params }).then((res) => {
        this.tableData = res.data.list
        this.total = res.data.total
        this.tableLoading = false
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
      let id = row ? row._id : ""
      if (type != "del") {
        this.$router.push({
          name: "articlesDetali",
          query: { type, id },
        })
      } else {
        this.delArticles(id)
      }
    },
    delArticles(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.post("/acticleDel", { _id: id }).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              })
              this.loadData()
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
      this.queryTime = []
      this.tagArr = []
      this.params = {
        pageSize: 10,
        pageNum: 1,
        name: "",
        author: "",
        startTime: "",
        endTime: "",
        tag: "",
        publishStatus: -1,
        username: "",
      }
      if (isReset) {
        this.loadData()
      }
    },
    choiceTag(e) {
      this.tagArr = e
    },
    applyPublish(e) {
      let { name, username, _id } = e
      console.log(e)
      this.dialogParams.username = username
      this.dialogParams._id = _id
      this.dialogParams.name = name
      this.applyPublishVisible = true
    },
    cancelDialog() {
      this.dialogParams.username = ""
      this.dialogParams._id = ""
      this.dialogParams.name = ""
      this.applyPublishVisible = false
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "articlesDetali") {
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
<style lang="scss">
// @import "~@/assets/styles/mixin.scss";
.article {
  .dialogTit {
    font-size: 14px;
    font-weight: bold;
    line-height: 40px;
  }
  .dialogHint {
    font-size: 12px;
    line-height: 30px;
  }
}
</style>