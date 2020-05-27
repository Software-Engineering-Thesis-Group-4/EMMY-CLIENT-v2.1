<template>
	<div
		class="notification_item notification_item--rounded notification_item--spaced"
		:class="{ 'unread': true }"
	>
		<div class="notification_item__employee">
			<v-img
				src="/placeholder_avatar02.png"
				class="employee__photo"
			>
			</v-img>
		</div>
		<div class="notification_item__content">
			<span class="content__message">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Praesentium, dolores sit. Ipsa, cumque temporibus!
				Qui eum, dolorum facilis itaque aliquam fuga ea, excepturi, quia aliquid explicabo voluptates eos ab quam.
			</span>
			<span class="content__time">
				{{ content_time }}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	props: ['']
};
</script>

<style lang="scss" scoped>
</style>