import Vue from 'vue'
import App from './App'
import router from './router'
import '@/common/css/reset.css'
import axios from 'axios'
import store from './store'
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.directive('title', {
  inserted (el) {
    document.title = el.dataset.title
  }
})
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    document.title = 'hidden'
  } else {
    document.title = 'visiable'
  }
})

Storage.prototype.myset = function (key, value, expires) {
  let obj = {
    value,
    expires,
    now: Date.now()
  }
  localStorage.setItem(key, JSON.stringify(obj))
}

Storage.prototype.myget = function (key) {
  let val = localStorage.getItem(key)
  if (!val) {
    return val
  }
  val = JSON.parse(val)
  if (Date.now() - val.now > val.expires) {
    localStorage.removeItem(key)
    return null
  }
  return JSON.parse(val.value)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
