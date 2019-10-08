<template id="chessground">
  <div class="actions-field">
    <Chess
      v-bind:state="state"
      v-bind:dimension="dimension"
      v-bind:actions="actions"
      v-bind:halloween="halloween"
    />
    <div class="actions-rating">
      <svg :width="dimension" :height="dimension">
        <g v-for="(sweet, index) in sweets" :key="index">
          <g v-for="i in sweet" :key="i">
            <circle
              :cx="dimension/4 * index + 10"
              :cy="dimension/4 * (i-1) + dimension/Math.pow(2, sweet)"
              r="10"
              :fill="colors[index].fill"
            />
            <animateMotion
              v-if="currentState && index != chosenPlayType"
              path="M 0 0 V -10 V -5 V -2 Z"
              dur="0.5s"
              repeatCount="indefinite"
            />
            <animateMotion
              v-if="currentState && index == chosenPlayType"
              path="M 0 0 V -10 V -30 Z"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </g>
        </g>
      </svg>
    </div>
    <div style="display:none;">{{forceUpdate}}</div>
  </div>
</template>

<script>
import Chess from "./chess.vue";
export default {
  name: "PossibleActions",
  components: {
    Chess
  },
  props: {
    state: Array,
    actions: Array,
    sweets: Array,
    forceUpdate: Number,
    currentState: Boolean,
    chosenPlayType: Number,
    halloween: Boolean
  },
  data: function() {
    return {
      colors: [
        { name: "url(#arrow-blue)", hex: "#00f", fill: "blue" },
        { name: "url(#arrow-red)", hex: "#f00", fill: "red" },
        { name: "url(#arrow-green)", hex: "#0f0", fill: "green" },
        { name: "url(#arrow-yellow)", hex: "#ffa500", fill: "orange" },
        { name: "url(#arrow-purple)", hex: "#80f", fill: "purple" }
      ],
      dimension: 90,
      currentSweets: this.sweets,
      forceUpdateHelper: 1
    };
  },
  watch: {
    forceUpdate: function(newVal, oldVal) {
      this.forceUpdateHelper = newVal;
    },
    chosenPlayType: function(newVal, oldVal) {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.actions-field {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-auto-rows: 1fr;
  padding: 0.2em;
  border: 1px solid lightgray;
}
</style>
