<template>
  <div>
    <el-form label-width="80px" ref='form' :model="categoryInfo" :rules="rules">
      <el-form-item label="分类名称" prop="categoryname">
        <el-input v-model="categoryInfo.categoryname"></el-input>
      </el-form-item>
      <el-form-item v-if="Number(categoryInfo.type) > 1" label="所属分类">
        <el-input disabled v-model="currentname"></el-input>
      </el-form-item>
      <el-form-item v-if="categoryInfo.type == '3'" label="分类图片" prop="categoryImg">
        <UploadImg
          action="/api/upload"
          @getImgURL="getPicUrl"
          :pic='categoryInfo.categoryImg'
          @handleDelete="handleDeleteImg"
        />
      </el-form-item>
      <!-- <el-form-item label="分类类型">
        <el-input v-model="categoryInfo.type"></el-input>
      </el-form-item> -->
    </el-form>
    <div class="btn">
      <el-button type="primary" :loading="loading" @click="onChange">提交修改</el-button>
      <el-button type="default">重置</el-button>
      <el-button type="danger" @click="onDelete">删除</el-button>
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
    categoryCur: Object,
    loading: Boolean
  },
  components: {
    UploadImg,
    "category-module": categoryModule
  },
  data() {
    return {
      pic_src: "",
      childVisible: false,
      child2Visible: true,
      categoryListData: [],
      categoryInfo: {
        categoryImg: "",
        categoryId: "",
      },
      currentname: "",
      rules: {
        categoryname: [
          {
            required: true,
            message: "分类名称不能为空",
            trigger: "blur"
          }
        ],
        categoryImg: [
          {
            required: true,
            message: "分类图片不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.categoryInfo = JSON.parse( JSON.stringify(this.categoryInfoData))
    
  },
  watch: {
    categoryInfoData: {
      immediate:true,
      handler(val) {
        this.categoryInfo = val
        this.categoryList.map((item,index) => {
          if(item._id == this.categoryInfo.categoryId) {
              this.currentname = item.categoryname
            }
          item.children.map((_item,_index) => {
            if(_item._id == this.categoryInfo.categoryId) {
              this.currentname = _item.categoryname
            }
          })
        })
      }
    }
  },
  methods: {
    handleSelect(data) {
      console.log(data)
    },
    handleDeleteImg() {
      this.categoryInfo.categoryImg = ""
    },
    onChange() {
      this.$emit("handleChange",this.categoryInfo)
    },
    onDelete() {
      this.$emit("handleDelete",this.categoryInfo._id)
    },
    getPicUrl(url) {
      this.categoryInfo.categoryImg = url
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