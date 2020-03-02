<template>
  <div class="addContent">
    <div class="title">
      <h2>商品新增</h2>
    </div>
    <label class="label">商品属性</label>
    <el-form
      ref="productForm"
      :model="productForm"
      :rules="productRule"
      label-width="100px"
      class="addForm"
      label-position="left"
    >
      <el-form-item label="商品id" prop="spuId">
        <el-input v-model="productForm.spuId" placeholder="请输入商品id" />
      </el-form-item>
      <el-form-item label="标题" prop="name">
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
      <el-form-item label="分类" prop="categoryId">
        <el-select style="width:200px" v-model="value" class="tagList">
          <el-option
            v-for="(item,index) in categoryList"
            :value="item.categoryname"
            :key="index"
            :label="item.categoryname"
            @click.native="changeCategoryName(item._id,item.categoryId)"
          >{{ item.categoryname }}</el-option>
        </el-select>
        <el-select
          style="width:200px"
          v-model="childValue"
          v-show="changeCategoryVisible"
          class="tagList"
        >
          <el-option
            v-for="(item,index) in categoryChildList"
            :value="item.categoryname"
            :key="index"
            :label="item.categoryname"
            @click.native="changeCategoryChildName(item._id)"
          >{{ item.categoryname }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品主图" prop="pic">
        <UploadImg action="/api/upload" @getImgURL="getPicUrl" />
      </el-form-item>
      <el-form-item label="商品详情图" prop="detailPic">
        <el-upload
          action="/api/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="getDetailPicUrl">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
        <el-upload
          action="/api/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="getSkuImgUrl">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-button class="btn" @click="handleInitSku" icon="ios-add" type="primary">生成商品sku</el-button>
    <PageTable
      v-show='visible'
      :tbData='skuData'
      :columns='skuColumns'
    />
    <el-button class="btn submit" @click=" handleSubmit" icon="ios-add" type="primary">提交</el-button>
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
export default {
  components: {
    UploadImg,
    Sku,
    PageTable
  },
  data() {
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
      spuId: "",
      detailPics: [],
      productForm: {
        spuId: "",
        name: "",
        desc: "",
        pic: "",
        detailPic: [],
        categoryId: ""
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
      skuColumns: [
        {
          label: "skuId",
          prop: "skuId",
          width: 100
        },
        {
          label: "颜色",
          prop: "color",
          width: 120
        },
        {
          label: "版本号",
          prop: "version",
          width: 120
        },
        {
          label: "价格",
          prop: "price",
          width: 120
        },
        {
          label: "库存",
          prop: "num",
          width: 120
        },
        {
          label: "商品副图",
          prop: "subPics",
          width: 400,
          type: 'pic'
        },
        {
          label: "操作",
          handle: [
            {icon: 'el-icon-edit', type:'primary',clickFun: this.handleEdit },
            {icon: 'el-icon-delete', type:'danger',clickFun: this.handleDelete },
          ]
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
    this.getCategoryList();
    this.skuTableVisible();
  },
  methods: {
    // getSku() {
    //   const params = {
    //     spuId: this.spuId
    //   }
    //   getSku(params).then()
    // },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    skuTableVisible() {
      if (this.skuData.length == 0) return;
      this.visible = true;
    },
    handleInitSku() {
      this.$refs["productForm"].validate(valid => {
        if (valid) {
          this.spuId = this.productForm.spuId;
          console.log(this.spuId);
        }
      });
      this.$refs["skuForm"].validate(valid => {
        if (valid) {
          this.visible = true;
          const { color, version, price, num, subPics } = this.skuForm;
          const params = {
            color,
            version,
            price,
            num,
            subPics
          };
          this.$refs["skuForm"].resetFields();
          let data = {skuList: []}
          data.spuId = this.spuId;
          data.skuList.push(params);
          createSku(data).then(res => {
            if (res.code == 200) {
              // sessionStorage.removeItem("allSkuData")
              // sessionStorage.setItem("allSkuData", data);
              // let allSkuData = sessionStorage.getItem("allSkuData");
              console.log(data)
              this.skuData = data.skuList
              console.log(this.skuData);
            }
          });

          
        }
      });
    },
    getCategoryList() {
      getCategoryList().then(res => {
        if (res.code == 200) {
          this.categoryListData = res.data.list;
          res.data.list.map((i, index) => {
            if (i.type == "1") {
              this.categoryList.push(i);
            }
          });
        }
      });
    },
    getPicUrl(url) {
      // this.pic = url;
      this.productForm.pic = url;
    },
    getDetailPicUrl(file,fileList) {
      if(file.response) {
        this.productForm.detailPic.push(file.response.data)
      }
    
    },
    getSkuImgUrl(file) {
      if(file.response) {
        this.detailPics.push(file.response.data)
        this.skuForm.subPics.push(file.response.data);
      }
    },
    changeCategoryName(_id, categoryId) {
      // this.productForm.categoryId = _id
      this.changeCategoryVisible = true;
      this.categoryChildList = [];
      this.categoryListData.map((i, index) => {
        if (i.type == "2" && String(_id) == String(i.categoryId)) {
          this.categoryChildList.push(i);
        }
      });
    },
    changeCategoryChildName(val) {
      this.productForm.categoryId = val;
    },
    // 提交
    handleSubmit() {
      this.$refs["productForm"].validate(valid => {
        if (valid) {
          const {
            spuId,
            name,
            desc,
            pic,
            detailPic,
            categoryId
          } = this.productForm;
          const params = {
            spuId,
            name,
            desc,
            pic,
            detailPic,
            categoryId
          };
          addProduct(params).then(res => {
            if (res.code == 200) {
              // this.$Message.success("添加成功!")
            } else {
              // this.$Message.error("添加失败!");
            }
          });
        }
      });
    },
     handleEdit(scope) {

    },
    handleDelete(scope) {

    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>