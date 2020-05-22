<template>
	<div class="container">
		<v-tabs
			v-model="tabs"
			grow
			color="#567dd8"
			active-class
		>
			<v-tab>
				<v-icon class="tab-icon">mdi-account</v-icon>
				Register
			</v-tab>
			<v-tab>
				<v-icon class="tab-icon">mdi-attachment</v-icon>
				Import
			</v-tab>

			<!-- Single Resister Form Component -->
			<v-tab-item>
				<SingleRegisterForm @closeForm="closeDialog" @formCancel="closeDialog" />
			</v-tab-item>

			<!-- CSV Upload Form Component -->
			<v-tab-item>
				<CSVUploadForm @closeForm="closeDialog" @formCancel="closeDialog" />
			</v-tab-item>

		</v-tabs>

	</div>
</template>

<script>
import SingleRegisterForm from "./SingleRegisterForm.vue";
import CSVUploadForm from "./CSVUploadForm.vue";

export default {
	name: "AddEmployeeForm",
	components: {
		SingleRegisterForm,
		CSVUploadForm
	},
	data: () => {
		return {
			// csv upload
			uploadFileLoading: false,
			file: null,
			fileUploadError: false,
			fileUploadErrorMessage: "",

			// tabs
			tabs: 0
		};
	},
	methods: {
		closeDialog() {
			this.$emit("closeDialog");
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	width: 30rem;
	padding: 15px;
}

::v-deep .v-tab {
	font-size: 15px;
	letter-spacing: 0px;
	font-family: "Cera Pro", sans-serif;
	// text-transform: none;
	font-weight: 600;
}

.tab-icon {
	margin-right: 8px;
}
</style>
