<template>
  <div class="page">
    <!-- 表格内容 -->
    <div class="table">
      <el-table
        :data="tbData"
        fit
        v-loading="loading"
        style="width: 100%"
        :span-method="spanMethod"
        :header-cell-style="{ background: '#f4f4f4' }"
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
              <template v-for="(item, i) in column.handle">
                <el-button
                  :key="i"
                  @click="item.clickFun(scope.row)"
                  type="text"
                  size="small"
                  >{{ item.label }}</el-button
                >
              </template>
            </div>
            <div v-else-if="column.type == 'color'">
              <span
                :style="{
                  display: 'inline-block',
                  background: scope.row.color.color,
                  width: 14 + 'px',
                  height: 14 + 'px',
                  verticalAlign: 'text-top',
                  borderRadius: '2px',
                  marginRight: '2px',
                  marginTop: '1px',
                }"
              ></span>
              <span>{{ scope.row.color.label }}</span>
            </div>
            <!-- 输入框 -->
            <div v-else-if="column.type == 'input'">
              <el-input
                :placeholder="column.label"
                v-model="scope.row[column.prop]"
              ></el-input>
            </div>
            <!-- 主图 -->
            <div v-else-if="column.type == 'pic'">
              <img
                class="main_image"
                :src="scope.row.pic || scope.row.subPics"
                alt
              />
            </div>
            <!-- 详情图 -->
            <div v-else-if="column.type == 'detailPic'">
              <img
                class="goods_image"
                v-for="(item, index) in scope.row.img_list"
                :key="index"
                :src="item"
                alt
              />
            </div>
            <div v-else-if="column.type == 'time'">
              {{ scope.row[column.prop] | timeFormat }}
            </div>
            <!-- 数据处理 -->
            <div v-else>
              <span v-if="column.format">{{
                scope.row[column.prop] | formatters(column.format)
              }}</span>
              <span v-else>{{ scope.row[column.prop] }}</span>
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
    "loading",
    "spanMethod"
  ],
  data () {
    return {
      // visible: false,
      value: "",
      dataColumns: this.columns || [],
      spanArr: []
    };
  },
  filters: {
    formatters (val, format) {
      if (typeof (format) === 'function') {
        return format(val)
      } else return val
    }
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/common.scss";
@import "./index.scss";
.table-upload {
  .el-upload--picture-card {
    width: 50px;
    height: 50px;
    position: relative;
    .el-upload-list--picture-card .el-upload-list__item {
      width: 50px;
      height: 50px;
    }
    i {
      position: absolute;
      font-size: 14px;
      top: 18px;
      left: 18px;
    }
  }
}
.el-table td,
.el-table th {
  padding: 6px 0;
}
</style>
