import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

// Layouts -------------------------------------------------------------------------------------------------------------
import MainLayout from '@/views/layout-main.vue'
import DashboardLayout from '@/views/layout-dashboard.vue'
import EmployeeLayout from '@/views/layout-employees.vue'
import AttendanceLogsLayout from '@/views/layout-logs.vue'
import LoginLayout from '@/views/layout-login.vue'
import SentimentSelectionLayout from '@/views/layout-sentimentselection.vue'
import NotificationLayout from '@/views/layout-notifications.vue';
import AccountSettingsLayout from '@/views/layout-account.vue';
// Admin layouts
import AdminLayout from '@/views/layout-admin.vue';
import AdminLoginLayout from '@/views/layout-admin-login.vue';
import PageNotFoundLayout from "@/views/layout-404.vue";
import AccountManagementLayout from "@/views/layout-account-management.vue";
import ApplicationConfigurationLayout from "@/views/layout-admin-config.vue";
import ApplicationLogsLayout from "@/views/layout-admin-logs.vue";
import EmployeeProfileLayout from '@/views/layout-employeeprofile.vue';

// Components ----------------------------------------------------------------------------------------------------------
import LoginForm from '@/components/LoginForm.vue'
import ResetPasswordForm from '@/components/ResetPasswordForm.vue'


Vue.use(VueRouter);

// NAVIGATION GUARD ----------------------------------------------------------------------------------------------------
let authActivated = false; // set this to true if you want the nav guards to take effect.
let isAuthenticated = null;

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
				meta: {
					title: 'Dashboard'
				},
				beforeEnter: isAuthenticated, // PROTECTED
			},
			{
				path: 'employees',
				alias: '/employees',
				meta: {
					title: 'Employees'
				},
				component: EmployeeLayout,
				beforeEnter: isAuthenticated, // PROTECTED
			},
			{
				path: 'attendance',
				alias: '/attendance',
				meta: {
					title: 'Daily Attendance Log'
				},
				component: AttendanceLogsLayout,
				beforeEnter: isAuthenticated, // PROTECTED
			},
			{
				path: 'notifications',
				alias: '/notifications',
				meta: {
					title: 'Notifications'
				},
				component: NotificationLayout,
				beforeEnter: isAuthenticated, // PROTECTED
			},
			{
				path: 'account',
				alias: '/settings',
				meta: {
					title: 'Account Settings'
				},
				component: AccountSettingsLayout,
				beforeEnter: isAuthenticated, // PROTECTED
			},
			// TODO: apply a component-level middleware to check if a certain employee existing matching the :id route parameter. else use 404 page layout.
			{
				path: 'employee/:_id',
				meta: {
					title: 'Employee Profile'
				},
				component: EmployeeProfileLayout,
				beforeEnter: isAuthenticated // PROTECTED
			}
		]
	},
	{
		path: '/admin-login',
		alias: '/admin/login',
		component: AdminLoginLayout
	},
	{
		path: '/admin',
		component: AdminLayout,
		redirect: "/account-management",
		children: [
			{
				path: 'account-management',
				alias: '/account-management',
				meta: {
					title: 'Account Management'
				},
				component: AccountManagementLayout, 
			},
			{
				path: 'application-configuration',
				alias: '/application-configuration',
				meta: {
					title: 'Application Configuration'
				},
				component: ApplicationConfigurationLayout, 
			},
			{
				path: 'application-logs',
				alias: '/application-logs',
				meta: {
					title: 'Application Logs'
				},
				component: ApplicationLogsLayout, 
			}
		]
	},
	{
		path: '/dailysentiment',
		component: SentimentSelectionLayout
	},
	{
		path: '*',
		component: PageNotFoundLayout
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
