import Vue from 'vue'
import VueRouter from 'vue-router'

// Layouts
import MainLayout from '@/views/layout-main.vue'
import DashboardLayout from '@/views/layout-dashboard.vue'
import EmployeeLayout from '@/views/layout-employees.vue'
import AttendanceLogsLayout from '@/views/layout-logs.vue'
import LoginLayout from '@/views/layout-login.vue'
import SentimentSelectionLayout from '@/views/layout-sentimentselection.vue'
import NotificationLayout from '@/views/layout-notifications.vue';

// Components
import LoginForm from '@/components/LoginForm.vue'
import ResetPasswordForm from '@/components/ResetPasswordForm.vue'

Vue.use(VueRouter);

const isAuthenticated = (to, from, next) => {
  next();
}

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
        path: 'dashboard',
        alias: '/dashboard',
        component: DashboardLayout
      },
      {
        path: 'employees',
        alias: '/employees',
        component: EmployeeLayout
      },
      {
        path: 'attendance',
        alias: '/attendance',
        component: AttendanceLogsLayout
      },
      {
        path: 'notifications',
        alias: '/notifications',
        component: NotificationLayout,
      }
    ]
  },
  {
    path: '/dailysentiment',
    component: SentimentSelectionLayout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
