<template>
  <div>
    <!-- 标题 -->
    <PageHeader title="分类列表" :addBtn="{label: '添加分类',onAdd: addCategory}" />
    <div class="category-tree">
      <CategoryTree
        @handleSubmit="handleSubmit"
        :current="currentId"
        :treeData="initData"
      />
    </div>
    <div class="category-info">
      <CategoryInfo
        ref="categoryInfo"
        :categoryInfoData="categoryInfoData"
        :categoryList="initData"
        :categoryCur="categoryInfoData"
        :loading="changeLoading"
        @handleChange="handleChange"
        @handleDelete="handleDelete"
      />
    </div>
    <el-dialog :title="dialog.title" width="500px" :visible.sync="dialog.visible">
      <el-form :model="categoryForm" :rules="rules" ref="categoryForm">
        <el-form-item label="分类名称" prop="categoryname" :label-width="formLabelWidth">
          <el-input
            v-model="categoryForm.categoryname"
            :style="{width: '300px'}"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="node" label="分类图片" prop="categoryImg" :label-width="formLabelWidth">
          <UploadImg action="/api/upload" @getImgURL="getPicUrl" :pic="categoryForm.categoryImg" />
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
import {
  addCategory,
  getCategoryList,
  deleteCategory,
  updateCategory
} from "@/api/product";
export default {
  data () {
    return {
      categoryForm: {
        categoryname: "",
        categoryImg: ""
      },
      dialog: {
        visible: false,
        title: ""
      },
      value: "",
      childValue: "",
      categoryInfoData: {},
      categoryList: [],
      formLabelWidth: "100px",
      loading: true,
      tbData: [],
      initData: [],
      submitData: null,
      node: null,
      changeLoading: false,
      currentId: "",
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
    }
  },
  created () {
    this.getData();
    bus.$on("node-click", (node) => {
      this.categoryInfoData = node
      this.currentId = node._id
    })
    bus.$on("add-child-category", (data) => {
      this.node = data
      this.dialog.visible = true
      this.dialog.title = "添加三级分类"
      this.$refs.categoryForm.clearValidate()
    })
  },
  methods: {
    // handleNodeClick(node) {
    //   this.categoryInfoData = node
    // },
    // handleSubmit(data) {
    //   console.log(data)
    //   const param = {
    //     categoryname: data.value,
    //     categoryId: data.categoryId,
    //     type: "2"
    //   };
    //   addCategory(param).then(res => {
    //     if (res.code == 200) {
    //       this.dialog.visible = false;
    //       this.getData();
    //     }
    //   })
    // },
    // handleClick(data) {
    //   this.currentId = data._id
    // },
    handleSubmit (data) {
      const param = {
        categoryname: data.value,
        categoryId: data._id,
        type: Number(data.type) + 1
      };
      addCategory(param).then(res => {
        if (res.code == 200) {
          this.getData();
        }
      })
    },
    handleChange(data) {
      this.changeLoading = true
      this.$refs.categoryInfo.$refs.form.validate(valid => {
        if(valid) {
          updateCategory(data).then(res => {
            this.changeLoading = false
            if(res.code == 200) {
              this.$message({
                type: 'success',
                message: res.msg
              });
            }
          })
        } else {
          this.changeLoading = false
        }
      })
      
    },
    handleDelete (_id) {
      this.$confirm('是否删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategory({ _id }).then(res => {
          if (res.code == 200) {
            this.getData();
          }
          this.$message({
              type: 'success',
              message: res.msg
            });
        })
      })
    },
    getPicUrl (url) {
      this.categoryForm.categoryImg = url;
    },
    getData () {
      getCategoryList().then(res => {
        if (res.code == 200) {
          this.loading = false;
          let categoryChildData = [];
          this.tbData = res.data.list;
          this.renderCategory()
        }
      })
    },
    renderCategory () {
      this.initData = []
      this.categoryList1 = [];
      this.categoryList2 = [];
      this.tbData.map((i, index) => {
        if (i.type == "1") {
          this.categoryList1.push(i);
          this.$set(i, "children", [])
          this.tbData.map((j, index) => {
            if (j.type == "2" && String(i._id) == String(j.categoryId)) {
              this.categoryList2.push(j);
              this.$set(j, "children", [])
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
    addCategory () {
      this.dialog.visible = true
      this.dialog.title = "添加总分类"
      this.$refs.categoryForm.clearValidate()
      this.node = null
    },
    handleAddOk () {
      this.$refs["categoryForm"].validate(valid => {
        if (valid) {
          const param = {
            ...this.categoryForm,
            type: this.node ? Number(this.node.type) + 1 : "1"
          };
          this.node ? param.categoryId = this.node._id : null
          addCategory(param).then(res => {
            if (res.code == 200) {
              this.dialog.visible = false;
              this.getData();
              this.$refs.categoryForm.resetFields();
            }
          });
        } else {
          console.log("err");
        }
      });
    },
    handleAddCancel () {
      this.dialog.visible = false;

    },
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
  width: 270px;
  float: left;
  padding-left: 40px;
  border-right: 1px solid #ddd;
}
.category-info {
  width: 470px;
  float: left;
  margin: 20px 0 0 100px;
}
</style>