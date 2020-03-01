<template>
  <div class="addContent">
    <div class="title">
      <h2>商品新增</h2>
    </div>
    <label class='label'>商品属性</label>
    <el-form
      ref="productForm"
      :model="productForm"
      :rules="productRule"
      label-width="100px"
      class="addForm"
      label-position="left">
      <el-form-item label="商品id" prop="spuId">
        <el-input v-model="productForm.spuId" placeholder="请输入商品id"/>
      </el-form-item>
      <el-form-item label="标题" prop="name">
        <el-input v-model="productForm.name" placeholder="请输入商品名称"/>
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <el-input
          v-model="productForm.desc"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请输入商品描述"
        />
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select style="width:200px" v-model='value' class='tagList'>
          <el-option
            v-for="(item,index) in categoryList"
            :value="item.categoryname"
            :key="index"
            :label="item.categoryname"
            @click.native='changeCategoryName(item.categoryname)'
          >{{ item.categoryname }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品主图" prop="pic">
        <UploadImg
          action="/api/upload"
          @getImgURL="getPicUrl"
        />
      </el-form-item>
      <el-form-item label="商品详情图" prop="detailPic">
        <UploadImg
          action="/api/upload"
          @getImgURL="getDetailPicUrl"
        />
      </el-form-item>
    </el-form>
    <!-- sku -->
    <label class="label">商品sku</label>
    <el-form
      ref="skuForm"
      :model="skuForm"
      :rules="skuRule"
      label-width="100px"
      class="addForm"
      label-position="left"
    >
      <el-form-item label="颜色" prop="color">
        <el-input v-model="skuForm.color" placeholder="请输入商品颜色" />
      </el-form-item>
      <el-form-item label="版本号" prop="version">
        <el-input v-model="skuForm.version" placeholder="请输入版本号" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="skuForm.price" placeholder="请输入商品价格" />
      </el-form-item>
      <el-form-item label="库存" prop="num">
        <el-input v-model="skuForm.num" placeholder="请输入商品库存" />
      </el-form-item>
      <el-form-item label="商品副图" prop="subPics">
        <UploadImg action="/api/upload" @getImgURL="getSkuImgUrl" />
      </el-form-item>
    </el-form>
    <el-button class="btn" @click="handleInitSku" icon="ios-add" type="primary">生成商品sku</el-button>
    <el-table v-show='visible' class="sku_table" :data="skuData" border :style="{width: width}">
      <el-table-column
        v-for="(column, index) in skuColumns"
        :key="index"
        :prop="column.key"
        :label="column.label"
        :width="column.width"
        align="center"
        fit
      ></el-table-column>
    </el-table>
    <el-button class="btn submit" @click=" handleSubmit" icon="ios-add" type="primary">提交</el-button>
  </div>
</template>

<script>
import {getCategoryList,createSku} from '../../api/product'
import UploadImg from "@/components/UploadImg";
import Sku from './sku'
export default {
  components: {
    UploadImg,
    Sku
  },
  data() {
    return {
      value: '',
      tagList: [],
      visible: false,
       width: 1080,
      skuData: JSON.parse(localStorage.getItem('allSkuData')).skuList || [],
      categoryList: [],
      spuId: "",
      productForm: {
        spuId: "",
        name: "",
        desc: "",
        pic: "",
        detailPic: [],
        category: "",
      },
      productRule: {
        spuId: [
          {
            required: true,
            message: "商品id不能为空",
            trigger: "blur"
          }
        ],
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
        // category: [{ required: true, message: "商品分类不能为空", trigger: "blur" }],
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
      skuColumns: [
        {
          label: "skuId",
          key: "skuId",
          width: 400
        },
        {
          label: "颜色",
          key: "color",
          width: 400
        },
        {
          label: "版本号",
          key: "version",
          width: 400
        },
        {
          label: "价格",
          key: "price",
          width: 400
        },
        {
          label: "库存",
          key: "num",
          width: 400
        },
        {
          label: "商品副图",
          key: "subPics",
          width: 400
        }
      ],
      skuForm: {
        color: "", //颜色
        version: "", // 版本
        price: "", // 价格
        subPics: [], // 图片
        num: ""
      },
      skuRule: {
        color: [
          {
            required: true,
            message: "商品颜色不能为空",
            trigger: "blur"
          }
        ],
        version: [
          {
            required: true,
            message: "商品描述不能为空",
            trigger: "blur"
          }
        ],
        price: [
          { required: true, message: "商品价格不能为空", trigger: "blur" }
        ],
        // subPics: [
        //   {
        //     required: true,
        //     message: "商品副图不能为空",
        //     trigger: "change"
        //   }
        // ],
        num: [{ required: true, message: "商品库存不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
   this.getCategoryList()
   this.skuTableVisible()
  },
  methods: {
    skuTableVisible() {
      if(this.skuData.length == 0) return
      this.visible = true
    },
    handleInitSku() {
       this.$refs["productForm"].validate(valid => {
         if(valid) {
           this.spuId = this.productForm.spuId
           console.log(this.spuId)
         }
       })
      this.$refs["skuForm"].validate(valid => {
        if (valid) {
          this.visible = true
          const {color,version,price,num,subPics} = this.skuForm
          const params = {
            color,
            version,
            price,
            num,
            subPics
          }
          this.$refs["skuForm"].resetFields();
          let allSkuData = JSON.parse(localStorage.getItem('allSkuData')) || {spuId: this.spuId,skuList: []}
          allSkuData.spuId = this.spuId
          allSkuData.skuList.push(params)
          console.log(allSkuData)
          createSku(allSkuData).then(res => {
            if(res.code == 200) {
              allSkuData.skuId = res.data
             localStorage.setItem('allSkuData',JSON.stringify(allSkuData))
            }
          })
          
          this.skuData = JSON.parse(localStorage.getItem('allSkuData'))
          console.log(this.skuData)
        }
      })
    },
    getCategoryList() {
      getCategoryList().then(res => {
        if(res.code == 200) {
          this.categoryList = res.data.list
        }
      })
    },
    getPicUrl(url) {
      // this.pic = url;
      this.productForm.pic = url
    },
    getDetailPicUrl(url) {
      this.productForm.detailPic = url
    },
    getSkuImgUrl(url) {
      this.skuForm.subPics.push(url);
    },
    changeCategoryName(val) {
      this.productForm.category = val
    },
    // 提交
    handleSubmit() {
      this.$refs["productForm"].validate(valid => {
        if (valid) {
          const {spuId,name,desc,pic,detailPic,category} = this.productForm
          const params = {
            spuId,
            name,
            desc,
            pic,
            detailPic,
            category
          }
          const skuList = JSON.parse(localStorage.getItem('allSkuData'))
          params.skuList = skuList
          console.log(params)
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
@import './index.scss';
</style>