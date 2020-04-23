<template>
  <div class="page">
    <!-- 标题 -->
    <div class="title">
      <h2>{{title}}</h2>
      <div class="bread">
        <Breadcrumb />
      </div>
    </div>
    
  </div>
</template>

<script>
import Breadcrumb from "@/components/Layout/Breadcrumb"
export default {
  name: "PageHeader",
  props: [
    "title",
  ],
  components: {
    Breadcrumb
  },
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
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/common.scss";
@import "./index.scss"
</style>
