
function getCardValue(card) {
    console.log("getCardValue init.")
    const rank = card.rank;
    console.log("rank: " + rank);
    if (rank === "JACK" || rank === "QUEEN" || rank === "KING") {
      return 10;
    } else if (rank === "ACE") {
      return 11;
    } else {
      return rank;
    }
  }
  
  export function getBestHandScore(hand) {
    console.log("getBestHandScore init.");
    console.log("getBestHandScore hand: " + hand);
    let handScore = 0;
  
    for (let card = 0; card < hand.length; card++) {
      handScore += getCardValue(hand[card]);
    }
  
    //check for Aces
    for (let card = 0; card < hand.length; card++) {
     if (handScore > 21 && card.rank === "ACE") {
        handScore -= 10;
     }
    }
    console.log("handScore: " + handScore);
    return handScore;
  }

  export function isBusted(handScore) {
    return (handScore > 21);
  }
