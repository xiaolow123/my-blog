<template>
  <div class='comments'>
    <div class='header'>
      <span>{{commentslength}}条评论</span>
      <span class='user' v-if='name'>{{name}}</span>
      <span class='user' :class='!name?"pointer": ""' v-if='!name' @click='login'>点击登录</span>
    </div>
    <input placeholder="说点什么" v-model="comment" />
    <br>
    <div class='publish' @click="publish">发布</div>
    <div class='comments-wrapper'>
      <div v-for='item in comments' :key='item._id' class='comment'>
        <div class='info'>{{item.name }} 发表于 {{item.date}}</div>
        <div class='comment-content'>{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {datetransfer} from '@/common/js/date'
import xssfilter from '@/common/js/xssfilter'
export default {
  name: 'comments',
  props: {
    id: {
      type: String,
      value: ''
    }
  },
  data () {
    return {
      comment: '',
      name: '',
      user: {},
      comments: [],
      commentslength: 0
    }
  },
  async mounted () {
    let _this = this
    this.user = localStorage.myget('user')
    if (this.user) {
      this.name = localStorage.myget('user').name
    }
    let res = await axios.get(`/api/comment?essayId=${_this.id}`)
    var data = res.data
    for (let i = 0; i < data.length; i++) {
      var res2 = await axios.get(`/api/user/?userId=${data[i].userId}`)
      data[i].name = res2.data[0].name
      data[i].date = datetransfer(new Date(data[i].created_at))
      data[i].content = xssfilter(data[i].content)
    }
    this.comments = res.data
    this.commentslength = res.data.length
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    publish () {
      if (!this.user) {
        alert('请先登录!')
        return
      }
      if (!this.comment) {
        alert('请输入评论内容')
        return
      }
      let _this = this
      axios.post('/api/comment', {
        userId: _this.user._id,
        essayId: _this.id,
        content: _this.comment
      }).then((res) => {
        alert(res.data)
        _this.refresh()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.comments
  position relative
  .header
    position relative
    border-bottom:1px solid #aaa
    padding:15px 0
    margin:30px 0
    .user
      position absolute
      right:0
  input
    width:97%
    height:50px
    border-radius:15px
    background-color:$background-input
    padding:12px
    padding-top:0
  .publish
    display inline-block
    background-color:$background-button
    padding 15px 20px
    position absolute
    right:0
    margin-top:9px
    border-radius:15px
    color:$color-text
    cursor pointer
  .comments-wrapper
    margin-top:30px
    .comment
      background-color:$background-color-ll
      padding:12px
      margin-top:67px
      .info
        color:$color-text-l
      .comment-content
        margin-top:15px
.pointer
  cursor pointer
</style>
