<template>
  <div>
    <div class="step-header">
      <ul>
        <li :class="[is_cur ? 'selected' : '']">一、编辑商品信息</li>
        <li :class="[!is_cur ? 'selected' : '']">二、编辑商品详情</li>
      </ul>
    </div>
    <AddProductInfo v-show='is_cur' @next-click="stepClick"/>
    <AddProductDetail v-show='!is_cur' @prev-click="stepClick"/>
  </div>
</template>

<script>
import PageTable from "@/components/Page/pageTable";
import AddProductInfo from './addProductInfo'
import AddProductDetail from './addProductDetail'
import {
  getCategoryList,
  createSku,
  getSku,
  addProduct
} from "../../../api/product";
import UploadImg from "@/components/UploadImg";
import Sku from "../sku";
import axios from 'axios'
import qs from 'qs'
import { VueEditor } from "vue2-editor";
export default {
  components: {
    UploadImg,
    Sku,
    PageTable,
    VueEditor,
    AddProductInfo,
    AddProductDetail
  },
  data () {
    return {
      skuList: [],
      content: "",
      value: '',
      logisticsRadio: '1',
      saleRadio: '3',
      logisticsValue: '￥',
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
        sku: []
      },
      is_cur: true,
      skuForm: {},
      title: JSON.parse(localStorage.getItem("productInfo")).title || ''
    };
  },
  created () {
    this.productForm = JSON.parse(localStorage.getItem("productInfo")).scope || []
    this.productForm.length > 0 && this.productForm.detailPic.forEach((item, index) => {
      let picObj = {}
      picObj.name = index
      picObj.url = item
      this.detailPicList.push(picObj)
    })
  },
  computed: {
      newSkuList() {
        return Array.from(new Set(this.skuList))
      }
  },
  methods: {
    stepClick(val) {
        console.log(val)
        this.is_cur = val
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSelectCategory (id) {
      this.productForm.categoryId = id
    },
    skuTableVisible () {
      if (this.skuData.length == 0) return;
      this.visible = true;
    },
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
    handleSubmit (data) {
      this.productForm.sku = data
      console.log(data)
      this.skuList = []
      data.map((item, i) => {
        //   if(data[i].color==data[i-1].color) return
          this.skuList.push(item.color) 
      })
      
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

    },
     stepClickOne () {
         if(this.stepOneBoolean) {
            this.stepOneBoolean = !this.stepOneBoolean
            this.stepTwoBoolean = false
        } else {
            this.stepOneBoolean = true
            this.stepTwoBoolean = true
        }
    },
    stepClickTwo () {
        if(this.stepTwoBoolean) {
            this.stepTwoBoolean = !this.stepTwoBoolean
            this.stepOneBoolean = false
        } else {
            
        }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>