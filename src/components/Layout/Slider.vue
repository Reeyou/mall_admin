<template>
  <div class="menuBar" :style="{ width: sliderWidth }">
    <el-menu
      router
      :default-active="currentRouter"
      @select="handleChange"
      :collapse="isCollapse"
      :background-color="theme.backgroundColor"
      :text-color="theme.textColor"
      :active-text-color="theme.activeTextColor"
    >
      <template
        v-for="item in routers"
        v-if="!item.hidden && item.children && item.children.length > 0"
      >
        <!-- 单个元素 -->
        <el-menu-item
          v-if="item.children.length == 1"
          :index="item.children[0].path"
          :key="item.name"
        >
          <i
            :style="{ color: theme.textColor }"
            v-if="item.children[0].meta.icon"
            :class="item.children[0].meta.icon"
          ></i>
          <span slot="title">{{ item.children[0].meta.title }}</span>
        </el-menu-item>
        <!-- 多个子元素 -->
        <el-submenu v-else :index="item.children[0].path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta && item.meta.title" slot="title">{{
              item.meta.title
            }}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            v-if="!child.hidden"
            :index="child.path"
            :key="child.name"
          >
            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta && child.meta.title" slot="title">{{
              child.meta.title
            }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <div class="collapse cursor" @click='collapseClick'>
        <i v-if='isCollapse&&!isMobile' class="iconfont icon-double-arrow-right" ></i>
        <i v-if='!isCollapse&&!isMobile' class="iconfont icon-double-arrow-left" ></i>
    </div>
  </div>
</template>

<script>
import { routers } from '../../router';
import { mapState, mapMutations } from 'vuex'
import isMobile from '@/utils/isMobile'
export default {
  data () {
    return {
      routers: routers,
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
      isCollapse: state => state.isCollapse,
      isMobile: state => state.isMobile,
      theme: state => state.theme,
      sliderWidth: state => state.sliderWidth + 'px'
    })
  },
  methods: {
    ...mapMutations([
      'IS_COLLAPSE',
      'IS_MOBILE',
      'SLIDER_WIDTH'
    ]),
    collapseClick() {
        if(this.isCollapse) {
            this.IS_COLLAPSE(false)
            this.SLIDER_WIDTH(200)
        } else {
            this.IS_COLLAPSE(true)
            this.SLIDER_WIDTH(64)
        }
    },
    openMenu() {
    this.IS_COLLAPSE(false)
    this.SLIDER_WIDTH(200)
    },
    closeMenu() {
    this.IS_COLLAPSE(true)
    this.SLIDER_WIDTH(64)
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
.menuBar {
  height: calc(100vh - 80px);
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
    padding:20px 0;
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