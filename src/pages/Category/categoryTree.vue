<template>
  <div class="categoty" :style="stylePadding">
    <div class="category-item" v-for="(node,index) in data" :key="index">
      <p @click="((e) => {nodeItemClick(e,node)})">
        <i class="el-icon-caret-right" v-if="!node.visible&&node.children" @click="nodeClick(node)"></i>
        <i v-if="node.visible&&node.children" class="el-icon-caret-bottom" @click="nodeClick(node)"></i>
        <span>{{node.categoryname}}</span>
      </p>
      <el-button v-if="level<3" size="mini" icon="el-icon-plus add" @click="nodeAdd(node)"></el-button>
      <div class="input-container" v-show="node.addVisible">
        <el-input
          class="add-input"
          placeholder="请输入分类名称"
          v-model="node.value"
          @change="((val) => {nodeChange(val,node)})"
        ></el-input>
        <el-button size="mini" icon="el-icon-close" @click="nodeCancel(node)"></el-button>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-check"
          :loading="node.loading"
          @click="nodeSubmit(node)"
        ></el-button>
      </div>
      <el-collapse-transition>
        <category-tree v-show="node.visible" :increment="level" :data="node.children"></category-tree>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import bus from "./bus"
export default {
  name: "categoryTree",
  componentName: "categoryTree",
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    increment: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      value: "",
      expanded: false,
      node: null
    }
  },
  computed: {
    // 层级
    level () {
      let num = this.increment
      return ++num
    },
    stylePadding () {
      return {
        "padding-left": (this.level - 1) * 16 + "px"
      }
    }
  },
  methods: {
    nodeItemClick (e,node) {
      const dom = e.currentTarget
      console.log(dom.parentElement.parentElement.childNodes)
      bus.$emit("node-click", node)
      // this.$emit("handle-click", node)
    },
    nodeClick (node) {
      this.$set(node, "visible", node.visible ? false : true)
      this.$set(node, "prevVisible", node.prevVisible ? true : false)
      // this.node.visible = false
    },
    nodeAdd (node) {
      this.$set(node, "addVisible", node.addVisible ? false : true)
    },
    nodeChange (val, node) {
      this.$set(node, "value", val)
    },
    nodeSubmit (node) {
      this.$emit("handleSubmit", node)
      this.$set(node, "loading", true)
    },
    nodeCancel (node) {
      this.$set(node, "addVisible", false)
      this.$set(node, "loading", false)
    }
  }

}
</script>

<style lang="scss" scoped>
$defaultColor: #606266;
.category {
  max-width: 500px;
  &-item {
    padding: 12px 0 0 0;
    &:hover {
      cursor: pointer;
    }
    > p {
      display: inline-block;
      > i {
        font-size: 20px;
        vertical-align: middle;
        color: $defaultColor;
        &:hover {
          cursor: pointer;
        }
      }
      > span {
        font-size: 14px;
        color: $defaultColor;
        vertical-align: middle;
      }
    }
    .add {
      font-size: 14px;
    }
    >>> .el-button--mini {
      padding: 4px;
    }
    .input-container {
      display: inline-block;
      position: relative;
      animation: moveRight 400ms ease-in-out;
      >>> .el-input__inner {
        height: 24px;
        font-size: 12px;
        padding: 4px 8px;
      }
      >>> .el-button--mini {
        padding: 4px;
      }
      >>> .el-button + .el-button {
        margin-left: 0;
      }
      .add-input {
        width: 100px;
      }
    }
  }
}

@keyframes moveRight {
  0% {
    transform: translateX(-10px);
    z-index: -999;
    opacity: 0.48;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>