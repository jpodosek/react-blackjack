import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ShowHand from "./components/ShowHand";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import createShuffledDeck from "./components/DeckUtil.js";
import { getBestHandScore, isBusted } from "./components/Scoring.js";

// const suits = ["HEARTS", "DIAMONDS", "SPADES", "CLUBS"];
// const ranks = ["ACE", 2, 3, 4, 5, 6, 7, 8, 9, "JACK", "QUEEN", "KING"];

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameActive: false,
      isRoundActive: false,
      player1: {
        name: "Jonny",
        hand: [],
        handScore: 0,
        wallet: 0,
        betAmount: 0
      },
      player2: {
        name: "Dealer",
        hand: [],
        handScore: 0
      },
      deck: createShuffledDeck()
    };
  }

  startGame = () => {
    console.log("start game kicked off.");

    let _deck = this.state.deck;

    let player1Hand = [];
    player1Hand.push(_deck.pop());
    player1Hand.push(_deck.pop());

    let player2Hand = [];
    player2Hand.push(_deck.pop());
    player2Hand.push(_deck.pop());

    this.setState(prevState => ({
      isGameActive: true,
      isRoundActive: true,
      player1: {
        ...prevState.player1,
        wallet: 100,
        hand: player1Hand
      },
      player2: {
        ...prevState.player2,
        hand: player2Hand
      }
      //deck: _deck
    }));

    // console.log("deck1: " + JSON.stringify(this.state.deck));
    // console.log("Jonny: " + JSON.stringify(this.state.player1));
    // console.log("Dealer: " + JSON.stringify(this.state.player2));
    // console.log("deck: " + JSON.stringify(this.state.deck.length));
  };

  //refactor resuable code from start game into here
  startNewRound = () => {};

  //can refact part of this to //dealcard, passing in the person

  //then reuse deal card between hit me and dealer
  hitMe = () => {
    console.log("hit me fired.");
    const _deck = this.state.deck;

    const player1Hand = this.state.player1.hand;
    player1Hand.push(_deck.pop());

    const playerScore = getBestHandScore(player1Hand);

    //Player did NOT bust
    if (!isBusted(playerScore)) {
      this.setState(prevState => ({
        player1: {
          ...prevState.player1,
          hand: player1Hand,
          handScore: getBestHandScore(player1Hand)
        }
      }));
      //Player Busted
    } else {
      this.setState(prevState => ({
        isRoundActive: false,
        player1: {
          ...prevState.player1,
          hand: player1Hand,
          handScore: getBestHandScore(playerScore),
          wallet: prevState.player1.wallet + -10, //update to use bet amount
          betAmount: 0
        }
      }));
    }
  };

  //--TODO
  //GitBestHandscore
  //IsUserBusted

  //--------------------------------------------
  render() {
    const StartGameButton = () => {
      return !this.state.isGameActive ? (
        <div className="button">
          <button onClick={this.startGame}>Start!</button>
        </div>
      ) : null;
    };

    const HitMeButton = () => {
      return this.state.isRoundActive ? (
        <div className="button">
          <button onClick={this.hitMe}>Hit Me!</button>
        </div>
      ) : null;
    };

     const handleBet = (event) => {
      this.setState({value: event.target.value});
    },

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">BLACKJACK</h1>
        </header>
        <p className="App-intro">Let's play!</p>

        <StartGameButton />
        <div className={this.props.classes.root}>
          <input type="text" value={this.state.value} onChange={handleBet}/>
          <Paper>
            <Table className={this.props.classes.table}>
              <div style={styles.div}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div style={styles.paperTop}>
                        <h3>Dealer:</h3>
                        <ShowHand
                          hand={this.state.player2.hand}
                          isGameActive={this.state.isGameActive}
                          isRoundActive={this.state.isRoundActive}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableCell>
                    <div style={styles.paperBottom}>
                      <h3>{this.state.player1.name}:</h3>
                      <ShowHand
                        hand={this.state.player1.hand}
                        isGameActive={this.state.isGameActive}
                        isRoundActive={this.state.isRoundActive}
                      />
                      <HitMeButton />
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

// let ShowHand = ({hand}) => {
//   console.log("hand: " + hand);
//   let display = null;

//   for (let card in hand) {
//     display += <span>{card.suit}</span>;
//     display += <span>{card.rank}</span>;
//   }

//   return <div>{display}</div>;
// };

export default withStyles(styles)(App);
