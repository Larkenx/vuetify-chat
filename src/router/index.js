import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import WelcomeScreen from '@/components/WelcomeScreen'
import Register from '@/components/Register'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: WelcomeScreen
    },
    {
      path: '/chat/:userID?',
      name: 'Chat',
      component: Chat,
      props: true
    },
    {
      path: '/register/',
      name: 'Register',
      component: Register
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login
    }
  ]
})
