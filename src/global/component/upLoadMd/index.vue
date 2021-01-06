<template>
  <div>
    <el-upload
      ref="uploadMd"
      :action="uploadMdUrl"
      :limit="1"
      :before-upload="beforeMdUpload"
      :on-success="onSuccess"
      v-if="type != 'view' && !value"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div class="el-upload__tip" slot="tip">提示：只能上传md文档</div>
    </el-upload>
    <div v-if="value">
      <el-tag
        size="small"
        type="success"
        :closable="type != 'view'"
        @close="delPath()"
        >{{ value }}</el-tag
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "upLoadMd",
  data() {
    return {
      uploadMdUrl: "/cms/uploadMd",
      type: this.$route.query.type,
    }
  },
  props: {
    value: {
      default: "",
    },
    size:{
      default: 1024*1024,
    }
  },
  methods: {
    onChange(file) {},
    beforeMdUpload(file) {
      let nameArr = file.name.split(".")
      const isType = nameArr.length > 1 && nameArr[nameArr.length - 1] === "md"
      if(file.size > this.size){
        this.$message.error(`上传失败！限制大小在${this.size}KB内`)
        return false
      }
      if (!isType) {
        this.$message.error("上传失败！只能上传md格式的文档！")
      }
      return isType
    },
    onSuccess(res) {
      if (res.code == 200) {
        this.$emit("input", res.data.url)
        this.$emit("reuseValidateMd", true)
      }
    },
    delPath() {
      this.$emit("input", '')
      this.$emit("reuseValidateMd", true)
    },
  },
}
</script>