<template>
  <div>
    <PageTable
      title="分类列表"
      :tbData='tbData'
      :columns='columns'
      :filters='filters'
      :addBtn="{label: '添加分类',onAdd: addCategory}"
      :onFilter="handleFilter"
      :onReset="handleReset"
      @handleEdit='handleEdit'
      @handleDelete='handleDelete'
      @handelChangeSize='handelChangeSize'
      @handelChangePage='handelChangePage'
    />
    <el-dialog title="添加分类名称" width='500px' :visible.sync="addVisible">
    <el-form :model="categoryForm" ref='categoryForm'>
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
import PageTable from "@/components/PageTable";
import { addCategory, getCategoryList } from '@/api/product'
export default {
  data() {
    return {
      categoryForm: {
          name: '',
        },
      formLabelWidth: '100px',
      addVisible: false,
      editVisible: false,
      tbData: [],
      columns: [
        {
          label: "分类id",
          key: "_id"
        },
        {
          label: "分类名称",
          key: "categoryname"
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
    this.getData()
  },
  methods: {
    handelChangePage(pageSize) {
     this.getData(pageSize)
    },
    handelChangeSize(limit) {
     this.getData(1,limit)
    },
    handleFilter() {
      console.log(11);
    },
    handleReset() {
      console.log(22);
    },
    getData() {
      getCategoryList({}).then(res => {
        if(res.code == 200) {
          this.tbData = res.data
        }
      })
    },
    addCategory() {
      this.addVisible = true;
    },
    handleAddOk() {
      this.$refs['categoryForm'].validate(valid => {
        if(valid) {
          const param = {
            categoryname: this.categoryForm.name
          }
          addCategory(param).then(res => {
            if(res.code == 200) {
              this.addVisible = false
              this.getData()
            }
          })
        } else {
          console.log('err')
        }
      })
    },
     handleAddCancel() {
      this.addVisible = false
      this.$refs['categoryForm'].resetFields()
    },
    editTag() {
      this.editVisible = true
    },
    handleEdit() {
      // updateTagName(params).then(res => {

      // })
    },
    handleEditOk() {

    },
    handleEditCancel() {

    },
    handleDelete(id) {
      console.log(id)
      // deleteTagName({tagid: id}).then(res => {
      //   if(res.code == 200) {
      //     this.getData()
      //   }
      // })
    }
  },
  components: {
    PageTable
  }
};
</script>

<style lang="scss" scoped>
</style>