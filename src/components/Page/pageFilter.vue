<template>
  <div class="page">
    <!-- 筛选内容 -->
    <div class="filter">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item v-for="(filter, index) in dataFilters" :key="index" :label="filter.label">
          <!-- 单选框 -->
          <el-input v-if="filter.type === 'Input'" :placeholder="filter.label" v-model="filter.value"></el-input>
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
          <re-button size="mini" plain type="primary" @click="handleFilter">查询</re-button>
          <re-button size="mini" type="default" @click="handleReset">重置</re-button>
        </el-form-item>
      </el-form>
      <!-- 添加按钮 -->
    <div class="addBtn" v-if="addBtn">
      <re-button size="small" type="primary" icon="el-icon-plus" @click="addBtn.onAdd">{{addBtn.label}}</re-button>
    </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "PageFilter",
  props: [
    "addBtn",
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
