<template id="chessground">
  <div>
    <draggable
      class="field"
      v-model="currentState"
      :move="checkMove"
      :options="{disabled: !usersTurn}"
    >
      <div v-for="(occupation, index) in currentState" :key="index">
        <div class="field-slot" v-if="occupation === 0">
          <!-- field is empty -->
        </div>
        <div class="field-slot" v-if="occupation === 1">
          <!-- player is occupying field -->
          <img src="../assets/monkey.svg" alt="triangle with all three sides equal" width="100%">
        </div>
        <div class="field-slot" v-if="occupation === 2">
          <!-- computer is occupying field -->
          <img src="../assets/croco.svg" alt="triangle with all three sides equal" width="100%">
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import {
  calculatePossibleMoves,
  arrayContainsArray,
  performMove
} from "../utils/moves.js";

export default {
  name: "DraggableChess",
  components: {
    draggable
  },
  props: {
    state: Array,
    usersTurn: Boolean
  },
  data() {
    return {
      currentState: this.state
    };
  },
  methods: {
    checkMove: function(evt) {
      if (this.currentState[evt.draggedContext.index] == 1) {
        //player selected
        const possibleMoves = calculatePossibleMoves(this.currentState, 1);
        const moveTried = [evt.draggedContext.index, evt.relatedContext.index];
        if (arrayContainsArray(possibleMoves, moveTried)) {
          this.currentState[evt.oldIndex] = 0;
          this.currentState = performMove(this.currentState, moveTried);
          this.$forceUpdate();
          this.$emit("new-state", this.currentState);

          return false; //workaround ;-)
        }
      }
      return false;
    }
  },
  watch: {
    state: function(newVal, oldVal) {
      this.currentState = newVal;
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.field {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
}

.field > div {
  border: 1px solid lightgray;
}
</style>
