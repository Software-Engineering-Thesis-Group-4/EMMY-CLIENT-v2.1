<template>
	<v-menu
		top
		offset-y
		left
		nudge-top="10px"
		z-index="999"
		v-model="showForm"
		:close-on-click="false"
		:close-on-content-click="false"
	>
		<template v-slot:activator="{ on }">
			<button
				class="EmailMessagingButton"
				v-on="on"
			>
				<v-img
					src="@/assets/plane.svg"
					position="center"
					class="EmailMessagingButton_icon"
				/>
			</button>
		</template>

		<div class="form_container">

			<div class="form_controls">
				<button class="form_button" @click="(showForm = false)">
					<v-icon
						dense
						dark
					>mdi-minus</v-icon>
				</button>
				<button class="form_button" @click="closeForm">
					<v-icon
						dense
						dark
					>mdi-close</v-icon>
				</button>
			</div>

			<!-- Email Form -->
			<v-form
				ref="emailForm"
				@submit.prevent="sendEmail"
				class="email_form"
			>
				<!-- Header -->
				<div class="email_form__header">
					<span class="header__title">
						<svg class="icon">
							<path
								d="M15.135.072.407,8.569a.763.763,0,0,0,.07,1.373l3.378,1.417,9.129-8.046a.191.191,0,0,1,.273.264L5.6,12.9v2.558a.762.762,0,0,0,1.351.5l2.018-2.456,3.959,1.659a.765.765,0,0,0,1.049-.578L16.267.86A.763.763,0,0,0,15.135.072Z"
								fill="#A7CCFF"
							/>
						</svg>
						Send an email
					</span>
					<span class="header__date">Date: {{ email__date }}</span>
				</div>

				<!-- Select Employee -->
				<v-autocomplete
					small-chips
					dense
					label="Select Employees"
					multiple
					outlined
					single-line
					color="#7198f3"
					class="email_form__employees"
				>
					<template v-slot:selection="">
						<v-chip></v-chip>
					</template>
				</v-autocomplete>

				<!-- Email Subject -->
				<v-text-field
					label="Subject"
					outlined
					dense
					single-line
					color="#7198f3"
					class="email_form__subject"
				></v-text-field>

				<div class="email_form__message">
					<VueEditor
						v-model="content"
						:editor-toolbar="toolbarOptions"
						placeholder="Enter a message...."
						class="editor1"
						id="editor1"
					/>
				</div>

				<button
					type="submit"
					class="email_form__submit_button"
				>Send</button>
			</v-form>
		</div>

	</v-menu>
</template>

<script>
import { VueEditor } from "vue2-editor";
import moment from "moment";

export default {
	data() {
		return {
			showForm: false,
			content: null,
			toolbarOptions: [
				[
					{ font: [] },
					{ color: [] },
					"bold",
					"italic",
					"underline",
					"strike",
					{ align: [] },
					{ header: 1 },
					{ header: 2 },
					{ list: "ordered" },
					{ list: "bullet" },
					{ indent: "-1" },
					{ indent: "+1" }
				]
			]
		};
	},
	components: {
		VueEditor
	},
	computed: {
		email__date() {
			return moment().format("LL");
		}
	},
	methods: {
		closeForm() {
			this.content = null;
			this.$refs.emailForm.reset();
			this.showForm = false;
		},
		sendEmail() {
			console.log(this.content);
		}
	}
};
</script>

<style lang="scss" scoped>
.EmailMessagingButton {
	background: linear-gradient(#7198f3, #5a79c2);
	height: 40px;
	width: 40px;
	border: 2px solid #5a79c2;
	border-radius: 999px;
	display: flex;
	justify-content: center;
	align-items: center;
	outline: none;

	position: fixed;
	bottom: 20px;
	right: 20px;

	&:hover {
		filter: brightness(0.95);
	}

	.EmailMessagingButton_icon {
		// background-color: red;
		max-width: 15px;
		margin-right: 2px;
	}
}
.v-menu__content--fixed {
	border-radius: 5px;
}

.form_container {
	background: linear-gradient(#7198f3, #5a79c2);
	// padding-top: 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.form_controls {
	// background-color: rgba(0, 255, 255, 0.26);
	// border: 1px dashed #0000002c;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 3px 5px 3px;
}

.form_button {
	// background-color: rgba(0, 255, 255, 0.26);

	&:first-child {
		margin-right: 5px;
	}

	&:hover {
		::v-deep i {
			color: rgba(0, 0, 0, 0.438);
		}
	}
}

.email_form {
	background-color: white;
	padding: 10px 15px 15px;
	display: flex;
	flex-direction: column;
	min-width: 510px;
	max-width: 510px;
	font-size: 14px;
}

.email_form__header {
	display: flex;
	align-items: center;

	.header__title {
		// border: 1px dashed lightslategray;
		font-family: "Cera Pro", sans-serif;
		font-weight: 600;
		font-size: 20px;
		color: #5a79c2;
		display: inline-flex;
		justify-items: center;
		align-content: center;

		.icon {
			width: 20px;
			height: 18px;
			margin-right: 2px;
			align-self: center;
		}
	}

	.header__date {
		// background-color: cyan;
		color: #b6b6b6;
		flex-grow: 1;
		text-align: end;
	}
}

.email_form__employees {
	::v-deep .v-input__control {
		margin-top: 10px;
		margin-bottom: -15px;
	}
}

.email_form__subject {
	::v-deep .v-input__control {
		margin-bottom: -25px;
	}
}

.email_form__message {
	margin-top: 10px;
	background-color: whitesmoke;
	position: relative;

	::v-deep .ql-editor {
		overflow-y: scroll;
		max-height: 200px;
		font-size: 15px;
		font-family: "Cera Pro", sans-serif;
		line-height: 25px;
	}
}

.email_form__submit_button {
	background: linear-gradient(#7198f3, #5a79c2);
	background-color: #5a79c2;
	color: white;
	padding: 10px;
	border: 1px solid #5a79c2;
	border-radius: 4px;
	margin-top: 10px;
	font-size: 15px;
	font-weight: 500;
	font-family: "Cera Pro", sans-serif;

	&:hover {
		filter: brightness(0.95);
	}
}
</style>