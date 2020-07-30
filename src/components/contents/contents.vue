<template>
  <div class='contents' :class='type? "contents2": ""'>
    <div v-if='type' class='header'>{{type }}: {{value}}</div>
    <div v-for='(item, index) in articles' :key='index' class='item'>
      <div class='title' @click='gotoarticle(item)'>{{item.title}}</div>
      <div class='date'>{{item.date}}</div>
      <div class='disc'>{{item.subdisc}}</div>
      <img src='/static/2.jpg'/>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {datetransfer} from '../../common/js/date'
import {mapGetters} from 'vuex'
export default {
  name: 'contents',
  props: ['type', 'value'],
  computed: {
    ...mapGetters(['articleids'])
  },
  async mounted () {
    let articles = []
    if (!this.type) {
      axios.get('/api/articles').then(res => {
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          articles.push({
            title: data[i].title,
            date: datetransfer(data[i].created_at),
            subdisc: data[i].subdisc,
            ms: data[i].created_at
          })
        }
      })
    } else {
      let articleids = this.articleids
      for (let j = 0; j < articleids.length; j++) {
        let res = await axios.post('/api/articles/searchOne', {
          '_id': articleids[j]
        })
        let data = res.data[0]
        articles.push({
          title: data.title,
          date: datetransfer(data.created_at),
          subdisc: data.subdisc,
          ms: data.created_at
        })
        console.log(articles)
      }
    }
    this.articles = articles
  },
  data () {
    return {
      articles: []
    }
  },
  methods: {
    gotoarticle (item) {
      this.$router.push(`/essay/${item.ms}/${item.title}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.contents2
  left 0 !important
  top: 0
  bottom: 0
.contents
  position absolute
  left 30%
  right 0
  padding 70px
  padding-left: 90px
  padding-right:150px
  background-color:#fff
  .header
    font-size:$font-large
    padding-bottom:30px
    margin-bottom:30px
    border-bottom:2px #eee solid
  .item
    padding-bottom 30px
    border-bottom:1px #ccc solid
    margin-bottom:30px
    .title
      font-size:$font-mid-I
      margin:9px
      font-weight:bold
    .title:hover
      cursor pointer
      color:$color-text-hover
    .date
      color:$color-text-ll
      font-size:$font-small
      margin:9px
    .disc
      color:$color-text-l
      margin:9px
      line-height 1.5
      letter-spacing 2px
    img
      width:100%
      height:300px
</style>
