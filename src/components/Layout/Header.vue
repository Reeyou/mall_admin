<template>
  <div class='header' :style="{'margin-left': sliderWidth, 'width': `calc(100% - ${sliderWidth})`}">
    <!-- <i v-if='!isCollapse' class='iconfont icon-menuOpen mobile' @click='openMenu'></i> -->
    <!-- <i v-else class='iconfont icon-md-close mobile' @click='closeMenu'></i> -->
    <i v-if="isCollapse" class='iconfont icon-menuOpen pc' @click='openMenu'></i>
    <i v-else class='iconfont icon-menuClose pc' @click='closeMenu'></i>
    <el-dropdown class="system-user">
      <span class="userinfo-inner">
        <span>欢迎您</span> <span class='name'>Reeyou</span>
        <img src="@/assets/logo.png" alt="">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click.native='logout' divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
  export default {
    data() {
      return {
        scrrenWidth: '',
        userinfo: JSON.parse(localStorage.getItem('userinfo'))
      }
    },
    mounted() {
      window.onresize = () => {
        this.scrrenWidth = document.body.clientWidth
        this.$store.commit('SCREEN_WIDTH',this.scrrenWidth)
      }
    },
    computed: {
      ...mapState({
        isCollapse: state => state.isCollapse,
        isMobile: state => state.isMobile,
        sliderWidth: state => state.sliderWidth + 'px'
      })
    },
    methods: {
      ...mapMutations([
        'IS_COLLAPSE',
        'SLIDER_WIDTH'
      ]),
      logout() {
        this.$router.push('./login')
        sessionStorage.removeItem('currentRouter')
        sessionStorage.removeItem('token')
        localStorage.removeItem('userinfo')
      },
      collapse() {
        console.log('collapse')
        // this.menuWidth = '100px'
      },
      openMenu() {
        this.IS_COLLAPSE(false)
        this.SLIDER_WIDTH(200)
      },
      closeMenu() {
        this.IS_COLLAPSE(true)
        this.SLIDER_WIDTH(64)
      }
    }
  }
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  line-height: 64px;
  height: 64px;
  padding: 0 28px;
  border-bottom: 1px solid #e5e5e5;
  // box-shadow: 0 2px 8px 2px rgba(0,0,0,0.08);
  .logo {
    display: none;
  }
  .mobile {
    font-size: 30px;
    margin-left: 20px;
    color: #000;
  }
  .pc {
    font-size: 24px;
    color: #000;
    cursor: pointer;
  }
}
.system-user {
  text-align: right;
  float: right;
  padding-right: 40px;
  .userinfo-inner {
    color: #000;
    font-size: 16px;
    cursor: pointer;
    span {
      font-size: 14PX;
    }
    .name {
      color: red;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 11px 0px 11px 10px;
      float: right;
    }
  }
}
@media screen and(max-width: 900px) {
  .header{
    z-index: 200;
    .logo {
      display: inline;
      width: 82px;
      height: 64px;
      position: absolute;
      left: 50%;
      margin-left: -41px;
    }
  }
  .system-user {
    padding-right: 20px;
    .userinfo-inner {
      > span {
        display: none;
      }
    }
  }
}
</style>