<template>
  <div>
    <PageTable
      title="评论列表"
      :tbData='tbData'
      :columns='columns'
      :loading='loading'
      :filters='filters'
      :addBtn="{label: '添加商品',onAdd: addProduct}"
      :onFilter="handleFilter"
      :onReset="handleReset"
      @handleEdit='handleEdit'
      @handleDelete='handleDelete'
      @handelChangeSize='handelChangeSize'
      @handelChangePage='handelChangePage'
    />
  </div>
</template>

<script>
import PageTable from "@/components/Page";
import { getProductList, getCategoryList } from '@/api/product'
export default {
  data() {
    return {
      tbData: [],
      columns: [{
          label: "商品id",
          prop: "spuId",
          width: 160
        },
        {
          label: "分类id",
          prop: "categoryId",
          width: 160
        },
        {
          label: "商品名称",
          prop: "name",
          width: 300
        },
        {
          label: "商品描述",
          prop: "desc",
          width: 400,
        },
        {
          label: "商品主图",
          prop: "pic",
          width: 120,
          type: "pic"
        },
        {
          label: "商品详情图",
          prop: "detailPic",
          width: 300,
          type: "detailPic"
        },
        {
          label: "创建时间",
          prop: "create_time",
          width: 200
        },
        {
          label: "操作",
          fixed: 'right',
          width: 140,
          handle: [
            {icon: 'el-icon-edit', type:'primary',clickFun: this.handleEdit },
            {icon: 'el-icon-delete', type:'danger',clickFun: this.handleDelete },
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
    handleDelete(id) {
      console.log(id)
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
      this.productInfo.title = '商品添加'
      this.productInfo.scope = []
      localStorage.setItem("productInfo",JSON.stringify(this.productInfo))
      this.$router.push({name: "addProduct", params: {data: this.productInfo}});
    },
    getData() {
      getProductList().then(res => {
          if(res.code === 200) {
              this.loading = false
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