<template>
  <div class="m-table-item">
    <table>
      <colgroup>
        <col
          v-for="(column, i) in columns"
          :key="i"
          :style="{ width: `${column.width}px` }"
        />
      </colgroup>
      <tbody>
        <tr
          :class="['level-' + levelValue, 'level']"
          @dblclick="handleCollapse"
        >
          <td v-for="(prop, i) in props" :key="i" :class="i == 0 ? 'cell' : ''">
            <div class="collapse_cell">
              <div v-if="prop.type === 'collapse'">
                <span
                  v-if="levelValue < 2"
                  :class="[
                    prop.type === 'collapse' ? 'collapse_icon' : '',
                    tbDataItem.hasOwnProperty('children') ? '' : 'is_close',
                    is_expand !== true ? 'is_open' : 'is_close',
                  ]"
                  @click="handleCollapse"
                ></span>
                <el-input
                  v-model="tbDataItem[prop.key]"
                  style="width: 200px"
                  class="collapse_label"
                ></el-input>
              </div>
              <div v-else-if="prop.type === 'input'">
                <el-input
                  v-model="tbDataItem[prop.key]"
                  style="width: 120px"
                ></el-input>
              </div>
              <div v-else-if="prop.type === 'checkbox'">
                <el-checkbox
                  v-show="is_show"
                  v-model="tbDataItem[prop.key]"
                ></el-checkbox>
              </div>
              <div v-else-if="prop.type === 'handle'">
                <template v-for="(item, i) in prop.handle">
                  <re-button
                    :key="i"
                    none
                    @click="item.clickFun(tbDataItem)"
                    :type="item.type"
                    :icon="item.icon"
                    >{{ item.label }}</re-button
                  >
                </template>
              </div>
              <div v-else-if="prop.type === 'text-handle'">
                <template v-for="(item, i) in prop.handle">
                  <re-button
                    v-show="is_show"
                    :key="i"
                    none
                    @click="item.clickFun(tbDataItem)"
                    :type="item.type"
                    :icon="item.icon"
                    >{{ item.label }}</re-button
                  >
                </template>
              </div>
              <span v-else>{{ tbDataItem[prop.key] }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <el-collapse-transition>
      <div v-show="is_expand">
        <div
          class="collapse_table"
          v-for="(item, i) in tbDataItem.children"
          :key="i"
        >
          <tree-item
            v-show="item"
            :level="val"
            :tbDataItem="item"
            :columns="columns"
          />
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'tree-item',
  data () {
    return {
      addValue: '',
      checked: false,
      value: '',
      val: Number,
      is_expand: this.tbDataItem.expand
    }
  },
  props: ['tbDataItem', 'columns', 'level'],
  computed: {
    is_show () {
      return this.tbDataItem.type !== '2'
    },
    props () {
      let arr = []
      this.columns.map((item, i) => {
        arr.push(item)
      })
      return arr
    },
    levelValue () {
      this.val = this.level
      return this.tbDataItem ? this.val++ : this.val
    }
  },
  methods: {
    handleCollapse () {
      this.is_expand = !this.is_expand
    }
  }
}
</script>