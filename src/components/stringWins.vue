<template>
    <div class="stringWin" v-if="showLabel">
         <svg class="stringWinImg noSelect" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
             <rect style="fill:#5b5b5b;" x="0.5" y="0.5" rx="2.5" width="99" height="6" />
             <rect style="fill:#FFE401;" x="1" y="1" rx="2" width="98" height="5" />

           <text text-anchor="middle" class="stringWinText" font-weight="bold" :font-size="dynamicSize" x="50" :y="vShift" fill="#fc142b" >
              Wins {{stringWinText}}</text>
        </svg>

    </div>
</template>


<script>
export default {
  name: "stringWins",
  props: ["stringWinText"],
  computed: {
    showLabel() {
      return this.stringWinText !== '';
    },
    dynamicSize() {
      if (this.stringWinText.length > 20) return 2;
      if (this.stringWinText.length > 10) return 3;
      return 4;
    },
    vShift() {
      return this.stringWinText.length > 20 ? 4.5 : 5;
    }
  }
};
</script>


<style>
.stringWinText {
  paint-order: stroke;
  stroke: #000000;
  /*  fill: #ffffff; */
  stroke-width: 0.8px;
  stroke-linecap: round;
  stroke-linejoin: round;
  font-weight: 800;
  font-family: Arial, Helvetica;
}

.stringWin {
  position: relative;
}

.stringWinImg {
  cursor: pointer;
  width: 100%;
  position: absolute;
}

@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE - portrait layout*/
  .stringWin {
    top: 51%;
    width: 95%;
    left: 2.5%;
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .stringWin {
    top: 51%;
    width: 95%;
    left: 2.5%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE MODE - portrait layout*/
  .stringWin {
    top: 51%;
    width: 95%;
    left: 2.5%;
  }
}
</style>