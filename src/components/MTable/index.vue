<template>
  <el-table
    ref="table"
    :data="tableData"
    v-loading="loading"
    element-loading-text="Loading"
    fit
    highlight-current-row
    tooltip-effect="dark"
    style="width: 100%"
    :header-cell-style="{ background: '#f4f4f4' }"
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange"
  >
    <div v-for="(item, index) in tableLabel" :key="index">
      <el-table-column
        :width="item.width ? item.width : ''"
        :align="item.align ? item.align : 'center'"
        :label="item.label"
        :prop="item.prop"
        :sortable="item.sortable ? 'custom' : false"
        :fixed="item.fixed"
        fit
      >
        <template slot-scope="scope">
          <!-- operation -->
          <div v-if="item.handle">
            <template v-for="(_item, i) in item.handle">
              <el-button
                :key="i"
                @click="_item.clickFun(scope.row)"
                size="small"
                :type="_item.type"
                class="btn_mini"
                style="display: inline-block"
                >{{ _item.label }}</el-button
              >
            </template>
          </div>
          <!-- tag -->
          <span
            v-else-if="item.render"
            class="m_tag"
            :style="{
              backgroundColor:
                scope.row[item.prop] == 0
                  ? '#e6563a'
                  : scope.row[item.prop] == 1
                  ? '#07c160'
                  : '#909399',
            }"
          >
            {{ item.render(scope.row) }}
          </span>
          <!-- link -->
          <span
            v-else-if="item.link"
            @click="item.linkFn(scope.row)"
            class="m_link"
          >
            {{ scope.row[item.prop] }}
          </span>

          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </div>
  </el-table>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableMain: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableLabel: {
      type: Array,
      default: () => {
        return []
      }
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  methods: {
    //Methods: button name row: data in the same row index: row (0 start)
    Handlebutton (methods, row, index) {// button event
      console.log(row)
      this.$emit('handleButton', { 'methods': methods, 'row': row })
    },
    Handlesortchange (VAL) {// sort
      this.$emit('handleSortChange', val)
    },
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    }
  }

}
</script>

<style lang="scss" scoped>
.table-expand {
  font-size: 0;
  display: flex;
  flex-wrap: wrap;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.m_tag {
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: white;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
  height: 24px;
  padding: 0 8px;
  line-height: 24px;
}
.m_link {
  color: rgb(64, 158, 255);
  cursor: pointer;
  transition: opacity 0.4s ease;
  &:hover {
    opacity: 0.8;
  }
}
.btn_mini {
  padding: 6px 10px !important;
}
.el-button + .el-button {
  margin-left: 4px;
}
</style>