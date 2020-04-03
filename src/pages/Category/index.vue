<template>
  <div>
    <!-- 标题 -->
    <PageHeader
      title="分类列表"
      :addBtn="{label: '添加分类',onAdd: addCategory}"
    />
    <div class="category-tree">
      <CategoryTree @handleSubmit="handleSubmit" :data="initData" />
    </div>
    <div class="category-info">
      <CategoryInfo
        v-if="Object.keys(categoryInfoData).length > 0"
        :categoryInfoData="categoryInfoData"
        :categoryList="initData"
        :categoryCur="categoryInfoData"
      />
    </div>
    <el-dialog title="添加分类名称" width="500px" :visible.sync="addVisible">
      <el-form :model="categoryForm" ref="categoryForm">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="categoryForm.name" :style="{width: '300px'}" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddCancel">取 消</el-button>
        <el-button type="primary" @click="handleAddOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bus from "./bus"
import PageHeader from "@/components/Page/pageHeader";
import UploadImg from "@/components/UploadImg";
import CategoryInfo from "./CategoryInfo";
import CategoryTree from "./categoryTree";
import { addCategory, getCategoryList } from "@/api/product";
export default {
  data() {
    return {
      categoryForm: {
        name: ""
      },
      value: "",
      childValue: "",
      categoryInfoData: {},
      categoryList: [],
      formLabelWidth: "100px",
      addVisible: false,
      loading: true,
      tbData: [],
      initData: [],
    };
  },
  created() {
    this.getData();
    bus.$on("node-click", (node) => {
      this.categoryInfoData = node
    })
  },
  methods: {
    // handleNodeClick(node) {
    //   this.categoryInfoData = node
    // },
    handleSubmit(data) {
      console.log(data)
    },
    getPicUrl(url) {
      this.categoryChild2Form.category_img = url;
    },
    selectCategory(val) {
      this.categoryChildForm.categoryId = val;
      this.categoryList2Selected = []
      this.categoryList2.map((item,index) => {
        item.categoryId == val ? this.categoryList2Selected.push(item) : null
      })
      console.log(this.categoryList2Selected)
    },
    selectCategoryChild(val) {
      this.categoryChild2Form.categoryId = val;
      
    },
    getData() {
      getCategoryList().then(res => {
        if (res.code == 200) {
          this.loading = false;
          let categoryChildData = [];
          this.tbData = res.data.list;
          this.renderCategory()
        }
      })
    },
    renderCategory() {
      this.allData = []
      this.categoryList1 = [];
      this.categoryList2 = [];
      this.tbData.map((i, index) => {
        if (i.type == "1") {
          this.categoryList1.push(i);
          this.$set(i,"children",[])
          this.tbData.map((j, index) => {
            if (j.type == "2" && String(i._id) == String(j.categoryId)) {
              this.categoryList2.push(j);
              this.$set(j,"children",[])
              i.children.push(j);
              this.tbData.map((k, index) => {
                if (k.type == "3" && String(j._id) == String(k.categoryId)) {
                  j.children.push(k);
                }
              })
            }
          })
          this.initData.push(i);
        }
      })
    },
    addCategory() {
      this.addVisible = true;
    },
    handleAddOk() {
      this.$refs["categoryForm"].validate(valid => {
        if (valid) {
          const param = {
            categoryname: this.categoryForm.name,
            type: "1"
          };
          addCategory(param).then(res => {
            if (res.code == 200) {
              this.addVisible = false;
              this.getData();
            }
          });
        } else {
          console.log("err");
        }
      });
    },
    handleAddCancel() {
      this.addVisible = false;
      this.$refs["categoryForm"].resetFields();
    },
    handleAddChildCancel() {},
  },
  components: {
    PageHeader,
    UploadImg,
    CategoryInfo,
    CategoryTree
  }
};
</script>

<style lang="scss" scoped>
.category-tree {
  width: 300px;
  float: left;
  padding-left: 30px;
  border-right: 1px solid #eee;
}
.category-info {
  width: 470px;
  float: left;
  margin: 20px 0 0 100px;
}
</style>