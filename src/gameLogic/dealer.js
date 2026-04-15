class dealerPerson {
    stringCards = ['', '', ''];
    primaryCards = ['', '', '', '', ''];

    deck;
    numPayMultiply;


    /* bonusCardsChances = {
        1: 2, 2: 2, 3: 2, 4: 2, 5: 3, 6: 3, 7: 3, 8: 4, 9: 4, 10: 5
    } */
    multiplyPayChances = {};

    muplitplyParams = [{ limit: 500, value: 1 },
    { limit: 850, value: 2 },
    { limit: 990, value: 3 },
    { limit: 996, value: 5 },
    { limit: 999, value: 8 },
    { limit: 1000, value: 10 }
    ];

    getCard(cardNum, testCase, cardTypes) {
        //  console.log( this.stringCards);

        if (typeof testCase === 'object' && cardTypes === 'stringCards' && testCase.length > 0) {

            this.stringCards[cardNum] = testCase[cardNum];

            var cardInDeck = this.deck.indexOf(this.stringCards[cardNum]);
            this.deck.splice(cardInDeck, 1);

            //  console.log(cardInDeck, this.deck.length, this.stringCards, testCase, cardNum - 3, cardNum);

        } else if (cardTypes === 'stringCards') {
            var cardsInDeck = this.deck.length;
            this.stringCards[cardNum] = this.deck[cardsInDeck - 1];
            this.deck.pop();
            //  console.log(this.stringCards);
        } else if (typeof testCase === 'object' && cardTypes === 'primaryCards' && testCase.length > 0) {
            this.primaryCards[cardNum] = testCase[cardNum];

            var cardInDeck = this.deck.indexOf(this.primaryCards[cardNum]);
            this.deck.splice(cardInDeck, 1);
        }
        else if (cardTypes === 'primaryCards') {
            var cardsInDeck = this.deck.length;
            this.primaryCards[cardNum] = this.deck[cardsInDeck - 1];
            this.deck.pop();
            //   console.log('primaryCards',this.primaryCards);
        }

    }



    /*  setMultiplyChances() {
 
 
         this.muplitplyParams.forEach((k, i) => {
             if (i === 0) {
                 k.percent = (k.limit / 1000 * 100).toFixed(1) + '%';
             } else {
                 var chunk = this.muplitplyParams[i].limit - this.muplitplyParams[i - 1].limit;
                 k.percent = (chunk / 1000 * 100).toFixed(1) + '%';
             }
         });
 
         var result = {};
         for (var i = 1; i <= 1000; i++) {
 
             this.muplitplyParams.forEach((k) => {
 
                 if (i <= k.limit && typeof result[i] === 'undefined') {
                     result[i] = k.value;
                 }
             });
         }
 
         this.multiplyPayChances = result;
 
     } */

    /*   getMultiply() {
          return this.multiplyPayChances[Math.floor(Math.random() * 1000) + 1];
      } */

    swapCard(cardNum) {

        this.primaryCards[cardNum] = this.deck[this.deck.length - 1];
        this.deck.pop();

    }

    upgradeStringCard(removeCard, newCard) {
        var cardRemoved = this.stringCards[removeCard];
        this.stringCards.splice(removeCard, 1, newCard)
        return cardRemoved;
    }

    newDeck() {
        /*  this.MDCard = false; */
        var suits = ['C', 'H', 'S', 'D'];
        this.deck = [];
        for (var s = 0; s < suits.length; s++) {
            for (var r = 2; r <= 14; r++) {
                this.deck.push(suits[s] + r
                );
            }
        }
        this.shuffle(this.deck);
    }

    shuffle(array) {
        var i = 0, j = 0, temp = null
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

    constructor() {
        // this.clearCards();
    }

}

export { dealerPerson as default }