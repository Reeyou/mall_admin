<template>
  <div>
    {{img_url}}
    <el-upload
      action="/api/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :file-list="fileList"
      :on-remove="handleRemove"
      :limit="1"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    img_url: {
      type: String
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [{name: 'test',url: 'http://localhost:3000/images/1584628479628.jpg'}]
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
};
</script>