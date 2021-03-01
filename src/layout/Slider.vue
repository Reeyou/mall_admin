<template>
  <div class="menuBar">
    <el-menu
      router
      :default-active="currentRouter"
      @select="handleChange"
      :collapse="isCollapse"
      :background-color="theme.backgroundColor"
      :text-color="theme.textColor"
      :active-text-color="theme.activeTextColor"
      class="el-menu-vertical"
      :collapse-transition="false"
    >
      <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
    <div class="collapse cursor" @click="collapseClick">
      <i
        v-if="isCollapse"
        class="iconfont icon-double-arrow-right"
      ></i>
      <i
        v-if="!isCollapse"
        class="iconfont icon-double-arrow-left"
      ></i>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import isMobile from '@/utils/isMobile'
import SidebarItem from './SidebarItem'
export default {
  data () {
    return {
      currentRouter: sessionStorage.getItem('currentRouter') ? sessionStorage.getItem('currentRouter') : '/',
    }
  },
  created () {
    sessionStorage.setItem('currentRouter', this.$route.path)
  },
  watch: {
    $route (to, from) {
      sessionStorage.setItem('currentRouter', to.path)
    },
  },
  computed: {
    ...mapState({
      theme: state => state.theme,
    }),
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  components: { SidebarItem },
  methods: {
    ...mapMutations([
      'IS_COLLAPSE',
      'IS_MOBILE',
      'SLIDER_WIDTH'
    ]),
    collapseClick () {
      this.$store.dispatch('app/toggleSideBar')
    },
    handleChange () {
      if (isMobile()) {
        // 异步回调改变菜单 打开状态
        setTimeout(() => {
          this.$store.commit('IS_COLLAPSE', true)
        }, 100)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.menuBar {
  height: calc(100vh - 72px);
  margin-top: 8px;
  //   padding:20px 0;
  border-right: 1px solid #eee;
  border-radius: 6px;
  box-shadow: 0 0 4px 1px #e7e7e7;
  background: #fff;
  overflow-y: hidden;
  overflow-x: hidden;
  position: fixed;
  .el-menu {
    border-right: none;
    height: calc(100% - 64px);
  }
  .el-menu::-webkit-scrollbar {
    width: 0 !important;
  }
  .el-menu-slide {
    border-right: none;
    i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
  .collapse {
    position: absolute;
    display: inline-block;
    bottom: 0;
    right: 0;
    width: 100%;
    // height: 40px;
    text-align: center;
    border-top: 1px solid #ddd;
    padding: 20px 0;
    transition: 400ms ease;
    &:hover {
      background: #fff6f6;
    }
    i {
      font-size: 16px;
      // font-weight: bold;
    }
  }
}
@media screen and(max-width: 900px) {
  .menuBar {
    .system-info {
      text-align: left;
      .pc {
        display: none;
      }
    }
  }
}
</style>