<template>
  <div class="page">
    <!-- 表格内容 -->
    <div class="table">
      <el-table
        :data="tbData"
        fit
        border
        v-loading="loading"
        style="width: 100%"
        :span-method="spanMethod"
      >
        <el-table-column
          v-for="(column, index) in dataColumns"
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :fixed="column.fixed"
          align="center"
          fit
        >
          <template slot-scope="scope">
            <!-- 操作栏 -->
            <div v-if="column.handle">
              <template v-for="(item, key) in column.handle">
                <el-button
                  class="handle"
                  v-if="item.isShow ? item.isShow(scope.row) : true"
                  :key="key"
                  @click="item.clickFun(scope.row)"
                  :type="item.type"
                  :icon="item.icon"
                  size="mini"
                >{{item.name}}</el-button>
              </template>
            </div>
            <!-- 输入框 -->
            <div v-else-if="column.type == 'input'">
              <el-input v-model="scope.row[key]"></el-input>
            </div>
            <!-- 主图 -->
            <div v-else-if="column.type == 'pic'">
              <img class="main_image" :src="scope.row.pic || scope.row.subPics" alt />
            </div>
            <!-- 详情图 -->
            <div v-else-if="column.type == 'detailPic'">
              <img
                class="goods_image"
                v-for="(item,index) in scope.row.detailPic"
                :key="index"
                :src="item"
                alt
              />
            </div>
            <!-- 数据处理 -->
            <div v-else>
              <!-- <span v-if="!column.format">{{ scope.row[column.prop] }}</span> -->
              <span>{{ scope.row[column.prop]}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "pageTable",
  props: [
    "tbData",
    "columns",
    "loading"
  ],
  data() {
    return {
      value: "",
      dataColumns: this.columns || [],
    };
  },
  methods: {
    spanMethod({ row, column, rowIndex, columnIndex }) {
      this.$emit('spanMethod',{ row, column, rowIndex, columnIndex })
    }
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/common.scss";
@import "./index.scss";
</style>
