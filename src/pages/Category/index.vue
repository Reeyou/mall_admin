<template>
  <div>
    <!-- 标题 -->
    <PageHeader
      title="分类列表"
      :addBtn="{label: '添加分类',onAdd: addCategory}"
      :addBtn2="{label: '添加子分类',onAdd: addCategoryChild}"
      :addBtn3="{label: '添加三级分类',onAdd: addCategoryChild2}"
    />
    <!-- 筛选内容 -->
    <!-- <PageFilter
      :filters="filters"
      @onFilter="handleFilter"
      @onReset="handleReset"
    />-->

    <div :style="{width: '300px',float: 'left'}">
      <el-tree :data="allData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <div :style="{width: '600px',float: 'left'}">
    <CategoryInfo :categoryInfoData="categoryInfoData" />
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
    <el-dialog title="添加子分类" width="500px" :visible.sync="addChildVisible">
      <el-form :model="categoryChildForm" ref="categoryChildForm">
        <el-form-item label="分类" prop="categoryId">
          <el-select style="width:200px" v-model="value" class="tagList">
            <el-option
              v-for="(item,index) in categoryList1"
              :value="item.categoryname"
              :key="index"
              :label="item.categoryname"
              @click.native="selectCategory(item._id)"
            >{{ item.categoryname }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="categoryChildForm.name" :style="{width: '300px'}" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddChildCancel">取 消</el-button>
        <el-button type="primary" @click="handleAddChildOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 三级分类 -->
    <el-dialog title="添三级分类" width="500px" :visible.sync="addChild2Visible">
      <el-form :model="categoryChild2Form" ref="categoryChild2Form">
        <el-form-item label="分类" prop="categoryId">
          <el-select style="width:200px" v-model="value" class="tagList">
            <el-option
              v-for="(item,index) in categoryList1"
              :value="item.categoryname"
              :key="index"
              :label="item.categoryname"
              @click.native="selectCategory(item._id)"
            >{{ item.categoryname }}</el-option>
          </el-select>
          <el-select style="width:200px" v-model="childValue" class="tagList">
            <el-option
              v-for="(item,index) in categoryList2Selected"
              :value="item.categoryname"
              :key="index"
              :label="item.categoryname"
              @click.native="selectCategoryChild(item._id)"
            >{{ item.categoryname }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="categoryChild2Form.name" :style="{width: '300px'}" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="子分类图片" prop="category_img">
          <UploadImg action="/api/upload" @getImgURL="getPicUrl" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddChild2Cancel">取 消</el-button>
        <el-button type="primary" @click="handleAddChild2Ok">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PageFilter from "@/components/Page/pageFilter";
import PageHeader from "@/components/Page/pageHeader";
import UploadImg from "@/components/UploadImg";
import CategoryInfo from "./CategoryInfo";
import { addCategory, getCategoryList } from "@/api/product";
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      categoryForm: {
        name: ""
      },
      categoryChildForm: {
        categoryId: "",
        name: ""
      },
      categoryChild2Form: {
        categoryId: "",
        name: "",
        category_img: ""
      },
      value: "",
      childValue: "",
      allData: [],
      categoryInfoData: [],
      categoryList: [],
      categoryList1: [],
      categoryList2: [],
      categoryList2Selected: [],
      formLabelWidth: "100px",
      addVisible: false,
      addChildVisible: false,
      addChild2Visible: false,
      editVisible: false,
      loading: true,
      tbData: [],
      columns: [
        {
          label: "分类id",
          prop: "_id"
          // width: 100,
        },
        {
          label: "上级分类id",
          prop: "categoryId"
          // width: 100,
        },
        {
          label: "分类名称",
          prop: "categoryname"
          // width: 200,
        },
        {
          label: "操作",
          handle: [
            {
              icon: "el-icon-edit",
              type: "primary",
              clickFun: this.handleEdit
            },
            {
              icon: "el-icon-delete",
              type: "danger",
              clickFun: this.handleDelete
            }
          ]
        }
      ],
      filters: [
        {
          label: "标题",
          type: "Input"
        },
        {
          label: "标签",
          type: "Input"
        },
        {
          label: "类型",
          type: "Input"
        },
        {
          label: "状态",
          type: "Select",
          selectList: [
            {
              value: "",
              label: "全部"
            },
            {
              value: 0,
              label: "当前"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data)
      this.categoryInfoData = data
    },
    getPicUrl(url) {
      // this.pic = url;
      this.categoryChild2Form.category_img = url;
    },
    handelChangePage(pageSize) {
      this.getData(pageSize);
    },
    handelChangeSize(limit) {
      this.getData(1, limit);
    },
    handleFilter() {
      console.log(11);
    },
    handleReset() {
      console.log(22);
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
      let initData = []
      this.tbData.map((i, index) => {
        if (i.type == "1") {
          this.categoryList1.push(i);
          i.children = [];
          this.tbData.map((j, index) => {
            if (j.type == "2" && String(i._id) == String(j.categoryId)) {
              this.categoryList2.push(j);
              j.children = [];
              i.children.push(j);
              this.tbData.map((k, index) => {
                if (k.type == "3" && String(j._id) == String(k.categoryId)) {
                  
                  j.children.push(k);
                }
              });
            }
          });
          initData.push(i);
        }
      });
      initData.map((item, index) => {
        let dataObj = {};
        if (item.categoryId == 0) {
          dataObj.categoryId = item.categoryId;
          dataObj.label = item.categoryname;
          if (item.children) {
            dataObj.children = [];
            item.children.map((child, childIndex) => {
              let childObj = {};
              childObj.categoryId = child.categoryId;
              childObj.label = child.categoryname;
              dataObj.children.push(childObj);
              if (child.children) {
                
                dataObj.children[childIndex].children = [];
                child.children.map((child2, _index) => {
                  let child2Obj = {} 
                  child2Obj.label = child2.categoryname;
                  child2Obj.categoryId = child2.categoryId;
                  child2Obj.categoryImg = child2.categoryImg
                  dataObj.children[childIndex].children.push(child2Obj);
                });
              }
            });
          }
        }
        this.allData.push(dataObj);
      });
    },
    addCategory() {
      this.addVisible = true;
    },
    addCategoryChild() {
      this.addChildVisible = true;
    },
    addCategoryChild2() {
      this.addChild2Visible = true;
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
    handleAddChildOk() {
      this.$refs["categoryChildForm"].validate(valid => {
        if (valid) {
          const param = {
            categoryId: this.categoryChildForm.categoryId,
            categoryname: this.categoryChildForm.name,
            type: "2"
          };
          addCategory(param).then(res => {
            if (res.code == 200) {
              this.addChildVisible = false;
              this.getData();
            }
          });
        } else {
          console.log("err");
        }
      });
    },
    handleAddChild2Ok() {
      this.$refs["categoryChild2Form"].validate(valid => {
        if (valid) {
          const param = {
            categoryId: this.categoryChild2Form.categoryId,
            categoryname: this.categoryChild2Form.name,
            categoryImg: this.categoryChild2Form.category_img,
            type: "3"
          };
          addCategory(param).then(res => {
            if (res.code == 200) {
              this.addChild2Visible = false;
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
    editTag() {
      this.editVisible = true;
    },
    handleAddChild2Cancel() {
      this.addChild2Visible = false;
    },
    handleEdit() {
      // updateTagName(params).then(res => {
      // })
    },
    handleEditOk() {},
    handleEditCancel() {},
    handleDelete(id) {
      console.log(id);
      // deleteTagName({tagid: id}).then(res => {
      //   if(res.code == 200) {
      //     this.getData()
      //   }
      // })
    }
  },
  components: {
    PageFilter,
    PageHeader,
    UploadImg,
    CategoryInfo
  }
};
</script>

<style lang="scss" scoped>
</style>