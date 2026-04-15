import stringResult from "./discardResultDDB";
/* import discardResult from "./discardResultJOB"; */

var sResults = new stringResult();

class autoPicker {
    cardsDifferent
    card = []
    bestStringHand(primaryCards, stringCards, currentBonus, bonusCounter) {

     
        var sCards = [[0, 1, 2], [0, 2, 1], [1, 2, 0]];
        var bestBonus = {}, betterBonusFound = false;
  /*       console.log(currentBonus, bonusCounter);
        if(bonusCounter > 0){
            currentBonus = bonusCounter + currentBonus;
            console.log('added bonus into equation! currentBonus:', currentBonus)
        }
 */
       

        //let resultNum = 0;
        //console.log(checkResult.bonus, bestBonus.bonus, currentBonus)
        // console.log(this.primaryCards.specs);
        //  console.log(currentBonus);
        primaryCards.forEach((p, i) => {
            // console.log(p);
            sCards.forEach(s => {

                var stringCardsCombo = [
                    stringCards[s[0]],
                    stringCards[s[1]],
                    p
                ], checkResult;

                checkResult = sResults.threeCards(
                    stringCardsCombo,
                    0
                );
                this.cardsDifferent = this.allDifCards(p,
                    stringCards[s[0]],
                    stringCards[s[1]]);
                //    console.log('this.cardsDifferent',this.cardsDifferent);

                if (this.cardsDifferent) {

                    almostMiniRoyal();

                    if (
                        checkResult.bonus > currentBonus &&
                        typeof bestBonus.bonus === "undefined"
                    ) {
                      //  console.log('if case 1');
                        bestBonus = this.addDetails(checkResult, p, i, s[2], stringCardsCombo);
                        betterBonusFound = true;

                    }
                    else if (checkResult.bonus === currentBonus &&
                        typeof bestBonus.bonus === "undefined" &&
                        this.closeToStraightFlush(this.card) && !betterBonusFound) {
                      //  console.log('if case 2');
                        bestBonus = this.addDetails(checkResult, p, i, s[2], stringCardsCombo);
                        bestBonus.lockResult = true;
                    }
                    else if (checkResult.bonus === currentBonus && !betterBonusFound && currentBonus > 1) {
                     //   console.log('if case 6');
                        bestBonus = this.addDetails(checkResult, p, i, s[2], stringCardsCombo);
                    }
                    else if (checkResult.bonus > bestBonus.bonus) {

                      //  console.log('if case 3', console.log(p, stringCards));
                        bestBonus = this.addDetails(checkResult, p, i, s[2], stringCardsCombo);
                        betterBonusFound = true;
                    }
                    else if (checkResult.bonus === bestBonus.bonus && !betterBonusFound) {
                        if (
                            this.closeToStraightFlush(this.card)
                        ) {
                         //   console.log('if case 4');
                            bestBonus = this.addDetails(checkResult, p, i, s[2], stringCardsCombo);
                            bestBonus.lockResult = true;
                        } else if (checkResult.bonus === bestBonus.bonus && !bestBonus.lockResult) {
                            //any random combo should be taken as well for a +1 chance...
                          //  console.log('if case 5');
                            bestBonus = this.addDetails(checkResult, p, i, s[2], stringCardsCombo);
                        }
                    }

                }

             //   console.log('better bonus found?', betterBonusFound, { checkingResult: checkResult.bonus, curentBonus: currentBonus, bestBonus: bestBonus.bonus })





            });
        });

        //    console.log( bestBonus.bonus, currentBonus)

        return bestBonus;


    }


    almostMiniRoyal(){
        
    }

    addDetails(result, p, i, s, stringCardsCombo) {
        result.combo = stringCardsCombo;
        result.pCardSwap = p;
        result.pCardNumSwap = i;
        result.removeStringCardNum = s;
        result.plusOne = '';
        return result;
    }


    closeToStraightFlush(card) {
        var result = false;

        if ((card[0].suit === card[1].suit && (card[0].value === card[1].value - 1 || card[0].value === card[1].value + 1)) ||
            (card[0].suit === card[2].suit && (card[0].value === card[2].value - 1 || card[0].value === card[2].value + 1))) {
            result = true;
        }


        return result;
    }

    allDifCards() {
//        this.card.push = [];
       
        this.card = [];
        var i = 0,
            len = arguments.length;
        for (; i < len; i += 1) {

            this.card.push({
                suit: arguments[i].charAt(0),
                value: parseInt(arguments[i].slice(1, len))
            })
        }
        var result = this.difCards(this.card);

        //   console.log(result, 'all different', card)
        return result
    }

    difCards(card) {
        var result = true;
        if ((card[0].value === card[2].value && card[0].suit === card[2].suit) ||
            (card[0].value === card[1].value && card[0].suit === card[1].suit)
        ) {
            result = false;
        }
        // console.log('different cards??', result, card);
        return result;

    }

}

export { autoPicker as default }