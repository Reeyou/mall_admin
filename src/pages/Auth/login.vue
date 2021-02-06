<template>
  <div class="main-container">
    <section class="content">
      <div class="header fadeIn">
        <h1>TMall</h1>
        <h2>商城后台管理平台</h2>
      </div>
      <div class="auth-content sj_font">
        <h4 class="sub_title">用户登录</h4>
        <el-form
          label-position="top"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
        >
          <el-form-item
            label="用户名/邮箱地址"
            class="input_container"
            prop="username"
          >
            <el-input
              type="text"
              :placeholder="user"
              v-model="loginForm.username"
              autocomplete="off"
            >
              <i slot="prefix" class="el-input__icon iconfont icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item
            label="登录密码"
            class="input_container"
            prop="password"
          >
            <el-input
              type="password"
              :placeholder="password"
              v-model="loginForm.password"
              autocomplete="off"
            >
              <i
                slot="prefix"
                class="el-input__icon iconfont icon-password"
              ></i>
            </el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="btn sj_font"
            :loading="loading"
            @click="login"
            >登录</el-button
          >
          <div class="tips">
            <span class="last">
              没有账号？
              <a class="hlight-a" href="/register">前往注册</a>
            </span>
          </div>
        </el-form>
      </div>
      <Footer class="footer sj_font" />
    </section>
    <section class="sidebar">
      <div class="sidebar-content">
        <div class="sidebar-content-item fadeIn"></div>
        <div class="sidebar-content-item fadeIn"></div>
        <div class="sidebar-content-item fadeIn"></div>
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
      username_error_msg: false,
      password_error_msg: false,
      loading: false,
      loginForm: {},
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      }
    }
  },
  methods: {

    login () {
      this.$refs['loginForm'].validate((valid) => {

        if (valid) {
          this.loading = true
          login(this.loginForm)
            .then(res => {
              this.loading = false
              localStorage.setItem('userinfo', JSON.stringify(res.data.userinfo))
              sessionStorage.setItem('token', `Bearer ${res.data.userinfo.token}`)
              this.$router.push({ path: '/' })
            })
            .catch(e => {
              this.$notify.error({
                title: '提示',
                message: e.msg,
                duration: 3000
              });
              this.loading = false
            })
        }
      })

    },
    validateFields () {

    }
  },
  components: {
    Footer
  }
}
</script>

<style src='./index.scss' lang='scss'>
</style>
