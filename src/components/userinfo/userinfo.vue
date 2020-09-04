<template>
  <div class='userinfo'>
    <div class='wrapper' @click='hidecalendar'>
      <div class='header'>
        <div class='header-option'>资料设置</div>
      </div>
      <div class='content'>
        <div class='item'>
          <span>头像</span>
          <input type='file' ref='myfile'>
        </div>
        <div class='item' @click="fileval">
          <span>昵称</span>
          <input class='normal'>
        </div>
        <div class='item item2'>
          <span>生日</span>
          <input v-model='birthday'
                 placeholder="点击设置"
                 class='normal'
                 @click.stop="togglecalendar">
          <Calendar class='calendar'
                    v-on:choseDay="clickDay"
                    v-on:changeMonth="changeDate"
                    v-if="ifcalendar"
                    ></Calendar>
        </div>
        <div class='item'>
          <span class='signaturex'>个人简介</span>
          <textarea v-model='signature' cols='50' class='signature'></textarea>
        </div>
      </div>
      <div class='button' @click="complete">完成</div>
    </div>
  </div>
</template>

<script>
import Calendar from 'vue-calendar-component'
import axios from 'axios'
export default {
  name: 'userinfo',
  data () {
    return {
      birthday: '',
      ifcalendar: false,
      avatar: '',
      signature: ''
    }
  },
  components: {
    Calendar
  },
  methods: {
    complete () {
      axios.post('/user', {

      })
    },
    fileval () {
      console.log(this.avatar)
    },
    hidecalendar () {
      this.ifcalendar = false
    },
    togglecalendar () {
      this.ifcalendar = !this.ifcalendar
    },
    clickDay (data) {
      this.birthday = data // 选中某天
    },
    changeDate (data) {
      this.birthday = data // 左右点击切换月份
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.userinfo
  position absolute
  left 30%
  right 0
  top 0
  bottom 0
  padding 70px
  padding-left: 90px
  padding-right:150px
  background-color:rgba(200,200,200,.5)
  .wrapper
    position: absolute
    left 50%
    top 10%
    bottom 0
    transform translateX(-50%)
    width:700px
    background-color:#fff
    padding:10px
    .header
      display flex
      font-size $font-normal-III
      .header-option
        flex: 0 0 70px
        padding:15px
    .content
      padding:30px 50px
      .item2
        z-index:2
      .item
        margin-bottom:20px
        position relative
        span
          margin-right:50px
        .normal
          border:1px solid #ccc
          padding 2px
          width:300px
        .radio
          margin-left:20px
        .signaturex
          position absolute
          top 0
        .signature
          border:1px solid #aaa
          width:300px
          margin-left:85px
          resize:none
          height:200px
    .button
      position absolute
      left 50%
      bottom:15%
      transform translateX(-50%)
      padding:20px
      border-radius:15px
      color:#fff
      background-color $background-theme
>>> .calendar
  position: absolute
  top:35px
</style>
