<template>
	<div class="layout-container">

		<div class="activity-item">
			<div class="activity-date">
				<span class="time">8:00 AM</span>
				<span class="date">April 30, 2020</span>
			</div>
			<div class="activity-description">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quis vero adipisci, architecto cum consequuntur unde possimus dolorum qui sequi 
				quibusdam delectus temporibus. Soluta laudantium cupiditate, hic quae eaque natus!
			</div>
		</div>

		<div class="activity-item">
			<div class="activity-date">
				<span class="time">8:00 AM</span>
				<span class="date">April 30, 2020</span>
			</div>
			<div class="activity-description">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quis vero adipisci, architecto cum consequuntur unde possimus dolorum qui sequi 
				quibusdam delectus temporibus. Soluta laudantium cupiditate, hic quae eaque natus!
			</div>
		</div>

		<div class="activity-item">
			<div class="activity-date">
				<span class="time">8:00 AM</span>
				<span class="date">April 30, 2020</span>
			</div>
			<div class="activity-description">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quis vero adipisci, architecto cum consequuntur unde possimus dolorum qui sequi 
				quibusdam delectus temporibus. Soluta laudantium cupiditate, hic quae eaque natus!
			</div>
		</div>

		<div class="activity-item">
			<div class="activity-date">
				<span class="time">8:00 AM</span>
				<span class="date">April 30, 2020</span>
			</div>
			<div class="activity-description">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quis vero adipisci, architecto cum consequuntur unde possimus dolorum qui sequi 
				quibusdam delectus temporibus. Soluta laudantium cupiditate, hic quae eaque natus!
			</div>
		</div>

		<div class="activity-item">
			<div class="activity-date">
				<span class="time">8:00 AM</span>
				<span class="date">April 30, 2020</span>
			</div>
			<div class="activity-description">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quis vero adipisci, architecto cum consequuntur unde possimus dolorum qui sequi 
				quibusdam delectus temporibus. Soluta laudantium cupiditate, hic quae eaque natus!
			</div>
		</div>

	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.layout-container {
	// background-color: rgba(0, 255, 255, 0.301);
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	padding-right: 100px;

	.activity-item {
		// border: 1px dashed lightslategray;
		display: grid;
		min-height: 50px;
		grid-template-columns: 150px 1fr;
		column-gap: 10px;

		margin-bottom: 10px;

		.activity-date {
			display: flex;
			flex-direction: column;
			align-items: flex-end;

			.time {
				color: #989898;
				font-size: 12px;
			}

			.date {
				font-size: 14px;
				font-weight: 500;
			}
		}

		.activity-description {
			background-color: white;
			padding: 10px;
			border: 1px solid #DEDEDE;
			border-radius: 5px;
			font-size: 14px;
		}
	}
}
</style>