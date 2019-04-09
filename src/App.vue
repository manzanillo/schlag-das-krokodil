<template>
  <div id="app">
    <h1>Reinforcement Learning - Schlag das Krokodil</h1>

    <div id="main-view">
      <div id="main-game">
        <h4 class="left-text">Spielfeld</h4>
        <DraggableChess :state="this.state" @new-state="handleNewState"/>
        <p class="left-text">
          Siege Spieler: {{winsPlayer}}
          <br>
          Siege PC: {{winsPC}}
        </p>
      </div>
      <!-- Da meistens 16:9 Monitore verwendet werden, sollte das vermutlich rechts vom Spielfeld angezeigt werden -->
      <div id="main-rules">
        <h4 class="left-text">Computerregeln</h4>
        <div class="rulesets">
          <div v-for="(state, index) in computerModel" :key="index" class="ruleset">
            <PossibleActions
              v-bind:state="state"
              v-bind:actions="calculatePossibleMoves(state,2)"
              v-bind:sweets="[1, 2, 3]"
            />
          </div>
        </div>
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
  performMove,
  checkIfPlayerWins
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
      computer: 2,
      active: 1,
      winsPlayer: 0,
      winsPC: 0,
      computerModel: calculateAllPossibleStatesForPC([
        1,
        1,
        1,
        0,
        0,
        0,
        2,
        2,
        2
      ])
    };
  },
  methods: {
    calculatePossibleMoves,
    calculateAllPossibleStatesForPC,
    checkWinner: function(newState) {
      if (checkIfPlayerWins(newState, this.player)) {
        this.winsPlayer++;
        return true;
      } else if (checkIfPlayerWins(newState, this.computer)) {
        this.winsPC++;
        return true;
      }
      return false;
    },
    displayMessage: function(message) {
      this.$message({
        message: message,
        type: "info",
        showClose: false,
        duration: 1500
      });
    },
    handleNewState: function(newState) {
      if (this.checkWinner(newState)) {
        this.displayMessage("Du gewinnst!");
        const self = this;
        setTimeout(function() {
          self.state = [1, 1, 1, 0, 0, 0, 2, 2, 2];
        }, 1000);
      } else {
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
            if (self.checkWinner(stateAfterPCMove)) {
              self.displayMessage("Computer gewinnt!");
              setTimeout(function() {
                self.state = [1, 1, 1, 0, 0, 0, 2, 2, 2];
              }, 1000);
            }
          }, 1000);
        } else {
          // allow human to interact with the figures
        }
        this.active = this.active == this.player ? this.opponent : this.player;
      }
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
}

@media (min-width: 800px) {
  #main-view {
    display: grid;
    justify-content: center;
    grid-template-columns: 40% 60%;
  }
  #main-game {
    margin-left: 10%;
  }
}

@media (max-width: 800px) {
  #main-game {
    display: inline-grid;
    justify-content: center;
  }
}

.ruleset {
}

.left-text {
  text-align: left;
}

.rulesets {
  display: grid;
  grid-template-columns: 25% 25% 25%;
}
</style>
