<template>
  <div class='article'>
    <div class='title'>文章标题:</div>
    <input v-model="title"/>
    <div></div>
    <div class='subdisc'>文章简介:</div>
    <input v-model="subdisc"/>
    <br>
    <div class='tags'>
      文章标签:
      <input class='tag' v-for='(item, index) in tags' :key='index' v-model='item.tag'/>
      <div class='add' @click='add'>+</div>
    </div>
    <editor id="tinymce" v-model="text" :init="init" class='editor'></editor>
    <div class='submit' @click="submit">发表</div>
  </div>
</template>

<script>
import axios from 'axios'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons'
import 'tinymce/skins/ui/oxide/skin.css'
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件
import 'tinymce/plugins/codesample'
export default {
  beforeRouteEnter (to, from, next) {
    if (localStorage.myget('user').name !== '123456') {
      alert('权限不足')
    } else {
      next()
    }
  },
  methods: {
    submit () {
      let _this = this
      axios.post('/api/articles', {
        title: _this.title,
        tags: _this.tags,
        subdisc: _this.subdisc,
        text: _this.text
      }).then((res) => {
        console.log(res)
      })
    },
    add () {
      if (this.tags.length < 5) {
        this.tags.push({})
      }
    }
  },
  data () {
    return {
      text: '',
      tags: [{}],
      title: '',
      subdisc: '',
      init: {
        language_url: '/static/langs/zh_CN.js', // 语言包的路径
        language: 'zh_CN', // 语言
        skin_url: '/static/skins/lightgray', // skin路径
        height: 300, // 编辑器高度
        plugins: ['image', 'media', 'table', 'lists', 'wordcount', 'codesample'],
        branding: false,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        }
      },
      init2: {
        language_url: '/static/langs/zh_CN.js', // 语言包的路径
        language: 'zh_CN', // 语言
        skin_url: '/static/skins/lightgray', // skin路径
        height: 300, // 编辑器高度
        plugins: ['image', 'media', 'table', 'lists', 'wordcount', 'codesample'],
        toolbar: false,
        menubar: false,
        statusbar: false,
        branding: false,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        }
      }
    }
  },
  components: {
    Editor
  },
  mounted () {
    // Initialize the app
    tinymce.init({ })
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.article
  position fixed
  left 30%
  right:0
  background-color:#fff
  bottom:0
  top:0
  .title
    margin:20px
    font-size:$font-mid-II
    display:inline-block
    position relative
    top:7px
  input
    margin:20px
    border:solid #aaa 1px
    padding:7px
    width:500px
  .subdisc
    margin:0 39px 20px 23px
    font-size:$font-mid-I
    display:inline-block
    position relative
    top:5px
  .tags
    font-size:$font-mid-I
    margin 23px
    position relative
    bottom:7px
    .tag
      border-radius: 9px
      background-color: $background-theme
      width:50px
      color:#fff
      font-size: 16px
      text-align:center
      margin-right:20px
    .add
      position absolute
      right 20px
      padding:1px
      top:30%
      color:#fff
      background-color:$background-button
      border-radius:50%
  .submit
    position absolute
    top:90%
    left 50%
    transform translate(-50%)
    padding 15px 20px
    border-radius:12px
    background-color:$background-button
    color:#fff
    cursor pointer
>>> .tox
  margin:0 20px
</style>
