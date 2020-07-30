import Vue from 'vue'
import Router from 'vue-router'
import signup from '@/components/signup/signup'
import login from '@/components/login/login'
import arti from '@/components/arti/arti'
import essay from '@/components/essay/essay'
import archive from '@/components/archive/archive'
import contents from '@/components/contents/contents'
import userinfo from '@/components/userinfo/userinfo'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
} // 解决进入相同路径后，报navigationDuplicated的问题
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: contents
    },
    {
      path: '/signup',
      component: signup
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/arti',
      component: arti
    },
    {
      path: '/essay/:ms/:title',
      component: essay,
      props: true
    },
    {
      path: '/archive',
      component: archive,
      children: [
        {
          path: ':type/:value',
          props: true,
          component: contents
        }
      ]
    },
    {
      path: '/userinfo',
      component: userinfo
    }
  ]
})
