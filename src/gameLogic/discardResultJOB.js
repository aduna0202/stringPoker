import tableValues from './payTable'
class threeCardResults {

    threeCards(cardSet, bonusNum, picked) {
        var cards = [], r = {}
        _.forEach(picked, (a) => {
            cards.push({
                suit: cardSet[a].charAt(0),
                value: parseInt(cardSet[a].slice(1, cardSet[a].length))
            })
        });

        if (this.straightFlush(cards)) {
            r.label = tableValues[1].text;
            r.fill = tableValues[1].clr;
            r.bonus = tableValues[1].bonusReward[bonusNum];
        }
        else if (this.threeOfKind(cards)) {
            r.label = tableValues[6].text;
            r.fill = tableValues[6].clr;
            r.bonus = tableValues[6].bonusReward[bonusNum];
        }
        else if (this.stright(cards)) {
            r.label = tableValues[5].text;
            r.fill = tableValues[5].clr;
            r.bonus = tableValues[5].bonusReward[bonusNum];
        }
        else if (this.flush(cards)) {
            r.label = tableValues[4].text;
            r.fill = tableValues[4].clr;
            r.bonus = tableValues[4].bonusReward[bonusNum];
        }
        else if (this.pair(cards)) {
            r.label = tableValues[8].dName;
            r.fill = tableValues[8].clr;
            r.bonus = tableValues[8].bonusReward[bonusNum];
        } else {
            r.bonus = 0;
        }

        if (r.bonus !== 0) {
            r.combo = picked;
        }


        return r;
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

    pResult(dRank, pRank, dTieBreaker, pTieBreaker, dQualify, fold) {

        if (fold) {
            return 'NO WIN';
        }

        if (dRank < pRank || !dQualify) {
            return 'WIN';
        }
        if (dRank > pRank) {
            return 'NO WIN'; //lose
        }
        else {
            switch (dRank) {
                case 1:  // pair
                    return this.breakPair(dTieBreaker, pTieBreaker);
                case 0: //highcard
                case 2: //Flush
                case 3: //Stright 
                case 4: //3 of a kind 
                case 5: //Stright flush 
                    return this.compareHighToLowValues(dTieBreaker, pTieBreaker);
                case 6:
                    return 'PUSH'; //Royal tie
                default:
                    return 'to be done!!';
            }
        }
    }

    /*    breakHighCard(dCards, pCards) {
            return this.compareHighToLowValues(dCards, pCards);
        }*/

    breakPair(dCards, pCards) {
        var result = 'PUSH';
        if (dCards.pair.value < pCards.pair.value) { result = 'WIN'; }
        if (dCards.pair.value > pCards.pair.value) { result = 'NO WIN'; } //lose
        if (dCards.pair.value === pCards.pair.value) {
            if (dCards.highCard.value < pCards.highCard.value) { result = 'WIN'; }
            if (dCards.highCard.value > pCards.highCard.value) { result = 'NO WIN'; }
        }
        return result;
    }

    /*    breakFlush(dCards, pCards) {
            return this.compareHighToLowValues(dCards, pCards);
        }
    
        breakStraight(dCards, pCards) {
            return this.compareHighToLowValues(dCards, pCards);
        }*/

    compareHighToLowValues(dCards, pCards) {
        var result = 'PUSH', i = 0;
        do {
            if (dCards[i].value < pCards[i].value) { result = 'WIN'; }
            if (dCards[i].value > pCards[i].value) { result = 'NO WIN'; }  //lose
            i++;
        }
        while (i < dCards.length && result === 'PUSH');
        return result;
    }

}




export { threeCardResults as default }