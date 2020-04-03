<template>
  <div>
    <el-select style="width:120px" v-model="categoryname" class="tagList">
      <el-option
        v-for="(item,index) in categoryList"
        :value="item.categoryname"
        :key="index"
        :label="item.categoryname"
        @click.native="select(item)"
      >{{ item.categoryname }}</el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    categoryList: {
      type: Array,
      default: []
    },
    categoryname: String
  },
  data() {
    return {
     
    }
  },
  created() {

  },
  computed: {

  },
  methods: {
    select(item) {
      this.$emit("on-select", item)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>