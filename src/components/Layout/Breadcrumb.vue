<template>
  <div>
    <i class="el-icon-house"></i>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for='(item,index) in breadItems'
        :key='index'
        :to='{path:item.path}'
      >{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        breadItems: []
      }
    },
    created() {
      this.initBreadCrumb(this.$route)
    },
    watch:{
      // 监听路由改变
      $route(to,from){
        this.initBreadCrumb(to)
      },
    },
    mounted() {
      
    },
    methods: {
      initBreadCrumb(routers) {
        // 初始化面包屑数组
        let currentBread = [{path: '/', title: '后台管理系统'}]
        for(let index in routers.matched) {
          if(routers.matched[index].meta && routers.matched[index].meta.title) {
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
      font-size: 16px;
      cursor: pointer;
      padding-left: 16px;
    }
    .breadcrumb {
      display: inline-block;
      vertical-align: middle;
      padding-left: 4px;
    }
</style>