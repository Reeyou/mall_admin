<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <h2 class='animation title'>后台管理系统</h2>
        <h4 class='animation sub_title'>{{subTitle}}</h4>
        <form action="">
          <div class='input_container animation username'>
            <i class='iconfont icon-user'></i>
            <input autocomplete="off" v-model='username' type="text" placeholder="用户名">
          </div>
          <p class='error_msg' v-show='error_msg'>{{error_user}}</p>
          <div class='input_container animation password'>
            <i class='iconfont icon-password'></i>
            <input autocomplete="off" v-model='password' type="password" placeholder="用户密码">
          </div>
          <p class='error_msg' v-show='error_msg'>{{error_password}}</p>
          <button class='animation button' @click='onClick' type='button'>{{buttonText}}</button>
          <div class="tips animation">
            <!-- <span class='first'><a href="/#/resetPwd">忘记密码？</a></span> -->
            <span class='last'>{{tips[0]}}<a href="/register">{{tips[1]}}</a></span>
          </div>
        </form>
      </div>
      <div class='footer'>
        <p>© Reeyou版权所有 | <a href="http://www.beian.gov.cn/portal/index.do">粤ICP备19124268号</a></p>
      </div>
    </div>
  </div>
</template>

<script>
// import { login } from '@/service/user'
// import { mapMutations } from 'vuex'
export default {
  name: 'Base',
  props: {
    subTitle: String,
    onClick: Function,
    buttonText: String,
    tips: Array
  },
  methods: {
    login() {
      const params = {
        username: this.username,
        password: this.password
      }
      this.$refs[formName].validate((valid) => {
        if(valid) {

        } else {

        }
      })
      // login(params).then(res => {
      //   if(res.code == 200) {
      //     localStorage.setItem('userinfo', JSON.stringify(res.data.userinfo))
      //     sessionStorage.setItem('token',`Bearer ${res.data.token}`)
      //     this.$router.push({path: '/'})
      //   }
      // })
    }
  }
}
</script>

<style src='./index.scss' lang='scss'>

</style>
