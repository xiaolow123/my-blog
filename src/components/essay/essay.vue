<template>
  <div class='essay'>
    <div class='wrapper'>
      <div class='title'>{{title}}</div>
      <div class='info'>
        {{date}}  标签:
        <span v-for='(item, index) in tags'
              :key='index'
              class='tag'
              @click="gototag(item.tag)"
              >{{item.tag}}</span>
        | 本文总阅读量{{readcount}}次
      </div>
      <editor id="tinymce" v-model="text" :init="init" class='editor' :disabled='true'></editor>
      <comments :id='id' v-if='id'></comments>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import comments from '@/components/comments/comments'
import {datetransfer} from '../../common/js/date'
import xssfilter from '@/common/js/xssfilter'
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
import 'tinymce/plugins/autoresize'// 自动高度
export default {
  name: 'essay',
  props: ['ms', 'title'],
  methods: {
    gototag (name) {
      this.$router.push(`/archive/tag/${name}`)
    }
  },
  data () {
    return {
      readcount: 0,
      id: '',
      date: '',
      tags: [],
      text: '',
      init: {
        language_url: '/static/langs/zh_CN.js', // 语言包的路径
        language: 'zh_CN', // 语言
        skin_url: '/static/skins/lightgray', // skin路径
        plugins: ['image', 'media', 'table', 'lists', 'wordcount', 'codesample', 'autoresize'],
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
    Editor,
    comments
  },
  mounted () {
    // Initialize the app
    let _this = this
    tinymce.init({ })
    this.date = datetransfer(this.ms)
    axios.post('/api/articles/searchOne', {
      'created_at': _this.ms,
      'title': _this.title
    }).then((res) => {
      _this.text = xssfilter(res.data[0].text)
      _this.tags = res.data[0].tags
      _this.id = res.data[0]._id
      _this.readcount = res.data[0].readcount
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.essay
  margin-left:30%
  width:70%
  position relative
  .wrapper
    padding:70px
    background-color:#fff
    position absolute
    left:0
    right:0
    .title
      font-size:$font-mid
      margin-bottom:30px
    .info
      color:$color-text-ll
      font-size:$font-small
      .tag
        margin-right:5px
        cursor pointer
      .tag:hover
        color:$color-text-hover
>>> .tox
  border: none
</style>
