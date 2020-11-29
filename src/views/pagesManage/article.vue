<template>
  <el-form ref="articleForm" :model="articleForm" label-width="80px">
    <el-form-item label="文章名称">
      <el-input v-model="articleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="发布时间">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="articleForm.date1"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker
          placeholder="选择时间"
          v-model="articleForm.date2"
          style="width: 100%"
        ></el-time-picker>
      </el-col>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data(){
    return {
      articleForm:{}
    }
  }
}
</script>