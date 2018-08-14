import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";

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
    return (
      <div>
        {handToDisplay.map((card, index) => (
          <TableCell>
            <div>
              <Paper key={index} zdepth={3} style={styles.card}>
                {card.suit} {card.rank}
              </Paper>
            </div>
          </TableCell>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(ShowHand);
