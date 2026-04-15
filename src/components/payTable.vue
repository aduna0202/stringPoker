<template>
    <div class="payTable">


<div :class="showTable"  class="payTblW oneColumn" :id='id.primaryOne' v-show="viewPrimary"></div>
<div :class="showTable"  class="payTblW oneColumn" :id='id.discardOne' v-show="!viewPrimary"></div>


<div :class="showTable"  class="payTblW oneColumn"  v-show="viewPrimary">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200">

      <rect  style="fill:#6532fc; stroke:#5b5b5b; stroke-miterlimit:10;" x="5" y="170" ry="5" rx="5" width="84" height="20" @click="changeBonus()" />
      <text class="pointer" text-anchor="middle" font-weight="bold" font-size="8" x="47" y="179" fill="#FFFFFF" @click="changeTableView()">
                    View String Bonus </text>
      <text class="pointer" text-anchor="middle" font-weight="bold" font-size="7" x="47" y="186" fill="#FFFFFF" @click="changeTableView()">
                    (3-Card Hand) </text>
     

  </svg>
</div>
<div :class="showTable"  class="payTblW oneColumn"  v-show="!viewPrimary">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 160">

      <rect style="fill:#6532fc; stroke:#5b5b5b; stroke-miterlimit:10;" x="5" y="92" ry="5" rx="5" width="84" height="20" @click="changeTableView()" />
      <text class="pointer" text-anchor="middle" font-weight="bold" font-size="8" x="47" y="100" fill="#FFFFFF" @click="changeTableView()">
                    View Primary Reward </text>
      <text class="pointer" text-anchor="middle" font-weight="bold" font-size="7" x="47" y="108" fill="#FFFFFF" @click="changeTableView()">
                    (5-Card Hand) </text>

     <!--    <rect class="glow" style="fill:#231f20; stroke:#5b5b5b; stroke-miterlimit:10;" x="5" y="88" ry="5" rx="5" width="84" height="20" @click="changeBonus()" />
      <text class="pointer" text-anchor="start" font-weight="bold" font-size="8" x="12" y="96" fill="#FFFFFF" @click="changeBonus()">
                    Change Bonus </text>
      <text class="pointer" text-anchor="start" font-weight="bold" font-size="7" x="18" y="104" fill="#FFFFFF" @click="changeBonus()">
                    (3-Card Hand) </text>
        <g transform="scale(0.03) translate(2400,3000)" fill="#19ff00"  @click="changeBonus()">
        <refresh></refresh>
      </g>        -->
     

  </svg>
</div>

<div :class="showTable"  class="payTblW threeColumn" :id='id.primaryThree'  v-show="viewPrimary"></div>
<div :class="showTable"  class="payTblW threeColumn" :id='id.discardThree'  v-show="!viewPrimary"></div>

<div :class="showTable"  class="payTblW threeColumn" v-show="viewPrimary">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 120">

      <rect style="fill:#6532fc; stroke:#5b5b5b; stroke-miterlimit:10;"  x="220" y="95" rx="10" ry="10" width="300" height="24" @click="changeTableView()" />
      <text class="pointer" text-anchor="start" font-weight="bold" font-size="18" x="230" y="112" fill="#FFFFFF" @click="changeTableView()">
                    View String Bonus  </text>
      <text class="pointer" text-anchor="start" font-weight="bold" font-size="15" x="410" y="112" fill="#FFFFFF" @click="changeTableView()">
                    (3-Card Hand) </text>

  </svg>
</div>


<div :class="showTable"  class="payTblW threeColumn" v-show="!viewPrimary">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 120">

      <rect style="fill:#6532fc; stroke:#5b5b5b; stroke-miterlimit:10;"  x="10" y="25" rx="10" ry="10" width="190" height="44" @click="changeTableView()" />
      <text class="pointer" text-anchor="middle" font-weight="bold" font-size="15" x="100" y="43" fill="#FFFFFF" @click="changeTableView()">
                    View Primary Reward </text>
      <text class="pointer" text-anchor="middle" font-weight="bold" font-size="14" x="100" y="60" fill="#FFFFFF" @click="changeTableView()">
                    (5-Card Hand) </text>



   <!--                   <rect class="glow" style="fill:#6532fc; stroke:#5b5b5b; stroke-miterlimit:10;"  x="0" y="1" rx="10" ry="10" width="192.5" height="42" @click="changeBonus()" />
      <text class="pointer" text-anchor="middle" font-weight="bold" font-size="18" x="96" y="18" fill="#FFFFFF" @click="changeBonus()">
                    Change Bonus </text>
      <text class="pointer" text-anchor="middle" font-weight="bold" font-size="15" x="96" y="34" fill="#FFFFFF" @click="changeBonus()">
                    (3-Card Hand) </text>

      <g transform="scale(0.038) translate(4500,550)" fill="#19ff00"  @click="changeBonus()">
          <refresh></refresh>
      </g>   -->

  </svg>
</div>
              
    </div>
</template>


<script>
import tableMix1 from "./payTableMix1";
import dPayTbl1 from "./dPayTbl1";
import dPayTbl3 from "./dPayTbl3";
import tableMix3 from "./payTableMix3";
import tableValues from "../gameLogic/payTable";
import payTable from "../gameLogic/payTable";
import refresh from "./refresh";

var d3 = Object.assign({}, require("d3-selection"));

export default {
  name: "payTable",
  components: { refresh },
  data() {
    return {
      showTable: "",
      tableSwitch: true,
      table1: "",
      table2: "",
      id: {
        primaryOne: "oneCol",
        discardOne: "dOneCol",
        primaryThree: "threeCol",
        discardThree: "dThreeCol"
      },
      payTable: 0,
      viewPrimary: true,
      bonusValues: []
    };
  },
  methods: {
    changeTableView() {
      this.viewPrimary = !this.viewPrimary;
    },
    changeBonus() {
      if (this.payTable < 2) {
        this.payTable++;
      } else {
        this.payTable = 0;
      }
      this.rendertables();
      this.$emit("updateBonus");
    },
    rendertables() {
      tableMix1(tableValues, this.baseBetValue, this.id.primaryOne, this.payTable);
      tableMix3(
        tableValues,
        this.baseBetValue,
        this.id.primaryThree,
        this.payTable
      );
      dPayTbl1(this.bonusValues, this.baseBetValue, this.id.discardOne, this.payTable);
      dPayTbl3(this.bonusValues, this.baseBetValue, this.id.discardThree, this.payTable);
    },
    getBonusValues() {
      this.bonusValues.push({
            bonusReward: [50],
            text: 'String Royal',
            clr:'#E02629'
          });
      this.bonusValues.push({
            bonusReward: [100],
            text: 'Dealt String Royal',
            clr:'#d61111'
          });
      tableValues.forEach((t, i) => {
        if (t.bonusReward) {
          this.bonusValues.push({
            bonusReward: t.bonusReward,
            text: t.text,
            clr: t.clr
          });
          if (t.dName) {
            this.bonusValues[this.bonusValues.length - 1].text = t.dName;
          }
        }
      });

      this.bonusValues.sort(function(a, b){return b.bonusReward[0] - a.bonusReward[0]});
    }
  },
  watch: {
    baseBetValue: function() {
      this.rendertables();
    }
  },
  props: ["baseBetValue"],
  mounted() {
    setTimeout(() => {
      this.getBonusValues();
      this.rendertables();
      setTimeout(() => {
        this.showTable = "tblAnimation-enter-active loaded swap";
      }, 0);
    }, 0);
  }
};
</script>

<style scoped>
@-webkit-keyframes glow {
  0% {
    opacity: 0.5;
    fill: #ff004c;
  }
  50% {
    opacity: 1;
    fill: #231f20;
  }
  100% {
    opacity: 0.5;
    fill: #ff004c;
  }
}
@-moz-keyframes glow {
  0% {
    opacity: 0.5;
    fill: #ff004c;
  }
  50% {
    opacity: 1;
    fill: #231f20;
  }
  100% {
    opacity: 0.5;
    fill: #ff004c;
  }
}
@-o-keyframes glow {
  0% {
    opacity: 0.5;
    fill: #ff004c;
  }
  50% {
    opacity: 1;
    fill: #231f20;
  }
  100% {
    opacity: 0.5;
    fill: #ff004c;
  }
}
@keyframes glow {
  0% {
    opacity: 0.5;
    fill: #ff004c;
  }
  50% {
    opacity: 1;
    fill: #231f20;
  }
  100% {
    opacity: 0.5;
    fill: #ff004c;
  }
}

.glow {
  fill: #231f20;
}
.pointer {
  cursor: pointer;
}
.glow {
  cursor: pointer;
  -webkit-animation: glow 1s infinite; /* Safari 4+ */
  -moz-animation: glow 1s infinite; /* Fx 5+ */
  -o-animation: glow 1s infinite; /* Opera 12+ */
  animation: glow 1s infinite; /* IE 10+, Fx 29+ */
}

@-webkit-keyframes swap {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-moz-keyframes swap {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-o-keyframes swap {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes swap {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.swap {
  -webkit-animation: swap 4s infinite; /* Safari 4+ */
  -moz-animation: swap 4s infinite; /* Fx 5+ */
  -o-animation: swap 4s infinite; /* Opera 12+ */
  animation: swap 4s infinite; /* IE 10+, Fx 29+ */
}

@supports (-ms-ime-align: auto) {
  .payTableText,
  .againText,
  .tapText {
    stroke-width: 0.4px !important;
  }
}

.tblAnimation-enter-active {
  animation: tblAnimation-in 0.5s;
}

.payTblW {
  opacity: 0;
  -moz-transition: opacity 1.5s;
  -webkit-transition: opacity 1.5s;
  -o-transition: opacity 1.5s;
  transition: opacity 1.5s;
}

.loaded {
  opacity: 1 !important;
}

@keyframes tblAnimation-in {
  0% {
    transform: scale(0.4);
    height: 0;
  }
  100% {
    transform: scale(1);
    height: 100%;
  }
}
@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/
  .payTblW {
    position: absolute;
    width: 100%;
  }
  .payTable {
    width: 21.5%;
    top: 18%;
    left: 0.5%;
  }
  .threeColumn {
    display: none;
  }
  .oneColumn {
    display: block;
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .payTblW {
    position: absolute;
    left: 0.5%;
    width: 98%;
  }
  .payTable {
    width: 100%;
    top: 19%;
  }
  .threeColumn {
    display: block;
  }
  .oneColumn {
    display: none;
  }

  .changeBonus {
    top: 18rem;
    right: 1%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/
  .payTblW {
    position: absolute;
    width: 100%;
  }

  .payTable {
    width: 18%;
    top: 19%;
    left: 83.5%;
  }
  .threeColumn {
    display: none;
  }
  .oneColumn {
    display: block;
  }
}
</style>