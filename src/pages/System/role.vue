<template>
  <div>
    <PageTable
      title="角色列表"
      :tbData="tbData"
      :columns="columns"
      :loading="loading"
      :addBtn="{ label: '添加角色', onAdd: addRole }"
      :filters='filters'
      :onFilter="handleFilter"
      :onReset="handleReset"
    />
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="30%">
      <el-form
        ref="specsForm"
        :model="specsForm"
        :rules="categoryFormRule"
        class="category-form"
        label-width="120px"
      >
        <el-form-item :label="dialog.roleName" prop="specs_name">
          <el-input
            style="width: 60%"
            v-model="specsForm.specs_name"
          ></el-input>
        </el-form-item>
        <el-form-item :label="dialog.desc" prop="specs_name">
          <el-input
            style="width: 60%"
            v-model="specsForm.specs_name"
          ></el-input>
        </el-form-item>
        <el-form-item :label="dialog.menus" prop="specs_name">
           <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            class="permission-tree"
          />
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
import PageTable from "@/components/Page";
import { getProductList, getCategoryList, deleteProduct } from '@/api/product'
export default {
  data () {
    return {
       defaultProps: {
          children: 'children',
          label: 'label'
        },
      routesData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
      tbData: [],
      dialog: {
        visible: false,
        title: '添加角色',
        roleName: '角色名',
        desc: '描述',
        menus: '菜单'
      },
      columns: [
        {
          label: "角色KEY",
          prop: "product_name",
          width: 200,
        },
        {
          label: "角色名",
          prop: "img_list",
          width: 400,
          type: "detailPic"
        },
        {
          label: "描述",
          prop: "create_time",
          type: "time"
        },
        {
          label: "操作",
          fixed: 'right',
          width: 200,
          handle: [
            { label: '编辑权限', type: 'primary', clickFun: this.handleEdit },
            { label: '删除', type: 'danger', clickFun: this.handleDelete },
          ]
        }],
      filters: [
        {
          label: "角色名",
          type: "Input"
        }
      ],
      loading: true,
      popover_visible: false,
      specsForm: {

      },
      productInfo: {
        title: '',
        scope: null
      }
    };
  },
  created () {
    this.getData()
  },
  methods: {
    addRole () {
      this.dialog.visible = true
    },
    handleEdit (scope) {
     this.dialog.visible = true
    },
    handleOk () {
      this.dialog.visible = false
    },
    handleCancel () {
      this.dialog.visible = false
    },
    handleDelete (row) {
      //   deleteProduct({id: row._id}).then(res => {

      //   })
    },
    handlePopoverOk () {
      this.popover_visible = !this.popover_visible
    },
    handlePopoverCancel () {
      console.log(1)
      this.popover_visible = !this.popover_visible
    },
    handelChangePage (pageSize) {
      this.getData(pageSize)
    },
    handelChangeSize (limit) {
      this.getData(1, limit)
    },
    handleFilter () {
      console.log(11);
      this.$router.go(-1)
      console.log(this.$route)
    },
    handleReset () {
      console.log(22);
    },
    addProduct () {
      this.dialog.visible = true
    },
    getData () {
      getProductList().then(res => {
        this.loading = false
        if (res.code === 200) {

          this.tbData = res.data.list
        }
      })
    },
    editArticle (val) {
      console.log(val)
    },
    deleteArticle () { }
  },
  components: {
    PageTable
  }
};
</script>

<style lang="scss" scoped>
.permission-tree {
  margin-top: 10px
}
</style>