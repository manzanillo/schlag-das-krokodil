<template id="chessground">
  <div class="field">
    <div v-for="(occupation, index) in state" :key="index">
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
  </div>
</template>

<script>
export default {
  name: "Chess",
  props: {
    state: Array
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
