<template>
  <el-container class="layout-content">
    <!-- 左侧菜单 -->
    <el-aside v-if='menuVisible' style='width: 240px' ref='slider' class='slider'>
      <slot name="left"></slot>
    </el-aside>
    <!-- 右侧页面 -->
    <el-main>
      <!-- 面包屑 -->
      <div class="bread">
        <Breadcrumb />
      </div>
      <!-- 页面内容 -->
      <div class="content">
        <slot name="content"></slot>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Breadcrumb from './Breadcrumb'
  export default {
    computed: {
      ...mapState({
        screenWidth: state => state.screenWidth,
        menuVisible: state => state.menuVisible
      }),
    },
    created() {
      this.isMobile()
    },
    watch: {
      // 监听屏幕尺寸变化
      screenWidth: function(val) {
        val < 900 ? this.MENU_VISIBLE(false) : this.MENU_VISIBLE(true)
      }
    },
    methods: {
      ...mapMutations([
        'MENU_VISIBLE'
      ]),
      isMobile() {
        const initialWidth = document.body.clientWidth
        console.log(initialWidth)
        if(initialWidth < 900) {
          this.MENU_VISIBLE(false)
        }
      }
    },
    components: {
      Breadcrumb
    }
  }
</script>

<style lang="scss" scoped>
.layout-content {
  height: 100%;
  // .sider {
  //   width: 200px;
  // }
  .el-main {
    padding: 0;
    overflow: hidden;
    margin-top: 64px;
    .bread {
      width: 100%;
      background: #fff;
      height: 60px;
      border-right: none;
      border-bottom: 1px solid #eee;
      // background: #fefefe;
      // box-shadow: 0 1px 10px rgba(0,0,0,.04);
      display: flex;
      align-items: center;
      position: fixed;
      z-index: 10;
      padding-left: 30px;
    }
    .content {
      margin-top: 60px;
      padding: 14px;
      height: calc(100% - 54px);
      box-sizing: border-box;
    }
  }
}
@media screen and(max-width: 900px) {
  .layout-content {
    .slider {
      position: absolute;
    }
    .el-main {
      .bread {
        padding-left: 0;
      }
      .content {
        padding: 10px;
      }
    }
  }
}
</style>