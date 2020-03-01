<template>
  <div class='menuBar' :style="{width: menuWidth}">
    <div class="system-info">
      <img class="logo" src="@/assets/logo_bg.jpg" alt />
    </div>
     <el-menu
      class="el-menu-vertical-demo"
      router
      :default-active="currentRouter"
      @select='handleChange'
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
          <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
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
        menuWidth: '240px',
        routers: routers,
        currentRouter: sessionStorage.getItem('currentRouter') ? sessionStorage.getItem('currentRouter') : '/',
      }
    },
    created() {
      sessionStorage.setItem('currentRouter',this.$route.path)
      // if (isMobile()) {
      //   alert("手机端");
      // } else {
      //   alert("pc端");
      // }
    },
    watch: {
      $route(to,from) {
        sessionStorage.setItem('currentRouter',to.path)
      },
    },
    computed: {
      ...mapState({
        menuVisible: state => state.menuVisible,
        isMobile: state => state.isMobile
      })
    },
    methods: {
       ...mapMutations([
        'MENU_VISIBLE',
        'IS_MOBILE'
      ]),
      handleChange() {
        if(isMobile()) {
        // 异步回调改变菜单 打开状态
        setTimeout(() => {
          this.$store.commit('MENU_VISIBLE',false)
        },100)
        }
      },
      
    }
  }
</script>

<style lang="scss" scoped>
.menuBar {
  position: fixed;
  // width: 240px;
  height: 100vh;
  box-shadow: 7px 0 60px rgba(0,0,0,.05);
  background: #fff;
  z-index: 100;
  .system-info {
    text-align: left;
    padding: 0 20px 0 4px;
    position: relative;
    border-bottom: 1px solid #eee;
    z-index: 999;
    > i {
      font-size: 30px;
      position: absolute;
      top: 50%;
      right: 20px;
      margin-top: -15px;
      color: #000;
    }
    .pc {

    }
    .logo {
      height: 64px;
      margin-left: 20px;
      margin-right: 10px;
    }
  }
  .el-menu {
    border-right: none;
    box-shadow: 0.46875rem 0 6px rgba(4,9,20,.02);
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