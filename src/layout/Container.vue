<template>
  <el-container :class="classObj" class="layout-content">
    <!-- 左侧菜单 -->
    <slot name="left"></slot>
    <!-- 右侧页面 -->
    <el-main>
      <!-- 页面内容 -->
      <div class="content">
        <!-- 面包屑 -->
        <div class="bread">
          <Breadcrumb />
        </div>
        <slot name="content"></slot>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Breadcrumb from './Breadcrumb'
export default {
  data () {
    return {
      screenWidth: '',
    }
  },
  mounted () {
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth
      this.$store.commit('SCREEN_WIDTH', this.screenWidth)
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      menuVisible: state => state.menuVisible,
    }),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        // openSidebar: this.sidebar.opened,
        // withoutAnimation: this.sidebar.withoutAnimation,
        // mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    ...mapMutations([
      'IS_COLLAPSE', 'IS_MOBILE', 'SLIDER_WIDTH'
    ]),
    isMobile () {
      const initialWidth = document.body.clientWidth

      if (initialWidth < 1200) {
        this.IS_COLLAPSE(true)
        this.SLIDER_WIDTH(64)
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
  padding-top: 64px;
  .sider {
    border-radius: 10px;
  }
  .el-main {
    padding: 0;
    overflow: hidden;
    background: #f5f5f5;
    .content {
      border-radius: 10px;
      box-shadow: 0 0 8px 1px #e7e7e7;
      margin: 8px;
      margin-left: 210px;
      border: 1px solid #eee;
      box-sizing: border-box;
      .bread {
        width: 100%;
        height: 54px;
        background: #fff;
        border-right: none;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        border-radius: 6px 6px 0 0;
        z-index: 10;
      }
    }
  }
}
.hideSidebar {
  .el-main {
    .content {
      margin-left: 74px;
    }
  }
}
@media screen and(max-width: 800px) {
  .layout-content {
    .slider {
      border-radius: 10px;
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