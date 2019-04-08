<template>
  <div id="app">
    <h1>Reinforcement Learning - Schlag das Krokodil</h1>
    <Chess v-bind:state="[1,1,1,0,0,0,2,2,2]"/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Chess from "./components/chess.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
    Chess
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
