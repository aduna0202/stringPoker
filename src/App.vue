<template>
  <div class="fullScreen" :style="bgImg">

    <pay-table v-show="payTableOpen" v-on:updateBonus="updateBonus()" v-bind:baseBetValue="cash.coinValue * cash.base_coin_cost"></pay-table>
    <logo></logo>
    <menu-btns v-on:openInfo="openInfoBox" v-on:showPaytable="togglePayTable"></menu-btns>
    <info v-on:closeInfo="infoBoxOpen = false" :open="infoBoxOpen"></info>
    <cash-display v-bind:glow="stage.results[0] || stage.newRound" v-on:updateBet="changeBet()" v-bind:cash="cash"
      v-on:playWin="playWinMsg()" v-on:endRound="endRound()" v-bind:showValue="stage.results[0] || stage.showWin"
      v-bind:lockBet="stage.lockBet"></cash-display>
    <water-mark1 :style="{ 'display': showWater2 ? 'block' : 'none' }"></water-mark1>
    <water-mark2 :style="{ 'display': showWater ? 'block' : 'none' }"></water-mark2>
    <water-mark3></water-mark3>

    <div class="cardArea stringCard" :style="{ display: (newBonus && stage.newBonus) ? 'block' : 'none' }">
      <div class="mainCards">
        <div v-if="discardedStringCard !== ''" class='cSize flip-container flip c5Pos fadeOut'>
          <div class="flipper ">
            <div class='back' :class="discardedStringCard"></div>
          </div>
          <div style="padding-top:42%; margin-left:-20%; text-align:center; position: absolute; width:140%;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30">
              <rect style="fill:#FFE401; stroke:#BB2601; stroke-width:3;" x="20" y="5" rx="5" width="60" height="20" />
              <text text-anchor="middle" font-weight="900" font-size="12" x="50" y="18.5" fill="#000000" opacity="1">
                Discard</text>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div v-if="option.plusMode" id="note" class="cardArea stringCard"
      :style="{ display: (results.bonus[stage.activeHand].counter > 0) ? 'block' : 'none' }">
      <div class="mainCards">
        <div v-if="discardedStringCard !== ''" class='cSize flip-container flip c1Pos'>
          <div style="padding-top:0%; margin-left:-20%; text-align:center; position: absolute; width:140%;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80">
              <rect style="fill:#FFE401; stroke:#BB2601; stroke-width:3;" x="20" y="5" rx="5" width="60" height="70" />
              <text text-anchor="middle" font-weight="900" font-size="11" x="50" y="23" fill="#000000" opacity="1">
                * PLUS {{ results.bonus[0].counter }}</text>
              <text text-anchor="middle" font-weight="900" font-size="11" x="50" y="35" fill="#000000" opacity="1">
                BONUS! </text>
              <text text-anchor="middle" font-weight="900" font-size="10" x="50" y="50" fill="#000000" opacity="1">
                Repeated</text>
              <text text-anchor="middle" font-weight="900" font-size="10" x="50" y="60" fill="#000000" opacity="1">
                string</text>
              <text text-anchor="middle" font-weight="900" font-size="10" x="50" y="70" fill="#000000" opacity="1">
                hand!</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div id="newBonus" class="cardArea stringCard" :style="{ display: (!newBonus && stage.newBonus) ? 'block' : 'none' }">
      <div class="mainCards">
        <div class='cSize flip-container flip c5Pos'>
          <div style="padding-top:30%; margin-left:-20%; text-align:center; position: absolute; width:140%;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 600">
              <rect style="fill:#FFE401; stroke:#BB2601; stroke-width:3;" x="20" y="5" rx="5" width="60" height="40" />
              <text text-anchor="middle" font-weight="900" font-size="12" x="50" y="21" fill="#000000" opacity="1">
                BONUS</text>
              <text text-anchor="middle" font-weight="900" font-size="12" x="50" y="38.5" fill="#000000" opacity="1">
                KEPT</text>
            </svg>
          </div>
        </div>
      </div>
    </div>


    <card class="stringRow2" v-for="(c, i) in stringCards2.deal" v-bind:cardPosition="sPos[i]" v-bind:showCard="c"
      v-bind:flip="stringCards2.flip[i]" v-bind:cardNum="i" v-bind:cardType="'stringCards2'"
      v-bind:held="stringCards2.held[i]" v-bind:fadeOut="false" v-bind:cardBack="cardBack"></card>
    <card class="primaryRow2" v-for="(c, i) in primaryCards2.deal" v-bind:cardPosition="cPos[i]" v-bind:showCard="c"
      v-bind:flip="primaryCards2.flip[i]" v-bind:cardNum="i" v-bind:cardType="'primaryCards2'"
      v-bind:held="primaryCards2.held[i]" v-bind:fadeOut="false" v-bind:cardBack="cardBack"></card>


    <card class="stringRow1" v-for="(c, i) in stringCards1.deal" v-bind:cardPosition="sPos[i]" v-bind:showCard="c"
      v-bind:flip="stringCards1.flip[i]" v-bind:cardNum="i" v-bind:cardType="'stringCards1'"
      v-bind:held="stringCards1.held[i]" v-bind:fadeOut="false" v-bind:cardBack="cardBack"></card>
    <card class="primaryRow1" v-for="(c, i) in primaryCards1.deal" v-bind:cardPosition="cPos[i]" v-bind:showCard="c"
      v-bind:flip="primaryCards1.flip[i]" v-bind:cardNum="i" v-bind:cardType="'primaryCards1'"
      v-bind:held="primaryCards1.held[i]" v-bind:fadeOut="false" v-bind:cardBack="cardBack"></card>


    <card v-for="(c, i) in stringCards0.deal" v-bind:cardPosition="sPos[i]" v-bind:showCard="c"
      v-bind:flip="stringCards0.flip[i]" v-bind:cardNum="i" v-bind:cardType="'stringCards'"
      v-bind:held="stringCards0.held[i]" v-bind:fadeOut="results.bonus[0].nonBonusCards" v-bind:cardBack="cardBack"></card>


    <!-- Combined: string result bonus + string wins for hand 2 -->
    <string-group-label v-show="stage.results[2]" cssClass="stringGroup2" :bonus="results.bonus[2]" :winText="stringWinText[2]"></string-group-label>

    <!-- primaryCards2 result label -->
    <div class="singleResult primaryHandResult2" v-if="stage.results[2]">
      <div class="primaryResultLabel">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60">
          <rect :fill="results.main[2].fill" style="stroke:#bababa; stroke-miterlimit:10;" x="30" y="25" rx="2" width="105" height="10" />
          <text v-if="results.main[2].rank > 0" class="payTableText" text-anchor="middle" font-weight="bold" font-size="7" x="70" y="32.5" fill="#ffffff">{{ results.main[2].label }}</text>
          <text v-if="results.main[2].rank === 0" class="payTableText" text-anchor="middle" font-weight="bold" font-size="8" x="82" y="32.5" fill="#ffffff">{{ results.main[2].label }}</text>
          <text v-if="results.main[2].rank > 0" class="labelCash payTableText" text-anchor="end" font-weight="bold" font-size="7" x="120" y="32.5" fill="#02F53A">{{ dollarFormat(results.main[2].reward) }}</text>
        </svg>
      </div>
    </div>

    <!-- Combined: string result bonus + string wins for hand 1 -->
    <string-group-label v-show="stage.results[1]" cssClass="stringGroup1" :bonus="results.bonus[1]" :winText="stringWinText[1]"></string-group-label>

    <!-- primaryCards1 result label -->
    <div class="singleResult primaryHandResult1" v-if="stage.results[1]">
      <div class="primaryResultLabel">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60">
          <rect :fill="results.main[1].fill" style="stroke:#bababa; stroke-miterlimit:10;" x="30" y="25" rx="2" width="105" height="10" />
          <text v-if="results.main[1].rank > 0" class="payTableText" text-anchor="middle" font-weight="bold" font-size="7" x="70" y="32.5" fill="#ffffff">{{ results.main[1].label }}</text>
          <text v-if="results.main[1].rank === 0" class="payTableText" text-anchor="middle" font-weight="bold" font-size="8" x="82" y="32.5" fill="#ffffff">{{ results.main[1].label }}</text>
          <text v-if="results.main[1].rank > 0" class="labelCash payTableText" text-anchor="end" font-weight="bold" font-size="7" x="120" y="32.5" fill="#02F53A">{{ dollarFormat(results.main[1].reward) }}</text>
        </svg>
      </div>
    </div>

    <!-- Combined: string result bonus + string wins for hand 0 -->



    <card v-for="(c, i) in primaryCards0.deal" v-bind:cardPosition="cPos[i]" v-bind:showCard="c"
      v-bind:flip="primaryCards0.flip[i]" v-bind:cardNum="i" v-bind:cardType="'primaryCards'"
      v-bind:held="primaryCards0.held[i]" v-bind:fadeOut="primaryCards0.fade[i]" v-bind:cardBack="cardBack"></card>

    <string-group-label v-show="stage.results[0]" cssClass="stringGroup0" :bonus="results.bonus[0]" :winText="stringWinText[0]"></string-group-label>

    <div id="singleResult" class="singleResult primaryHandResult" v-if="stage.results[0]">

      <div class="primaryResultLabel">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60">
          <rect :fill="results.main[0].fill" style="stroke:#bababa; stroke-miterlimit:10;" x="30" y="25" rx="2" width="105"
            height="10" />
          <text v-if="results.main[0].rank > 0" class="payTableText" text-anchor="middle" font-weight="bold" font-size="7"
            x="70" y="32.5" fill="#ffffff">
            {{ results.main[0].label }}</text>
          <text v-if="results.main[0].rank === 0" class="payTableText" text-anchor="middle" font-weight="bold"
            font-size="8" x="82" y="32.5" fill="#ffffff">
            {{ results.main[0].label }}</text>
          <text v-if="results.main[0].rank > 0" class="labelCash payTableText" text-anchor="end" font-weight="bold"
            font-size="7" x="120" y="32.5" fill="#02F53A">
            {{ dollarFormat(results.main[0].reward) }}</text>
        </svg>
      </div>
    </div>

    <div id="holdButtons" class="cardArea" :class="activeHandClass">
      <div class="mainCards">
        <div v-for="(hold, i) in holds" class="cSize" :class="hold.class" @click="updateHold(i)">
          <div style="padding-top:42%; margin:0 auto; text-align:center; cursor:pointer;" v-if="hold.active">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30">
              <rect style="fill:#FFE401; stroke:#BB2601; stroke-width:3;" x="20" y="5" rx="5" width="60" height="20" />
              <text text-anchor="middle" font-weight="900" font-size="15" x="50" y="20.5" fill="#000000" opacity="1">
                {{ holdHeldLabel }}</text>
            </svg>
          </div>

        </div>
      </div>
    </div>

    <div id="deal" class="btnHeight" :style="{ display: (stage.newRound || stage.keepPlaying) ? 'block' : 'none' }">
      <div class="btnBase" v-on:click="deal">
        <btn-right-deal></btn-right-deal>
      </div>
    </div>

    <div id="draw" class="btnHeight"
      :style="{ display: stage.primaryCardsDealt && !stage.drawS2Cards ? 'block' : 'none' }">
      <div class="btnBase" v-on:click="draw">
        <btn-right-draw></btn-right-draw>
      </div>

    </div>

    <div class="changeBG" @click="changeBG()"></div>

    <again v-if="stage.newGame && stage.results[2]" v-on:deal="deal"></again>
    <keep-playing v-if="stage.keepPlaying" v-on:deal="deal"></keep-playing>



    <!-- FOR TESTING (start) -->



    <!-- <button v-if="stage.results" @click="reset()" style="position:absolute; bottom:0%; width: 10rem; font-size:1rem; cursor: pointer;">
            reset</button> -->

    <!--  <button @click="option.alwaysString = !option.alwaysString" style="position:absolute; bottom:0%; width: 10rem; font-size:1rem; cursor: pointer;">
            <span v-if="option.alwaysString">String mode</span>
            <span v-if="!option.alwaysString">Regular mode</span>
          
          </button>-->

    <select v-model="selectedPrimary" style="position:absolute; bottom:0.5%; left: 0.5rem; width: 10rem;">
      <option v-for="o in testScenarios" :value="o.cards">{{ o.desc }}</option>
    </select>

    <select v-model="selectedString" style="position:absolute; bottom:0.5%; left: 11rem; width: 10rem;">
      <option v-for="o in stringSecenarios" :value="o.cards">{{ o.desc }}</option>
    </select>
    <p v-for="(b, i) in results.bonus" :key="i" v-if="b && b.reason"
      :id="'reasonText' + (i + 1)"
      :style="{ position: 'absolute', bottom: (1 + i * 2) + '%', left: '0%', fontSize: '1rem', background: 'lightyellow', padding: '0.2em' }">
      <b>Bonus pick reason{{ i > 0 ? ' (hand ' + i + ')' : '' }}:</b> {{ b.reason }}</p>
    <!-- 
          
 <button @click="option.plusMode = !option.plusMode" style="position:absolute; bottom:0%; left: 32rem; width: 10rem; font-size:1rem; cursor: pointer; ">
            <span v-if="option.plusMode">☑</span>
            <span v-if="!option.plusMode">☐</span>
            Plus One
            <span v-if="!option.plusMode"> is OFF</span>
            <span v-if="option.plusMode"> is ON</span>
          </button>  -->
    <!--   
          <div v-if="holdReason !== ''" style="position:absolute; bottom:0.5%; left: 20.5rem; font-size:1rem; cursor: pointer; color: lightyellow; background:  rgba(0, 0, 0, 0.5); padding: 0.5rem; padding-bottom: 0rem; ">
            <b>Hold reason: </b>
            {{holdReason}} 
          </div>

          <div style="color: white; position:absolute; bottom:5%; left:10%; width: 50%; font-size:1.5rem; cursor: pointer;" v-if="option.bestSlide !== ''">
<b>Best slide</b> <br> <span v-if="option.bestSlide === 'left'"><<<</span>  <span v-if="option.bestSlide === 'right'">>>></span>({{option.bestSlide}})</div> -->




    <!-- FOR TESTING (end) -->




    <div style="display:none;">
      <audio id="soundFlip">
        <source src="/static/sounds/cardFlip.mp3" type="audio/mpeg">
      </audio>
      <audio id="soundLabel">
        <source src="/static/sounds/msmh_wand.mp3" type="audio/mpeg"> Your browser does not support the audio element.
      </audio>
      <audio id="dSoundDeal">
        <source src="/static/sounds/cardFlip2.mp3" type="audio/mpeg">
      </audio>
      <audio id="soundClearCards">
        <source src="/static/sounds/mp_deal.mp3" type="audio/mpeg">
      </audio>
      <audio id="playerWins">
        <source src="/static/sounds/m_multiCashOut.mp3" type="audio/mpeg">
      </audio>
      <audio id="soundBtnPress">
        <source src="/static/sounds/button.ogg" type="audio/ogg">
      </audio>
      <audio id="chipClick">
        <source src="/static/sounds/chipClick.mp3" type="audio/mpeg">
      </audio>
      <audio id="endRound">
        <source src="/static/sounds/playerWins.mp3" type="audio/mpeg">
      </audio>

      <img src="./assets/cards/AC.svg">
      <img src="./assets/cards/JC.svg">
      <img src="./assets/cards/JD.svg">
      <img src="./assets/cards/JH.svg">
      <img src="./assets/cards/JS.svg">
      <img src="./assets/cards/KC.svg">
      <img src="./assets/cards/KD.svg">
      <img src="./assets/cards/KH.svg">
      <img src="./assets/cards/KS.svg">
      <img src="./assets/cards/QC.svg">
      <img src="./assets/cards/QD.svg">
      <img src="./assets/cards/QH.svg">
      <img src="./assets/cards/QS.svg">
      <!-- <img src="./assets/cards/cardBack2.svg"> -->

    </div>

  </div>
</template>

<script>
import bus from "./bus";
import logo from "./components/logo";
import waterMark1 from "./components/waterMark1";
import waterMark2 from "./components/waterMark2";
import waterMark3 from "./components/waterMark3";
import menuBtns from "./components/menuBtns";
import cashDisplay from "./components/cashDisplay";
import btnRightDeal from "./components/btnRightDeal";
import btnRightDraw from "./components/btnRightDraw";
import btnLeftBet from "./components/btnLeftBet";
/* import mainCards from "./components/cards"; */
import card from "./components/card";
import bonusCards from "./components/bonusCards";
import payTable from "./components/payTable";
import slideBtns from "./components/slideBtns";
import dealerPerson from "./gameLogic/dealer";
import handResult from "./gameLogic/handResultDDB";
/* import handResult from "./gameLogic/handResultJoB"; */
import discardResult from "./gameLogic/discardResultDDB";
/* import discardResult from "./gameLogic/discardResultJOB"; */

import info from "./components/info";
import again from "./components/playAgain";
import keepPlaying from "./components/keepPlaying";
import stringWins from "./components/stringWins";
import tapLabels from "./components/tapLabels";
import stringGroupLabel from "./components/stringGroupLabel";

import autoHolder from "./gameLogic/autoHolder";
import autoPicker from "./gameLogic/autoPicker";
import tests from "./gameLogic/testCases";

var autoPick = new autoPicker();

var finalResults = new handResult();
var dResults = new discardResult();
//var getHolds = new autoHolder();

var stringDecks = [new dealerPerson(), new dealerPerson(), new dealerPerson()],
  primaryDecks = [new dealerPerson(), new dealerPerson(), new dealerPerson()],
  stringPos = ["c1Pos", "c2Pos", "c3Pos"],
  cardPos = ["c1Pos", "c2Pos", "c3Pos", "c4Pos", "c5Pos"],
  cardHolds = cardPos.map((a, i) => {
    return {
      class: a,
      active: false,
      display: true
    };
  });

var stringTests = [
  { cards: [], desc: "random string cards" },

  { cards: ["H14", "H9", "H4"], desc: "beachbumbabs 1" },
  { cards: ["D4", "D5", "D11"], desc: "beachbumbabs 2" },
  { cards: ["D4", "D5", "D12"], desc: "beachbumbabs 3" },
  { cards: ["C3", "C6", "C11"], desc: "beachbumbabs 4" },
  { cards: ["H14", "H4", "H8"], desc: "LoquaciousMoFW 1" },
  { cards: ["S5", "S11", "S3"], desc: "LoquaciousMoFW 2" },
  { cards: ["C4", "S3", "C4"], desc: "LoquaciousMoFW 3" },
  { cards: ["S14", "H14", "S11"], desc: "3OK test 1" },
  { cards: ["C13", "C14", "S11"], desc: "Almost royal cards" },
  /*   { cards: ["D13", "C8", "D13"], desc: "pair bug test" },
  { cards: ["C8", "C8", "C8"], desc: "3OK bug test" }, */
  { cards: ["D11", "S11", "H8"], desc: "Pair upgrade test" },
  { cards: ["C11", "C10", "C12"], desc: "Flush upgrade test" },
  { cards: ["D3", "D2", "D14"], desc: "Flush upgrade test 2" },
  { cards: ["D12", "C6", "C10"], desc: "upgrade to pair test 1" },
  { cards: ["D12", "C10", "C6"], desc: "upgrade to pair test 2" },
  { cards: ["C13", "C14", "C12"], desc: "mini royal cards" },
  { cards: ["H13", "H12", "H14"], desc: "mini royal cards 2" },
  { cards: ["H13", "D13", "C4"], desc: "pair 1" },
  { cards: ["D13", "C8", "H13"], desc: "pair 2" },
  { cards: ["H13", "C8", "D13"], desc: "pair 3" }
];

//console.log(dealer.getMultiply());

export default {
  name: "app",
  components: {
    menuBtns,
    logo,
    waterMark1,
    waterMark2,
    waterMark3,
    cashDisplay,
    btnRightDeal,
    btnLeftBet,
    //  mainCards,
    card,
    btnRightDraw,
    bonusCards,
    payTable,
    info,
    again,
    tapLabels,
    slideBtns,
    keepPlaying,
    stringWins,
    stringGroupLabel
  },
  data() {
    return {
      cardBack: "",
      showWater: true,
      showWater2: true,
      bgImg: "background-image: url('./static/BBGG1.jpg')",
      bgImgs: ["1", "2", "3"],
      currentImg: 2,
      testScenarios: tests,
      stringSecenarios: stringTests,
      selectedString: stringTests[0].cards,
      selectedPrimary: tests[0].cards,
      option: {
        autohold: false,
        autoplay: false,
        bestSlide: "",
        alwaysString: false,
        plusMode: false
      },
      infoBoxOpen: false,
      payTableOpen: false,
      stage: {
        newRound: true,
        primaryCardsDealt: false,
        drawS2Cards: false,
        dealPrimaryCards: false,
        draw: false,
        showSlideBtns: false,
        animationDone: true,
        results: [false, false, false],
        newBonus: false,
        keppPlaying: false,
        newGame: false,
        showWin: false,
        lockBet: false,
        roundEnds: false,
        activeHand: 0,
        mirrorHolds: false
      },
      /*  MDIndex: -1, */
      cash: {
        balance: 10000,
        totalBet: 0,
        betWin: 100,
        win: 0,
        coinValue: 5,
        coinOptions: [1, 5, 10, 15, 25],
        activeCoinOption: 1,
        bonusCost: 4,
        base_coin_cost: 1
      },
      holdReason: "",
      allStringCards: [
        { specs: stringDecks[0].stringCards, flip: Array(3).fill(false), deal: Array(3).fill(false), held: Array(3).fill(true) },
        { specs: stringDecks[1].stringCards, flip: Array(3).fill(false), deal: Array(3).fill(false), held: Array(3).fill(true) },
        { specs: stringDecks[2].stringCards, flip: Array(3).fill(false), deal: Array(3).fill(false), held: Array(3).fill(true) }
      ],
      allPrimaryCards: [
        { specs: primaryDecks[0].primaryCards, deal: Array(5).fill(false), flip: Array(5).fill(false), held: Array(5).fill(false), fade: Array(5).fill(false) },
        { specs: primaryDecks[1].primaryCards, deal: Array(5).fill(false), flip: Array(5).fill(false), held: Array(5).fill(false), fade: Array(5).fill(false) },
        { specs: primaryDecks[2].primaryCards, deal: Array(5).fill(false), flip: Array(5).fill(false), held: Array(5).fill(false), fade: Array(5).fill(false) }
      ],
      discardedStringCard: "",
      cPos: cardPos,
      sPos: stringPos,
      labelPos: ["label1", "label2", "label3", "label4", "label5"],
      holds: cardHolds,
      results: {
        main: [{}, {}, {}],
        bonus: [
          { counter: 0, reason: "", bonus: null, fill: "", label: "", plusOne: "" },
          { counter: 0, reason: "", bonus: null, fill: "", label: "", plusOne: "" },
          { counter: 0, reason: "", bonus: null, fill: "", label: "", plusOne: "" }
        ]
      },
      newBonus: false,
      bonusTable: 0,
      plusOne: false,
      holdHeldLabel: "HOLD",
      stringWinText: ['', '', ''],
      originalHolds: Array(5).fill(false)
    };
  },
  computed: {
    stringCards0() {
      return this.allStringCards[0];
    },
    stringCards1() {
      return this.allStringCards[1];
    },
    stringCards2() {
      return this.allStringCards[2];
    },
    primaryCards0() {
      return this.allPrimaryCards[0];
    },
    primaryCards1() {
      return this.allPrimaryCards[1];
    },
    primaryCards2() {
      return this.allPrimaryCards[2];
    },
    activeHandClass() {
      return ['', 'primaryRow1', 'primaryRow2'][this.stage.activeHand];
    }
  },
  methods: {
    updateBonus() {
      this.playChipClick();
      if (this.bonusTable < 2) {
        this.bonusTable++;
      } else {
        this.bonusTable = 0;
      }
    },
    changeBet() {
      if (this.cash.activeCoinOption >= this.cash.coinOptions.length - 1) {
        this.cash.activeCoinOption = 0;
      } else {
        this.cash.activeCoinOption++;
      }
      this.playChipClick();
      this.cash.coinValue = this.cash.coinOptions[this.cash.activeCoinOption];
    },
    removeRevCards(handNum) {
      var firstCard = this.slideOptions[this.originalSlide][handNum],
        lastCard = firstCard + 4;
      for (var s = 0; s < this.showMainCard.length; s++) {
        if (s < firstCard || s > lastCard) {
          this.showMainCard.splice(s, 1, false);
        }
      }
      this.playDealSound();
      return {
        lCard: lastCard,
        fCard: firstCard
      };
    },

    openInfoBox() {
      this.infoBoxOpen = true;
      document.getElementById("infoFrame").style.zIndex = "1";
    },
    togglePayTable() {
      this.payTableOpen = !this.payTableOpen;
    },
    dollarFormat(x) {
      if (x === "") {
        return x;
      }
      return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    deal() {
      if (
        this.stage.keepPlaying ||
        (this.option.alwaysString && !this.stage.newRound)
      ) {
        const handNum = this.stage.activeHand;
        this.stage.keepPlaying = false;
        this.stage.newRound = false;

        setTimeout(() => {
          this.showNewBonus(
            autoPick.bestStringHand(
              this.allPrimaryCards[handNum].specs,
              this.allStringCards[handNum].specs,
              this.results.bonus[handNum].bonus + (this.option.plusMode ? this.results.bonus[handNum].counter : 0)
            ),
            handNum
          );
          var pause1 = 4500,
            pause2 = 700;
          setTimeout(() => {
            this.partialResetHand(handNum);
            setTimeout(() => {
              primaryDecks[handNum].newDeck();
              this.dealPrimaryCards(handNum, true);
            }, pause2);
          }, pause1);
        }, 200);
      } else if (this.stage.newRound) {
        this.stage.newGame = false;
        this.reset();

        setTimeout(() => {
          this.prepDeckAndShowStringCards();
          primaryDecks[0].newDeck();
          primaryDecks[1].newDeck();
          primaryDecks[2].newDeck();
        }, 900);
      } else {
        this.prepDeckAndShowStringCards();
        primaryDecks[0].newDeck();
        primaryDecks[1].newDeck();
        primaryDecks[2].newDeck();
      }
      this.playBtnSound();
    },
    prepDeckAndShowStringCards() {
      stringDecks[0].newDeck();
      stringDecks[1].newDeck();
      stringDecks[2].newDeck();

      this.stage.newRound = false;
      this.results.bonus[0].reason = "";
      this.results.bonus[1].reason = "";
      this.results.bonus[2].reason = "";

      this.cash.totalBet =
        this.cash.coinValue * (this.cash.base_coin_cost + this.cash.bonusCost);

      this.cash.balance = this.cash.balance - this.cash.totalBet;

      for (let i = 0; i < 3; i++) {
        this.stringCards0.deal.splice(i, 1, false);
        this.stringCards0.flip.splice(i, 1, false);
        this.stringCards1.deal.splice(i, 1, false);
        this.stringCards1.flip.splice(i, 1, false);
        this.stringCards2.deal.splice(i, 1, false);
        this.stringCards2.flip.splice(i, 1, false);
      }

      for (let i = 0; i < this.stringCards0.specs.length; i++) {
        setTimeout(() => {
          this.stringCards0.deal.splice(i, 1, true);
          this.stringCards1.deal.splice(i, 1, true);
          this.stringCards2.deal.splice(i, 1, true);
          this.playDealSound();

          if (i === this.stringCards0.specs.length - 1) {
            this.flipStringCards(300, [0, 1, 2]);
          }
        }, i * 200);
      }
    },
    recordReward(d) {
      return (
        this.cash.coinValue *
        this.cash.base_coin_cost *
        d.payout /
        this.cash.adjustFactor
      );
    },

    draw() {
      const handNum = this.stage.activeHand;
      this.originalHolds = this.allPrimaryCards[handNum].held.slice();
      this.stage.drawS2Cards = true;
      this.stage.mirrorHolds = false;

      this.stage.newBonus = false;
      this.holdHeldLabel = "HELD";

      //swap unheld cards
      var cardsRemoved = 0,
        totalRemove = 0,
        removedCardsIndex = [];

      this.allPrimaryCards[handNum].held.forEach((held, i, a) => {
        if (i === 0) {
          a.forEach(b => {
            if (!b) {
              totalRemove++;
            }
          });
          if (totalRemove === 0) {
            this.analyzeResults(handNum);
          }
        }
        if (!held) {
          cardsRemoved++;
          setTimeout(() => {
            this.allPrimaryCards[handNum].deal.splice(i, 1, false);
            primaryDecks[handNum].swapCard(i);
            this.playDealSound();
            bus.$emit("cardsUpdated", {
              newCard: this.allPrimaryCards[handNum].specs[i],
              cardNum: i,
              cardType: handNum === 0 ? "primaryCards" : "primaryCards" + handNum
            });

            setTimeout(() => {
              this.allPrimaryCards[handNum].flip.splice(i, 1, false);
            }, 100);
          }, 200 * cardsRemoved);
          removedCardsIndex.push(i);
        }
      });

      setTimeout(() => {
        removedCardsIndex.forEach((cardIndexNum, i, a) => {
          setTimeout(() => {
            this.allPrimaryCards[handNum].deal.splice(cardIndexNum, 1, true);
            this.playDealSound();

            if (i === a.length - 1) {
              this.flipPrimaryCards(300, a, true, false, handNum);
            }
          }, i * 200);
        });
      }, 200 * totalRemove + 500);
    },
    dealPrimaryCards(targetHand, ongoingGame) {
      var handNums = targetHand === 'all' ? [0, 1, 2] : [targetHand];
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          handNums.forEach(h => {
            this.allPrimaryCards[h].deal.splice(i, 1, true);
          });
          this.playDealSound();

          if (i === this.allPrimaryCards[0].specs.length - 1) {
            this.flipPrimaryCards(300, [0, 1, 2, 3, 4], false, ongoingGame, targetHand);
          }
        }, i * 200);
      }
    },

    analyzeResults(handNum) {
      this.results.main[handNum] = finalResults.fiveCards(this.allPrimaryCards[handNum].specs);
      this.results.main[handNum].reward =
        this.cash.coinValue *
        this.cash.base_coin_cost *
        this.results.main[handNum].payout;

      this.stage.results.splice(handNum, 1, true);
      if (this.results.main[handNum].reward > 0 || this.option.alwaysString) {
        this.stage.keepPlaying = true;
        this.stage.lockBet = true;
        this.stage.showWin = true;
      } else {
        this.advanceHand(handNum);
      }

      var currentWin =
        this.results.main[handNum].reward *
        (this.results.bonus[handNum].bonus + this.results.bonus[handNum].counter);

      this.cash.win = this.cash.win + currentWin;

      var winStr = this.dollarFormat(currentWin);
      var prevText = this.stringWinText[handNum];
      this.stringWinText.splice(handNum, 1, prevText === '' ? winStr : prevText + ' + ' + winStr);

      bus.$emit("updateCashDisplay", this.cash);
    },
    advanceHand(handNum) {
      if (handNum < 2) {
        setTimeout(() => {
          this.transitionToHand(handNum + 1);
        }, 800);
      } else {
        this.stage.newGame = true;
        this.stage.newRound = true;
        this.stage.lockBet = false;
        this.stage.roundEnds = true;
        this.cash.balance = this.cash.balance + this.cash.win;
        bus.$emit("updateCashDisplay", this.cash);
      }
    },
    transitionToHand(handNum) {
      this.stage.activeHand = handNum;
      this.stage.drawS2Cards = false;
      this.stage.primaryCardsDealt = false;
      this.holdHeldLabel = "HOLD";

      // Copy holds from hand 0's original draw-time snapshot
      var removedCardsIndex = [];
      for (let i = 0; i < 5; i++) {
        const wasHeld = this.originalHolds[i];
        this.allPrimaryCards[handNum].held.splice(i, 1, wasHeld);
        this.holds[i].active = wasHeld;
        if (!wasHeld) { removedCardsIndex.push(i); }
      }

      if (removedCardsIndex.length === 0) {
        this.stage.primaryCardsDealt = true;
        this.analyzeResults(handNum);
        return;
      }

      // Swap non-held positions with new independent cards from this hand's deck
      var cardsRemoved = 0;
      removedCardsIndex.forEach((cardIndex) => {
        cardsRemoved++;
        setTimeout(() => {
          this.allPrimaryCards[handNum].deal.splice(cardIndex, 1, false);
          primaryDecks[handNum].swapCard(cardIndex);
          this.playDealSound();
          bus.$emit("cardsUpdated", {
            newCard: this.allPrimaryCards[handNum].specs[cardIndex],
            cardNum: cardIndex,
            cardType: "primaryCards" + handNum
          });
          setTimeout(() => {
            this.allPrimaryCards[handNum].flip.splice(cardIndex, 1, false);
          }, 100);
        }, 200 * cardsRemoved);
      });

      setTimeout(() => {
        removedCardsIndex.forEach((cardIndex, i, a) => {
          setTimeout(() => {
            this.allPrimaryCards[handNum].deal.splice(cardIndex, 1, true);
            this.playDealSound();
            if (i === a.length - 1) {
              this.flipPrimaryCards(300, a, true, false, handNum);
            }
          }, i * 200);
        });
      }, 200 * cardsRemoved + 500);
    },
    showNewBonus(newBonus, handNum) {
      if (typeof newBonus.bonus === "number") {
        this.newBonus = true;
        var plusOne = "";
        if (this.results.bonus[handNum].bonus === newBonus.bonus && newBonus.bonus > 1 && this.option.plusMode) {

          this.results.bonus[handNum].counter++;
          plusOne = "*";
        }

        var bonusCounter = this.results.bonus[handNum].counter;
        this.results.bonus[handNum] = { plusOne: "" };

        setTimeout(() => {
          this.allStringCards[handNum].deal.splice(newBonus.removeStringCardNum, 1, false);
          this.allPrimaryCards[handNum].fade.splice(newBonus.pCardNumSwap, 1, true);
          setTimeout(() => {
            this.discardedStringCard = stringDecks[handNum].upgradeStringCard(
              newBonus.removeStringCardNum,
              newBonus.pCardSwap
            );
            bus.$emit("cardsUpdated", {
              newCard: newBonus.pCardSwap,
              cardNum: newBonus.removeStringCardNum,
              cardType: handNum === 0 ? "stringCards" : "stringCards" + handNum
            });

            this.allStringCards[handNum].deal.splice(newBonus.removeStringCardNum, 1, true);
            setTimeout(() => {
              this.results.bonus[handNum] = newBonus;
              if (plusOne !== "" && this.option.plusMode) {
                this.results.bonus[handNum].plusOne = plusOne;
                this.results.bonus[handNum].counter = bonusCounter;
              } else {
                this.results.bonus[handNum].counter = 0;
              }

              this.stage.newBonus = true;
            }, 500);
          }, 500);
        }, 1000);
      } else {
        this.results.bonus[handNum].reason =
          "no equal or better bonus found - keeping the string cards!";
        this.newBonus = false;
        this.stage.newBonus = true;
      }
    },
    updateHold(i) {
      const handNum = this.stage.activeHand;
      if (this.stage.primaryCardsDealt && !this.stage.results[handNum]) {
        const newHeld = !this.allPrimaryCards[handNum].held[i];
        this.allPrimaryCards[handNum].held.splice(i, 1, newHeld);
        this.holds[i].active = newHeld;
        // Mirror hold flip to hands 1 and 2 during the initial deal of hand 0
        if (this.stage.mirrorHolds) {
          this.allPrimaryCards[1].flip.splice(i, 1, newHeld);
          this.allPrimaryCards[2].flip.splice(i, 1, newHeld);
        }
        this.playBtnSound();
      }
    },
    reset(partial) {
      if (partial) {
        this.partialReset();
        //  console.log("partial reset!");
      } else {
        this.partialReset();
        this.fullReset();
      }
    },
    partialResetHand(handNum) {
      this.stage.results.splice(handNum, 1, false);
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.allPrimaryCards[handNum].specs.splice(i, 1, "");
          this.allPrimaryCards[handNum].deal.splice(i, 1, false);
          this.allPrimaryCards[handNum].held.splice(i, 1, false);
          this.allPrimaryCards[handNum].flip.splice(i, 1, false);
          this.allPrimaryCards[handNum].fade.splice(i, 1, false);
        }
        this.holds.forEach(h => { h.active = false; });
        this.stage.primaryCardsDealt = false;
        this.holdHeldLabel = "HOLD";
      });
    },
    partialReset() {
      this.stage.results.splice(0, 3, false, false, false);
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.primaryCards0.specs.splice(i, 1, "");
          this.primaryCards0.deal.splice(i, 1, false);
          this.primaryCards0.held.splice(i, 1, false);
          this.primaryCards0.flip.splice(i, 1, false);
          this.primaryCards0.fade.splice(i, 1, false);
          this.holds[i].active = false;

          this.primaryCards1.specs.splice(i, 1, "");
          this.primaryCards1.deal.splice(i, 1, false);
          this.primaryCards1.held.splice(i, 1, false);
          this.primaryCards1.flip.splice(i, 1, false);
          this.primaryCards1.fade.splice(i, 1, false);

          this.primaryCards2.specs.splice(i, 1, "");
          this.primaryCards2.deal.splice(i, 1, false);
          this.primaryCards2.held.splice(i, 1, false);
          this.primaryCards2.flip.splice(i, 1, false);
          this.primaryCards2.fade.splice(i, 1, false);

          this.stage.primaryCardsDealt = false;
          this.holdHeldLabel = "HOLD";
        }
      });
    },
    fullReset() {
      this.plusOne = false;
      this.stage.activeHand = 0;
      this.stage.mirrorHolds = false;
      this.soundClearCards.play();
      this.showWater = true;
      this.showWater2 = true;
      this.option.bestSlide = "";
      primaryDecks[0].newDeck();
      this.results.main = [{}, {}, {}];
      this.results.bonus = [{ reason: "" }, { reason: "" }, { reason: "" }];
      this.stage.drawS2Cards = false;
      this.stage.dealPrimaryCards = false;
      this.stage.draw = false;
      this.stage.singleResult = false;
      this.stage.multiResults = false;
      this.stage.showWin = false;
      this.stage.lockBet = false;
      this.stage.roundEnds = false;
      this.cash.win = 0;
      this.stage.newBonus = false;
      this.stringWinText = ['', '', ''];
      this.originalHolds = Array(5).fill(false);

      this.newBonus = false;
      this.holdReason = "";
      this.discardedStringCard = "";
      bus.$emit("resetHold", {
        cardType: "primaryCards",
        hold: false
      });
      bus.$emit("resetHold", {
        cardType: "stringCards",
        hold: true
      });

      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          this.stringCards0.specs.splice(i, 1, "");
          this.stringCards0.deal.splice(i, 1, false);
          this.stringCards0.held.splice(i, 1, true);
          this.stringCards0.flip.splice(i, 1, false);

          this.stringCards1.specs.splice(i, 1, "");
          this.stringCards1.deal.splice(i, 1, false);
          this.stringCards1.held.splice(i, 1, true);
          this.stringCards1.flip.splice(i, 1, false);

          this.stringCards2.specs.splice(i, 1, "");
          this.stringCards2.deal.splice(i, 1, false);
          this.stringCards2.held.splice(i, 1, true);
          this.stringCards2.flip.splice(i, 1, false);
        }
      });
    },
    flipStringCards(initialDelay, cards) {
      _.forEach(cards, (c, i, a) => {
        if (i <= a.length - 1) {
          if (this.stringCards0.specs[c] === "") {
            stringDecks[0].getCard(c, this.selectedString, "stringCards");
            bus.$emit("cardsUpdated", {
              newCard: this.stringCards0.specs[c],
              cardNum: c,
              cardType: "stringCards"
            });
          }
          // Mirror same card into decks 1 and 2
          var sCardValue = this.stringCards0.specs[c];
          this.stringCards1.specs.splice(c, 1, sCardValue);
          var sDeckIdx1 = stringDecks[1].deck.indexOf(sCardValue);
          if (sDeckIdx1 > -1) { stringDecks[1].deck.splice(sDeckIdx1, 1); }
          bus.$emit("cardsUpdated", {
            newCard: sCardValue,
            cardNum: c,
            cardType: "stringCards1"
          });
          this.stringCards2.specs.splice(c, 1, sCardValue);
          var sDeckIdx2 = stringDecks[2].deck.indexOf(sCardValue);
          if (sDeckIdx2 > -1) { stringDecks[2].deck.splice(sDeckIdx2, 1); }
          bus.$emit("cardsUpdated", {
            newCard: sCardValue,
            cardNum: c,
            cardType: "stringCards2"
          });
          setTimeout(() => {
            this.stringCards0.flip.splice(c, 1, true);
            this.stringCards1.flip.splice(c, 1, true);
            this.stringCards2.flip.splice(c, 1, true);

            this.playFlipSound();
            if (i === a.length - 1) {
              var stringResults0 = dResults.threeCards(this.stringCards0.specs, this.bonusTable, false);
              var stringResults1 = dResults.threeCards(this.stringCards1.specs, this.bonusTable, false);
              var stringResults2 = dResults.threeCards(this.stringCards2.specs, this.bonusTable, false);
              setTimeout(() => {
                this.showWater = false;
                this.results.bonus[0].bonus = stringResults0.bonus;
                this.results.bonus[0].counter = 0;
                this.results.bonus[0].label = stringResults0.label;
                this.results.bonus[0].fill = stringResults0.fill;

                this.results.bonus[1].bonus = stringResults1.bonus;
                this.results.bonus[1].counter = 0;
                this.results.bonus[1].label = stringResults1.label;
                this.results.bonus[1].fill = stringResults1.fill;

                this.results.bonus[2].bonus = stringResults2.bonus;
                this.results.bonus[2].counter = 0;
                this.results.bonus[2].label = stringResults2.label;
                this.results.bonus[2].fill = stringResults2.fill;

                setTimeout(() => {
                  this.dealPrimaryCards('all');
                }, 500);
              }, 300);
            }
          }, initialDelay);
          initialDelay = initialDelay + 100;
        }
      });
    },
    flipPrimaryCards(initialDelay, cards, swapComplete, ongoingGame, targetHand) {
      var isInitialDeal = (targetHand === 'all' || targetHand === undefined);
      var handNums = isInitialDeal ? [0, 1, 2] : [targetHand];
      _.forEach(cards, (c, i, a) => {
        if (i <= a.length - 1) {
          if (isInitialDeal) {
            // Get card from deck 0 only; mirror same value to decks 1 and 2
            if (this.allPrimaryCards[0].specs[c] === "") {
              primaryDecks[0].getCard(c, this.selectedPrimary, "primaryCards");
            }
            var cardValue = this.allPrimaryCards[0].specs[c];
            [1, 2].forEach(h => {
              this.allPrimaryCards[h].specs.splice(c, 1, cardValue);
              // Remove mirrored card from deck so independent draws work later
              var deckIdx = primaryDecks[h].deck.indexOf(cardValue);
              if (deckIdx > -1) { primaryDecks[h].deck.splice(deckIdx, 1); }
            });
            bus.$emit("cardsUpdated", { newCard: cardValue, cardNum: c, cardType: "primaryCards" });
            bus.$emit("cardsUpdated", { newCard: cardValue, cardNum: c, cardType: "primaryCards1" });
            bus.$emit("cardsUpdated", { newCard: cardValue, cardNum: c, cardType: "primaryCards2" });
          } else {
            var h = handNums[0];
            if (this.allPrimaryCards[h].specs[c] === "") {
              primaryDecks[h].getCard(c, h === 0 ? this.selectedPrimary : [], "primaryCards");
            }
            bus.$emit("cardsUpdated", {
              newCard: this.allPrimaryCards[h].specs[c],
              cardNum: c,
              cardType: h === 0 ? "primaryCards" : "primaryCards" + h
            });
          }
          setTimeout(() => {
            if (isInitialDeal) {
              // Only flip hand 0 face-up; hands 1 and 2 stay face-down
              this.allPrimaryCards[0].flip.splice(c, 1, true);
            } else {
              handNums.forEach(h => {
                this.allPrimaryCards[h].flip.splice(c, 1, true);
              });
            }
            this.playFlipSound();
            if (i === a.length - 1) {
              setTimeout(() => {
                this.stage.primaryCardsDealt = true;
                this.showWater2 = false;
                if (isInitialDeal) {
                  this.stage.mirrorHolds = true;
                }
                if (ongoingGame) {
                  this.stage.drawS2Cards = false;
                }
                if (swapComplete) {
                  this.analyzeResults(this.stage.activeHand);
                }
              }, 300);
            }
          }, initialDelay);
          initialDelay = initialDelay + 100;
        }
      });
    },
    setHolds() {
      /* LEAVE THIS FOR NOW - STRING POKER */
      /*       var cards = [];
      for (var i = 0; i < dealer.mainCards.length; i++) {
        if (i >= 3 && i <= 7) {
          cards.push(dealer.mainCards[i]);
        }
      }
      var hold = getHolds.setHolds(cards);
      this.holdReason = hold.reason;
      hold.result.forEach((h, i) => {
        cardHolds[i + 3].active = h;
      }) */
    },
    playDealSound() {
      this.soundDeal.pause();
      this.soundDeal.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundDeal.play() || nopromise).catch(function () { });
    },
    playCashSound() {
      this.soundCash.pause();
      this.soundCash.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundCash.play() || nopromise).catch(function () { });
    },
    playFlipSound() {
      this.soundDeal.pause();
      this.soundDeal.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundDeal.play() || nopromise).catch(function () { });
    },
    playStarSound() {
      if (this.pDeal) {
        this.soundStar.pause();
        this.soundStar.currentTime = 0;
        var nopromise = {
          catch: new Function()
        };
        (this.soundStar.play() || nopromise).catch(function () { });
      }
    },
    playBtnSound() {
      this.soundBtn.pause();
      this.soundBtn.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundBtn.play() || nopromise).catch(function () { });
    },
    playBetsPlease() {
      this.soundBets.pause();
      this.soundBets.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundBets.play() || nopromise).catch(function () { });
    },
    playChipClick() {
      this.soundChip.pause();
      this.soundChip.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundChip.play() || nopromise).catch(function () { });
    },
    playWinMsg() {
      this.soundPlayerWins.pause();
      this.soundPlayerWins.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundPlayerWins.play() || nopromise).catch(function () { });
    },
    endRound() {
      this.soundEndRound.pause();
      this.soundEndRound.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundEndRound.play() || nopromise).catch(function () { });
    },
    cycleBgImg() {
      setInterval(() => {
        this.changeBG();
      }, 180000);
    },
    changeBG() {
      if (this.currentImg >= this.bgImgs.length - 1) {
        this.currentImg = 0;
      } else {
        this.currentImg++;
      }
      this.bgImg =
        "background-image: url('./static/BBGG" +
        this.bgImgs[this.currentImg] +
        ".jpg')";
    },
    setCardBack() {
      var URL = window.location.href,
        hashIndex = URL.indexOf("#");
      if (hashIndex < 0) {
        this.cardBack = 'background-image: url("./static/cardBacks/RG.png")';
      } else {
        this.cardBack =
          'background-image: url("./static/cardBacks/' +
          URL.substr(hashIndex + 1, URL.length) +
          '.png")';
      }
    },

    // UI_TEST: show all cards on load for CSS adjustments — comment out call in mounted() when done
    showAllCardsForUITest() {
      stringDecks[0].newDeck();
      primaryDecks[0].newDeck();

      // Deal and flip all string cards across all 3 visual layers
      for (let c = 0; c < 3; c++) {
        stringDecks[0].getCard(c, [], "stringCards");
        this.stringCards1.specs.splice(c, 1, this.stringCards0.specs[c]);
        this.stringCards2.specs.splice(c, 1, this.stringCards0.specs[c]);

        bus.$emit("cardsUpdated", { newCard: this.stringCards0.specs[c], cardNum: c, cardType: "stringCards" });
        bus.$emit("cardsUpdated", { newCard: this.stringCards1.specs[c], cardNum: c, cardType: "stringCards1" });
        bus.$emit("cardsUpdated", { newCard: this.stringCards2.specs[c], cardNum: c, cardType: "stringCards2" });

        this.stringCards0.deal.splice(c, 1, true);
        this.stringCards1.deal.splice(c, 1, true);
        this.stringCards2.deal.splice(c, 1, true);

        this.stringCards0.flip.splice(c, 1, true);
        this.stringCards1.flip.splice(c, 1, true);
        this.stringCards2.flip.splice(c, 1, true);
      }

      // Deal and flip all primary cards across all 3 visual layers
      for (let c = 0; c < 5; c++) {
        primaryDecks[0].getCard(c, [], "primaryCards");
        this.primaryCards1.specs.splice(c, 1, this.primaryCards0.specs[c]);
        this.primaryCards2.specs.splice(c, 1, this.primaryCards0.specs[c]);

        bus.$emit("cardsUpdated", { newCard: this.primaryCards0.specs[c], cardNum: c, cardType: "primaryCards" });
        bus.$emit("cardsUpdated", { newCard: this.primaryCards1.specs[c], cardNum: c, cardType: "primaryCards1" });
        bus.$emit("cardsUpdated", { newCard: this.primaryCards2.specs[c], cardNum: c, cardType: "primaryCards2" });

        this.primaryCards0.deal.splice(c, 1, true);
        this.primaryCards1.deal.splice(c, 1, true);
        this.primaryCards2.deal.splice(c, 1, true);

        this.primaryCards0.flip.splice(c, 1, true);
        this.primaryCards1.flip.splice(c, 1, true);
        this.primaryCards2.flip.splice(c, 1, true);
      }

      this.stage.primaryCardsDealt = true;

      // Mock result labels for UI testing
      this.results.bonus[0] = {
        counter: 0,
        reason: "",
        bonus: 3,
        label: "THREE OF A KIND",
        fill: "#1a3a8f"
      };
      this.results.main[0] = {
        rank: 1,
        label: "FULL HOUSE",
        fill: "#8f1a1a",
        reward: 45,
        payout: 9
      };
      this.stage.results.splice(0, 1, true);
    }
  },
  mounted() {
   // this.showAllCardsForUITest(); // UI_TEST: comment this out when done adjusting CSS
    this.soundFlip = document.getElementById("soundFlip");
    this.soundClearCards = document.getElementById("soundClearCards");
    this.soundDeal = document.getElementById("dSoundDeal");
    this.soundCash = document.getElementById("soundCashOut");
    this.soundStar = document.getElementById("soundStar");
    this.soundBtn = document.getElementById("soundBtnPress");
    this.soundBets = document.getElementById("betsPlease");
    this.soundChip = document.getElementById("chipClick");
    this.soundIntro = document.getElementById("loadingDone");
    this.soundPlayerWins = document.getElementById("playerWins");
    this.soundPlayerWins.volume = 0.5;
    this.soundEndRound = document.getElementById("soundLabel");
    this.cycleBgImg();
    this.setCardBack();
  }
};
</script>

<style>
body {
  -webkit-touch-callout: none;
  -webkit-text-size-adjust: none;
  -webkit-user-select: none;
  user-select: none;
  background-attachment: fixed;
  font-family: "HelveticaNeue-Light", "HelveticaNeue", Helvetica, Arial,
    sans-serif;
  font-size: 16px;
  height: 100vh;
  margin: 0px;
  padding: 0px;
  width: 100%;
  overflow: hidden;

  background: #0000a0;
}

.fullScreen,
#app {
  width: 100%;
  height: 100%;

  background-size: 100% 100%;
  background-repeat: no-repeat;

  background-color: #0000a0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.holdButtons {
  padding-top: 42%;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}

.changeBG {
  position: absolute;
  bottom: 0.2rem;
  width: 2em;
  height: 2em;
  background-image: url("../static/refresh.svg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 1em;
  cursor: pointer;
}

.payTable {
  position: relative;
}

.payTableText {
  paint-order: stroke;
  stroke: #000000;
  fill: #ffffff;
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
  font-weight: 800;
  font-family: Arial, Helvetica;
}

.labelCash {
  fill: #02f53a !important;
}

.resultLabel {
  position: absolute;
  left: 40%;
  width: 60%;
}

.primaryResultLabel {
  position: absolute;
  left: 0;
  width: 100%;
}

/* .changeBonus {
  position: absolute;
  width: 2em;
  height: 2em;
  background-image: url("../static/changeBonus.svg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 1em;
  cursor: pointer;
} */

.stringGroup0, .stringGroup1, .stringGroup2 {
  position: absolute;
}

@media all and (min-aspect-ratio: 970 / 600) {
  .stringGroup0, .stringGroup1, .stringGroup2 { width: 58%; left: 20%; }
  .stringGroup0 { top: 25%; }
  .stringGroup1 { top: 30%; }
  .stringGroup2 { top: 3%;  }
}
@media all and (max-aspect-ratio: 520 / 600) {
  .stringGroup0, .stringGroup1, .stringGroup2 { width: 75%; left: 23.5%; }
  .stringGroup0 { top: 64%; }
  .stringGroup1 { top: 42%; }
  .stringGroup2 { top: 20%; }
}
@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  .stringGroup0, .stringGroup1, .stringGroup2 { width: 80%; left: 0%; }
  .stringGroup0 { top: 18%; }
  .stringGroup1 { top: 39%; }
  .stringGroup2 { top: 28%; }
}
</style>
