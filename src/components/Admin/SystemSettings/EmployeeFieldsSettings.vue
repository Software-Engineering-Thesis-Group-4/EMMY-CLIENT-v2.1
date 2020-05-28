<template>
	<div class="component-container">
		<h1 class="section-title">Employee Field Settings</h1>
		<v-form
			@submit.prevent="addNewDepartment"
			class="department-settings-form"
		>
			<!-- Add Button -->
			<button
				type="submit"
				class="department-settings-form__submit"
			>
				+ Add
			</button>

			<v-text-field
				v-model="departmentInput"
				class="department-settings-form__input"
				placeholder="Enter a new department"
				autocomplete="false"
				filled
				dense
				color="black"
			></v-text-field>

		</v-form>

		<div class="department-list">
			<p
				v-for="item in deparmentCategories"
				:key="item"
				class="department-list__item"
			>{{ item }}</p>
		</div>

		<v-divider></v-divider>
	</div>
</template>

<script>
export default {
	data() {
		return {
			departmentInput: null,
			deparmentCategories: this.$store.state.employees.departments
		};
	},
	computed: {},
	methods: {
		addNewDepartment() {
			alert("addNewDepartment() NOT IMPLEMENTED!");
		}
	},
	mounted() {
		this.deparmentCategories = this.$store.state.employees.departments;
	}
};
</script>

<style lang="scss" scoped>
.component-container {
	display: flex;
	flex-direction: column;
	// border: 1px dashed #00000031;
	margin-top: 10px;
}

.section-title {
	font-size: 1.5rem;
	font-family: "Cera Pro", sans-serif;
	color: rgba(0, 0, 0, 0.336);
	letter-spacing: -1px;
}

.department-settings-form {
	// background-color: #ff00ff31;
	display: flex;
	align-items: flex-start;
	margin-top: 10px;

	.department-settings-form__submit {
		width: 8rem;
		background: linear-gradient(#7198f3, #5a79c2);
		border: 1px solid #5f80cc;
		padding: 8px 0px;
		border-radius: 5px;
		color: white;
		margin-right: 10px;
	}

	.department-settings-form__input {
		width: 100%;
	}
}

.department-list {
	// width: 35rem;
	max-height: 15rem;
	overflow-y: scroll;
	border: 1px dashed #00000025;
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 3rem;

	&::-webkit-scrollbar {
		background: transparent;
		width: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background: #00000025;
		border-radius: 999px;

		&:hover {
			background: #0000003f;
		}
	}

	.department-list__item {
		margin: 0px;
		&:hover {
			background-color: #00000018;
			filter: brightness(0.95);
		}
	}
}

.department-list__label {
	font-size: 13px;
	margin: 10px;
	letter-spacing: 1px;
}
</style>