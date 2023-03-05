<template id="tour">
  <v-tour
    v-if="figureType === 1"
    name="myTour"
    :steps="stepsCornelsen"
    :options="myOptions"
  ></v-tour>
  <v-tour v-else name="myTour" :steps="steps" :options="myOptions"></v-tour>
</template>

<script>
export default {
  name: "Tour",
  props: {
    figureType: Number,
  },
  data() {
    return {
      myOptions: {
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: this.$i18n.t("Skip"),
          buttonPrevious: this.$i18n.t("Back"),
          buttonNext: this.$i18n.t("Next"),
          buttonStop: this.$i18n.t("Finish"),
        },
      },
      steps: [
        {
          target: "#main-game>h4", // We're using document.querySelector() under the hood
          content:
            this.$i18n.t(
              "You are playing the <strong>monkeys</strong>. Each piece moves like a pawn, i.e. it can move forward and capture diagonally."
            ) +
            `
          <ul style="text-align: left;">
          <li>` +
            this.$i18n.t(
              "one of your pieces reaches the opposite end of the board."
            ) +
            `</li>
          <li>` +
            this.$i18n.t("your opponent can not move.") +
            `</li>
          <li>` +
            this.$i18n.t("or you capture all of your opponents pieces.") +
            `</li>
          </ul>`,
          params: {
            placement: "right",
          },
        },
        {
          target: "img:first-of-type",
          content: this.$i18n.t(
            "Move a monkey via <strong>drag-and-drop!</strong>"
          ),
        },
        {
          target: "#main-rules>div>h4",
          content: this.$i18n.t(
            "The computer searches for the matching rule and randomly selects a colored token. But be warned, it gets better with time."
          ),
          params: {
            placement: "left",
          },
        },
        {
          target: ".limit-options-btn",
          content:
            this.$i18n.t("Use this button to display only those rules that") +
            `<ul style="text-align: left;">
          <li>` +
            this.$i18n.t("might follow your next move directly") +
            `</li>
          <li>` +
            this.$i18n.t("and in which the computer has not yet lost.") +
            `</li>
            </ul>`,
          params: {
            placement: "bottom",
          },
        },
      ],
      stepsCornelsen: [
        {
          target: "#main-game>h4", // We're using document.querySelector() under the hood
          content:
            this.$i18n.t(
              "You are playing the <strong>humans</strong>. You win, if"
            ) +
            `
          <ul style="text-align: left;">
          <li>` +
            this.$i18n.t(
              "one of your pieces reaches the opposite end of the board."
            ) +
            `</li>
          <li>` +
            this.$i18n.t("your opponent can not move.") +
            `</li>
          <li>` +
            this.$i18n.t("or you capture all of your opponents pieces.") +
            `</li>
          </ul>`,
          params: {
            placement: "right",
          },
        },
        {
          target: "img:first-of-type",
          content: this.$i18n.t(
            "Move a piece via <strong>drag-and-drop!</strong>"
          ),
        },
        {
          target: "#main-rules>div>h4",
          content: this.$i18n.t(
            "The computer searches for the matching rule and randomly selects a colored token. But be warned, it gets better with time."
          ),
          params: {
            placement: "left",
          },
        },
        {
          target: ".limit-options-btn",
          content:
            this.$i18n.t("Use this button to display only those rules that") +
            `<ul style="text-align: left;">
          <li>` +
            this.$i18n.t("might follow your next move directly") +
            `</li>
          <li>` +
            this.$i18n.t("and in which the computer has not yet lost.") +
            `</li>
            </ul>`,
          params: {
            placement: "bottom",
          },
        },
      ],
    };
  },
  mounted: function () {
    this.$tours["myTour"].start();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
