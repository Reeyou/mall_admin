<template>
  <div class="m-tree-table">
    <div class="header">
      <re-button
        @click="addBtn.onAdd"
        type="primary"
        size="small"
        icon="el-icon-plus"
        >{{ addBtn.label }}</re-button
      >
    </div>
    <div class='m-table'>
        <div v-show=loading class="loading">
            <div class="spinner">
            <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
        </div>
        </div>
      <table>
        <colgroup>
          <col
            v-for="(column, i) in columns"
            :key="i"
            :style="{ width: `${column.width}px` }"
          />
        </colgroup>
        <thead>
          <tr>
            <th v-for="(item, i) in columns" :key="i">{{ item.label }}</th>
          </tr>
        </thead>
      </table>
      <div v-if="tbData.length > 0">
        <template v-for="(item, i) in tbData">
          <tree-item
            :key="i"
            :tbDataItem="item"
            :level="0"
            :columns="columns"
          />
        </template>
      </div>
      <div v-else class="no_data">暂无数据</div>
    </div>
    <div class="submit" v-if="tbData.length > 0">
      <re-button @click="submit" type="primary" size="large">保存</re-button>
    </div>
  </div>
</template>

<script>
import TreeItem from './tree-item'
export default {
  name: 'tree-table',
  components: {
    'tree-item': TreeItem
  },
  props: ['columns', 'tbData', 'addBtn', 'submit', 'loading']
}
</script>
<style lang="scss">
@import "./index.scss";
</style>