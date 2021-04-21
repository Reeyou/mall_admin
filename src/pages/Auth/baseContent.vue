<template>
  <div class="main-container">
    <section class="sidebar">
      <div class="sidebar-content">
        <div class="art">
          <img src="../../assets/slide.png" alt />
          <p>
            It designd by
            <a
              href="https://dribbble.com/SAMji_illustrator"
              target="_blank"
              class="hlight-a"
              :style="{verticalAlign: 'middle'}"
            >SAM JI</a> in dribbble
          </p>
        </div>
      </div>
    </section>
    <section class="content">
        <slot></slot>
    </section>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
export default {
    name: 'baseContent',
    props: {
        title: String
    },
    computed: {
        type () {
            return this.title === '登录'
        }
    },
    methods: {
        click () {
            this.$emit('handleClick')
        }
    },
    components: {
        Footer
    }
}
</script>

<style src='./index.scss' lang='scss'>
</style>
