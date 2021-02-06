<template>
  <div>
    <PageTable
      title="日志列表"
      :tbData="tbData"
      :columns="columns"
      :loading="loading"
      :addBtn="{ label: '添加角色', onAdd: addSpecs }"
      :popoverVisible="popover_visible"
      @handlePopoverCancel="handlePopoverCancel"
      @handlePopoverOk="handlePopoverOk"
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
          <el-input
            style="width: 60%"
            v-model="specsForm.specs_name"
          ></el-input>
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
            { label: '查看', type: 'primary', clickFun: this.handleEdit },
            { label: '删除', type: 'danger', clickFun: this.handleDelete },
          ]
        }],
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
    addSpecs () {
      this.dialog.visible = true
    },
    handleEdit (scope) {
      this.productInfo.title = '商品编辑'
      this.productInfo.scope = scope
      localStorage.setItem("productInfo", JSON.stringify(this.productInfo))
      this.$router.push({ name: 'editProduct', query: { spuId: scope.spuId } })
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
      this.productInfo.title = '商品添加'
      this.productInfo.scope = []
      localStorage.setItem("productInfo", JSON.stringify(this.productInfo))
      this.$router.push({ name: "addProduct", params: { data: this.productInfo } });
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
</style>