import Vue from 'vue'
import Router from 'vue-router'
const signup = () => import('@/components/signup/signup')
const login = () => import('@/components/login/login')
const arti = () => import('@/components/arti/arti')
const essay = () => import('@/components/essay/essay')
const archive = () => import('@/components/archive/archive')
const contents = () => import('@/components/contents/contents')
const userinfo = () => import('@/components/userinfo/userinfo')
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
} // 解决进入相同路径后，报navigationDuplicated的问题
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/contents'
    },
    {
      path: '/contents',
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
