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

    const arrayForRandomSelect = this.model[0].sweets
      .map((sweet, index) => new Array(sweet).fill(index))
      .flat()

    const selectedMove =
      arrayForRandomSelect[
        Math.floor(Math.random() * arrayForRandomSelect.length)
      ]
    return this.model[indexForState].actions[selectedMove]
  }
}
