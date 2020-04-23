<template>
  <div class="page">
    <!-- 标题 -->
    <PageHeader
      :title='title'
    />
    <!-- 筛选内容 -->
    <PageFilter
      :filters="filters"
      :addBtn='addBtn'
      @onFilter="onFilter"
      @onReset="onReset"
    />
    <!-- 表格内容 -->
    <PageTable
      :tbData="tbData"
      :columns="columns"
      :loading="loading"
    />
    <!-- 分页内容 -->
    <div class="pageFooter">
      <div class="pagination">
        <el-pagination
          @size-change="handleChangeSize"
          @current-change="handleChangePage"
          :current-page="1"
          :page-size="8"
          layout="total, prev, pager, next"
          :total="tbData.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import PageFilter from "./pageFilter";
import PageHeader from "./pageHeader";
import PageTable from "./pageTable";
export default {
  name: "Page",
  props: [
    "tbData",
    "type",
    "columns",
    "loading",
    "addBtn",
    "addBtn2",
    "title",
    "filters",
    "onFilter",
    "onReset"
  ],
  data() {
    return {
      value: "",
    };
  },
  methods: {
    handleChangeSize(pageSize) {
      this.$emit("handelChangeSize", pageSize);
    },
    handleChangePage(limit) {
      this.$emit("handelChangePage", limit);
    }
  },
  components: {
    PageFilter,
    PageHeader,
    PageTable
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/common.scss";
@import "./index.scss";
</style>
