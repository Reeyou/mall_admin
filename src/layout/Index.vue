<template>
  <div class="layout">
    <!-- 头部 -->
    <Header />
    <!-- 内容 -->
    <Container>
      <Slider slot="left"></Slider>
      <router-view slot="content" class='content' v-if="isRouterAlive"></router-view>
    </Container>
  </div>
</template>

<script>
import Header from './Header'
import Slider from './Slider'
import Container from './Container'
export default {
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true                    //控制视图是否显示的变量
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;            //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;         //再打开
      })
    }
  },
  components: {
    Header,
    Slider,
    Container
  }
}
</script>

<style lang="scss" scoped>
.layout {
    .content {
        // overflow: scroll;
    }
}
</style>