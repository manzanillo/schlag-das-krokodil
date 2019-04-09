<template>
  <div id="app">
    <h1>Reinforcement Learning - Schlag das Krokodil</h1>
    <div id="main-game">
      <DraggableChess :state="this.state" @new-state="handleNewState"/>
    </div>

    <!-- Da meistens 16:9 Monitore verwendet werden, sollte das vermutlich rechts vom Spielfeld angezeigt werden -->
    <h4>Beispiel für kleineres Schach, um Spielsituation zu zeigen</h4>
    <div class="rulesets">
      <div
        v-for="(state, index) in calculateAllPossibleStatesForPC([1,1,1,0,0,0,2,2,2])"
        :key="index"
        class="ruleset"
      >
        <PossibleActions
          v-bind:state="state"
          v-bind:actions="calculatePossibleMoves([0,1,1,1,0,0,2,2,2],2)"
          v-bind:sweets="[1, 2, 3]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Chess from "./components/chess.vue";
import DraggableChess from "./components/DraggableChess.vue";
import PossibleActions from "./components/PossibleActions.vue";
import {
  calculatePossibleMoves,
  calculateAllPossibleStatesForPC,
  performMove
} from "./utils/moves.js";

export default {
  name: "app",
  components: {
    Chess,
    DraggableChess,
    PossibleActions
  },
  data: function() {
    return {
      state: [1, 1, 1, 0, 0, 0, 2, 2, 2],
      player: 1,
      opponent: 2,
      active: 1
    };
  },
  methods: {
    calculatePossibleMoves,
    calculateAllPossibleStatesForPC,
    handleNewState: function(newState) {
      this.state = newState;
      this.active = this.active == this.player ? this.opponent : this.player;
      if (this.active === this.opponent) {
        const possibleMoves = calculatePossibleMoves(this.state, 2); //choose play type randomly
        const move =
          possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        const stateAfterPCMove = performMove(this.state, move);
        const self = this;
        setTimeout(function() {
          self.state = stateAfterPCMove;
        }, 1000);
      } else {
        // allow human to interact with the figures
      }
      this.active = this.active == this.player ? this.opponent : this.player;
    }
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

.ruleset {
}

.rulesets {
  display: grid;
  grid-template-columns: 25% 25% 25%;
}

#main-game {
  width: 50%;
}
</style>
