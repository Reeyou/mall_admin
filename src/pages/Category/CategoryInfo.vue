<template>
  <div>
    <el-form label-width="80px" :model="categoryInfo">
      <el-form-item label="分类名称">
        <el-input v-model="categoryInfo.categoryname"></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <category-module
          :categoryList="categoryList"
          :categoryCur="categoryCur"
          @handle-select="handleSelect"
        />
      </el-form-item>
      <el-form-item v-if="categoryInfo.categoryImg" label="分类图片" prop="categoryImg">
        <UploadImg
          action="/api/upload"
          @getImgURL="getPicUrl"
          :pic='categoryInfo.categoryImg'
        />
      </el-form-item>
      <el-form-item label="分类类型">
        <el-input v-model="categoryInfo.type"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary">提交</el-button>
      <el-button type="default">重置</el-button>
    </div>
  </div>
</template>

<script>
import {
  getCategoryList
} from "../../api/product";
import UploadImg from "@/components/UploadImg";
import categoryModule from '@/module/categoryModule'
export default {
  props: {
    categoryInfoData: {
      type: Object,
      default: () => {
        return {
          label: "",
          categoryId: ""
        }
      }
    },
    categoryList: {
      type: Array,
      default: () => {
        return []
      }
    },
    categoryCur: Object
  },
  components: {
    UploadImg,
    "category-module": categoryModule
  },
  data() {
    return {
      value: "",
      initId: '',
      initChildId: "",
      childValue: "",
      child2Value: "",
      pic_src: "",
      childVisible: false,
      child2Visible: true,
      categoryListData: [],
      newData: [],
      categoryInfo: {
          label: "",
          categoryId: "",
        }
    };
  },
  created() {
    this.categoryInfo = this.categoryInfoData
    
  },
  watch: {
    categoryInfoData: {
      immediate:true,
      handler(val) {
        this.categoryInfo = val
        val.categoryId == 0 ? this.value = val.label : null
        val.categoryId == 0 ? this.initId = val._id : null
        val.type == 2 ? this.childValue = val.label : null
        val.type == 2 ? this.initChildId = val._id : null
        val.type == 3 ? this.child2Value = val.label : null
        this.childVisible = val.type == 2 || val.type == 3 ? true : false
        this.child2Visible = val.type == 3 ? true : false
      }
    }
  },
  methods: {
    handleSelect(data) {
      console.log(data)
    },
    getPicUrl(url) {
      this.categoryInfo.pic = url
    },
    changeCategoryChildName(val) {
      this.categoryInfo.categoryId = val;
    },
  }
};
</script>
<style lang="scss">
  .btn {
    margin-left: 80px;
  }
</style>