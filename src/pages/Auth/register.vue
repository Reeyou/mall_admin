<template>
  <div class="main-container">
    <section class="content">
      <div class="header fadeIn">
        <h1>TMall</h1>
        <h2>商城后台管理平台</h2>
      </div>
      <div class="auth-content sj_font">
        <h4 class="sub_title">用户注册</h4>
        <el-form
          label-position="top"
          :model="registerForm"
          :rules="registerRules"
          ref="registerForm"
        >
          <el-form-item
            label="用户名/邮箱地址"
            class="input_container"
            prop="username"
          >
            <el-input
              type="text"
              :placeholder="user"
              v-model="registerForm.username"
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
              v-model="registerForm.password"
              autocomplete="off"
            >
              <i
                slot="prefix"
                class="el-input__icon iconfont icon-password"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            class="input_container"
            prop="confirm_password"
          >
            <el-input
              type="password"
              :placeholder="password"
              v-model="registerForm.confirm_password"
              autocomplete="off"
            >
              <i
                slot="prefix"
                class="el-input__icon iconfont icon-password"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" class="input_container" prop="email">
            <el-input
              type="text"
              placeholder="请输入邮箱地址"
              v-model="registerForm.email"
              autocomplete="off"
            >
              <i
                slot="prefix"
                class="el-input__icon iconfont icon-password"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" class="input_container" prop="code">
            <div style="display: flex">
              <el-input
                type="test"
                placeholder="请输入验证码"
                v-model="registerForm.code"
                autocomplete="off"
                style="margin-right: 10px"
              >
                <i
                  slot="prefix"
                  class="el-input__icon iconfont icon-password"
                ></i>
              </el-input>
              <el-button
                :loading="loading_code"
                style="display: inline-block"
                @click="handleSendCode"
                >{{ code_text }}</el-button
              >
            </div>
          </el-form-item>
          <el-button
            type="primary"
            class="btn sj_font"
            :loading="loading"
            @click="register"
            >注册</el-button
          >
          <div class="tips">
            <span class="last">
              已有账号？
              <a class="hlight-a" href="/login">前往登录</a>
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
import { register, login, sendCode } from '@/api/user'
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
      loading_code: false,
      code_text: '发送',
      registerForm: {},
      registerRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirm_password: [{ required: true, message: '请确认密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      }
    }
  },
  methods: {
    handleSendCode () {
      this.loading_code = true
      //   console.log({email: this.registerForm.email})
      sendCode({ email: this.registerForm.email }).then(res => {
          this.$notify({
                title: '提示',
                message: res.msg,
                type: 'success',
                duration: 3000
            });
          this.loading_code = false
      }).catch(e => {
        this.$notify.error({
          title: '提示',
          message: e.msg,
          duration: 3000
        });
        this.registerForm.email = ''
        this.loading_code = false
      })
    },
    register () {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          register(this.registerForm)
            .then(res => {
              this.loading = false
                this.$notify({
                    title: '提示',
                    message: `${res.msg}1s后为您跳转登录页`,
                    type: 'success',
                    duration: 1000
                });
                setTimeout(() => {
                    this.$router.push({ path: '/login' })
                },1000)
            })
            .catch(e => {
              this.$notify.error({
                title: '提示',
                message: e.msg,
                duration: 3000
              });
            //   this.registerForm = {}
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
