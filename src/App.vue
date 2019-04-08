<template>
  <div id="app">
    <h1>Reinforcement Learning - Schlag das Krokodil</h1>
    <div id="main-game">
      <Chess v-bind:state="[1,1,1,0,0,0,2,2,2]"/>
    </div>

    <!-- Da meistens 16:9 Monitore verwendet werden, sollte das vermutlich rechts vom Spielfeld angezeigt werden -->
    <h4>Beispiel für kleineres Schach, um Spielsituation zu zeigen</h4>
    <div class="rulesets">
      <PossibleActions
        v-bind:state="[0,1,1,1,0,0,2,2,2]"
        v-bind:actions="calculatePossibleMoves([0,1,1,1,0,0,2,2,2],2)"
        v-bind:sweets="[1, 2, 3]"
      />
    </div>
  </div>
</template>

<script>
import Chess from "./components/chess.vue";
import PossibleActions from "./components/PossibleActions.vue";
import { calculatePossibleMoves } from "./utils/moves.js";

export default {
  name: "app",
  components: {
    Chess,
    PossibleActions
  },
  methods: {
    calculatePossibleMoves
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.rulesets {
  width: 20%;
}

#main-game {
}
</style>
