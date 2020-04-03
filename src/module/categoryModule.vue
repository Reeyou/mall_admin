<template>
  <div>
    <category-select-base
      class="select"
      :categoryname="category"
      :categoryList="categoryList"
      @on-select="onSelect"
    />
    <category-select-base
      class="select"
      v-show="category_child"
      :categoryname="category_child"
      :categoryList="categoryList_child"
      @on-select="onSelect"
    />
    <category-select-base
      class="select"
      v-show="category__child"
      :categoryname="category__child"
      :categoryList="categoryList__child"
      @on-select="onSelect"
    />
  </div>
</template>

<script>
import categorySelectBase from './categorySelectBase'
export default {
  name: "categorySelect",
  props: {
    categoryList: {
      type: Array,
      default: []
    },
    categoryCur: Object
  },
  data () {
    return {
      category: "",
      category_child: "",
      category__child: "",
      categoryList_child: [],
      categoryList__child: [],
      childrenList: []
    }
  },
  created () {
    this._renderCategotyName(this.categoryCur)
  },
  watch: {
    categoryCur (val) {
      this._renderCategotyName(val)
    }
  },
  components: {
    "category-select-base": categorySelectBase
  },
  methods: {
    onSelect (item) {
      this.$emit("handle-select", item)
    },
    _renderCategotyName (val) {
      switch (val.type) {
        case "1":
          this.category = this.categoryCur.categoryname
          this.category_child = ""
          this.category__child = ""
          break;
        case "2":
          this.category_child = this.categoryCur.categoryname
          this.category__child = ""
          break;
        case "3":
          this.category__child = this.categoryCur.categoryname
          break;
        default:
          break;
      }
      this.categoryList.map((item, index) => {
        if (val.categoryname == item.categoryname) {
          this.categoryList_child = item.children
          item.children.map((_item,_index) => {
            this.childrenList.push(_item)
          })
        }
      })
      this.childrenList.map((_item, _index) => {
        if (val.categoryname == _item.categoryname) {
          this.categoryList__child = _item.children
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  display: inline-block;
  + .select {
    margin-left: 10px;
  }
}
</style>