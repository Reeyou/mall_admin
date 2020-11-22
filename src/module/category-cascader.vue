<template>
  <div>
     <el-cascader
        v-model="value"
        :options="categoryList"
        :separator="'>'"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"></el-cascader>
  </div>
</template>

<script>
import {
  getCategoryList
} from "../api/product";
import { handleCategoryCascaderData } from './util'
export default {
  props: {
    categoryId: String
  },
  data () {
    return {
        value: '',
      categoryList: []
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    getCategoryList () {
      getCategoryList().then(res => {
        if (res.code == 200) {
            this.categoryList = handleCategoryCascaderData(res.data.list)
        }
      });
    },
    handleChange(data) {
      this.$emit("handleSelectCategory", data[data.length - 1])
    }
  }
}
</script>

<style lang="scss" scoped>
</style>