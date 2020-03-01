<template>
  <div class='layout'>
    <!-- 头部 -->
    <Header />
    <!-- 内容 -->
    <Container>
      <Slider slot="left"></Slider>
      <router-view slot="content"></router-view>
    </Container>
  </div>
</template>

<script>
import Header from './Header'
import Slider from './Slider'
import Container from './Container'
  export default {
    components: {
      Header,
      Slider,
      Container
    }
  }
</script>

<style lang="scss" scoped>

</style>