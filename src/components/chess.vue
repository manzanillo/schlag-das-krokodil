<template id="chessground">
  <div>
    <svg :width="dimension" :height="dimension">
      <defs>
        <marker
          id="arrow-red"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="2"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,4 L5,2 z" fill="#f00" />
        </marker>
        <marker
          id="arrow-green"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="2"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,4 L5,2 z" fill="#0f0" />
        </marker>
        <marker
          id="arrow-blue"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="2"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,4 L5,2 z" fill="#00f" />
        </marker>
        <marker
          id="arrow-yellow"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="2"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,4 L5,2 z" fill="#ffa500" />
        </marker>
        <marker
          id="arrow-purple"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="2"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,4 L5,2 z" fill="#80f" />
        </marker>
      </defs>

      <g v-for="(occupation, index) in state" :key="Math.random()">
        <rect
          v-if="occupation === 0"
          :x="dimension/3 * (index % 3)"
          :y="dimension/3 * (Math.floor(index / 3))"
          :width="dimension/3"
          :height="dimension/3"
          stroke="lightgray"
          style="fill:rgb(255,255,255)"
          stroke-width="1"
        />

        <image
          v-if="occupation === 1 && halloween"
          :width="dimension/3"
          :height="dimension/3"
          :x="dimension/3 * (index % 3)"
          :y="dimension/3 * (Math.floor(index / 3))"
          xlink:href="../assets/monkey-halloween.svg"
        />

        <image
          v-if="occupation === 2 && halloween"
          :width="dimension/3"
          :height="dimension/3"
          :x="dimension/3 * (index % 3)"
          :y="dimension/3 * (Math.floor(index / 3))"
          xlink:href="../assets/croco-halloween.svg"
        />

        <image
          v-if="occupation === 1 && !halloween"
          :width="dimension/3"
          :height="dimension/3"
          :x="dimension/3 * (index % 3)"
          :y="dimension/3 * (Math.floor(index / 3))"
          xlink:href="../assets/monkey.svg"
        />

        <image
          v-if="occupation === 2 && !halloween"
          :width="dimension/3"
          :height="dimension/3"
          :x="dimension/3 * (index % 3)"
          :y="dimension/3 * (Math.floor(index / 3))"
          xlink:href="../assets/croco.svg"
        />
      </g>
      <g v-for="(action, index) in actions" :key="index">
        <line
          :x1="dimension/3 * (action[0] % 3) + dimension/6"
          :y1="dimension/3 * (Math.floor(action[0] / 3)) + dimension/6"
          :x2="dimension/3 * (action[1] % 3) + dimension/6"
          :y2="dimension/3 * (Math.floor(action[1] / 3)) + dimension/6"
          :stroke="colors[index].hex"
          stroke-width="3"
          :marker-end="colors[index].name"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Chess",
  props: {
    state: Array,
    dimension: { type: Number, default: 180 },
    actions: Array,
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
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
