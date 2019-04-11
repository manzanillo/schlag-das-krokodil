<template id="chessground">
  <div class="field">
    <div
      v-for="(occupation, index) in currentState"
      :key="index"
      v-drag-and-drop
      v-on:drag="handleDrag"
      v-on:drop="handleDrop"
      v-on:drag-over="handleDragOver"
    >
      <div class="field-slot" v-if="occupation === 0">
        <!-- field is empty -->
        <img v-bind:id="index" src="../assets/white.svg" alt="empty" width="100%">
      </div>
      <div class="field-slot" v-if="occupation === 1">
        <!-- player is occupying field -->
        <img v-bind:id="index" src="../assets/monkey.svg" alt="human" width="100%">
      </div>
      <div class="field-slot" v-if="occupation === 2">
        <!-- computer is occupying field -->
        <img v-bind:id="index" src="../assets/croco.svg" alt="computer" width="100%">
      </div>
    </div>
  </div>
</template>

<script>
import {
  calculatePossibleMoves,
  arrayContainsArray,
  performMove
} from "../utils/moves.js";

export default {
  name: "DraggableChess",
  components: {},
  props: {
    state: Array,
    usersTurn: Boolean
  },
  data() {
    return {
      currentState: this.state,
      currentlyDragging: null,
      loggedEvent: ""
    };
  },
  methods: {
    handleDrop: function(e) {
      console.log("handleDrop", this.currentlyDragging, e.target);
      const from = this.currentlyDragging.id;
      const to = e.target.id;
      const placeholder = this.currentState[from];
      const possibleMoves = calculatePossibleMoves(this.currentState, 1);
      const moveTried = [from, to];
      if (arrayContainsArray(possibleMoves, moveTried)) {
        this.currentState[this.currentlyDragging.id] = e.target.id;
        this.currentState[e.target.id] = placeholder;
        this.$forceUpdate();
        this.$emit("new-state", this.currentState);
      }
    },
    handleDrag: function(e) {
      this.currentlyDragging = e.srcElement;
    },
    handleDragOver: function(e) {
      console.log("handleDragOver", e);
      this.loggedEvent = "handleDragOver";
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
