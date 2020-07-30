<template>
  <div class='archive'>
    <div class="header">归档</div>
    <div class='subheader'>标签</div>
    <span v-for='(value, name) in hash' :key='name' class='tag' @click='gototag(name)'>
      {{name}}<sup class='sup'>{{value.length}}</sup>
    </span>
    <div class='subheader'>
      日期排序
    </div>
    <ul class='datesort-wrapper'>
      <li v-for='(value, name) in hash2' :key='name' class='datesort' @click='gotodate(name)'>
        {{name}}
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import {datetransfer2} from '@/common/js/date'
import {mapMutations} from 'vuex'
export default {
  name: 'archive',
  methods: {
    ...mapMutations(['SET_ARTICLEIDS']),
    gototag (name) {
      this.SET_ARTICLEIDS(this.hash[name])
      this.$router.push(`/archive/tag/${name}`)
    },
    gotodate (name) {
      this.SET_ARTICLEIDS(this.hash2[name])
      this.$router.push(`/archive/date/${name}`)
    }
  },
  async mounted () {
    let res = await axios.get('/api/articles')
    let data = res.data
    let hash = {}
    let hash2 = {}
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].tags.length; j++) {
        if (!hash[data[i].tags[j].tag]) {
          hash[data[i].tags[j].tag] = [data[i]._id]
        } else {
          hash[data[i].tags[j].tag].push(data[i]._id)
        }
      }
      if (!hash2[datetransfer2(data[i].created_at)]) {
        hash2[datetransfer2(data[i].created_at)] = [data[i]._id]
      } else {
        hash2[datetransfer2(data[i].created_at)].push(data[i]._id)
      }
    }
    this.hash = hash
    this.hash2 = hash2
  },
  data () {
    return {
      hash: {},
      hash2: {}
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.archive
  position:absolute
  left 30%
  right 0
  top 0
  bottom 0
  padding:70px
  padding-left:90px
  padding-right:150px
  background-color:#fff
  .header
    font-size:$font-large
    margin-bottom:37px
  .subheader
    font-size:$font-mid-I
    margin:32px 0
  .tag:hover
    color:$color-text-theme
  .tag
    margin-right:20px
    font-size:$font-normal-I
    color:$color-text-hover
    cursor pointer
    .sup
      position relative
      bottom:6px
      background-color:$background-theme
      font-size:$font-small
      padding:1px
  .datesort-wrapper
    list-style:disc
    padding-left:35px
    font-size:$font-normal-I
    .datesort
      color:$color-text-hover
      cursor pointer
    .datesort:hover
      color:$color-text-theme

</style>
