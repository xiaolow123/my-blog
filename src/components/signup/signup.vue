<template>
  <div class='signup'>
    <div  class='signup-form'
          ref='target'
          >
      <p class='title'>注册账号</p>
      <div class='info'>
        <span>用户名 :</span>
        <span v-if='ifname' class='warn'>用户名应大于6个字符</span>
      </div>
      <input type='text' name='name' :class='{"border-warn":ifname}' @change='judgename' v-model='name' placeholder="不少于6个字符">
      <div class='info'>
        <span>密码 :</span>
        <span v-if='ifpassword' class='warn'>密码应大于6个字符</span>
      </div>
      <input type='password' name='password' :class='{"border-warn":ifpassword}' @change='judgepassword' v-model='password' placeholder="不少于6位，并包含数字、字母">
      <div class='info'>
        <span>确认密码 :</span>
        <span v-if='ifrepass' class='warn'>确认密码与初始密码不一致</span>
      </div>
      <input type='password' name='repass' :class='{"border-warn":ifrepass}' @change='judgerepass' v-model='repass' placeholder='请输入正确的密码'>
      <div class='info'>
        <span>头像:</span>
      </div>
      <input type='file' name='file' ref='file' :class='{"border-warn":iffile}'>
      <div class='info'>
        <span>个人简介 :</span>
        <span v-if='ifbio' class='warn'>个人简介应大于25个字符</span>
      </div>
      <textarea rows='5' cols='50' name='bio' :class='{"border-warn":ifbio}' @change='judgebio' v-model='bio' placeholder="不少于25个字符">
      </textarea>
      <button id='submit' @click='judgeinfo'>注册</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'signup',
  data () {
    return {
      name: '',
      password: '',
      repass: '',
      bio: '',
      ifname: false,
      ifpassword: false,
      ifrepass: false,
      ifbio: false,
      iffile: false
    }
  },
  computed: {
    file () {
      return this.$refs.file.files
    }
  },
  methods: {
    judgeinfo () {
      let _this = this
      axios.post('/api/signup', {
        name: _this.name,
        password: _this.password,
        signature: _this.bio
      }).then(function (response) {
        alert(response.data)
        _this.$router.push('/')
      }).catch(function (error) {
        if (error.response.status === 500) {
          alert('用户名重复')
        }
      })
    },
    judgename () {
      if (this.name.length < 6 || !this.name.length) {
        this.ifname = true
      } else if (this.name.length >= 6) {
        this.ifname = false
      }
    },
    judgepassword () {
      if (this.password.length < 6 || !this.password.length) {
        this.ifpassword = true
      } else if (this.password.length >= 6) {
        this.ifpassword = false
      }
    },
    judgerepass () {
      if (this.repass !== this.password || !this.repass.length) {
        this.ifrepass = true
      } else if (this.repass === this.password) {
        this.ifrepass = false
      }
    },
    judgebio () {
      if (this.bio.length < 25 || !this.bio.length) {
        this.ifbio = true
      } else if (this.bio.length >= 25) {
        this.ifbio = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.signup
  position:fixed
  left:30%
  right:0
  top:0
  bottom:0
  background-color:rgba(0,0,0,.5)
  .signup-form
    background-color:$background-color
    position:absolute
    top:50%
    left:50%
    transform:translate(-50%, -50%)
    padding:30px
    display:flex
    flex-direction:column
    width:390px
    height:500px
    .title
      text-align:center
      padding:5px
      font-size:$font-mid-I
      margin:20px
    input,textarea
      border:solid 1px $color-text-ll
      margin:5px
      padding:5px
    .info
      margin:3px
      margin-left:7px
    button
      color:$color-text
      background-color: $background-button
      padding:7px
      margin:25px
      width:77px
      border-radius:7px
      align-self:center
.warn
  color:$color-text-warn
.border-warn
  border:$color-text-warn 1px solid !important
</style>
