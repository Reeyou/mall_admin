<template>
  <div>
    <el-form label-width="80px" :model="categoryInfo">
      <el-form-item label="名称">
        <el-input v-model="categoryInfo.label"></el-input>
      </el-form-item>
      <el-form-item label="分类">
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
      <el-form-item label="分类logo" prop="categoryImg">
        <UploadImg
          action="/api/upload"
          @getImgURL="getPicUrl"
          :pic='categoryInfo.categoryImg'
          v-if="categoryInfo.categoryImg.length > 0"
        />
      </el-form-item>
      <el-form-item label="分类类型">
        <el-input v-model="categoryInfo.type"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getCategoryList
} from "../../api/product";
export default {
  props: ['categoryInfoData'],
  data() {
    return {
      value: "",
      childValue: "",
      pic_src: "",
      changeCategoryVisible: false,
      categoryList: [],
      categoryChildList: [],
      categoryListData: [],
      newData: [],
      categoryInfo: {
          label: '1',
          categoryId: '',
          categoryImg: '',
          // type: ''
        }
    };
  },
  created() {
    this.getCategoryList()
  },
  watch: {
    categoryInfoData: {
      handler: (val, newVal) => {
        this.categoryInfo = val
      },
      immediate:true,
      deep:true
    }
  },
  methods: {
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
    getPicUrl(url) {
      // this.pic = url;
      this.categoryInfo.pic = url
    },
    changeCategoryChildName(val) {
      this.categoryInfo.categoryId = val;
    },
  }
};
</script>