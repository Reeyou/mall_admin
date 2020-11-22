<template>
  <el-container class="layout-content">
    <!-- 左侧菜单 -->
    <el-aside
      :style="{
        width: sliderWidth,
        height: 'calc(100vh - 80px)',
        marginTop: '16px'
      }"
      ref="slider"
      class="slider"
    >
      <slot name="left"></slot>
    </el-aside>
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
      menuVisible: state => state.menuVisible,
      sliderWidth: state => state.sliderWidth + 'px'
    }),
    ...mapGetters(['getScreenWidth'])
  },
  created () {
    this.isMobile()
  },
  watch: {
    // 监听屏幕尺寸变化
    getScreenWidth (val) {
      console.log(val)

      if (val < 1200 && val > 800) {
        this.IS_COLLAPSE(true)
        this.SLIDER_WIDTH(64)
      } else if (val < 800) {
        console.log(1)
        this.IS_MOBILE(true)
        this.SLIDER_WIDTH(0)
      } else {
        this.IS_COLLAPSE(false)
        this.SLIDER_WIDTH(200)
        this.IS_MOBILE(false)
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
      margin: 16px;
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