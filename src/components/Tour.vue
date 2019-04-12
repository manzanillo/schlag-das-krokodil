<template id="tour">
  <v-tour name="myTour" :steps="steps" :options="myOptions"></v-tour>
</template>

<script>
export default {
  name: "Tour",
  data() {
    return {
      myOptions: {
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: "Überspringen",
          buttonPrevious: "Zurück",
          buttonNext: "Weiter",
          buttonStop: "Fertig"
        }
      },
      steps: [
        {
          target: "#main-game>h4", // We're using document.querySelector() under the hood
          content: `Du spielst die <strong>Äffchen</strong>! Du gewinnst, wenn
          <ul style="text-align: left;">
          <li>eine deiner Figuren ans andere Ende des Bretts gelangt.</li>
          <li>der Gegner nicht mehr ziehen kann.</li>
          <li>oder du alle gegnerischen Figuren schlägst.</li>
          </ul>`,
          params: {
            placement: "right"
          }
        },
        {
          target: "img:first-of-type",
          content: "Bewege ein Äffchen via <strong>Drag-and-Drop!</strong>"
        },
        {
          target: "#main-rules>h4",
          content:
            "Der Computer sucht die passende Regel und wählt zufällig eine farbige Schokolinse. Aber sei gewarnt, mit der Zeit wird er immer besser.",
          params: {
            placement: "left"
          }
        }
      ]
    };
  },
  mounted: function() {
    this.$tours["myTour"].start();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
