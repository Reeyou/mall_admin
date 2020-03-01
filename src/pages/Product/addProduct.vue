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
            v-for="(item,index) in tagList"
            :value="item.tagname"
            :key="index"
            :label="item.tagname"
            @click.native='changeTag(item.tagname)'
          >{{ item.tagname }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品主图" prop="pic">
        <UploadImg
          action="/api/upload"
          @getImgURL="getImgURL"
        />
      </el-form-item>
      <el-form-item label="商品详情图" prop="detailPic">
        <UploadImg
          action="/api/upload"
          @getImgURL="getImgURL"
        />
      </el-form-item>
    </el-form>
    <!-- sku -->
    <Sku/>
    <el-button class="btn submit" @click=" handleSubmit" icon="ios-add" type="primary">提交</el-button>
  </div>
</template>

<script>
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
      skuTableVisible: false,
      skuColumns: [
        {
          label: "skuId",
          key: "skuId",
          width: 120
        },
        {
          label: "颜色",
          key: "color",
          width: 120
        },
        {
          label: "版本号",
          key: "version",
          width: 120
        },
        {
          label: "价格",
          key: "price",
          width: 120
        },
        {
          label: "库存",
          key: "num",
          width: 120
        },
        {
          label: "商品副图",
          key: "subPics",
          width: 480
        }
      ],
      productForm: {
        name: "",
        desc: "",
        pic: "",
        detailPic: [],
        category: "",
      },
      skuForm: {
        color: "", //颜色
        version: "", // 版本
        price: "", // 价格
        pics: [] // 图片
      },
      productRule: {
        name: [
          {
            required: true,
            message: "商品名称不能为空",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "商品描述不能为空",
            trigger: "blur"
          }
        ],
        category: [{ required: true, message: "商品分类不能为空", trigger: "blur" }],
        pic: [
          {
            required: true,
            message: "商品主图不能为空",
            trigger: "change"
          }
        ],
        detailPic: [
          {
            required: true,
            message: "商品详情图不能为空",
            trigger: "change"
          }
        ],
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
      this.productForm.poster_src = url
    },
    // 所有操作都会被解析重新渲染
    mavonChange(value, render) {
      this.content = value
      this.html = render;
    },
    changeTag(val) {
      this.productForm.tag = val
    },
    // 提交
    handleSubmit() {
      this.$refs["productForm"].validate(valid => {
        console.log(this.content)
        if (valid) {
          const data = this.productForm
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
@import './index.scss';
</style>