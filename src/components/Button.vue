<template>
	<section class="button">
		<button class="button__input lined thin" type="button" @click="onclick" :disabled="disabled">
			{{label}}
		</button>
	</section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "button",
	props: ["label", "disabled"],
	methods: {
		onclick(event: Event) {
			this.$emit('click', event);
		}
	}
});
</script>

<style lang="scss">
	@import '../css/variables.scss';

	.button {
		display: block;
		&__input {
			width: 100%;
			font-family: $font;
			// background: none;
			// outline: none;
			// border: none;
		}
	}
</style>