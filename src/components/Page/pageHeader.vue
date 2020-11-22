<template>
  <div class="page">
    <!-- 标题 -->
    <div class="title">
      <h2>{{title}}</h2>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: [
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
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/common.scss";
@import "./index.scss"
</style>
