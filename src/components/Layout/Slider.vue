<template>
  <div class='menuBar' :style="{'width': sliderWidth}">
    <div class="system-info" :style="{'background-color': theme.themeColor}">
      <img v-if="!isCollapse" class="logo" src="@/assets/logo_bg.jpg" alt />
      <h1 v-else>R</h1>
    </div>
     <el-menu
      router
      :default-active="currentRouter"
      @select='handleChange'
      :collapse="isCollapse"
      :background-color="theme.themeColor"
      :text-color="theme.textColor"
      :active-text-color="theme.activeTextColor"
    >
      <template
        v-for="item in routers"
        v-if="!item.hidden&&item.children&&item.children.length>0"
      >
        <!-- 单个元素 -->
        <el-menu-item
          v-if="item.children.length==1"
          :index="item.children[0].path"
          :key="item.name"
        >
          <i :style="{'color': theme.textColor}" v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
          <span slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
        <!-- 多个子元素 -->
        <el-submenu v-else :index="item.children[0].path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
          </template>
          <el-menu-item v-for="child in item.children" v-if='!child.hidden' :index="child.path" :key="child.name">
            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { routers } from '../../router';
import { mapState, mapMutations } from 'vuex'
import isMobile from '@/utils/isMobile'
  export default {
    data() {
      return {
        routers: routers,
        currentRouter: sessionStorage.getItem('currentRouter') ? sessionStorage.getItem('currentRouter') : '/',
      }
    },
    created() {
      sessionStorage.setItem('currentRouter',this.$route.path)
    },
    watch: {
      $route(to,from) {
        sessionStorage.setItem('currentRouter',to.path)
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
        'IS_MOBILE'
      ]),
      handleChange() {
        if(isMobile()) {
        // 异步回调改变菜单 打开状态
        setTimeout(() => {
          this.$store.commit('IS_COLLAPSE',false)
        },100)
        }
      },
      
    }
  }
</script>

<style lang="scss" scoped>
.menuBar {
  height: 100vh;
  border-right: 1px solid #eee;
  overflow-y: hidden;
  overflow-x: hidden;
  position: fixed;
  .system-info {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-bottom: 1px solid #eee;
    > h1 {
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      color: #333;
      background-color: #e5e5e5;
      border-radius: 50%;
      padding: 6px 10px;
    }
    .logo {
      height: 64px;
      margin-left: 20px;
      margin-right: 10px;
    }
  }
  .el-menu {
    border-right: none;
    height: calc(100% - 64px);
  }
  .el-menu::-webkit-scrollbar { width: 0 !important }
  // .el-menu-item i,.el-submenu__title i {
  //   color: #85b1b1;
  // }
  // .el-menu-item.is-active i {
  //   color: #fff;
  // }
  .el-menu-slide {
    border-right: none;
    i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
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