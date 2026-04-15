import stringResult from "./discardResultDDB";
/* import discardResult from "./discardResultJOB"; */

var sResults = new stringResult();

class autoPicker {
    cardsDifferent
    card = []
    bestStringHand(primaryCards, stringCards, currentBonus) {

       
        var existingResult = this.analyzeOption(stringCards);
       // console.log(currentBonus, currentBreakPoint.breakPoint);
        var sCards = [[0, 1, 2], [0, 2, 1], [1, 2, 0]];
        var bonusOptions = [], result = { bonus: undefined };

        if (currentBonus < 90) {


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
                        0,
                        true
                    );
                    this.cardsDifferent = this.allDifCards(p,
                        stringCards[s[0]],
                        stringCards[s[1]]);
                    //  console.log('this.cardsDifferent', this.cardsDifferent, stringCardsCombo, currentBonus, checkResult.bonus);

                    if (this.cardsDifferent && checkResult.bonus >= currentBonus) {
                        bonusOptions.push(this.addDetails(checkResult, p, i, s[2], stringCardsCombo))

                    }

                });
            });


            bonusOptions = bonusOptions.sort((a, b) => {
                return b.bonus - a.bonus;
            });

            bonusOptions = bonusOptions.filter((a, b, c) => {
                return a.bonus === c[0].bonus ? true : false;
            });

            if (bonusOptions.length === 1) {
                result = bonusOptions[0];

                if (currentBonus === bonusOptions[0].bonus) {

                    var breakAnalysis1 = this.analyzeOption(bonusOptions[0].combo);
                    var breakAnalysis2 = this.analyzeOption(stringCards);
                    if (breakAnalysis1.breakPoint >= breakAnalysis2.breakPoint) {
                        /*        console.log('DID THIS WORK?? - rare case!!!');
                               console.log(breakAnalysis1);
                               console.log(breakAnalysis2); */
                        result.reason = breakAnalysis1.reason + ' (1 possible option found.  It is just as good or better as the original hand)'
                    } else {
                        //   console.log('the original bonus hand is better.')
                        result = {};
                    }


                } else {
                    result.reason = 'picked the one and only highest string bonus possible!'
                }


            } else if (bonusOptions.length === 0) {
                var check = this.cardsMatch(primaryCards, stringCards);

                if (check.match) {
                    result = check.result;
                    result.reason = 'swapping and keeping bonus';
                } else {
                    result = { reason: 'no better bonus found - keeping the string cards!' }
                }


            }
            else {
                // result = bonusOptions[0];
                bonusOptions.forEach((a) => {
                    //  console.log(a);
                    var breakAnalysis = this.analyzeOption(a.combo);
                    a.breakPoint = breakAnalysis.breakPoint;
                    a.reason = breakAnalysis.reason;
                });
//                console.log(bonusOptions);
                result = this.pickBestBreakPoint(bonusOptions);
            //    console.log(result, result.bonus, currentBonus, result.breakPoint, existingResult.breakPoint);
                if(result.bonus >= currentBonus && result.breakPoint > existingResult.breakPoint){
                    result.reason = result.reason + ' & ' + (bonusOptions.length - 1) + '  other similar option(s) were considered.';
                } else {
                    result = { reason: 'no better bonus found - keeping the string cards!' }
                }
                
            }
        }


        return result;


    }


    cardsMatch(primaryCards, stringCards) {

        var sCards = [[0, 1, 2], [0, 2, 1], [1, 2, 0]];

        var result = { match: false, result: {} };

        primaryCards.forEach((p, i) => {


            sCards.forEach(s => {
                var stringCardsCombo = [
                    stringCards[s[0]],
                    stringCards[s[1]],
                    p
                ], checkResult;


                // console.log(stringCardsCombo, stringCards);
                if (stringCardsCombo[0] === stringCards[0] &&
                    stringCardsCombo[1] === stringCards[1] &&
                    stringCardsCombo[2] === stringCards[2]
                ) {
                    //  bonusOptions.push(this.addDetails(checkResult, p, i, s[2], stringCardsCombo))

                    checkResult = sResults.threeCards(
                        stringCardsCombo,
                        0,
                        true
                    );

                    result.result = this.addDetails(checkResult, p, i, s[2], stringCardsCombo);
                    result.match = true;
                }

            })
        });
        return result;
    }

    pickBestBreakPoint(c) {
        return c.sort((a, b) => {
            return b.breakPoint - a.breakPoint;
        })[0];
    }

    analyzeOption(pCards) {

        var cards = [], r = {}
        pCards.forEach((a) => {
            cards.push({
                suit: a.charAt(0),
                value: parseInt(a.slice(1, a.length))
            });
        });

        r.breakPoint = 1;
        var isAlmostStraight = this.almostStraight(cards),
            isAlmostFlush = this.almostFlush(cards),
            isAlmost3OK = this.almostThreeOfKind(cards),
            isAlmostStraightFlush = this.almostStraightFlush(cards), pairPoints = 0;
        var isAlmostInsideStraight = undefined, strightReason = ' INSIDE straight'
        if (isAlmostStraightFlush || isAlmostStraight) {
            isAlmostInsideStraight = this.almostInsideStraight(cards);
        }
        var almostFlushValue = 0;
        if (isAlmostFlush) {
            almostFlushValue =  cards[2].value * 0.01;
        }


        if (isAlmost3OK) {
            pairPoints = this.pairValueAnalysis(cards);
        }

        //console.log(pairPoints);

        if (this.almostMiniRoyal(cards)) {
            r.breakPoint = 50;
            r.reason = 'This string hand is almost a mini royal!';

            if (isAlmostStraightFlush) {
                r.breakPoint = r.breakPoint + (isAlmostInsideStraight ? 6 : 5);
                r.reason = r.reason + ' + almost straight flush';
                r.reason = isAlmostInsideStraight ? r.reason + strightReason : r.reason;
            }
            if (isAlmost3OK) {
                r.breakPoint = r.breakPoint + 4 + pairPoints;
                r.reason = r.reason + ' + almost 3OK';
            }
            if (isAlmostStraight) {
                r.breakPoint = r.breakPoint + 2;
                r.reason = r.reason + ' + almost straight';
            }

            if (isAlmostFlush) {
                r.breakPoint = r.breakPoint + almostFlushValue;
                r.reason = r.reason + ' + almost flush';
            }

        } else if (isAlmostStraightFlush) {
            r.breakPoint = isAlmostInsideStraight ? 41 : 40;
            r.reason = 'This string hand is almost a Straight Flush!';
            r.reason = isAlmostInsideStraight ? r.reason + strightReason : r.reason;

            if (isAlmost3OK) {
                r.breakPoint = r.breakPoint + 4 + pairPoints;
                r.reason = r.reason + ' + almost 3OK';
            }
            if (isAlmostStraight) {
                r.breakPoint = r.breakPoint + (isAlmostInsideStraight ? 3 : 2);
                r.reason = r.reason + ' + almost straight';
            }

            if (isAlmostFlush) {
                r.breakPoint = r.breakPoint + almostFlushValue;
                r.reason = r.reason + ' + almost flush';
            }

        } else if (isAlmost3OK) {

            r.breakPoint = 30 + pairPoints;
            r.reason = 'This string hand is almost a Three of a Kind!';

            if (isAlmostStraight) {
                r.breakPoint = r.breakPoint + (isAlmostInsideStraight ? 4 : 3);
                r.reason = r.reason + ' + almost straight';
            }

            if (isAlmostFlush) {
                r.breakPoint = r.breakPoint + almostFlushValue;
                r.reason = r.reason + ' + almost flush';
            }

        } else if (isAlmostStraight) {
            r.breakPoint = isAlmostInsideStraight ? 21 : 20;
            r.reason = 'This string hand is almost a Straight!';

            if (isAlmostFlush) {
                r.breakPoint = r.breakPoint + almostFlushValue;
                r.reason = r.reason + ' + almost flush';
            }

        } else if (isAlmostFlush) {
            r.breakPoint = almostFlushValue;
            r.reason = 'This string hand is almost a Flush!';
        }
        else {
            r.breakPoint = 0;
            r.reason = 'Best choice, and none of the string hands are close to anything better.'
        }

        return r;
    }

    almostMiniRoyal(card) {
        var result = false;

        var reqValues = [12, 13, 14];

        if ((card[0].suit === card[1].suit && (reqValues.indexOf(card[0].value) > -1 && reqValues.indexOf(card[1].value) > -1) ||
            card[0].suit === card[2].suit && (reqValues.indexOf(card[0].value) > -1 && reqValues.indexOf(card[2].value) > -1)) ||
            card[1].suit === card[2].suit && (reqValues.indexOf(card[1].value) > -1 && reqValues.indexOf(card[2].value) > -1)
        ) {
            result = true;
        }

        return result;
    }

    almostStraightFlush(card) {

        var result = false;


        if ((card[0].suit === card[1].suit && (card[0].value === card[1].value - 1 || card[0].value === card[1].value + 1 || card[0].value === card[1].value - 2 || card[0].value === card[1].value + 2)) ||
            (card[0].suit === card[2].suit && (card[0].value === card[2].value - 1 || card[0].value === card[2].value + 1 || card[0].value === card[2].value - 2 || card[0].value === card[2].value + 2)) ||
            (card[1].suit === card[2].suit && (card[1].value === card[2].value - 1 || card[1].value === card[2].value + 1 || card[1].value === card[2].value - 2 || card[1].value === card[2].value + 2)
            )
        ) {
            result = true;
        }

        if (card[0].value === 14) {
            if ((card[0].suit === card[1].suit && (card[1].value === 2 || card[1].value === 3)) ||
                (card[0].suit === card[2].suit && (card[2].value === 2 || card[2].value === 3))) {
                result = true;
            }
        }

        if (card[1].value === 14) {
            if ((card[0].suit === card[1].suit && (card[0].value === 2 || card[0].value === 3)) ||
                (card[2].suit === card[1].suit && (card[2].value === 2 || card[2].value === 3))
            ) {
                result = true;
            }
        }
        if (card[2].value === 14) {
            if ((card[0].suit === card[2].suit && (card[0].value === 2 || card[0].value === 3)) ||
                (card[2].suit === card[1].suit && (card[1].value === 2 || card[1].value === 3))
            ) {
                result = true;
            }
        }

        //  console.log('almost straight flush?!', result, card)

        return result;
    }

    almostInsideStraight(card) {

        var result = false;
        if (
            (card[0].value === card[1].value + 1) ||
            (card[0].value === card[1].value - 1) ||
            (card[2].value === card[1].value + 1) ||
            (card[2].value === card[1].value - 1) ||
            (card[2].value === card[0].value + 1) ||
            (card[2].value === card[0].value - 1)
        ) {
            result = true;
        }
        // console.log(card, 'almostInsideStraight', result);
        return result;
    }


    pairValueAnalysis(card) {
        var pairValue;
        if ((card[0].value === card[1].value) || (card[0].value === card[2].value)
        ) {
            pairValue = card[0].value;
        } else {
            pairValue = card[1].value;
        }
        // console.log(pairValue/10);
        return pairValue / 10;

    }

    almostThreeOfKind(card) {
        var result = false;

        if ((card[0].value === card[1].value) ||
            (card[1].value === card[2].value) ||
            (card[0].value === card[2].value)
        ) {
            result = true;
        }

        return result;
    }
    almostStraight(card) {
        var result = false;

        /* console.log(card[0].value)
        console.log(card[1].value)
        console.log(card[2].value) */

        if (((card[0].value === card[1].value - 1 || card[0].value === card[1].value + 1)) ||
            ((card[0].value === card[2].value - 1 || card[0].value === card[2].value + 1)) ||
            ((card[0].value === card[1].value - 2 || card[0].value === card[1].value + 2)) ||
            ((card[0].value === card[2].value - 2 || card[0].value === card[2].value + 2))

        ) {
            result = true;
        }

        if (card[0].value === 14) {
            if (((card[1].value === 2)) ||
                ((card[2].value === 2))) {
                result = true;
            }
        }

        if (card[1].value === 14) {
            if (((card[0].value === 2)) ||
                ((card[2].value === 2))
            ) {
                result = true;
            }
        }
        if (card[2].value === 14) {
            if (((card[0].value === 2)) ||
                ((card[1].value === 2))
            ) {
                result = true;
            }
        }

        return result;
    }
    almostFlush(card) {
        var result = false;

        if ((card[0].suit === card[1].suit) ||
            (card[1].suit === card[2].suit) ||
            (card[0].suit === card[2].suit)
        ) {
            result = true;
        }

        return result;
    }

/*     setAlmostFlushPoints(card) {
        return card[2].value * 0.01;
    } */

    addDetails(result, p, i, s, stringCardsCombo) {
        result.combo = stringCardsCombo;
        result.pCardSwap = p;
        result.pCardNumSwap = i;
        result.removeStringCardNum = s;
        result.plusOne = '';
        result.reason = '';
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