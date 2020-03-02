<template>
  <div class="page">
    <!-- 筛选内容 -->
    <div class="filter">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item v-for="(filter, index) in dataFilters" :key="index" :label="filter.label">
          <!-- 单选框 -->
          <el-input v-if="filter.type === 'Input'" placeholder="请输入" v-model="filter.value"></el-input>
          <!-- 多选框 -->
          <el-select v-if="filter.type === 'Select'" placeholder="请选择" v-model="value">
            <el-option
              v-for="(item, index) in filter.selectList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- 时间选择器 -->
          <el-date-picker
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2"
            v-if="filter.type === 'datePicker'"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">筛选</el-button>
          <el-button type="primary" @click="handleReset">重置</el-button>
          <!-- <div class='collapse'>
            <span>收起</span>
            <i class='iconfont icon-arrow_u'></i>
            <span>展开</span>
            <i class='iconfont icon-arrow_d'></i>
          </div>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageFilter",
  props: [
    "filters",
    "onFilter",
    "onReset"
  ],
  data() {
    return {
      value: "",
      dataFilters: this.filters,
    };
  },
  created() {
    console.log(this.dataColumns);
    // this.role = JSON.parse(localStorage.getItem('userinfo')).role
  },
  mounted() {
    // console.log(this.dataFilters)
  },
  methods: {
    handleFilter() {
      this.onFilter();
    },
    handleReset() {
      this.onReset();
    }
  },
  components: {}
};
</script>

<style lang='scss'>
@import "@/assets/css/common.scss";
@import "./index.scss"

</style>
