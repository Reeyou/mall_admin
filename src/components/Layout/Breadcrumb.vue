<template>
  <div>
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您当前所在位置</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in breadItems"
        :key="index"
        :to="{ path: item.path }"
        >{{ item.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadItems: []
    }
  },
  created () {
    this.initBreadCrumb(this.$route)
  },
  watch: {
    // 监听路由改变
    $route (to, from) {
      this.initBreadCrumb(to)
    },
  },
  mounted () {

  },
  methods: {
    initBreadCrumb (routers) {
      // 初始化面包屑数组
      let currentBread = []
      for (let index in routers.matched) {
        if (routers.matched[index].meta && routers.matched[index].meta.title) {
          currentBread.push({
            path: routers.matched[index].path ? routers.matched[index].path : "/",
            title: routers.matched[index].meta.title
          })
        }
      }
      this.breadItems = currentBread
    }
  },
}
</script>

<style lang="scss" scoped>
i {
  font-size: 14px;
  cursor: pointer;
  padding-left: 10px;
  vertical-align: middle;
}
.breadcrumb {
  display: inline-block;
  vertical-align: middle;
  padding-left: 18px;
}
</style>