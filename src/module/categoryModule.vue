<template>
  <div>
    <el-select style="width:120px" v-model="name" class="tagList">
      <el-option
        v-for="(item,index) in categoryList"
        :value="item.categoryname"
        :key="index"
        :label="item.categoryname"
        @click.native="categorySelect(item)"
      >{{ item.categoryname }}</el-option>
    </el-select>
    <el-select style="width:120px" v-model="childName" class="tagList">
      <el-option
        v-for="(child_item,index) in childList"
        :value="child_item.categoryname"
        :key="index"
        :label="child_item.categoryname"
        @click.native="categoryChildSelect(child_item)"
      >{{ child_item.categoryname }}</el-option>
    </el-select>
    <el-select style="width:120px" v-model="sub_childName" class="tagList">
      <el-option
        v-for="(sub_child_item,index) in sub_childList"
        :value="sub_child_item.categoryname"
        :key="index"
        :label="sub_child_item.categoryname"
        @click.native="categorySubChildSelect(sub_child_item)"
      >{{ sub_child_item.categoryname }}</el-option>
    </el-select>
  </div>
</template>

<script>
import {
  getCategoryList
} from "../api/product";
export default {
  // props: {
  //   categoryList: {
  //     type: Array,
  //     default: []
  //   },
  //   categoryname: String
  // },
  data () {
    return {
      categoryListData: [],
      categoryList: [],
      childList: [],
      sub_childList: [],
      name: '',
      childName: '',
      sub_childName: '',
    }
  },
  created () {
    this.getCategoryList()
  },
  computed: {

  },
  methods: {
    getCategoryList () {
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
    // 一级分类选择
    categorySelect (data) {
      this.childList = []
      this.childName = ''
      this.sub_childName = ''
      this.categoryListData.map(child => {
        if(data._id == child.categoryId) {
          this.childList.push(child)
        }
      })
    },

    // 二级分类选择
    categoryChildSelect(data) {
      this.sub_childList = []
      this.sub_childName = ''
      this.categoryListData.map(child => {
        if(data._id == child.categoryId) {
          this.sub_childList.push(child)
        }
      })
    },

    //三级分类选择
    categorySubChildSelect(data) {
      this.$emit("handleSelectCategory", data._id)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>