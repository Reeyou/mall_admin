<template>
  <div>
    <PageTable
      title="商品列表"
      :tbData='tbData'
      :columns='columns'
      :loading='loading'
      :filters='filters'
      :addBtn="{label: '添加商品',onAdd: addProduct}"
      :onFilter="handleFilter"
      :onReset="handleReset"
    />
  </div>
</template>

<script>
import PageTable from "@/components/Page";
import { getProductList, getCategoryList, deleteProduct } from '@/api/product'
export default {
  data() {
    return {
      tbData: [],
      columns: [
        {
          label: "商品名称",
          prop: "product_name",
        },
        {
          label: "商品图片",
          prop: "img_list",
          width: 400,
          type: "detailPic"
        },
        {
          label: "上架状态",
          prop: "saletime_type",
          type: 'status',
          width: 200,
          format:(val) => {
              if(val == 0) {
                  return '上架'
              }
          }
        },
        {
          label: "创建时间",
          prop: "create_time",
          width: 200,
          type: "time"
        },
        {
          label: "操作",
          fixed: 'right',
          width: 140,
          handle: [
            {label: '查看', type:'primary',clickFun: this.handleEdit },
            {label: '删除', type:'danger', clickFun: this.handleDelete },
          ]
        }],
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
          value: "",
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
      ],
      loading: true,
      productInfo: {
        title: '',
        scope: null
      }
    };
  },
  created() {
    this.getData()
  },
  methods: {
    handleEdit(scope) {
      this.productInfo.title = '商品编辑'
      this.productInfo.scope = scope
      localStorage.setItem("productInfo",JSON.stringify(this.productInfo))
      this.$router.push({name: 'editProduct',query: {spuId:scope.spuId}})
    },
    handleDelete(row) {
    //   deleteProduct({id: row._id}).then(res => {

    //   })
    },
    handelChangePage(pageSize) {
     this.getData(pageSize)
    },
    handelChangeSize(limit) {
     this.getData(1,limit)
    },
    handleFilter() {
      console.log(11);
      this.$router.go(-1)
      console.log(this.$route)
    },
    handleReset() {
      console.log(22);
    },
    addProduct() {
      console.log(111)
      this.productInfo.title = '商品添加'
      this.productInfo.scope = []
      localStorage.setItem("productInfo",JSON.stringify(this.productInfo))
      this.$router.push({name: "addProduct", params: {data: this.productInfo}});
    },
    getData() {
      getProductList().then(res => {
          this.loading = false
          if(res.code === 200) {
              
                this.tbData = res.data.list
          }
      })
    },
    editArticle(val) {
      console.log(val)
    },
    deleteArticle() {}
  },
  components: {
    PageTable
  }
};
</script>

<style lang="scss" scoped>
</style>