import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

// Layouts
import MainLayout from '@/views/layout-main.vue'
import DashboardLayout from '@/views/layout-dashboard.vue'
import EmployeeLayout from '@/views/layout-employees.vue'
import AttendanceLogsLayout from '@/views/layout-logs.vue'
import LoginLayout from '@/views/layout-login.vue'
import SentimentSelectionLayout from '@/views/layout-sentimentselection.vue'
import NotificationLayout from '@/views/layout-notifications.vue';
import AccountSettingsLayout from '@/views/layout-account.vue';
import AdminLoginLayout from '@/views/layout-admin-login.vue'

// Components
import LoginForm from '@/components/LoginForm.vue'
import ResetPasswordForm from '@/components/ResetPasswordForm.vue'

Vue.use(VueRouter);

// NAVIGATION GUARD ----------------------------------------------------------------------------------------------------
let isAuthenticated = null;
let authActivated = false; // set this to true if you want the nav guards to take effect.

if(authActivated) {
	isAuthenticated = async (to, from, next) => {
		let auth_token = localStorage.getItem('auth_token');
		let isValid = await store.dispatch('user/VERIFY', auth_token);
	
		if (isValid) {
			next();
		} else {
			next('/login');
		}
	}
}


// ROUTES --------------------------------------------------------------------------------------------------------------
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
				// beforeEnter: isAuthenticated, // PROTECTED
				component: LoginForm
			},
			{
				path: 'forgot-password',
				name: 'forgotPassword',
				alias: '/forgotpassword',
				// beforeEnter: isAuthenticated, // PROTECTED
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
				component: DashboardLayout,
				beforeEnter: isAuthenticated, // PROTECTED
			},
			{
				path: 'employees',
				alias: '/employees',
				component: EmployeeLayout,
				beforeEnter: isAuthenticated, // PROTECTED
			},
			{
				path: 'attendance',
				alias: '/attendance',
				component: AttendanceLogsLayout,
				beforeEnter: isAuthenticated, // PROTECTED
			},
			{
				path: 'notifications',
				alias: '/notifications',
				component: NotificationLayout,
				beforeEnter: isAuthenticated, // PROTECTED
			},
			{
				path: 'account',
				alias: '/account-settings',
				component: AccountSettingsLayout,
				beforeEnter: isAuthenticated,
			}
		]
	},
	{
		path: '/admin',
		component: AdminLoginLayout
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
