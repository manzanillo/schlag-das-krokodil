import {
  calculatePossibleMoves,
  calculateAllPossibleStatesForPC
} from './moves.js'

export default class LearningModel {
  constructor(initialState) {
    this.model = calculateAllPossibleStatesForPC(initialState).map(state => {
      const possibleMoves = calculatePossibleMoves(state, 2)
      return {
        state: state,
        actions: possibleMoves,
        sweets: new Array(possibleMoves.length).fill(1)
      }
    })
    // actually ... one should do this with an array
    this.lastlastSituation = -2
    this.lastSituation = -1
    this.lastlastActionTaken = -2
    this.lastActionTaken = -1
  }

  getModel() {
    return this.model
  }

  findObjectForState(state) {
    for (let i = 0; i < this.model.length; i++) {
      let thisOneIsIt = true
      for (let j = 0; j < state.length; j++) {
        if (this.model[i].state[j] != state[j]) {
          thisOneIsIt = false
        }
      }
      if (thisOneIsIt) {
        return i
      }
    }
    return -1
  }

  choosePlayType(state) {
    const indexForState = this.findObjectForState(state)
    if (indexForState < 0) {
      //state not found
      return
    }

    const arrayForRandomSelect = this.model[indexForState].sweets
      .map((sweet, index) => new Array(sweet).fill(index))
      .flat()

    const selectedMove =
      arrayForRandomSelect[
        Math.floor(Math.random() * arrayForRandomSelect.length)
      ]
    this.lastlastSituation = this.lastSituation
    this.lastSituation = indexForState
    this.lastlastActionTaken = this.lastActionTaken
    this.lastActionTaken = selectedMove
    return [this.model[indexForState].actions[selectedMove], selectedMove]
  }

  updateModel(computerWon) {
    if (this.lastActionTaken == -1 || this.lastSituation == -1) {
      return
    }
    if (computerWon) {
      if (this.model[this.lastSituation].sweets[this.lastActionTaken] < 3) {
        this.model[this.lastSituation].sweets[this.lastActionTaken]++
      }
    } else {
      if (this.model[this.lastSituation].sweets[this.lastActionTaken] > 0) {
        this.model[this.lastSituation].sweets[this.lastActionTaken]--

        let allSweetsGone = true
        for (let i = 0; i < this.model[this.lastSituation].sweets.length; i++) {
          if (this.model[this.lastSituation].sweets[i] > 0) {
            allSweetsGone = false
          }
        }

        if (
          allSweetsGone &&
          this.model[this.lastlastSituation].sweets[this.lastlastActionTaken] >
            0
        ) {
          this.model[this.lastlastSituation].sweets[this.lastlastActionTaken]--
        }
      }
      if (this.lastActionTaken === undefined) {
        // Letzer Zustand hatte kein Token mehr;
        this.model[this.lastlastSituation].sweets[this.lastlastActionTaken]--
      }
    }
  }

  computerWon() {
    this.updateModel(true)
  }

  humanWon() {
    this.updateModel(false)
  }
}
