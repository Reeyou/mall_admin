<template>
  <div class="main-container">
    <section class="sidebar">
      <div class="sidebar-content">
        <div class="header">
          <h1 class="animation title">Reeyou</h1>
          <h2 class="animation _title">博客后台管理平台</h2>
        </div>
        <div class='art'>
          <img src="../../assets/slide.png" alt="">
          <p>It designd by <a href='https://dribbble.com/SAMji_illustrator' target='_blank' class='hlight-a' :style="{verticalAlign: 'middle'}">SAM JI</a> in dribbble</p>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="auth-content sj_font">
        <h4 class="animation sub_title">用户登录</h4>
        <form action>
          <div :class="['input_container', 'animation', 'username',{'err': error_msg}]">
            <label>用户名/邮箱地址</label>
            <i class="iconfont icon-user"></i>
            <input autocomplete="off" v-model="loginForm.username" type="text" :placeholder="user" />
          </div>
          <p class="error_msg" v-show="error_msg">{{user}}</p>
          <div :class="['input_container', 'animation', 'password',{'err': error_msg}]">
            <label>登录密码</label>
            <i class="iconfont icon-password"></i>
            <input autocomplete="off" v-model="loginForm.password" type="password" :placeholder="password" />
          </div>
          <p class="error_msg" v-show="error_msg">{{password}}</p>
          <!-- <re-button type='primary' class="animation login-btn" @click="login">登录</re-button> -->
          <p @click='login'>denglu</p>
          <div class="tips animation">
            <!-- <span class='first'><a href="/#/resetPwd">忘记密码？</a></span> -->
            <span class="last">
              没有账号？
              <a class='hlight-a' href="/register">前往注册</a>
            </span>
          </div>
        </form>
      </div>
      <Footer class="footer sj_font" />
    </section>
  </div>
</template>

<script>
import { register } from '@/api/user'
// import { mapMutations } from 'vuex'
import Footer from '@/components/Footer'
export default {
  name: 'register',
  data () {
    return {
      user: '请输入用户名/邮箱地址',
      password: '请输入密码',
      error_msg: false,
      loginForm: {
        user: '',
        password: ''
      }
    }
  },
  methods: {

    login () {
      const params = {
        username: this.username,
        password: this.password
      }
      console.log(111)
      // register(params).then(res => {
      //   console.log(res)
      // })
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
