<template>
<div :class="{'cardArea':true, 'held':hold, 'fadeOut':checkFadeout()}">
    <div class="mainCards">
        <transition name="cardAnimation">
            <div v-if="showCard" :class="[defaultClasses, cardPosition, flip ? 'flip' : '' ]">
              <div class="flipper">
                <div class="front cBack1" :style="cardBack"></div>
                <div :class="cardRank"></div>
              </div>
            </div>
        </transition>
    </div>
</div>
</template>

<script>
import bus from "./../bus";

export default {
  name: "mainCards",
  props: [
    "flip",
    "showCard",
    "cardPosition",
    "cardNum",
    "cardType",
    "held",
    "fadeOut",
    "cardBack"
  ],
  data() {
    return {
      defaultClasses: "cSize flip-container",
      cardRank: "",
      hold: this.held
      /*       cardArea:"cardArea",
      held:' ' */
    };
  },
  methods: {
    checkFadeout() {
    
     /*    fadeIndex;
      if (this.fadeOut) {
        fadeIndex = this.fadeOut.indexOf(this.cardNum);
        if (fadeIndex > -1 && !this.hold) {
          fade = true;
        }
      } */
      return this.fadeOut;
    }
  },
  mounted() {
    bus.$on("cardsUpdated", c => {
    
      if (c.cardNum === this.cardNum && c.cardType === this.cardType) {
        this.cardRank = "back " + c.newCard;
      }
    });
    bus.$on("holdUpdated", c => {
      if (c.cardNum === this.cardNum && c.cardType === this.cardType) {
        this.hold = c.held;
      }
    });
    bus.$on("resetHold", c => {
      if (c.cardType === this.cardType) {
        this.hold = c.hold;
      }
    });
  }
};
</script>

<style>
.fadeOut {
  opacity: 0.2;
  transform: scale(0.9);
}

.cardDisppears {
  display: none;
}
.cardAnimationAppear {
  transform: scale(1);
  transform-origin: 0% 0%;
  opacity: 1;

  /* animation: cardAnimation-in 0s; */
}

.cardAnimation-enter-active {
  animation: cardAnimation-in 0.5s;
}

.cardAnimation-leave-active {
  animation: cardAnimation-out 0.2s;
}

.cSize {
  width: 18%;
  padding-bottom: 23%;
  background-size: 100% 100%;
}
.holdSpot {
  width: 18%;
  padding-bottom: 57%;
  background-size: 100% 100%;
}

.flip-container {
  perspective: 1000px;
}

.flip-container.flip .flipper {
  transform: rotateY(180deg);
}

.front,
.back {
  width: 100%;
  height: 100%;
}

.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

.a {
  isolation: isolate;
}

.b,
.g {
  fill: #fff;
}

.b {
  stroke: #000;
}

.c {
  stroke-miterlimit: 10;
  fill: url(#a);
  stroke: url(#b);
}

.d {
  fill: #994105;
}

.e {
  fill: #ffe85f;
}

.f {
  fill: #f99635;
  mix-blend-mode: multiply;
}

.h {
  fill: #493f02;
}

.i {
  fill: #ffe471;
}

.j {
  fill: #161201;
}

.k {
  fill: #ffe67b;
}

.l {
  fill: #141001;
}

/* hide back of pane during swap */

.front,
.back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-bottom: 128%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* front pane, placed above back */

.front {
  z-index: 2;
  /* for firefox 31 */
  transform: rotateY(0deg);
}

/* back, initially hidden pane */

.back {
  transform: rotateY(180deg);
}

@keyframes cardAnimation-in {
  0% {
    transform: scale(1.4);
    transform-origin: 0% 500%;
    opacity: 0.2;
  }

  100% {
    transform: scale(1);
    transform-origin: 0% 0%;
    opacity: 1;
  }
}

@keyframes cardAnimation-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
    transform-origin: 0% -500%;
    opacity: 0.5;
  }
}

.mainCards,
.singleResult {
  margin: 0 auto;
  position: relative;
}

.cardArea,
.holdArea {
  position: relative;
}

.cardArea {
  /*   opacity: 1;
  transform: scale(1); */
  transition: opacity 1s, transform 1s;
}

@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/

  .changeBG {
    right: 0.2rem;
  }
  .rSlide1 {
    animation: moveRight1 0.8s forwards;
  }
  .rSlide2 {
    animation: moveRight2 0.8s forwards;
  }
  .rSlide3 {
    animation: moveRight3 0.8s forwards;
  }
  .label {
    width: 36%;
    left: 35.5%;
  }
  .mainCards {
    width: 56%;
  }
  .singleResult,
  .cardArea,
  .holdArea {
    margin: 0 auto;
  }

  /*   .singleResult {
    top: 24%;
  } */

  .stringResultBonus {
    top: 25%;
  }
  .primaryHandResult {
    top: 60%;
  }

  .cardArea {
    top: 60%;
  }

  .holdArea {
    top: 25%;
  }

.stringCard{
top: 25% !important;
}

  .held {
    animation: moveUp 0.2s forwards;
  }

  @keyframes moveUp {
    0% {
      top: 60%;
      animation-timing-function: ease-in;
    }
    100% {
      top: 25%;
      animation-timing-function: ease-in;
    }
  }
  .unHeld {
    animation: moveDown 0.2s forwards;
  }

  @keyframes moveDown {
    0% {
      top: 25%;
      animation-timing-function: ease-in;
    }
    100% {
      top: 60%;
    }
  }

  .bCard1 {
    top: 48%;
  }
  .bCard2 {
    top: 57%;
  }
  .bCard3 {
    top: 66%;
  }
  .bCard4 {
    top: 75%;
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/

  .changeBG {
    right: 0.2rem;
  }

  .label {
    width: 66%;
    left: 22.5%;
  }

.stringCard{
 top: 36.5% !important;
}

  .held {
    animation: moveUp 0.2s forwards;
  }

  @keyframes moveUp {
    0% {
      top: 56.5%;
      animation-timing-function: ease-in;
    }
    100% {
      top: 36.5%;
    }
  }
  .unHeld {
    animation: moveDown 0.2s forwards;
  }

  @keyframes moveDown {
    0% {
      top: 36.5%;
      animation-timing-function: ease-in;
    }
    100% {
      top: 56.5%;
    }
  }

  .mainCards {
    width: 100%;
    /*     top: 23.2%; */
  }
  .cardArea {
    top: 56.5%;
    margin: 0 auto;
  }
  .holdArea {
    top: 35%;
    margin: 0 auto;
  }
  .singleResult {
    margin: 0 auto;
  }
  .stringResultBonus {
    top: 38%;
  }
  .primaryHandResult {
    top: 59%;
  }
  .bCard1 {
    top: 50%;
  }
  .bCard2 {
    top: 56%;
  }
  .bCard3 {
    top: 62%;
  }
  .bCard4 {
    top: 68%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/

  .changeBG {
    left: 0.2rem;
  }

  .label {
    width: 53%;
    left: 28.725%;
  }

  .mainCards {
    width: 80%;
    /*   top: 30%; */
  }

  .cardArea {
    top: 50%;
    left: -10%;
  }
  .holdArea {
    top: 20%;
    left: -10%;
  }

.stringCard{
 top: 20% !important;
}

  .held {
    animation: moveUp 0.2s forwards;
  }

  @keyframes moveUp {
    0% {
      top: 50%;
      animation-timing-function: ease-in;
    }
    100% {
      top: 20%;
    }
  }
  .unHeld {
    animation: moveDown 0.2s forwards;
  }

  @keyframes moveDown {
    0% {
      top: 20%;
      animation-timing-function: ease-in;
    }
    100% {
      top: 50%;
    }
  }

  .singleResult {
    left: -10%;
  }

  .stringResultBonus {
    top: 18%;
  }
  .primaryHandResult {
    top: 56%;
  }

  .bCard1 {
    top: 44%;
  }
  .bCard2 {
    top: 53%;
  }
  .bCard3 {
    top: 62%;
  }
  .bCard4 {
    top: 71%;
  }
}

.label,
.label1,
.label2,
.label3,
.label4,
.label5,
.c5Pos,
.c4Pos,
.c3Pos,
.c2Pos,
.c1Pos
 {
  position: absolute;
}

.c5Pos {
  right: 2%;
}

.c4Pos {
  right: 21.5%;
}

.c3Pos {
  right: 50%;
  margin-right: -9%;
}

.c2Pos,
.label2 {
  left: 21.5%;
}

.c1Pos,
.label1 {
  left: 2%;
}

.label3 {
  right: 2%;
}

.label4 {
  right: 36.5%;
}

.label5 {
  right: 17%;
}

.C10 {
  background-image: url("../assets/cards/10C.svg");
}

.D10 {
  background-image: url("../assets/cards/10D.svg");
}

.H10 {
  background-image: url("../assets/cards/10H.svg");
}

.S10 {
  background-image: url("../assets/cards/10S.svg");
}

.C2 {
  background-image: url("../assets/cards/2C.svg");
}

.D2 {
  background-image: url("../assets/cards/2D.svg");
}

.H2 {
  background-image: url("../assets/cards/2H.svg");
}

.S2 {
  background-image: url("../assets/cards/2S.svg");
}

.C3 {
  background-image: url("../assets/cards/3C.svg");
}

.D3 {
  background-image: url("../assets/cards/3D.svg");
}

.H3 {
  background-image: url("../assets/cards/3H.svg");
}

.S3 {
  background-image: url("../assets/cards/3S.svg");
}

.C4 {
  background-image: url("../assets/cards/4C.svg");
}

.D4 {
  background-image: url("../assets/cards/4D.svg");
}

.H4 {
  background-image: url("../assets/cards/4H.svg");
}

.S4 {
  background-image: url("../assets/cards/4S.svg");
}

.C5 {
  background-image: url("../assets/cards/5C.svg");
}

.D5 {
  background-image: url("../assets/cards/5D.svg");
}

.H5 {
  background-image: url("../assets/cards/5H.svg");
}

.S5 {
  background-image: url("../assets/cards/5S.svg");
}

.S6 {
  background-image: url("../assets/cards/6S.svg");
}

.H6 {
  background-image: url("../assets/cards/6H.svg");
}

.D6 {
  background-image: url("../assets/cards/6D.svg");
}

.C6 {
  background-image: url("../assets/cards/6C.svg");
}

.S7 {
  background-image: url("../assets/cards/7S.svg");
}

.H7 {
  background-image: url("../assets/cards/7H.svg");
}

.D7 {
  background-image: url("../assets/cards/7D.svg");
}

.C7 {
  background-image: url("../assets/cards/7C.svg");
}

.C8 {
  background-image: url("../assets/cards/8C.svg");
}

.H8 {
  background-image: url("../assets/cards/8H.svg");
}

.D8 {
  background-image: url("../assets/cards/8D.svg");
}

.S8 {
  background-image: url("../assets/cards/8S.svg");
}

.S9 {
  background-image: url("../assets/cards/9S.svg");
}

.H9 {
  background-image: url("../assets/cards/9H.svg");
}

.D9 {
  background-image: url("../assets/cards/9D.svg");
}

.C9 {
  background-image: url("../assets/cards/9C.svg");
}

.C11 {
  background-image: url("../assets/cards/JC.svg");
}

.D11 {
  background-image: url("../assets/cards/JD.svg");
}

.H11 {
  background-image: url("../assets/cards/JH.svg");
}

.S11 {
  background-image: url("../assets/cards/JS.svg");
}

.S13 {
  background-image: url("../assets/cards/KS.svg");
}

.H13 {
  background-image: url("../assets/cards/KH.svg");
}

.D13 {
  background-image: url("../assets/cards/KD.svg");
}

.C13 {
  background-image: url("../assets/cards/KC.svg");
}

.C12 {
  background-image: url("../assets/cards/QC.svg");
}

.H12 {
  background-image: url("../assets/cards/QH.svg");
}

.D12 {
  background-image: url("../assets/cards/QD.svg");
}

.S12 {
  background-image: url("../assets/cards/QS.svg");
}

.C14 {
  background-image: url("../assets/cards/AC.svg");
}

.H14 {
  background-image: url("../assets/cards/AH.svg");
}

.D14 {
  background-image: url("../assets/cards/AD.svg");
}

.S14 {
  background-image: url("../assets/cards/AS.svg");
}

.cBack1 {
 /*  background-image: url("../assets/cards/RG-CardBack-700.png"); */
  /*  background-image: url("../assets/cards/RG-CardBack-800.png"); */

  /*  background-image: url("../assets/cards/cardBack2.svg"); */
  /*   background-image: url("../assets/cards/cardBack_YourLogo.png"); */
  /*   background-image: url("../assets/cards/cardBack_Wizard.png"); */
  /*    background-image: url("../assets/cards/cardBackPS.png"); */
  /*  background-image: url("../assets/cards/cardBack-IGT.png"); */
  /*    background-image: url("../assets/cards/cardBack-Aristocrat.png"); */
  /*   background-image: url("../assets/cards/cardBack-Caesars.png"); */
  /*    background-image: url("../assets/cards/cardBack_JVL.png"); */
  /* background-image: url("../assets/cards/cardBack_Aruze.png"); */
  /*   background-image: url("../assets/cards/cardBack_ActionGaming.png"); */
  background-size: 87% 99% !important;
  background-position: center;
}
</style>