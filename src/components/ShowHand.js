import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";

const styles = {
  div: {
    display: "flex",
    flexDirection: "row wrap",
    padding: 20,
    width: "100%"
  },
  paperLeft: {
    flex: 1,
    height: "100%",
    margin: 20,
    textAlign: "center",
    padding: 20
  },
  card: {
   
    flex: 4,
    height: "100%",
    margin: 10,
    textAlign: "center",
    padding: 60
  }
};

const getUnicodeSuit = suit => {
  switch (suit) {
    case "HEARTS":
      return "\u2665";
    case "DIAMONDS":
      return "\u2666";
    case "SPADES":
      return "\u2660";
    case "CLUBS":
      return "\u2663";
  }
};

class ShowHand extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const handToDisplay = [];

    for (let i = 0; i < this.props.hand.length; i++) {
      handToDisplay.push({
        suit: getUnicodeSuit(this.props.hand[i].suit),
        rank: this.props.hand[i].rank
      });
    }

    if (this.props.isGameActive && this.props.isRoundActive) {
      // return (<DisplayHand />);
      return (
        <div style={styles.paperLeft}>
          {handToDisplay.map((card, index) => (
            <Paper key={index} zdepth={3} style={styles.card}>
              {card.suit} {card.rank}
            </Paper>
          ))}
        </div>
      );
    } else {
      console.log("this.props.hand is undefined!");
      return null;
    }
  }
}

export default withStyles(styles)(ShowHand);
