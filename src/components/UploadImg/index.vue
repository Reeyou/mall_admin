<template>
  <div class="upload">
    <div class="upload_container">
      <div class="icon">
        <el-icon type="ios-add" class="iconfont icon-camera"></el-icon>
        <p>{{label}}</p>
      </div>
      <input
        :data-key="imgKey"
        type="file"
        @change="upload"
        accept="image/jpg, image/jpeg, image/png, image/PNG"
      />
    </div>
    <div class="poster-preview" v-if="uploadStatus">
      <img :src="src" class="poster" alt="封面图片" /> 
      <div class="preview-icon">
        <el-icon v-show='preview' class="el-icon-picture-outline icon" @click.native='handlePreview'></el-icon>
        <el-icon class="el-icon-delete icon" @click.native='handleDelete'/>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import dataURLtoBlob from "@/utils/dataURLtoBlob";
import { instance } from '@/utils/request'
export default {
  props: ['action', 'imgUrl', 'label', 'preview', 'imgKey', 'onSuccess'],
  data() {
    return {
      poster_src: "",
      uploadStatus: false,
      files: '',
      imgData: '',
      dialogVisible: false,
      dialogImgUrl: '',
      test: 'http://localhost:3000/images/1583113535009.jpg'
    };
  },
  computed: {
    src() {
      return this.poster_src ? this.poster_src : this.imgUrl
    }
  },
  created() {
    if(this.imgUrl) {
      this.uploadStatus = true
    }
  },
  methods: {
    upload(e) {
      let self = this;
      self.files = e.target.files[0]
      if (!e || !window.FileReader) return // 看支持不支持FileReader

      let reader = new FileReader()
      reader.readAsDataURL(self.files); // 转换为base64
      reader.onloadend = function() {
        self.poster_src = this.result
        self.uploadStatus = true

        let formdata = new window.FormData()
        let blob = dataURLtoBlob(this.result)
        
        formdata.append("file", blob)

        instance.post(self.action,formdata).then(res => {
          self.imgData = res.data.data
          self.onSuccess(e,self.imgData)
        })
      };
    },
    handlePreview() {
      this.dialogVisible = true
      this.dialogImgUrl = this.imgUrl
    },
    handleDelete() {
      this.$emit("handleDelete")
      this.poster_src = ''
      this.files = ''
      this.uploadStatus = false
    }
  }
};
</script>

<style lang="scss">
@import './index.scss';
</style>