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
    <div>{{ value }}</div>
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
  },
  methods: {
    onChange(file) {},
    beforeMdUpload(file) {
      console.log(file)
      let nameArr = file.name.split(".")
      const isType = nameArr.length > 1 && nameArr[nameArr.length - 1] === "md"
      console.log(isType)
      if (!isType) {
        this.$message.error("上传失败！只能上传md格式的文档！")
      }
      return isType
    },
    onSuccess(res) {
      console.log(res)
      if (res.code == 200) {
        this.$emit("input", res.data.url)
        this.$emit("reuseValidate", true)
      }
    },
  },
}
</script>