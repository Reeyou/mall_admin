<template>
  <div class="main-container">
    <section class="content">
      <div class="header fadeIn">
        <h1 class="fadeTop delay-400">TMall</h1>
        <h2 class="fadeTop delay-600">商城后台管理平台</h2>
      </div>
      <div class="auth-content sj_font">
        <h4 class="fadeTop delay-800 sub_title">用户登录</h4>
        <form action>
          <div :class="['input_container', 'fadeTop', 'delay-1200',{'err': error_msg}]">
            <label>用户名/邮箱地址</label>
            <i class="iconfont icon-user"></i>
            <input autocomplete="off" v-model="loginForm.username" type="text" :placeholder="user" />
          </div>
          <p class="error_msg" v-show="error_msg">{{user}}</p>
          <div :class="['input_container', 'fadeTop', 'delay-1200',{'err': error_msg}]">
            <label>登录密码</label>
            <i class="iconfont icon-password"></i>
            <input autocomplete="off" v-model="loginForm.password" type="password" :placeholder="password" />
          </div>
          <p class="error_msg" v-show="error_msg">{{password}}</p>
          <re-button type='primary' class="fadeTop btn delay-1600" @click="login">登录</re-button>
          <div class="tips fadeIn delay-2000">
            <span class="last">
              没有账号？
              <a class='hlight-a' href="/register">前往注册</a>
            </span>
          </div>
        </form>
      </div>
      <Footer class="footer sj_font fadeIn delay-2200" />
    </section>
    <section class="sidebar">
      <div class="sidebar-content">
        <div class='sidebar-content-item fadeIn'></div>
        <div class='sidebar-content-item fadeIn'></div>
        <div class='sidebar-content-item fadeIn'></div>
      </div>
    </section>
  </div>
</template>

<script>
import { register, login } from '@/api/user'
// import { mapMutations } from 'vuex'
import Footer from '@/components/Footer'
export default {
  name: 'login',
  data () {
    return {
      user: '请输入用户名/邮箱地址',
      password: '请输入密码',
      error_msg: false,
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {

    login () {
      login(this.loginForm).then(res => {
        console.log(res)
      })
      // this.$refs[formName].validate((valid) => {
      //   if(valid) {

      //   } else {

      //   }
      // })
      // login(params).then(res => {
      //   if(res.code == 200) {
      //     localStorage.setItem('userinfo', JSON.stringify(res.data.userinfo))
      //     sessionStorage.setItem('token',`Bearer ${res.data.token}`)
      // this.$router.push({ path: '/' })
      //   }
      // })
    },
    validateFields() {

    }
  },
  components: {
    Footer
  }
}
</script>

<style src='./index.scss' lang='scss'>
</style>
