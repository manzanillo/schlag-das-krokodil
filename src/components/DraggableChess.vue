<template id="chessground">
  <div class="field">
    <div
      v-for="(occupation, index) in currentState"
      :key="index"
      v-drag-and-drop
      v-on:drag="handleDrag"
      v-on:drop="handleDrop"
      v-touch:moved="handleMove"
      v-touch:moving="handleMoving"
      v-touch:end="endHandler"
      ref="fieldslot"
    >
      <div v-bind:class="{outline: highlights[index]}" class="field-slot" v-if="occupation === 0">
        <!-- field is empty -->
        <img v-bind:id="index" src="../assets/white.svg" alt="empty" width="100%">
      </div>
      <div class="field-slot monkey" v-if="occupation === 1">
        <!-- player is occupying field -->
        <img v-bind:id="index" src="../assets/monkey.svg" alt="human" width="100%">
      </div>
      <div
        v-bind:class="{'outline': highlights[index]}"
        class="field-slot croco"
        v-if="occupation === 2"
      >
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
    state: Array
  },
  data() {
    return {
      currentState: this.state,
      currentlyDragging: null,
      playerIsAllowedToMove: true,
      highlights: new Array(this.state.length).fill(false)
    };
  },
  methods: {
    handleMove: function(e) {
      if (!this.playerIsAllowedToMove) {
        return;
      }
      if (e instanceof MouseEvent) {
        return;
      }
      this.currentlyDragging = e.srcElement;
      if (this.currentState[this.currentlyDragging.id] == 1) {
        // it belongs to a human, show where to place it
        const possibleMoves = calculatePossibleMoves(this.currentState, 1);
        let possibleDestinations = [];
        for (let i = 0; i < possibleMoves.length; i++) {
          if (possibleMoves[i][0] == this.currentlyDragging.id) {
            possibleDestinations.push(possibleMoves[i][1]);
          }
        }
        for (let i = 0; i < possibleDestinations.length; i++) {
          this.highlights[possibleDestinations[i]] = true;
        }
        this.$forceUpdate();
      }
    },
    handleMoving: function(e) {
      //console.log(e);
    },
    endHandler: function(e) {
      if (!this.playerIsAllowedToMove) {
        return;
      }
      var touchEndedHere = e.changedTouches[0];

      const fields = this.$refs.fieldslot;

      for (let i = 0; i < fields.length; i++) {
        const boundingRect = fields[i].getBoundingClientRect();
        if (
          touchEndedHere.clientX > boundingRect.left &&
          touchEndedHere.clientX < boundingRect.right &&
          touchEndedHere.clientY > boundingRect.top &&
          touchEndedHere.clientY < boundingRect.bottom
        ) {
          const from = this.currentlyDragging.id;
          const to = i;
          this.performAction(from, to);
        }
      }
      //remove all highlights
      this.highlights.fill(false);
      this.$forceUpdate();
    },
    handleDrop: function(e) {
      if (!this.playerIsAllowedToMove) {
        return;
      }
      //remove all highlights
      this.highlights.fill(false);
      this.$forceUpdate();
      // handle movement
      //console.log("handleDrop", this.currentlyDragging, e.target);
      const from = this.currentlyDragging.id;
      const to = e.target.id;
      this.performAction(from, to);
    },
    performAction(from, to) {
      const placeholder = this.currentState[from];
      const possibleMoves = calculatePossibleMoves(this.currentState, 1);
      const moveTried = [from, to];
      if (arrayContainsArray(possibleMoves, moveTried)) {
        this.currentState[this.currentlyDragging.id] = 0;
        this.currentState[to] = placeholder;
        this.$forceUpdate();
        this.playerIsAllowedToMove = false;
        this.$emit("new-state", this.currentState);
      }
    },
    handleDrag: function(e) {
      if (!this.playerIsAllowedToMove) {
        return;
      }
      this.currentlyDragging = e.srcElement;
      if (this.currentState[this.currentlyDragging.id] == 1) {
        // it belongs to a human, show where to place it
        const possibleMoves = calculatePossibleMoves(this.currentState, 1);
        let possibleDestinations = [];
        for (let i = 0; i < possibleMoves.length; i++) {
          if (possibleMoves[i][0] == this.currentlyDragging.id) {
            possibleDestinations.push(possibleMoves[i][1]);
          }
        }
        for (let i = 0; i < possibleDestinations.length; i++) {
          this.highlights[possibleDestinations[i]] = true;
        }
        this.$forceUpdate();
      }
    }
  },
  watch: {
    state: function(newVal, oldVal) {
      this.currentState = newVal;
      this.playerIsAllowedToMove = true;
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
  touch-action: none;
}

.field > div {
  border: 1px solid lightgray;
}

.outline {
  border: 5px solid orangered;
}

.monkey {
  background-color: #56a8c9;
}
.croco {
  background-color: #a0a0a0;
}
</style>
