<template>
  <div>
    <BaseComponent
      subTitle='用户注册'
      buttonText='注册'
      :tips='tips'
      @onClick='register'
    />
  </div>
</template>

<script>
// import { register } from '@/service/user'
// import { mapMutations } from 'vuex'
import BaseComponent from './BaseComponent'
export default {
  name: 'login',
  data () {
    return {
      tips: ['已有账号？','立即登录']
    }
  },
  methods: {
    register() {
      const params = {
        username: this.username,
        password: this.password
      }
      // register(params).then(res => {
      //   if(res.code == 200) {
      //     // sessionStorage.setItem('token',res.data.token)
      //     this.$router.push({path: '/login'})
      //   }
      // })
    }
  },
  components: {
    BaseComponent
  }
}
</script>

<style src='./index.scss' lang='scss'>

</style>
