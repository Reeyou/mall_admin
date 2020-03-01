<template>
  <div class="addContent">
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
        <UploadImg action="/api/upload" @getImgURL="getImgURL" />
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
  </div>
</template>

<script>
import {createSku} from '../../api/product'
import UploadImg from "@/components/UploadImg";
export default {
  name: 'sku',
  components: {
    UploadImg
  },
  props: {
    spuId: String
  },
  data() {
    return {
      visible: false,
      skuData: JSON.parse(localStorage.getItem('allSkuData')) || [],
      width: 1080,
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
    this.skuTableVisible()
  },
  methods: {
    skuTableVisible() {
      if(this.skuData.length == 0) return
      this.visible = true
    },
    handleInitSku() {
      this.$emit('handleSku')
      this.$refs["skuForm"].validate(valid => {
        if (valid) {
          this.visible = true
          const {color,version,price,num,subPics} = this.skuForm
          const params = {
            spuId: this.spuId,
            color,
            version,
            price,
            num,
            subPics
          }
          console.log(params)
          this.$refs["skuForm"].resetFields();
          let allSkuData = JSON.parse(localStorage.getItem('allSkuData')) || {skuId: '',skuList: []}
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
    getImgURL(url) {
      this.skuForm.subPics.push(url);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>