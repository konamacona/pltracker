<template>
	<div class="game">
		<autocomplete-component :items="cities.map(c => c.name)" @input="handleInput" :placeholder="placeholder" />
		<button-component @click="epidemic" :disabled="state !== 1" label="Epidemic"/>

		<span class="game__separator"></span>
		<div class="game__counters">
			<counter-component label="Turns" :value="turn"/>
			<counter-component label="Epidemics" :value="epidemics"/>
			<counter-component label="Total Cards" :value="totalCardsDrawn"/>
		</div>

		<span class="game__separator"></span>
		<city-component v-for="city in this.cities" :city="city" :key="city.name"/>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import City from "../models/City";
import ButtonComponent from "./Button.vue";
import CityComponent from "./City.vue";
import CounterComponent from "./Counter.vue";
import AutocompleteComponent from "./Autocomplete.vue";


const START_CARD_COUNT = 9;
const EPI_CARD_COUNTS = [2, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5];
enum STATE {
	SET_UP,
	NORMAL,
	EPIDEMIC
}

export default Vue.extend({
	name: 'game',
	props: [],
	data() {
		return {
			cities: [] as City[],
			epidemics: 0,
			totalCardsDrawn: 0,
			cardsThisTurn: 0,
			turn: 0,
			state: STATE.SET_UP
		}
	},
	methods: {
		handleInput(input: any) {
			const name = input.toLowerCase();

			if(name.length < 2) {
				return;
			}
			
			const cities = this.cities.filter(x => x.name == name);
			let city = null;
			if(cities.length) {
				city = cities[0];
			} else {
				city = { name: name, epidemics: [] as number[] } as City;
				this.cities.push(city);
			}
			this.addMark(city);
			
			this.cardsThisTurn += 1;
			this.totalCardsDrawn += 1;

			if(this.state === STATE.SET_UP && this.cardsThisTurn >= START_CARD_COUNT) {
				this.nextTurn();
				this.state = STATE.NORMAL;
			}

			if(this.state === STATE.NORMAL && this.cardsThisTurn > EPI_CARD_COUNTS[this.epidemics - 1]) {
				this.nextTurn();
			}

			if(this.state === STATE.EPIDEMIC) {
				this.state = STATE.NORMAL;
			}
		},
		nextTurn() {
			this.turn += 1;
			this.cardsThisTurn = 0;
		},
		epidemic() {
			this.epidemics += 1;
			this.state = STATE.EPIDEMIC;
		},
		addMark(city: City) {
			for(var i = 0; i <= this.epidemics; i++) {
				if(city.epidemics[i] === undefined) {
					city.epidemics.splice(i, 1, 0);
				}
			}
			city.epidemics.splice(this.epidemics, 1, city.epidemics[this.epidemics] + 1);
		}
	},
	computed: {
		placeholder() {
			if(this.state === STATE.EPIDEMIC) {
				return "Enter the card drawn from the bottom";
			} else {
				return "Enter a new or existing city";
			}
		}
	},
	components: {
    CityComponent,
		CounterComponent,
		AutocompleteComponent,
		ButtonComponent
  }
});
</script>

<style lang="scss">
	@import '../css/variables.scss';
	@import '../css/handdrawn.scss';

	body {
		background: $bg-color;
		color: $text-color;
		font-family: $font;
	}

	.game {
		width: 500px;
		max-width: 95%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 10%;

		&__separator {
			display: block;
			width: 100%;
			height: 5px;
			margin-top: 10px;
			margin-bottom: 10px;
			background: $border-color;
		}
	}
</style>