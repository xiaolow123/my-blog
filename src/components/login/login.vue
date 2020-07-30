<template>
  <div class='login'>
    <div v-title data-title='login'></div>
    <div class='login-form'>
      <label class='title' for='name'>
        用户登录
      </label>
      <input type='text' name='name' v-model='name' placeholder="登录用户名" id='name'>
      <span class='forget'>忘记登录用户名?</span>
      <input type='password' name='password' v-model='password' placeholder='密码'>
      <span class='forget'>忘记密码?</span>
      <button id='submit' @click='login'>登录</button>
      <div class='gotosignup' @click='gotosignup'>没有账户，立即注册</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
  name: 'login',
  data () {
    return {
      name: '',
      password: '',
      logined: false
    }
  },
  methods: {
    login () {
      let _this = this
      axios.post('/api/login', {
        name: _this.name,
        password: _this.password
      }).then((res) => {
        if (res.data.length === 0) {
          alert('请输入正确的用户名及密码')
          _this.$router.push('/login')
        } else {
          alert('登录成功')
          localStorage.myset('user', JSON.stringify(res.data[0]), 10000000)
          console.log(localStorage.myget('user'))
          _this.$router.push('/')
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    gotosignup () {
      this.$router.push('/signup')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.login
  position:fixed
  left:30%
  right:0
  top:0
  bottom:0
  background-color:rgba(0,0,0,.5)
  .login-form
    width:323px
    height:300px
    background-color:$background-color
    position:absolute
    top:50%
    left:50%
    transform:translate(-50%, -50%)
    padding:30px
    display:flex
    align-items:center
    flex-direction :column
    .forget
      align-self:flex-end
      color:$color-text-forget
    .title
      text-align:center
      padding:5px
      font-size:$font-mid-I
      margin:20px
      color:$color-text-forget
    input
      border:solid 1px $color-text-ll
      margin:7px
      width:95%
      position:relative
      padding:5px
      font-size:$font-normal-II
    button
      color:$color-text
      background-color: $background-button
      padding:7px
      margin:25px
      width:77px
      border-radius:7px
    .gotosignup
      color: $color-text-forget
      cursor pointer
</style>
