<template id="chessground">
  <div class="actions-field">
    <Chess v-bind:state="state" v-bind:dimension="90"/>
    <div class="actions-rating">
      <div v-for="(sweet, index) in sweets" :key="index">
        <div v-for="i in sweet" :key="i" class="circle red-circle"></div>
      </div>
    </div>
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
    sweets: Array
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
.actions-rating {
  display: grid;
  grid-template-columns: repeat(4, auto);
}
.red-circle {
  background-color: red;
  border: 2px solid rgba(67, 12, 12, 0.4); /*rahmenfarbe*/
}

.yellow-circle {
  background-color: yellow;
  border: 2px solid rgba(67, 12, 12, 0.4); /*rahmenfarbe*/
}

.blue-circle {
  background-color: blue;
  border: 2px solid rgba(67, 12, 12, 0.4); /*rahmenfarbe*/
}

.circle {
  height: 25%;
  border-radius: 50%;
}
</style>
