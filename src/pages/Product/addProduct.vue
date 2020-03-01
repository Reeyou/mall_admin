<template>
  <div class="addContent">
    <div class="title">
      <h2>文章新增</h2>
      <p>add blog article</p>
    </div>
    <el-form
      ref="articleForm"
      :model="articleForm"
      :rules="articleRule"
      label-width="100px"
      class="addForm"
      label-position="left" 
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="articleForm.title" placeholder="请输入文章标题"/>
      </el-form-item>
      <el-form-item label="文章描述" prop="desc">
        <el-input
          v-model="articleForm.desc"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请输入文章描述"
        />
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-select style="width:200px" v-model='value' class='tagList'>
          <el-option
            v-for="(item,index) in tagList"
            :value="item.tagname"
            :key="index"
            :label="item.tagname"
            @click.native='changeTag(item.tagname)'
          >{{ item.tagname }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面图" prop="poster_src">
        <UploadImg
          action="/api/upload"
          @getImgURL="getImgURL"
        />
      </el-form-item>
      <el-form-item class='editor' label="文章正文" prop="content">
      </el-form-item>
    </el-form>
    <el-button class="btn" @click=" handleSubmit" icon="ios-add" type="primary">提交</el-button>
  </div>
</template>

<script>
// import { addArticle } from "@/service/article";
// import { getTagList } from "@/service/tag";
import UploadImg from "@/components/UploadImg";
export default {
  components: {
    UploadImg
  },
  data() {
    return {
      value: '',
      tagList: [],
      poster_src: "",
      content: "", // 输入的markdown
      html: "", // 及时转的html
      visible: false,
      articleForm: {
        title: "",
        desc: "",
        poster_src: "",
        tag: "",
      },
      articleRule: {
        title: [
          {
            required: true,
            message: "文章标题不能为空",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "文章描述不能为空",
            trigger: "blur"
          }
        ],
        poster_src: [
          {
            required: true,
            message: "封面图不能为空",
            trigger: "change"
          }
        ],
        tag: [{ required: true, message: "文章标签不能为空", trigger: "blur" }],
        content: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.getTagData()
  },
  methods: {
    getTagData() {
      // getTagList().then(res => {
      //   if(res.code == 200) {
      //     this.tagList = res.data.list
      //   }
      // })
    },
    getImgURL(url) {
      this.poster_src = url;
      this.articleForm.poster_src = url
    },
    // 所有操作都会被解析重新渲染
    mavonChange(value, render) {
      this.content = value
      this.html = render;
    },
    changeTag(val) {
      this.articleForm.tag = val
    },
    // 提交
    handleSubmit() {
      this.$refs["articleForm"].validate(valid => {
        console.log(this.content)
        if (valid) {
          const data = this.articleForm
          const params = {
            title: data.title,
            desc: data.desc,
            poster: data.poster_src,
            tag: data.tag,
            content: this.html
          }
          // addArticle(params).then(res => {
          //   if(res.code == 200) {
          //     // this.$Message.success("添加成功!")
          //   } else {
          //     // this.$Message.error("添加失败!");
          //   }
          // })
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "../../assets/css/markdown.css";
.addContent {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 30px 0 20px;
  .title {
    padding-left: 10px;
    h2 {
      // border-bottom: none;
      font-size: 20px;
      font-weight: bold;
    }
    p {
      font-size: 12px;
      color: #aaa;
      margin: 10px 0 20px 0;
    }
  }
  .addForm {
    .el-input,.el-textarea {
      width: 400px;
    }
  }
  .btn {
    margin-left: 80px;
  }
}
.v-note-wrapper {
  z-index: 0;
}
@media screen and(max-width: 900px) {
  .addContent {
    padding: 0;
    .addForm {
      .el-input,.el-textarea {
        width: 100%;
      }
      .editor {
        // background: #000;
        .el-form-item__label{
          color: red;
        }
      }
    }
  }
  .v-note-wrapper {
    float: left;
    min-width: 0; 
    z-index: 0;
  }
}
</style>