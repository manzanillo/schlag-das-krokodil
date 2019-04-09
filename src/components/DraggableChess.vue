<template id="chessground">
  <div>
    <draggable class="field" v-model="currentState" @sort="update" :move="checkMove">
      <div v-for="(occupation, index) in currentState" :key="index">
        <div v-if="occupation === 0">
          <!-- field is empty -->
        </div>
        <div v-if="occupation === 1">
          <!-- player is occupying field -->
          <img src="../assets/monkey.svg" alt="triangle with all three sides equal" width="100%">
        </div>
        <div v-if="occupation === 2">
          <!-- computer is occupying field -->
          <img src="../assets/croco.svg" alt="triangle with all three sides equal" width="100%">
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { calculatePossibleMoves, arrayContainsArray } from "../utils/moves.js";

export default {
  name: "DraggableChess",
  components: {
    draggable
  },
  props: {
    state: Array
  },
  data() {
    return {
      currentState: this.state
    };
  },
  methods: {
    update: function(evt) {
      console.log(this.currentState);
      console.log(evt);
      this.currentState[evt.oldIndex] = 0;
      this.$forceUpdate();
    },
    checkMove: function(evt) {
      if (this.currentState[evt.draggedContext.index] == 1) {
        //player selected
        const possibleMoves = calculatePossibleMoves(this.currentState, 1);
        const moveTried = [evt.draggedContext.index, evt.relatedContext.index];
        if (arrayContainsArray(possibleMoves, moveTried)) {
          return true;
        }
      }
      return false;
    }
  }
};
//TODO:: Use event to pass up changes in currentState to parent object : http://michaelnthiessen.com/vue-props-vs-data/

/*
      //console.log(evt);
      //this.currentState[evt.oldIndex] = 1;
      //evt.newIndex;
      //evt.oldIndex;
      const from = this.currentState[evt.draggedContext.index];
      this.currentState[evt.draggedContext.futureIndex] = from;
      //evt.draggedContext.index
      //evt.draggedContext.futureIndex
      console.log(this.currentState);
      this.$forceUpdate();
      return false; //
*/
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.field {
  display: grid;
  grid-template-columns: 25% 25% 25%;
  grid-auto-rows: 1fr;
}

.field > div {
  border: 1px solid lightgray;
}
</style>
