<template>
  <div class="product-prop">
    <div class="steps">
      <div class="steps-progress">
        <ul>
          <li class='num'>1</li>
          <li class='line'></li>
          <li class='num'>2</li>
          <li class='line'></li>
          <li class='num'>3</li>
        </ul>
      </div>
      <div class="step">
        <h1>一、填写商品信息</h1>
        <ul>
          <li>商品基本信息</li>
          <li>商品参数</li>
          <li>商品属性</li>
        </ul>
      </div>
    </div>
   <div class="content">
      <div class="title">
      <h2>{{title}}</h2>
    </div>
    <label class="label">商品属性</label>
    <el-form
      ref="productForm"
      :model="productForm"
      :rules="productRule"
      label-width="100px"
      class="addForm"
      label-position="left">
      <el-form-item label="商品id" prop="spuId">
        <el-input v-model="productForm.spuId" placeholder="请输入商品id" />
      </el-form-item>
      <el-form-item label="商品标题" prop="name">
        <el-input v-model="productForm.name" placeholder="请输入商品名称" />
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <el-input
          v-model="productForm.desc"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请输入商品描述"
        />
      </el-form-item>
      <!-- <el-form-item label="分类" prop="categoryId">
        <category-module :categoryId="productForm.categoryId" @handleSelectCategory="handleSelectCategory" />
      </el-form-item> -->
      <!-- <el-form-item label="商品主图" prop="pic">
        <UploadImg action="/api/upload" @getImgURL="getPicUrl" :pic="productForm.pic"/>
      </el-form-item>
      <el-form-item label="商品详情图" prop="detailPic">
        <el-upload
          action="/api/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :file-list="detailPicList"
          :on-remove="handleRemove"
          :on-change="getDetailPicUrl"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item> -->
    </el-form>
    <!-- sku -->
    <Sku />
    <el-button class="btn submit" @click=" handleSubmit" icon="ios-add" type="primary">提交</el-button>
   </div>
  </div>
</template>

<script>
import PageTable from "@/components/Page/pageTable";
import {
  getCategoryList,
  createSku,
  getSku,
  addProduct
} from "../../api/product";
import UploadImg from "@/components/UploadImg";
import Sku from "./sku";
import CategoryModule from "@/module/categoryModule"
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    UploadImg,
    Sku,
    PageTable,
    "category-module": CategoryModule
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      value: "",
      childValue: "",
      tagList: [],
      visible: false,
      width: 1080,
      skuData: [],
      categoryList: [],
      categoryChildList: [],
      changeCategoryVisible: false,
      categoryListData: [],
      detailPics: [],
      detailPicList: [],
      productForm: {
        spuId: '',
        categoryId: '',
        name: '',
        desc: '',
        pic: ''
      },
      productRule: {
        spuId: [
          {
            required: true,
            message: "商品id不能为空",
            trigger: "blur"
          }
        ]
        // name: [
        //   {
        //     required: true,
        //     message: "商品名称不能为空",
        //     trigger: "blur"
        //   }
        // ],
        // desc: [
        //   {
        //     required: true,
        //     message: "商品描述不能为空",
        //     trigger: "blur"
        //   }
        // ],
        // categoryId: [{ required: true, message: "商品分类不能为空", trigger: "blur" }],
        // pic: [
        //   {
        //     required: true,
        //     message: "商品主图不能为空",
        //     trigger: "change"
        //   }
        // ],
        // detailPic: [
        //   {
        //     required: true,
        //     message: "商品详情图不能为空",
        //     trigger: "change"
        //   }
        // ],
      },
      skuForm: {},
      title: JSON.parse(localStorage.getItem("productInfo")).title || ''
    };
  },
  created () {
    this.productForm = JSON.parse(localStorage.getItem("productInfo")).scope || []
    this.productForm&&this.productForm.detailPic.forEach((item,index) => {
      let picObj = {}
      picObj.name=index
      picObj.url=item
      this.detailPicList.push(picObj)
    })
  },
  methods: {
    //  translate () {
    //    console.log(process.env)
    //    document.cookie = 'LMTBID=c548b635-06dc-46c3-b365-85068b869405|c321a72294a0f2d76d08813109b75603;domain=.deepl.com'
    //    document.cookie = '_ga=GA1.2.1520949857.1586914809;domain=.deepl.com'
    //    document.cookie = '_gid=GA1.2.1743258476.1587024825;domain=.deepl.com'
    //   //  document.cookie = 'LMTBID=c548b635-06dc-46c3-b365-85068b869405|c321a72294a0f2d76d08813109b75603;
    //   // _ga=GA1.2.1520949857.1586914809;
    //   // _gid=GA1.2.1743258476.1587024825'
    //    const data = {
    //     id: 29020011,
    //     jsonrpc: '2.0',
    //     method: 'LMT_handle_jobs',
    //     params: {
    //       commonJobParams: {},
    //       jobs: [{ kind: 'default', raw_en_sentence: '这里', raw_en_context_before: [], raw_en_context_after: [] }],
    //       lang: { user_preferred_langs: ['EN', 'ZH'], source_lang_user_selected: 'auto', target_lang: 'EN' },
    //       priority: -1,
    //       timestamp: 1587024908305
    //     }
    //    }
    //   axios.defaults.withCredentials = true
    //   axios.post('/api/jsonrpc', data).then(res => {
    //     console.log(res)
    //   })
    // },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSelectCategory(id) {
      this.productForm.categoryId = id
    },
    skuTableVisible () {
      if (this.skuData.length == 0) return;
      this.visible = true;
    },
    // handleInitSku () {
    //   this.$refs["productForm"].validate(valid => {
    //     if (valid) {
    //       this.spuId = this.productForm.spuId;
    //       console.log(this.spuId);
    //     }
    //   });
    //   this.$refs["skuForm"].validate(valid => {
    //     if (valid) {
    //       this.visible = true;
    //       const { color, version, price, num, subPics } = this.skuForm;
    //       const params = {
    //         color,
    //         version,
    //         price,
    //         num,
    //         subPics
    //       };
    //       this.$refs["skuForm"].resetFields();
    //       let data = { skuList: [] }
    //       data.spuId = this.spuId;
    //       data.skuList.push(params);
    //       createSku(data).then(res => {
    //         if (res.code == 200) {
    //           // sessionStorage.removeItem("allSkuData")
    //           // sessionStorage.setItem("allSkuData", data);
    //           // let allSkuData = sessionStorage.getItem("allSkuData");
    //           console.log(data)
    //           this.skuData = data.skuList
    //           console.log(this.skuData);
    //         }
    //       });
    //     }
    //   });
    // },
    getPicUrl (url) {
      // this.pic = url;
      this.productForm.pic = url;
    },
    getDetailPicUrl (file, fileList) {
      if (file.response) {
        this.productForm.detailPic.push(file.response.data)
      }
    },
    getSkuImgUrl (file) {
      if (file.response) {
        this.detailPics.push(file.response.data)
        this.skuForm.subPics.push(file.response.data);
      }
    },
    // 提交
    handleSubmit () {
      this.$refs["productForm"].validate(valid => {
        if (valid) {
          addProduct(this.productForm).then(res => {
            if (res.code == 200) {
              // this.$Message.success("添加成功!")
            } else {
              // this.$Message.error("添加失败!");
            }
          });
        }
      });
    },
    handleEdit (scope) {

    },
    handleDelete (scope) {

    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>