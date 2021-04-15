<template>
  <div id="app">
    <h1>
      {{ $t("Reinforcement Learning - Beat the Crocodile") }}
    </h1>

    <div id="main-view">
      <div id="main-game">
        <h4 class="left-text">{{ $t("Board") }}</h4>
        <DraggableChess
          :state="this.state"
          @new-state="handleNewState"
          :halloween="this.halloween"
        />
        <h4 class="left-text">{{ $t("Score") }}</h4>
        <div class="points">
          <div>
            <div class="points-svg-container">
              <svg width="50" height="50" viewBox="0 0 50 50">
                <image
                  v-if="halloween"
                  width="50"
                  height="50"
                  xlink:href="./assets/monkey-halloween.svg"
                />
                <image
                  v-else
                  width="50"
                  height="50"
                  xlink:href="./assets/monkey.svg"
                />
              </svg>
            </div>
            <div v-if="displayWin == 1" style="float: right; color: green;">
              +1
            </div>
            <div style="width: 50px; margin: 0 auto;">{{ winsPlayer }}</div>
          </div>
          <div>
            <div class="points-svg-container">
              <svg width="50" height="50" viewBox="0 0 50 50">
                <image
                  v-if="halloween"
                  width="50"
                  height="50"
                  xlink:href="./assets/croco-halloween.svg"
                />
                <image
                  v-else
                  width="50"
                  height="50"
                  xlink:href="./assets/croco.svg"
                />
              </svg>
            </div>
            <div v-if="displayWin == 2" style="float: right; color: red;">
              +1
            </div>
            <div style="width: 50px; margin: 0 auto;">{{ winsPC }}</div>
          </div>
        </div>
      </div>
      <!-- Da meistens 16:9 Monitore verwendet werden, sollte das vermutlich rechts vom Spielfeld angezeigt werden -->
      <div id="main-rules">
        <div class="row">
          <h4 class="left-text">{{ $t("Computer rules") }}</h4>
          <!-- Rounded switch -->
          <div style="margin-top: 0.5em;">
              <div>{{ $t("Speed") }}</div>
              <input v-model="timeForPC" style="margin-top: 1em;" type="range" min="1" max="20000" value="50" >
          </div>
          <div class="limit-options-btn">
            <div>{{ $t("Only possible moves") }}</div>
            <label class="switch">
              <input type="checkbox" v-on:click="clickSwitch" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>

        <div class="rulesets">
          <div
            v-for="(model, index) in computerModel.getModel()"
            :key="index"
            class="ruleset"
            v-bind:class="{ outlinerule: compareStates(model.state, state) }"
          >
            <PossibleActions
              v-if="
                !filter || checkIfStateIsContained(filteredStates, model.state)
              "
              v-bind:state="model.state"
              v-bind:actions="model.actions"
              v-bind:sweets="model.sweets"
              v-bind:forceUpdate="forceUpdate"
              v-bind:currentState="compareStates(model.state, state)"
              v-bind:chosenPlayType="chosenPlayType"
              v-bind:halloween="halloween"
            />
          </div>
        </div>
      </div>
    </div>
    <Tour :halloween="this.halloween" />
  </div>
</template>

<script>
const resetToState = [1, 1, 1, 0, 0, 0, 2, 2, 2]
import DraggableChess from "./components/DraggableChess.vue"
import PossibleActions from "./components/PossibleActions.vue"
import Tour from "./components/Tour.vue"
import {
  performMove,
  checkIfPlayerWins,
  compareStates,
  checkIfStateIsContained,
  calculatePossibleMoves,
} from "./utils/moves.js"
import LearningModel from "./utils/model.js"

export default {
  name: "app",
  components: {
    DraggableChess,
    PossibleActions,
    Tour,
  },
  data: function() {
    return {
      state: [...resetToState],
      player: 1,
      computer: 2,
      active: 1,
      winsPlayer: 0,
      winsPC: 0,
      computerModel: new LearningModel([...resetToState]),
      forceUpdate: 1,
      timeForPC: 3000,
      displayWin: 0,
      chosenPlayType: -1,
      halloween: false,
      filteredStates: [],
      filter: false,
    }
  },
  methods: {
    compareStates,
    checkIfStateIsContained,
    clickSwitch: function(evt) {
      this.filter = !this.filter
    },
    checkWinner: function(newState, who) {
      if (checkIfPlayerWins(newState, who)) {
        const self = this

        if (who === this.player) {
          this.displayWin = 1
          setTimeout(function() {
            self.displayWin = 0
            self.winsPlayer++
          }, this.timeForPC / 2)
        } else {
          this.displayWin = 2
          setTimeout(function() {
            self.displayWin = 0
            self.winsPC++
          }, this.timeForPC / 2)
        }
        return true
      }
      return false
    },
    updateSelection: function() {
      let relevantStates = []
      const moves = calculatePossibleMoves(this.state, this.player)
      for (let index in moves) {
        relevantStates.push(performMove([...this.state], moves[index]))
      }
      this.filteredStates = relevantStates
    },
    handleNewState: function(newState) {
      this.$forceUpdate()

      if (this.checkWinner(newState, this.player)) {
        this.computerModel.humanWon()
        this.forceUpdate++
        const self = this
        setTimeout(function() {
          self.state = [...resetToState]
          self.updateSelection()
        }, this.timeForPC / 2)
      } else {
        this.state = newState
        this.active = this.active == this.player ? this.computer : this.player
        if (this.active === this.computer) {
          const [move, sweetChosen] = this.computerModel.choosePlayType(
            this.state
          )
          if (move === undefined) {
            this.computerModel.humanWon()
            this.forceUpdate++
            this.winsPlayer++

            const self = this

            setTimeout(function() {
              self.state = [...resetToState]
              self.updateSelection()
            }, self.timeForPC * 1.5)
          } else {
            this.chosenPlayType = sweetChosen
            const stateAfterPCMove = performMove(this.state, move)
            const self = this
            setTimeout(function() {
              self.chosenPlayType = -1
              self.state = stateAfterPCMove
              self.updateSelection()
              if (self.checkWinner(stateAfterPCMove, self.computer)) {
                self.computerModel.computerWon()
                self.forceUpdate++

                setTimeout(function() {
                  self.state = [...resetToState]
                  self.updateSelection()
                }, self.timeForPC * 1.5)
              }
            }, this.timeForPC)
          }
        } else {
          // allow human to interact with the figures
        }
        this.active = this.active == this.player ? this.computer : this.player
      }
    },
  },
  mounted: function() {
    let uri = window.location.search.substring(1)
    let params = new URLSearchParams(uri)
    if (params.get("time")) {
      this.timeForPC = params.get("time")
    }

    if (params.get("halloween")) {
      this.halloween = true
    }

    this.updateSelection()
  },
}
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

.points {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 50px;
}

.points > div {
  width: 75%;
}

.points-svg-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.points-svg-container > svg {
  margin: 0 auto;
  display: block;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.limit-options-btn {
  margin-top: 0.5em;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 1em;
}

@media (max-width: 800px) {
  .row {
    margin-top: 4em;
  }
}
</style>
