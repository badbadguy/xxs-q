import Vue from 'vue'
import Router from 'vue-router'

//登陆
import Login from "@/components/Login"
//管理端
import teacher from "@/components/Teacher"
import exams from '../components/exammanager/exams.vue'
import addExams from '../components/exammanager/addExams.vue'
import updateExams from '../components/exammanager/updateExams.vue'
import updateExams1 from '../components/exammanager/updateExams1.vue'
import updateExams2 from '../components/exammanager/updateExams2.vue'
import updateExams3 from '../components/exammanager/updateExams3.vue'
import userManage from '../components/userManage.vue'
import hisManage from '../components/hisManage.vue'

//客户端
import home from '../components/client/home.vue'
import mainPage from '../components/client/mainPage.vue'
import personalCenter from '../components/client/personalCenter.vue'
import personalSetting from '../components/client/personalSetting'
import doexam from '../components/client/doexam.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Login',
      component:Login
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path: '/teacher',
      //name: 'teacher',
      component: teacher,
      children:[
        {
          path: '/',
          redirect: '/teacher/exams'
        },
        {
          path: '/teacher/exams',
          name: 'exams',
          component: exams
        },
        {
          path: '/teacher/addExams',
          name: 'addExams',
          component: addExams
        },
        {
          path: '/teacher/updateExams',
          name: 'updateExams',
          component: updateExams
        },
        {
          path: '/teacher/updateExams1',
          name: 'updateExams1',
          component: updateExams1
        },
        {
          path: '/teacher/updateExams2',
          name: 'updateExams2',
          component: updateExams2
        },
        {
          path: '/teacher/updateExams3',
          name: 'updateExams3',
          component: updateExams3
        },
        {
          path: '/teacher/hisManage',
          name: 'hisManage',
          component: hisManage
        },
        {
          path: '/teacher/userManage',
          name: 'userManage',
          component: userManage
        },
      ]
    },
    {
      path: '/home',
      component: home,
      children:[
        {
          path: '/',
          redirect:'/home/mainPage'
        },
        {
          path: '/home/mainPage',
          name: 'mainPage',
          component: mainPage
        },
        {
          path: '/home/personalCenter',
          //name: 'personalCenter',
          component: personalCenter,
          children:[
            {
              path: '/home/personalCenter',
              redirect: '/home/personalCenter/personalSetting',
            },
            {
              path: '/home/personalCenter/personalSetting',
              name: 'personalSetting',
              component: personalSetting
            },
          ],
        },
        {
          path: '/home/doexam',
          name: 'doexam',
          component: doexam
        },
      ]
    }
  ]
})
