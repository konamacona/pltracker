<template>
  <div class="autocomplete">
    <input
			class="autocomplete__input"
      type="text"
			:placeholder="placeholder"
      @input="onChange"
      v-model="search"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <ul
      id="autocomplete-results"
      v-show="isOpen"
      class="autocomplete__results"
    >
      <li
        class="loading"
        v-if="isLoading"
      >
        Loading results...
      </li>
      <li
        v-else
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete__result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
	// Stolen from https://alligator.io/vuejs/vue-autocomplete-component/

  export default {
    name: 'autocomplete',

    props: {
      items: {
        type: Array,
        required: false,
        default: () => [],
      },
			placeholder: {
        type: String,
        required: false,
        default: () => "",
      },
      isAsync: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    data() {
      return {
        isOpen: false,
        results: [],
        search: '',
        isLoading: false,
        arrowCounter: 0,
      };
    },

    methods: {
      onChange() {
        // Is the data given by an outside ajax request?
        if (this.isAsync) {
          this.isLoading = true;
        } else {
          // Let's  our flat array
          this.filterResults();
					if(this.search.length > 0 && this.results.length > 0) {
          	this.isOpen = true;
					}
        }
      },

      filterResults() {
        // first uncapitalize all the things
        this.results = this.items.filter((item) => {
          return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
        });
      },
      setResult(result) {
        this.search = result;
        this.isOpen = false;
      },
      onArrowDown(evt) {
        if (this.arrowCounter < this.results.length) {
          this.arrowCounter = this.arrowCounter + 1;
        }
      },
      onArrowUp() {
        if (this.arrowCounter > 0) {
          this.arrowCounter = this.arrowCounter -1;
        }
      },
      onEnter() {
				if(this.isOpen && this.arrowCounter != -1) {
					this.search = this.results[this.arrowCounter];
					this.isOpen = false;
					this.arrowCounter = -1;
				} else {
					// Let's warn the parent that a change was made
					this.$emit('input', this.search);
					this.search = "";
				}
      },
      handleClickOutside(evt) {
        if (!this.$el.contains(evt.target)) {
          this.isOpen = false;
          this.arrowCounter = -1;
        }
      }
    },
    watch: {
      items: function (val, oldValue) {
        // actually compare them
        if (val.length !== oldValue.length) {
          this.results = val;
          this.isLoading = false;
        }
      },
    },
    mounted() {
      document.addEventListener('click', this.handleClickOutside)
    },
    destroyed() {
      document.removeEventListener('click', this.handleClickOutside)
    }
  };
</script>

<style lang="scss">
	@import '../css/variables.scss';
  
	
  .autocomplete {
    position: relative;

    height: 40px;
    width: 100%;

		&__input {
      background: none;
      outline: none;
      border: none;
      font-family: $font;
      font-size: 20px;
			width: 100%;
			height: 100%;
		}

		&__results {
			position: absolute;
			bottom: -100%;
			top: unset;

			padding: 0;
			margin: 0;
			border: 1px solid $border-color;
			max-height: 120px;
			overflow: auto;
			width: 100%;
			background: $bg-color;
		}

		&__result {
			list-style: none;
			text-align: left;
			padding: 4px 2px;
			cursor: pointer;

			&.is-active, &:hover {
				background-color: #4AAE9B;
				color: white;
			}
		}
  }
</style>