import Vue from 'vue'
import VueRouter from 'vue-router'

// Layouts
import MainLayout from '@/views/layout-main.vue'
import DashboardLayout from '@/views/layout-dashboard.vue'
import EmployeeLayout from '@/views/layout-employees.vue'
import AttendanceLogsLayout from '@/views/layout-logs.vue'
import LoginLayout from '@/views/layout-login.vue'

// Components
import LoginForm from '@/components/LoginForm.vue'
import ResetPasswordForm from '@/components/ResetPasswordForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: LoginLayout,
    redirect: { name: 'loginForm' },
    children: [
      {
        path: 'form',
        name: 'loginForm',
        alias: '/login',
        component: LoginForm
      },
      {
        path: 'forgot-password',
        name: 'forgotPassword',
        alias: '/forgotpassword',
        component: ResetPasswordForm
      }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    redirect: "/dashboard",
    children: [
      {
        path: '/dashboard',
        component: DashboardLayout
      },
      {
        path: '/employees',
        component: EmployeeLayout
      },
      {
        path: '/attendance',
        component: AttendanceLogsLayout
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
