import tableValues from './payTable'

class threeCardResults {

    threeCards(cardSet, bonusNum, ongoingPlay) {
        // console.log('ongoing play?',ongoingPlay)
        var cards = [], r = {}
        _.forEach(cardSet, (a) => {
            cards.push({
                suit: a.charAt(0),
                value: parseInt(a.slice(1, a.length))
            })
        });

        if (this.miniRoyal(cards)) {
            if (ongoingPlay) {
                r.label = 'String Royal';
                r.fill = '#E02629';
                r.bonus = 50;
            } else {
                r.label = 'Dealt String Royal';
                r.fill = '#d61111';
                r.bonus = 100;
            }

        }
        else if (this.straightFlush(cards)) {
            r.label = tableValues[1].text;
            r.fill = tableValues[1].clr;
            r.bonus = tableValues[1].bonusReward[bonusNum];
        }
        else if (this.threeOfKind(cards)) {
            r.label = tableValues[10].text;
            r.fill = tableValues[10].clr;
            r.bonus = tableValues[10].bonusReward[bonusNum];
        }
        else if (this.stright(cards)) {
            r.label = tableValues[9].text;
            r.fill = tableValues[9].clr;
            r.bonus = tableValues[9].bonusReward[bonusNum];
        }
        else if (this.flush(cards)) {
            r.label = tableValues[8].text;
            r.fill = tableValues[8].clr;
            r.bonus = tableValues[8].bonusReward[bonusNum];
        }
        else if (this.pair(cards)) {
            r.label = tableValues[12].dName;
            r.fill = tableValues[12].clr;
            r.bonus = tableValues[12].bonusReward[bonusNum];
        } else {
            r.bonus = 1;
            r.label = 'No Bonus Win';
            r.fill = '#165704'
        }

        /*  if (r.bonus !== 0) {
             r.combo = picked;
         } */

        return r;
    }

    miniRoyal(card) {
        var result = true;
        var sameSuits = this.findSameSuits(card);
        if (sameSuits.length === 3) {
            var reqValues = [12, 13, 14];
            _.forEach(reqValues, (v) => {
                var valueCheck = sameSuits.indexOf(v);
                if (valueCheck === -1) { result = false; }
            });
        } else {
            result = false;
        }
        return result;
    }

    pair(card) {
        if (card[0].value === card[1].value ||
            card[0].value === card[2].value ||
            card[1].value === card[2].value
        ) {
            return true;
        }
        return false;
    }

    setPairBreaker(card) {
        var pair, highCard;
        if (card[0].value === card[1].value) { pair = card[0]; highCard = card[2]; }
        if (card[0].value === card[2].value) { pair = card[0]; highCard = card[1]; }
        if (card[1].value === card[2].value) { pair = card[1]; highCard = card[0]; }
        return {
            pair: pair,
            highCard: highCard
        }
    }

    flush(card) {
        return this.findSameSuits(card).length === 3 ? true : false;
    }

    stright(card) {
        return this.orderedValues(card) ? true : false;
    }

    threeOfKind(card) {
        var result = true;
        var sameValue = [];
        _.forEach(card, (c, i) => {
            if (i === 0) {
                sameValue.push(c.value);
            } else if (c.value === card[i - 1].value) {
                sameValue.push(c.value);
            }
        });
        if (sameValue.length !== 3) {
            result = false;
        }
        return result;
    }

    straightFlush(card) {
        return this.findSameSuits(card).length === 3 && this.orderedValues(card) ? true : false;
    }

    royalSpades(card) {
        var result = true;
        var spadeCardValues = [];
        _.forEach(card, (c) => {
            if (c.suit === 'S') { spadeCardValues.push(c.value); }
        });

        if (spadeCardValues.length === 3) {
            var reqValues = [12, 13, 14];
            _.forEach(reqValues, (v) => {
                var valueCheck = spadeCardValues.indexOf(v);
                if (valueCheck === -1) { result = false; }
            });
        } else {
            result = false;
        }
        return result;
    }

    royal(card) {
        var result = true;
        var sameSuits = this.findSameSuits(card);
        if (sameSuits.length === 3) {
            var reqValues = [12, 13, 14];
            _.forEach(reqValues, (v) => {
                var valueCheck = sameSuits.indexOf(v);
                if (valueCheck === -1) { result = false; }
            });
        } else {
            result = false;
        }
        return result;
    }

    orderedValues(card) {
        var result = true;
        var aceFound = false;
        var finalResult = false;
        var sortedCards = _.sortBy(card, [function (c) { return c.value; }]);
        _.forEach(sortedCards, (c, i) => {
            if (c.value === 14) { aceFound = true; }
            if (i > 0 && c.value !== sortedCards[i - 1].value + 1) { result = false; }
        });

        if (result) {
            finalResult = true;
        }

        var result2 = true;
        if (aceFound) {
            _.forEach(card, (c) => {
                if (c.value === 14) { c.value = 1; }
            });

            sortedCards = _.sortBy(card, [function (c) { return c.value; }]);
            _.forEach(sortedCards, (c, i) => {
                if (i > 0 && c.value !== sortedCards[i - 1].value + 1) { result2 = false; }
            });
            _.forEach(card, (c) => {
                if (c.value === 1) { c.value = 14 }
            });

            if (result2) {
                finalResult = true;
            }
        }


        return finalResult;
    }

    findSameSuits(card) {
        var sameSuits = [];
        _.forEach(card, (c, i) => {
            if (i === 0) {
                sameSuits.push(c.value);
            } else if (c.suit === card[i - 1].suit) {
                sameSuits.push(c.value);
            }
        });
        return sameSuits;
    }

    dQualify(dResults, cards) {
        var qOrHIgherFound = false;
        var result = false;

        _.forEach(cards, (a) => {
            var value = parseInt(a.slice(1, a.length));
            if (value === 12 || value === 13 || value === 14) {
                qOrHIgherFound = true;
            }
        });


        if (dResults.rank > 0 || qOrHIgherFound) {
            result = true;
        }

        return result;

    }

}

export { threeCardResults as default }