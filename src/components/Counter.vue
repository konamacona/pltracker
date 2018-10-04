<!-- src/components/Hello.vue -->

<template>
	<div class="counter">
		<span class="counter__label">{{label}}:</span>
		<span class="counter__value">{{value}}</span>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "counter",
	props: ["label", "value"],
});
</script>

<style>
.greeting {
	font-size: 20px;
}
</style>