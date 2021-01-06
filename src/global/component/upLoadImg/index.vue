<template>
  <div>
    <el-upload
      :action="uploadImgUrl"
      :class="{
        'disabled-upload': type == 'view' || uploadList.length >= limit,
      }"
      list-type="picture-card"
      :limit="limit"
      :before-upload="beforeMdUpload"
      :on-success="onSuccess"
      :file-list="uploadList"
    >
      <i class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }" class="el-upload-list__slot">
        <img :src="file.fileUrl" alt />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="type != 'view'"
            class="el-upload-list__item-download"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
          <!-- <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span> -->
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "upLoadImg",
  data() {
    return {
      uploadImgUrl: "/cms/uploadImg",
      type: this.$route.query.type,
      dialogVisible: false,
      dialogImageUrl: "",
      uploadList: [],
    }
  },
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
    size: {
      default: 1024 * 1024 * 5,
    },
    limit: {
      default: 1,
    },
  },
  watch: {
    fileList: {
      immediate: true,
      handler(newList) {
        if (Array.isArray(newList)) {
          let uploadList = []
          newList.forEach((item) => {
            let fileItem = {
              fileName: item.slice(item.lastIndexOf("/") + 1),
              fileUrl: item,
            }
            uploadList.push(fileItem)
          })
          this.uploadList = uploadList
        }
      },
    },
  },
  methods: {
    onChange(file, fileList) {},
    beforeMdUpload(file) {
      const isType =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif"
      if (!isType) {
        this.$message.error("上传失败！只能上传jpg/png/gif格式的图片！")
        return false
      }
      if (file.size > this.size) {
        this.$message.error(`上传失败！限制大小在${this.size}KB内`)
        return false
      }
      return true
    },
    onSuccess(res) {
      if (res.code == 200) {
        let fileItem = {
          fileName: res.data.name,
          fileUrl: res.data.url,
        }
        this.uploadList.push(fileItem)
        this.$emit("reuseValidateImg", this.uploadList)
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.uploadList.splice(this.uploadList.indexOf(file), 1)
      this.$emit("selectedFile", this.uploadList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.fileUrl
      this.dialogVisible = true
    },
  },
}
</script>
<style lang="scss">
.el-upload-list__slot {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
//上传图片
.el-upload-list__item {
  transition: none !important;
}

// .el-upload-list--picture-card {
//   display: flex;
// }

.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 115px;
}

.disabled-upload {
  .el-upload-list__item-actions:hover {
    .el-upload-list__item-delete {
      display: none;
    }
  }
  .el-upload--picture-card {
    display: none;
  }
}

.el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
  margin: 0;
  margin-right: 10px;
}
</style>