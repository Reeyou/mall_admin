<template>
  <div class="upload">
    <div class="upload_container">
      <div class="icon">
        <el-icon type="ios-add" class="el-icon-plus add-icon"></el-icon>
        <p>上传图片</p>
      </div>
      <input
        type="file"
        id="image"
        @change="upload"
        accept="image/jpg, image/jpeg, image/png, image/PNG"
      />
    </div>
    <div class="poster-preview" v-if="uploadStatus">
      <img :src="renderPic" class="poster" alt="封面图片" /> 
      <div class="preview-icon">
        <el-icon class="el-icon-picture-outline icon" @click.native='handlePreview'></el-icon>
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
  props: ['action', 'pic'],
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
    renderPic() {
      return this.poster_src ? this.poster_src : this.pic
    }
  },
  created() {
    if(this.pic) {
      this.uploadStatus = true
    }
    console.log("pic:" + this.pic)
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
          self.$emit('getImgURL',self.imgData);
        })
      };
    },
    handlePreview() {
      this.dialogVisible = true
      this.dialogImgUrl = this.pic
    },
    handleDelete() {
      console.log(1)
      this.poster_src = ''
      this.files = ''
      this.uploadStatus = false
      document.querySelector('#image').innerHTML = ''
    }
  }
};
</script>

<style lang="scss">
@import './index.scss';
</style>