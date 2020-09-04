<template>
  <div class='side'>
    <div class='background'></div>
    <div class='title'>我的前端客栈</div>
    <div class='firstline'></div>
    <div class='subtitle'>轻松开心点就好啦</div>
    <div class='secondline'></div>
    <div class='functions-wrapper'>
      <div class='functions'>
        <router-link class='function' to='/contents'><span>首页</span></router-link>
        <router-link class='function' to='/login'><span>登录</span></router-link>
        <div class='function' @click="unlogin" v-if='logined'>登出</div>
        <router-link class='function' to='/archive'><span>归档</span></router-link>
      </div>
    </div>
    <div class='functions-wrapper2'>
      <div class='functions'>
        <router-link class='function' to='/userinfo'><span>个人中心</span></router-link>
        <router-link class='function' to='/arti'><span>写文章</span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'side',
  mounted () {
    let user = localStorage.myget('user')
    if (user) {
      this.logined = true
    } else {
      this.logined = false
    }
  },
  methods: {
    unlogin () {
      localStorage.removeItem('user')
      this.logined = false
    }
  },
  data () {
    return {
      logined: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.side
  width 30%
  position fixed
  top 0
  bottom 0
  .background
    background-image url('../../../static/1.jpg')
    background-size: 100% 100%
    filter brightness(50%)
    position absolute
    top 0
    bottom 0
    left 0
    right 0
  .title
    color #fff
    font-size $font-mid
    letter-spacing 7px
    position absolute
    padding 20px
    top 30%
    left 0
    right 0
    text-align center
    @media screen and (max-width:1050px) {
      font-size: $font-mid-I
    }
  .firstline
    width 150px
    height 1px
    background-color #777
    position absolute
    top 42%
    left 50%
    transform translate(-50%)
  .subtitle
    color #fff
    position absolute
    letter-spacing 2px
    padding 20px
    top 43%
    left 0
    right 0
    text-align center
  .secondline
    width 50px
    height 1px
    background-color #777
    position absolute
    top 50%
    left 50%
    transform translate(-50%)
  .functions-wrapper
    position absolute
    top 55%
    left 15%
    right 15%
    .functions
      position absolute
      left 50%
      transform translateX(-50%)
      display flex
      align-items center
      .router-link-active
        background-color:$background-theme
      .function
        border-radius 20px
        padding 10px
        font-weight bold
        border 1px solid #fff
        margin 7px
        width 50px
        text-align center
        color #fff
        cursor pointer
  .functions-wrapper2
    position absolute
    top 65%
    left 5%
    right 5%
    .functions
      position absolute
      left 50%
      transform translateX(-50%)
      display flex
      align-items center
      .router-link-active
        background-color:$background-theme
      .function
        border-radius 20px
        padding 12px
        font-weight bold
        border 1px solid #fff
        margin 7px
        text-align center
        color #fff
        cursor pointer
  .notice
    padding-bottom:12px
    .title
      background-color:$background-theme
      color:$color-text
      padding:9px
      border-radius:5px
    .content
      font-size:$font-small
      p
        padding-top:12px
</style>
