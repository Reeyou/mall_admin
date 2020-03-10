<template>
  <div class="page">
    <!-- 标题 -->
    <div class="title">
      <h2>{{title}}</h2>
    </div>
    <!-- 添加按钮 -->
    <div class="addBtn" v-if="addBtn">
      <el-button type="primary" icon="el-icon-plus" @click="addBtn.onAdd">{{addBtn.label}}</el-button>
    </div>
    <div class="addBtn2" v-if="addBtn2">
      <el-button type="primary" icon="el-icon-plus" @click="addBtn2.onAdd">{{addBtn2.label}}</el-button>
    </div>
    <div class="addBtn2" v-if="addBtn3">
      <el-button type="primary" icon="el-icon-plus" @click="addBtn3.onAdd">{{addBtn3.label}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: [
    "addBtn",
    "addBtn2",
    "addBtn3",
    "title",
  ],
  data() {
    return {
      value: "",
      dataTitle: this.title,

    };
  },
  methods: {
    tableEdit(id) {
      this.$emit("handleEdit", id);
    },
    tableDelete(id) {
      this.$emit("handleDelete", id);
    }
  },
  components: {}
};
</script>

<style lang='scss'>
@import "@/assets/css/common.scss";
@import "./index.scss"
</style>
