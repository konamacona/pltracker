<!-- src/components/Hello.vue -->

<template>
	<div class="city">
		<span class="city__name">{{cityName}}</span>
		<div class="city__epidemics">
			<div v-for="cityCount in city.epidemics" v-bind:key="cityCount">
				<div class="city__epidemic">
					<span class="city__epidemic_mark" v-for="n in cityCount" v-bind:key="n">I</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import City from "../models/City";

export default Vue.extend({
	name: "city",
	props: ["city"],
	data() {
		return {
		}
	},
	methods: {
	},
	computed: {
		cityName (): string {
			return this.city.name.split(' ').map((token: string) => {
				return token.charAt(0).toUpperCase() + token.substr(1);
			}).join(' ');
		}
	}
});
</script>

<style lang="scss">
	@import '../css/variables.scss';

	.city {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 5px;

		&:nth-child(odd) {
			background: $bg-color-dark;
		}

		&__name {
			width: 80px;
		}

		&__epidemics {
			display: flex;
			justify-content: space-between;
		}

		&__epidemic {
			width: 60px;
			border-right: 1px solid $border-color;
			
			padding-left: 10px;
			padding-right: 5px;
		}

		&__epidemic_mark {
			float: left;
			display: block;
			width: 10px;
			text-align: center;
		}
	}
</style>