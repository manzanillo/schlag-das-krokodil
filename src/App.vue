<template>
  <div id="app">
    <h1>Reinforcement Learning - Schlag das Krokodil</h1>

    <div id="main-view">
      <div id="main-game">
        <h4 class="left-text">Spielfeld</h4>
        <DraggableChess
          :state="this.state"
          :usersTurn="this.usersTurn"
          @new-state="handleNewState"
        />
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
          <div
            v-for="(model, index) in computerModel.getModel()"
            :key="index"
            class="ruleset"
            v-bind:class="{outlinerule: compareStates(model.state, state)}"
          >
            <PossibleActions
              v-bind:state="model.state"
              v-bind:actions="model.actions"
              v-bind:sweets="model.sweets"
              v-bind:forceUpdate="forceUpdate"
            />
          </div>
        </div>
      </div>
    </div>
    <Tour/>
  </div>
</template>

<script>
const resetToState = [1, 1, 1, 0, 0, 0, 2, 2, 2];
import Chess from "./components/chess.vue";
import DraggableChess from "./components/DraggableChess.vue";
import PossibleActions from "./components/PossibleActions.vue";
import Tour from "./components/Tour.vue";
import {
  calculatePossibleMoves,
  performMove,
  checkIfPlayerWins,
  compareStates
} from "./utils/moves.js";
import LearningModel from "./utils/model.js";
import { isNull } from "util";

export default {
  name: "app",
  components: {
    Chess,
    DraggableChess,
    PossibleActions,
    Tour
  },
  data: function() {
    return {
      state: [...resetToState],
      player: 1,
      computer: 2,
      active: 1,
      winsPlayer: 0,
      winsPC: 0,
      usersTurn: true,
      computerModel: new LearningModel([...resetToState]),
      forceUpdate: 1,
      timeForPC: 4000
    };
  },
  methods: {
    compareStates,
    checkWinner: function(newState, who) {
      if (checkIfPlayerWins(newState, who)) {
        if (who === this.player) {
          this.winsPlayer++;
          this.displayMessage("Du gewinnst!");
        } else {
          this.winsPC++;
          this.displayMessage("Computer gewinnt!");
        }
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
      this.$forceUpdate();

      if (this.checkWinner(newState, this.player)) {
        this.computerModel.humanWon();
        this.forceUpdate++;
        const self = this;
        setTimeout(function() {
          self.state = [...resetToState];
        }, this.timeForPC);
      } else {
        this.state = newState;
        this.active = this.active == this.player ? this.computer : this.player;
        if (this.active === this.computer) {
          const move = this.computerModel.choosePlayType(this.state);
          const stateAfterPCMove = performMove(this.state, move);
          const self = this;
          setTimeout(function() {
            self.state = stateAfterPCMove;
            if (self.checkWinner(stateAfterPCMove, self.computer)) {
              self.computerModel.computerWon();
              self.forceUpdate++;

              setTimeout(function() {
                self.state = [...resetToState];
              }, self.timeForPC);
            }
          }, this.timeForPC);
        } else {
          // allow human to interact with the figures
        }
        this.active = this.active == this.player ? this.computer : this.player;
      }
    }
  },
  mounted: function() {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    if (params.get("time")) {
      this.timeForPC = params.get("time");
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
    margin-right: 10%;
  }

  .rulesets {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 800px) {
  #main-game {
    display: inline-grid;
    justify-content: center;
  }
  .rulesets {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

.ruleset {
}

.left-text {
  text-align: left;
}

.outlinerule {
  background-color: #ff450057;
}
</style>
