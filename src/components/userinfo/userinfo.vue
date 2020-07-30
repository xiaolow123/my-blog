<template>
  <div class='userinfo'>
    <div class='wrapper' @click='hidecalendar'>
      <div class='header'>
        <div class='header-option'>资料设置</div>
        <div class='header-option'>账号设置</div>
        <div class='header-option'>邮件设置</div>
      </div>
      <div class='content'>
        <div class='item'>
          <span>头像</span>
          <input type='file'>
        </div>
        <div class='item'>
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
          <span>性别</span>
          <input type='radio' value='男' name='name' class='radio'>男
          <input type='radio' value='女' name='name' class='radio'>女
        </div>
        <div class='item'>
          <span>身份</span>
          <input type='radio' value='学生' name='identification' class='radio'>学生
          <input type='radio' value='在职' name='identification' class='radio'>在职
          <input type='radio' value='其他' name='identification' class='radio'>其他
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from 'vue-calendar-component'

export default {
  name: 'userinfo',
  data () {
    return {
      birthday: '',
      ifcalendar: false
    }
  },
  components: {
    Calendar
  },
  methods: {
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
>>> .calendar
  position: absolute
  top:35px
</style>
