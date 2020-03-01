<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <h2 class='animation title'>Reeyou博客后台管理平台</h2>
        <h4 class='animation sub_title'>用户登录</h4>
        <form action="">
          <div class='input_container animation username'>
            <i class='iconfont icon-user'></i>
            <input autocomplete="off" v-model='username' type="text" placeholder="用户名">
          </div>
          <p class='error_msg' v-show='error_msg'>{{error_user}}</p>
          <div class='input_container animation password'>
            <i class='iconfont icon-password'></i>
            <input autocomplete="off" v-model='password' type="password" placeholder="登录密码">
          </div>
          <p class='error_msg' v-show='error_msg'>{{error_password}}</p>
          <button class='animation button' @click='login' type='button'>登录</button>
          <div class="tips animation">
            <!-- <span class='first'><a href="/#/resetPwd">忘记密码？</a></span> -->
            <span class='last'>没有账号？<a href="/register">前往注册</a></span>
          </div>
        </form>
      </div>
      <Footer class='footer' />
    </div>
  </div>
</template>

<script>
// import { login } from '@/service/user'
// import { mapMutations } from 'vuex'
import Footer from '@/components/Footer'
export default {
  name: 'login',
  data () {
    return {
      error_user: '请输入用户名',
      error_password: '请输入密码',
      error_msg: false,
      username: '',
      password: ''
    }
  },
  methods: {
    
    login() {
      const params = {
        username: this.username,
        password: this.password
      }
      // this.$refs[formName].validate((valid) => {
      //   if(valid) {

      //   } else {

      //   }
      // })
      // login(params).then(res => {
      //   if(res.code == 200) {
      //     localStorage.setItem('userinfo', JSON.stringify(res.data.userinfo))
      //     sessionStorage.setItem('token',`Bearer ${res.data.token}`)
          this.$router.push({path: '/'})
      //   }
      // })
    }
  },
  components: {
    Footer
  }
}
</script>

<style src='./index.scss' lang='scss'>

</style>
