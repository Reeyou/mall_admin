<template>
  <div class="contains">
    <PageHeader title="分类列表" />
    <div class="table">
      <tree-table
        :columns="columns"
        :tbData="tbData"
        :addBtn="{ label: '添加分类', onAdd: handleAdd }"
        :submit="handleSubmit"
        :loading="loading"
      />
    </div>
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="30%">
      <el-form
        ref="categoryForm"
        :model="categoryForm"
        :rules="categoryFormRule"
        class="category-form"
        label-width="120px"
      >
        <el-form-item :label="dialog.label" prop="category_name">
          <el-input style="width: 60%" v-model="categoryForm.category_name"></el-input>
        </el-form-item>
        <el-form-item label="添加图片" prop="show_home">
          <UploadImg
            action="/api/upload"
            :on-success="uploadSuccess"
            :imgUrl="categoryForm.img_url"
            :preview="false"
            label="分类图"
            />
        </el-form-item>
        <el-form-item label="首页展示" prop="show_home">
          <el-checkbox v-model="categoryForm.show_home"></el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleOk">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import PageHeader from '@/components/Page/pageHeader'
import { handleCategoryListData } from './util'
import {
  addCategory,
  getCategoryList,
  deleteCategory,
  updateCategory
} from "@/api/product";
import { flatten } from '../../utils/util'
import UploadImg from "@/components/UploadImg";
export default {
  inject: ['reload'],
  components: {
    PageHeader,
    UploadImg
  },
  data () {
    return {
        imageUrl: '',
      dialog: {
        visible: false,
        title: '',
        label: ''
      },
      tbData: [],
      loading: true,
      categoryForm: {
        img_url: "",
        type: 0,
        show_home: false
      },
      categoryFormRule: {
        category_name: [{ required: true, message: "分类名称不能为空", trigger: "blur" }]
      },
      columns: [
        {
          label: '分类',
          key: 'category_name',
          type: 'collapse',
          width: 340
        },
        {
          label: '排序值',
          key: 'sort',
          width: 200,
          type: 'input'
        },
        {
          label: '是否在首页展示商品',
          key: 'show_home',
          type: 'checkbox',
          width: 300
        },
        {
          label: '展开子分类',
          key: 'expand',
          type: 'checkbox',
          width: 200,
        },
        {
          label: '添加子分类',
          key: 'status',
          type: 'text-handle',
          width: 200,
          handle: [
            { label: '添加子分类', type: 'text', clickFun: this.handleAdd },
          ]
        },
        {
          label: "操作",
          fixed: 'right',
          type: 'handle',
          handle: [
            { icon: 'iconfont icon-delete_s', type: 'danger', clickFun: this.handleDelete },
          ]
        }
      ]
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    getCategoryList () {
      getCategoryList().then(res => {
        this.loading = false
        // 不被监听改变
        //   this.targetData = JSON.parse(JSON.stringify(res.data.list))
        this.tbData = handleCategoryListData(res.data.list)
      })
    },
    uploadSuccess(e,url) {
        this.categoryForm.img_url = url
        console.log(this.categoryForm)
    },
    handleAdd (data) {
      //Todo 判断条件优化
      if (data.hasOwnProperty('category_name')) {
        this.dialog.title = '添加子分类'
        this.dialog.label = '子分类名称'
        this.categoryForm.category_id = data._id
        this.categoryForm.type = data.type == '1' ? "2" : "1"
      } else {
        this.dialog.title = '添加分类'
        this.dialog.label = '分类名称'
      }
      this.dialog.visible = true
    },
    handleOk () {
      this.$refs["categoryForm"].validate(valid => {
        if (valid) {
          this.loading = true
          addCategory(this.categoryForm).then(res => {
            this.dialog.visible = false
            this.$refs['categoryForm'].resetFields()
            this.categoryForm.img_url = ""
            this.getCategoryList()
          })
        }
      })
    },
    handleCancel () {
      this.dialog.visible = false
      this.categoryForm.img_url = ""
      this.$refs['categoryForm'].resetFields()
    },
    handleSubmit () {
      let data = flatten(this.tbData)
      this.loading = true
      updateCategory(data).then(res => {
        this.getCategoryList()
        this.reload()
      })
    },
    handleDelete (data) {
      this.$confirm('是否删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategory({ _id: data._id }).then(res => {
          this.getCategoryList();
          this.$message({
            type: 'success',
            message: res.msg
          })
        }).catch(e => {
          this.$message({
            type: 'error',
            message: e.msg
          })
        })
      })
    },
    handleEdit (data) {
      console.log(data)
    }
  }
}
</script>

<style lang='scss'>
.contains {
  /* width: 960px; */
  background: #fff;
  .table {
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.08);
    border-radius: 20px 20px 0 0;
  }
  .category-form {
    .el-form-item:last-child {
      margin-bottom: 0;
    }
  }
}
</style>