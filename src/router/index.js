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
import PageNotFoundLayout from "@/views/layout-404-NotFound.vue";
import UnauthorizedPageLayout from "@/views/layout-403-Forbidden.vue";
import AccountSettingsLayout from '@/views/layout-settings.vue';
import EmployeeProfileLayout from '@/views/layout-employeeprofile.vue';

// Admin layouts
import AuditLogsLayout from "@/views/layout-admin-logs.vue";
import AccountManagementLayout from "@/views/layout-admin-users.vue";
import BackupSettingsLayout from "@/views/layout-admin-settings.vue";


// Components ----------------------------------------------------------------------------------------------------------
import LoginForm from '@/components/LoginForm.vue'
import UserAccount from "@/components/UserSettings/Account/UserAccount.vue";
import UserSecurity from "@/components/UserSettings/Security/UserSecurity.vue";
import UserActivity from "@/components/UserSettings/Activity/UserActivity.vue";
import PasswordResetRequestForm from '@/components/ResetPassword/PasswordResetRequestForm.vue'
import CodeVerificationForm from '@/components/ResetPassword/CodeVerificationForm.vue'
import PasswordRenewalForm from '@/components/ResetPassword/PasswordRenewalForm.vue'

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

const isAdmin = (to, from, next) => {
	// TODO: Create middleware to check if current user is as administrator
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
			{
				path: 'reset/password',
				alias: '/forgot_password',
				name: 'password_reset',
				component: PasswordResetRequestForm
			},
			{
				path: 'reset/verify',
				alias: '/code_verification',
				name: 'code_verification',
				props: true,
				component: CodeVerificationForm
			},
			{
				path: 'reset/renew/:token',
				name: 'password_renewal',
				props: true,
				component: PasswordRenewalForm
			},
		]
	},
	{
		path: '/emmy',
		component: MainLayout,
		redirect: "/dashboard",
		beforeEnter: isAuthenticated,
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
			{
				path: 'employee/:_id',
				alias: '/employee/:_id',
				meta: {
					title: 'Employee Profile'
				},
				component: EmployeeProfileLayout,
				beforeEnter: isAuthenticated // PROTECTED
			},
			{
				path: 'users',
				alias: '/admin/users',
				meta: {
					title: 'User Accounts'
				},
				component: AccountManagementLayout,
				beforeEnter: isAuthenticated // PROTECTED
			},
			{
				path: 'system_logs',
				alias: '/admin/logs',
				meta: {
					title: 'System Logs'
				},
				component: AuditLogsLayout,
				beforeEnter: isAuthenticated // PROTECTED
			},
			{
				path: 'system_settings',
				alias: '/admin/settings',
				meta: {
					title: 'System Settings'
				},
				component: BackupSettingsLayout,
				beforeEnter: isAuthenticated // PROTECTED
			},
		]
	},
	{
		path: '/dailysentiment',
		component: SentimentSelectionLayout
	},
	{
		path: '/forbidden',
		component: UnauthorizedPageLayout
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
