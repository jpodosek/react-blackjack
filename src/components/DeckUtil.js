
const suits = ["HEARTS", "DIAMONDS", "SPADES", "CLUBS"];
const ranks = ["ACE", 2, 3, 4, 5, 6, 7, 8, 9, "JACK", "QUEEN", "KING"];

//from stack overflow
 function shuffleDeck(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  
  export default function createShuffledDeck() {
    let _deck = [];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 1; j < ranks.length; j++) {
        const card = {
          suit: suits[i],
          rank: ranks[j]
        };
        _deck.push(card);
      }
    }
    return shuffleDeck(_deck);
  };


