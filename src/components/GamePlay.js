import React, { Component } from "react";
import "../App.css";
import ShowHand from "./ShowHand";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import createShuffledDeck from "./DeckUtil.js";
import { getBestHandScore, isBusted } from "./Scoring.js";
import PreGame from "./PreGame.js";
import Betting from "./Betting.js";
/*
This class holds and controlls all state for the application.

*/

const styles = theme => ({
  root: {
    maxWidth: 1200,
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    margin: "auto"
  },
  table: {
    minWidth: 700
  },

  div: {
    display: "flex",
    flexDirection: "row wrap",
    padding: 20,
    width: "100%"
  },
  paperTop: {
    flex: 1,
    height: "50%",
    margin: 10,
    textAlign: "center",
    padding: 10
  },
  paperBottom: {
    height: "50%",
    flex: 4,
    margin: 10,
    textAlign: "center"
  }
});

class GamePlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreGameActive: true,
      isBettingActive: false,
      isRoundActive: false,
      // showHitMe: false,
      player1: {
        name: "",
        hand: [],
        handScore: 0,
        wallet: 0,
        betAmount: 0
      },
      dealer: {
        name: "Dealer",
        hand: [],
        handScore: 0
      },
      deck: createShuffledDeck()
    };

    let outcomeMessage = "";
  }

  startNewRound = () => {
    const _deck = this.state.deck;
    const _player1Hand = [];
    _player1Hand.push(_deck.pop());
    _player1Hand.push(_deck.pop());

    const _dealerHand = [];
    _dealerHand.push(_deck.pop());
    _dealerHand.push(_deck.pop());

    this.setState(prevState => ({
      isRoundActive: true,
      player1: {
        ...prevState.player1,
        hand: _player1Hand,
        handScore: getBestHandScore(_player1Hand)
      },
      dealer: {
        ...prevState.dealer,
        hand: _dealerHand,
        handScore: getBestHandScore(_dealerHand)
      }
    }));
  };

  //can refact part of this to //dealcard, passing in the person
  //then reuse deal card between hit me and dealer
  handleHit = () => {
    const _player1Hand = this.state.player1.hand;
    _player1Hand.push(this.state.deck.pop());

    const playerScore = getBestHandScore(_player1Hand);

    //Player Busted
    if (isBusted(playerScore)) {
      this.setState(prevState => ({
        outcomeMessage: "You busted!!!!",
        isRoundActive: false,
        isBettingActive: true,
        player1: {
          ...prevState.player1,
          wallet: prevState.player1.wallet - prevState.player1.betAmount, //update to use bet amount
          betAmount: 0
        }
      }));
    }

    this.setState(prevState => ({
      player1: {
        ...prevState.player1,
        hand: _player1Hand,
        handScore: playerScore
      }
    }));
  };

  handleStand = () => {
    while (this.state.dealer.handScore < 17) {
      const _dealerHand = this.state.dealer.hand;
      _dealerHand.push(this.state.deck.pop());
      console.log("dealer hit: ");
      console.log("this.state.dealer.handScore: " + this.state.dealer.handScore);
      this.setState(prevState => ({
        dealer: {
          ...prevState.dealer,
          hand: _dealerHand,
          handScore: getBestHandScore(_dealerHand)
        }
      }));

      console.log("dealerHand inside while loop " + _dealerHand);

      // _dealerHandScore = getBestHandScore(_dealerHand);
    }

    // this.setState(prevState => ({

    //   dealer: {
    //     ...prevState.dealer,
    //   hand: _dealerHand,
    //   handScore: _dealerHandScore
    //   }
    // }));

    // this.setState({
    //   dealer: {
    //     handScore: _dealerHandScore
    //   }
    // });

    //const _dealerHandScore = this.state.dealer.handScore;
    const _playerHandScore = this.state.player1.handScore;
    const _dealerHandScore = this.state.dealer.handScore;
    const _currentBet = this.state.betAmount;
    
    let msg = "";
    let payout = 0;
    if (isBusted(_dealerHandScore)) {
      msg = "Dealer Busted! You win!";
      payout = _currentBet * 2;
    } else if (_playerHandScore === 21 && _dealerHandScore !== 21) {
      msg = "Blackjack! You win 1.5 times your bet.";
      payout = _currentBet + _currentBet / 2;
    } else if (_playerHandScore === _dealerHandScore) {
      msg = "Draw! You win your bet.";
      payout = _currentBet;
    } else if (_playerHandScore > _dealerHandScore) {
      msg = "Got him!!! You win 2 times your bet.";
      payout = _currentBet * 2;
    }

    this.setState(prevState => ({
      outcomeMessage: msg,
      isRoundActive: false,
      isBettingActive: true,
      player1: {
        ...prevState.player1,
        wallet: prevState.player1.wallet + payout,
        betAmount: 0
      }
      // dealer: {
      //   ...prevState.dealer,
      //   handScore: _dealerHandScore,
      //   hand: _dealerHand
      // }
    }));
  };

  handlePreGameSetup = (playerNameFromPreGame, walletAmountFromPreGame) => {
    this.setState(prevState => ({
      isPreGameActive: false,
      isBettingActive: true,
      player1: {
        ...prevState.player1,
        name: playerNameFromPreGame,
        wallet: walletAmountFromPreGame
      }
    }));
  };

  handleSetBet = betAmountFromChild => {
    this.setState(prevState => ({
      isBettingActive: false,
      outcomeMessage: "",
      player1: {
        ...prevState.player1,
        betAmount: betAmountFromChild,
        hand: [], //reset hand
        handScore: 0
      },
      dealer: {
        ...prevState.dealer,
        hand: [], //reset hand
        handScore: 0
      }
    }));
    this.startNewRound();
  };

  render() {
    const HitMeButton = () => {
      return this.state.isRoundActive ? (
        <div className="button">
          <button onClick={this.handleHit}>Hit Me!</button>
        </div>
      ) : null;
    };

    const StayButton = () => {
      return this.state.isRoundActive ? (
        <div className="button">
          <button onClick={this.handleStand}>Stay</button>
        </div>
      ) : null;
    };

    if (this.state.isPreGameActive) {
      return <PreGame pregameCallback={this.handlePreGameSetup} />;
    } else {
      return (
        <div>
          <div className={this.props.classes.root}>
            <Betting
              showBetting={this.state.isBettingActive}
              bettingCallbackFromParent={this.handleSetBet}
              accountBalance={this.state.player1.wallet}
            />
            <Paper>
              <Table className={this.props.classes.table}>
                <h2>
                  <ShowOutcomeMessage message={this.state.outcomeMessage} />
                </h2>
                <div style={styles.div}>
                  <TableBody>
                    <TableRow>
                      <h3>Dealer:</h3>
                      <TableCell>
                        <div style={styles.paperTop}>
                          <ShowHand hand={this.state.dealer.hand} />
                        </div>
                      </TableCell>
                    </TableRow>
                    <h3>{this.state.player1.name}:</h3>
                    <TableCell>
                      <div style={styles.paperBottom}>
                        <ShowHand hand={this.state.player1.hand} />
                        <p>Hand Score: {this.state.player1.handScore}</p>
                        <span>
                          <HitMeButton />
                          <StayButton />
                        </span>
                      </div>
                    </TableCell>
                  </TableBody>
                </div>
              </Table>
            </Paper>
          </div>
        </div>
      );
    }
  }
}

class ShowOutcomeMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <p>{this.props.message}</p>;
  }
}

export default withStyles(styles)(GamePlay);
