<template>
  <div class="detail-wrap">
    <el-card class="box-card">
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="游戏主题：" prop="name">
          <el-input
            size="small"
            v-model="form.name"
            placeholder=""
            :maxlength="20"
          ></el-input>
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
  name:'articleDetali',
  data() {
    return {
      form: {},
      rules:{},
      isEdit: false
    }
  },
  methods:{
    save(){
      console.log('aaa')
      let obj = {
        aaa: 'bbb'
      }
      this.$axios.post('/acticleAdd',obj)
    }
  },
  beforeRouteLeave(to, from, next) {
    from.meta.isEdit = this.isEdit;
    next();
  },
  
}
</script>