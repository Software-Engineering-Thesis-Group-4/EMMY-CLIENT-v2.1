import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

// Layouts -------------------------------------------------------------------------------------------------------------
import MainLayout from '@/views/layout-main.vue'
import DashboardLayout from '@/views/layout-dashboard.vue'
import EmployeeLayout from '@/views/layout-employees.vue'
import AttendanceLogsLayout from '@/views/layout-logs.vue'
import LoginLayout from '@/views/layout-login.vue'
import SentimentSelectionLayout from '@/views/layout-sentimentselection.vue'
import NotificationLayout from '@/views/layout-notifications.vue';
import PageNotFoundLayout from "@/views/layout-404.vue";
import AccountSettingsLayout from '@/views/layout-settings.vue';
import EmployeeProfileLayout from '@/views/layout-employeeprofile.vue';

// Admin layouts
/* 
import AdminLayout from '@/views/layout-admin.vue';
import AdminLoginLayout from '@/views/layout-admin-login.vue';
import AccountManagementLayout from "@/views/layout-account-management.vue";
import ApplicationConfigurationLayout from "@/views/layout-admin-config.vue";
import ApplicationLogsLayout from "@/views/layout-admin-logs.vue"; 
*/


// Components ----------------------------------------------------------------------------------------------------------
import LoginForm from '@/components/LoginForm.vue'
import UserAccount from "@/components/UserSettings/Account/UserAccount.vue";
import UserSecurity from "@/components/UserSettings/Security/UserSecurity.vue";
import UserActivity from "@/components/UserSettings/Activity/UserActivity.vue";
// import ResetPasswordForm from '@/components/ResetPasswordForm.vue'

import PlaygroundLayout from "@/views/playground.vue";

Vue.use(VueRouter);

// NAVIGATION GUARD ----------------------------------------------------------------------------------------------------
const isAuthenticated = (to, from, next) => {
	store.dispatch('user/VERIFY').then(isValid => {
		if (isValid) {
			next();
		} else {
			console.log('You are not currently logged in.');
			next('/login');
		}
	});
}

const isNotLoggedIn = (to, form, next) => {
	if (!localStorage.getItem('access_token')) {
		next();
	} else {
		console.log('%c You are currently logged in! redirecting to dashboard', "color: yellow;");
		next('/dashboard');
	}
}


// ROUTES --------------------------------------------------------------------------------------------------------------
const routes = [
	{
		path: '/playground',
		component: PlaygroundLayout,
	},
	{
		path: '/',
		component: LoginLayout,
		redirect: { name: 'loginForm' },
		children: [
			{
				path: 'login',
				name: 'loginForm',
				alias: '/login',
				beforeEnter: isNotLoggedIn, // PROTECTED
				component: LoginForm
			},
			// {
			// 	path: 'forgot-password',
			// 	name: 'forgotPassword',
			// 	alias: '/forgotpassword',
			// 	// beforeEnter: isAuthenticated, // PROTECTED
			// 	component: ResetPasswordForm
			// }
		]
	},
	{
		path: '/main',
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
				path: 'settings',
				alias: '/settings',
				meta: {
					title: 'Account Settings'
				},
				component: AccountSettingsLayout,
				children: [
					{
						path: 'account',
						alias: '/account',
						meta: {
							title: 'Account Settings',
							headerTitle: 'Personal Information'
						},
						component: UserAccount,
						beforeEnter: isAuthenticated, // PROTECTED
					},
					{
						path: 'security',
						alias: '/security',
						meta: {
							title: 'Account Settings',
							headerTitle: 'Change Password'
						},
						component: UserSecurity,
						beforeEnter: isAuthenticated, // PROTECTED
					},
					{
						path: 'activity',
						alias: '/activity',
						meta: {
							title: 'Account Settings',
							headerTitle: 'Activity Log'
						},
						component: UserActivity,
						beforeEnter: isAuthenticated, // PROTECTED
					},

				],
				beforeEnter: isAuthenticated, // PROTECTED
			},
			// TODO: apply a component-level middleware to check if a certain employee existing matching the :id route parameter. else use 404 page layout.
			{
				path: 'employee/:_id',
				alias: '/employee/:_id',
				meta: {
					title: 'Employee Profile'
				},
				component: EmployeeProfileLayout,
				beforeEnter: isAuthenticated // PROTECTED
			}
		]
	},
	/* 
	{
		path: '/admin',
		component: AdminLoginLayout
	},
	{
		path: '/admin/emmy',
		component: AdminLayout,
		redirect: "/account-management",
		children: [
			{
				path: 'account-management',
				alias: '/accounts',
				meta: {
					title: 'Account Management'
				},
				component: AccountManagementLayout,
			},
			{
				path: 'application-configuration',
				alias: '/database',
				meta: {
					title: 'Application Configuration'
				},
				component: ApplicationConfigurationLayout,
			},
			{
				path: 'application-logs',
				alias: '/audit',
				meta: {
					title: 'Application Logs'
				},
				component: ApplicationLogsLayout,
			}
		]
	}, 
	*/
	{
		path: '/dailysentiment',
		component: SentimentSelectionLayout
	},
	{
		path: '*',
		component: PageNotFoundLayout,
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
