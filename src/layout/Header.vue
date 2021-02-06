<template>
  <div class='header' style="width: 100%">
    <i v-if='isCollapse&&isMobile' class='iconfont icon-menuOpen mobile' @click='openPhoneMenu'></i>
    <i v-if='!isCollapse&&isMobile' class='iconfont icon-md-close mobile' @click='closePhoneMenu'></i>
    <!-- <i v-if="isCollapse&&!isMobile" class='iconfont icon-menuOpen pc' @click='openMenu'></i>
    <i v-if="!isCollapse&&!isMobile" class='iconfont icon-menuClose pc' @click='closeMenu'></i> -->
    <div class="system-logo">
      <img class="logo" src="@/assets/logo_bg.jpg" alt />
    </div>
    <el-dropdown class="system-user">
      <span class="userinfo-inner">
        <span>欢迎您</span> <span class='name'>{{userinfo.username}}</span>
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
        userinfo: JSON.parse(localStorage.getItem('userinfo'))
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
      openPhoneMenu() {
        this.IS_COLLAPSE(false)
        this.SLIDER_WIDTH(200)
      },
      closePhoneMenu() {
        this.IS_COLLAPSE(true)
        this.SLIDER_WIDTH(0)
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
  box-shadow: 0 0 8px 1px #e7e7e7;
  z-index: 999;
  .mobile {
    font-size: 30px;
    color: #000;
  }
  .pc {
    font-size: 24px;
    color: #000;
    cursor: pointer;
  }
}
.system-logo {
    width: auto;
    height: 100%;
    float: left;
    > img {
        width: 100%;
        height: 100%;
    }
}
.system-user {
  text-align: right;
  float: right;
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