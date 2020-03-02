<template>
  <div>
    <!-- 标题 -->
    <PageHeader
      title="分类列表"
      :addBtn="{label: '添加分类',onAdd: addCategory}"
      :addBtn2="{label: '添加子分类',onAdd: addCategoryChild}"
    />
    <!-- 筛选内容 -->
    <PageFilter
      :filters="filters"
      @onFilter="handleFilter"
      @onReset="handleReset"
    />
    <el-table
      :data="tbData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="_id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="categoryId" label="id" sortable width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
      <el-table-column prop="categoryname" label="名字"></el-table-column>
    </el-table>

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
              v-for="(item,index) in categoryList"
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
  </div>
</template>

<script>
import PageFilter from "@/components/Page/pageFilter";
import PageHeader from "@/components/Page/pageHeader";
import { addCategory, getCategoryList } from "@/api/product";
export default {
  data() {
    return {
      categoryForm: {
        name: ""
      },
      categoryChildForm: {
        categoryId: "",
        name: ""
      },
      value: "",
      categoryList: [],
      formLabelWidth: "100px",
      addVisible: false,
      addChildVisible: false,
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
    },
    getData() {
      getCategoryList().then(res => {
        if (res.code == 200) {
          this.loading = false;
          let categoryChildData = [];
          this.tbData = []
          this.categoryList = []
          res.data.list.map((i, index) => {
            if (i.type == '1') {
              this.categoryList.push(i)
              i.children = []
              res.data.list.map((j, index) => {
                if(j.type == '2' && String(i._id) == String(j.categoryId)) {
                  i.children.push(j);
                }
              })
              // this.tbData = []
              this.tbData.push(i);
            }
          });
        }
      });
    },
    addCategory() {
      this.addVisible = true;
    },
    addCategoryChild() {
      this.addChildVisible = true;
    },
    handleAddOk() {
      this.$refs["categoryForm"].validate(valid => {
        if (valid) {
          const param = {
            categoryname: this.categoryForm.name,
            type: '1'
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
            type: '2'
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
    handleAddCancel() {
      this.addVisible = false;
      this.$refs["categoryForm"].resetFields();
    },
    handleAddChildCancel() {},
    editTag() {
      this.editVisible = true;
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
    PageHeader
  }
};
</script>

<style lang="scss" scoped>
</style>