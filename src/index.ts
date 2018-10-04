// src/index.ts

import Vue from "vue";
import GameComponent from "./components/Game.vue";

let v = new Vue({
  el: "#app",
  template: `
    <game-component/>
  `,
  components: {
    GameComponent
  }
});
