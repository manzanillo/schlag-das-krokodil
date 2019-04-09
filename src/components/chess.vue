<template id="chessground">
  <div class="field">
    <svg :width="dimension" :height="dimension">
      <g v-for="(occupation, index) in state" :key="index">
        <rect
          v-if="occupation === 0"
          :x="dimension/3 * (index % 3)"
          :y="dimension/3 * (Math.floor(index / 3))"
          :width="dimension/3"
          :height="dimension/3"
          stroke="lightgray"
          style="fill:rgb(255,255,255)"
          stroke-width="1"
        ></rect>

        <image
          v-if="occupation === 1"
          :width="dimension/3"
          :height="dimension/3"
          :x="dimension/3 * (index % 3)"
          :y="dimension/3 * (Math.floor(index / 3))"
          xlink:href="../assets/monkey.svg"
        ></image>

        <image
          v-if="occupation === 2"
          :width="dimension/3"
          :height="dimension/3"
          :x="dimension/3 * (index % 3)"
          :y="dimension/3 * (Math.floor(index / 3))"
          xlink:href="../assets/croco.svg"
        ></image>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Chess",
  props: {
    state: Array,
    dimension: { type: Number, default: 180 }
  }
};
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
