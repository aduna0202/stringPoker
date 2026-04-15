<template>
    <div class="infoFrame" id="infoFrame">

        <transition name="fade">

            <div v-if="open" class="infoBox">

                <div class="tabBox">
                    <div v-on:click="updateTabs(index)" class="tableTab" v-for="(t, index) in tabs" :class="{'tabActive': t.active, 'tabinActive': !t.active}">{{t.label}}</div>
                </div>

                <div v-if="tabs[0].active">
                    <div class="textBox">

                        <p class="pText">
                            <strong>Rules</strong>
                        </p>
                      <p class="pText">String Multiplier Poker is a video poker game using two hands. The string hand is a three card hand dealt to begin the game and establish a multiplier, if any, for the game. The main hand is the hand the player will have control of by holding and discarding cards to form the best five card hand.&nbsp;</p>
<p class="pText">Wins in the primary hand are multiplied by wins in the string hand and bonus games are provided to the player after a winning outcome in the main hand. Copies of cards can be used to upgrade and improve the string hand automatically following a winning hand.&nbsp;</p>
<p class="pText">Play continues as wins in the main hand are achieved. Once a loss in the main hand occurs, the string multiplier is broken and removed from the hand and a new game is dealt to the player.&nbsp;</p>
<p class="pText">For more video poker games, please visit<br /> <strong><a href="http://www.realizegamingllc.com/" target="_blank" rel="noopener">www.realizegamingllc.com</a></strong></p>
                    </div>



                </div>

                <div v-if="tabs[2].active">

                    <div class="textBox">

                        <p style="text-align:left; padding-left:10px;">Realize Gaming, LLC specializes in designing and inventing new video poker and slot game concepts.
                            We are building a portfolio of gaming patents with the goal of licensing them to companies for
                            use in online or land based casinos. Please feel free to reach out to me at
                            <a href="mailto:tnottke@realizegamingllc.com" target="_blank">tnottke@realizegamingllc.com</a> or visit my website
                            <a href="http://www.realizegamingllc.com/" target="_blank">www.realizegamingllc.com</a> to learn more about our products.</p>

                        <br>
                        <br>

                        <img src="http://www.realizegamingllc.com/static/RealizeLogo.jpg" style="width:80%;">
                    </div>

                </div>

                <div v-if="tabs[1].active">

                    <div class="textBox">




 <br><br>
                        <strong>Methodologies</strong>

                        <p class="pText">
                            A computer simulation of 1 billion rounds was done to determine all probablities and RTP of <strong> {{round3(sim.overallResults.RTP)}}%</strong>. 
                        </p>

                        <strong> Primary Paytable Results</strong>

                          <table class="simTbl" style="max-width:40%;">
                            <thead>
                              <tr>
                                <th class="payTblHeader">Hand</th>
                                <th class="payTblHeader">Reward</th>
                                <th class="payTblHeader">Percent of total rounds</th>
                                <th class="payTblHeader">Percent of total wins</th>
                                <th class="payTblHeader">Regular to Bonus wins</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(p,i) in sim.primaryTable" style="color: #00ff19">
                                  <td>{{p.hand}}</td>
                                  <td>{{p.reward}}</td>
                                  <td>{{round7(p.stats.percentOfTotalRounds)}}</td>
                                  <td>{{round7(p.stats.percentOfTotalWins)}}</td>
                                  <td  v-if="p.stats.regularWins > 0">1:{{round3(p.stats.regularWins / p.stats.bonusWins)}}</td>
                                  <td v-if="p.stats.regularWins === 0">n/a</td>
                              </tr>
                            </tbody>
                          </table>
                        
                        
                        <p class="pText">Select a primary hand to view stats per bonus round: 
                          <select v-model="selected.primaryHand"><option v-for="(o,i) in options.primaryHand" :value="i">{{o}}</option></select>
                          </p>

                         <table class="simTbl" style="max-width:40%;">
                            <thead>
                              <tr>
                                <th class="payTblHeader">Bonus Round</th>
                                <th class="payTblHeader">Percent of all {{sim.primaryTable[selected.primaryHand].hand}} hands</th>
                                <th class="payTblHeader">Percent of all {{sim.primaryTable[selected.primaryHand].hand}} wins</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(p,i) in sim.primaryTable[selected.primaryHand].stats.rounds" style="color: #00ff19">
                                  <td>{{i}}</td>
                                  <td>{{round7((p.count / sim.primaryTable[selected.primaryHand].stats.totalCount) *100)}}</td>
                                  <td>{{round7((p.win  / sim.primaryTable[selected.primaryHand].stats.totalWin) *100)}}</td>
                              </tr>
                            </tbody>
                          </table>

                         <strong> <br>String Bonus Paytable Results</strong>

                        <table class="simTbl" style="max-width:80%;">
                          <thead>
                            <tr>
                              <th class="payTblHeader">Hand</th>
                              <th class="payTblHeader">Reward</th>
                              <th class="payTblHeader">Percent of total rounds</th>
                              <th class="payTblHeader">Percent of total wins</th>
                              <th class="payTblHeader">Regular to Bonus wins</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(p,i) in sim.bonusTable" style="color: #00ff19">
                                <td>{{p.hand}}</td>
                                <td>{{p.bonusReward}}</td>
                                <td>{{round7(p.stats.percentOfTotalRounds)}}</td>
                                <td>{{round7(p.stats.percentOfTotalWins)}}</td>
                                <td  v-if="p.stats.regularWins > 0">1:{{round3(p.stats.regularWins / p.stats.bonusWins)}}</td>
                                <td v-if="p.stats.regularWins === 0">n/a</td>
                            </tr>
                          </tbody>
                        </table>

                        <p class="pText">Select a string bonus hand to view stats per bonus round: 
                          <select v-model="selected.bonusHand"><option v-for="(o,i) in options.bonusHand" :value="i">{{o}}</option></select>
                        </p>


                          <table class="simTbl" style="max-width:80%;">
                            <thead>
                              <tr>
                                <th class="payTblHeader">Bonus Round</th>
                                <th class="payTblHeader">Percent of all {{sim.bonusTable[selected.bonusHand].hand}} hands</th>
                                <th class="payTblHeader">Percent of all {{sim.bonusTable[selected.bonusHand].hand}} wins</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(p,i) in sim.bonusTable[selected.bonusHand].stats.rounds" style="color: #00ff19">
                                  <td>{{i}}</td>
                                  <td>{{round7((p.count / sim.bonusTable[selected.bonusHand].stats.totalCount) *100)}}</td>
                                  <td>{{round7((p.win  / sim.bonusTable[selected.bonusHand].stats.totalWin) *100)}} </td>
                              </tr>
                            </tbody>
                          </table>




                          <strong> <br>Combined Primary and String Bonus Paytable Results</strong>

                         <table class="simTbl" style="max-width:80%;">
                            <thead>
                              <tr>
                                <th class="payTblHeader">Final Reward</th>
                                <th class="payTblHeader">Primary Hand Reward(s)</th>
                                <th class="payTblHeader">String Hand Bonus(s)</th>
                                <th class="payTblHeader">Probability per result</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(p,i) in virtualTbl" style="color: #00ff19">
                                  <td>{{p.fRewards}}</td>
                                  <td><span v-for="(l,j) in p.bRewards">{{l}}<span v-if="isLast(p.bRewards, j)">, </span></span></td>
                                  <td><span v-for="(m,n) in p.mult">{{m}}<span v-if="isLast(p.mult, n)">, </span></span></td>                          
                                  <td>{{round7(p.p)}}</td>                                
                              </tr>
                            </tbody>
                          </table>


                    </div>

                </div>

            </div>
        </transition>

        <transition name="fade">
            <div v-if="open" class="closeBox" v-on:click="closeBox">×</div>
        </transition>

    </div>
</template>


<script>
/* import cashCounter from '../services/cashAnalyzer'
import bus from '../services/bus' */

/* import bus from "./../bus"; */
import sim from "../gameLogic/simResults.js";
export default {
  name: "info",
  props: ["open"],
  data() {
    return {
      openBOx: this.open,
      setImgWidth: "",
      tabs: [
        {
          label: "Rules",
          active: true
        },
        {
          label: "Game Statistics",
          active: false
        },
        {
          label: "About",
          active: false
        }
      ],
      sim: sim,
      virtualTbl: [],
      options: {
        primaryHand: [],
        bonusHand: []
      },
      selected: {
        primaryHand: 0,
        bonusHand: 0
      }
    };
  },
  beforeMount() {
    //  console.log(sim.primaryTable);
    sim.primaryTable.forEach((a, i) => {
      // console.log(a);
      this.options.primaryHand.push(a.hand);
    });

    sim.bonusTable.forEach((a, i) => {
      // console.log(a);
      this.options.bonusHand.push(a.hand);
    });

    // console.log(this.options.bonusHand);

    for (var key in sim.virtualPayTable) {
      this.virtualTbl.push({
        fRewards: key,
        bRewards: sim.virtualPayTable[key].baseReward,
        mult: sim.virtualPayTable[key].mupltiplyer,
        p: sim.virtualPayTable[key].probability
      });
    }
    this.virtualTbl.sort((a, b) => {
      return a.fRewards - b.fRewards;
    });
  },
  methods: {
    isLast: function(list, index) {
      return list.length - 1 === index ? false : true;
    },
    closeBox: function() {
      this.$emit("closeInfo");
      document.getElementById("infoFrame").style.zIndex = "-1";
    },
    updateTabs: function(index) {
      _.forEach(this.tabs, (t, i) => {
        t.active = i === index ? true : false;
      });
    }
  },
  watch: {
    open: function() {
      if (this.open) {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var finalWidth = Math.min(w, h);
        this.setImgWidth = finalWidth + "px";
      }
    }
  },
  mounted() {},
  methods: {
    isLast: function(list, index) {
      return list.length - 1 === index ? false : true;
    },
    closeBox: function() {
      this.$emit("closeInfo");
      document.getElementById("infoFrame").style.zIndex = "-1";
    },
    updateTabs: function(index) {
      _.forEach(this.tabs, (t, i) => {
        t.active = i === index ? true : false;
      });
    },
    formatNumber(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    round3(value) {
      return isNaN(Number(value)) ? "0" : Number(value).toFixed(3);
    },
    round7(value) {
      return isNaN(Number(value)) ? "0" : Number(value).toFixed(8);
    }
  }
};
</script>

<style scoped>
.pText {
  text-align: left;
  margin-left: 2em;
  line-height: 1.5em;
  margin-right: 2em;
}

.infoText {
  padding: 0% 5%;
  font-size: 1em;
  color: white;
  text-align: left;
}

.tabBox {
  overflow: hidden;
  margin: auto;
  text-align: center;
  margin-top: 85px;
  margin-bottom: 20px;
}

.tabActive {
  background-color: #a0abff;
}

.tabinActive {
  background-color: #efefef;
}

.tabActive:hover {
  background-color: #a0abff;
}

.tabinActive:hover {
  background-color: #7e889e;
  color: #fff;
}

.tableTab {
  border-color: #0099cb;
  border-radius: 5px;
  cursor: pointer;
  color: #000000;
  font-size: 1em;
  text-align: center;
  border-style: none;
  padding: 4px 10px;
  margin-right: 15px;
  font-family: sans-serif;
  font-weight: bold;
  margin-top: 10px;
  display: inline-block;
}

a:link {
  color: #7aceff;
  background-color: transparent;
  text-decoration: none;
}

a:visited {
  color: #7aceff;
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  color: #bdbec9;
  background-color: transparent;
  text-decoration: underline;
}

a:active {
  color: #91ffb5;
  background-color: transparent;
  text-decoration: underline;
}

.textBox {
  width: 100%;
  text-align: center;
}

.rulesList {
  width: 80%;
  margin: 0 auto;
  padding: 0px;
  padding-bottom: 20px;
  line-height: 1.2em;
  font-size: 1em;
  padding-left: 10px;
  padding-right: 10px;
}

.rulesList > li {
  padding-top: 10px;
}

.closeBox {
  position: absolute;
  top: 0px;
  right: 0px;
  margin-right: 30px;
  margin-top: 15px;
  background-color: rgba(0, 0, 0, 1);
  height: 50px;
  width: 50px;
  border: 6px solid white;
  border-radius: 30px;
  text-align: center;
  line-height: 50px;
  font-size: 60px;
  color: white;
  cursor: pointer;
}

.infoFrame {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.infoBox {
  position: relative;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  overflow: auto;
  height: 100%;
  font-size: 1em;
}

.payTblHeader {
  width: 10%;
  font-size: 1.05em;
}

.simTbl {
  margin: 0 auto;
}

.simTbl td,
.simTbl th {
  padding: 10px;
  font-size: 1em;
}
</style>