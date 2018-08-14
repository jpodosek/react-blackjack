import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    
    div: {
        float: "left",
        padding: 20,
        width: "100%"
      },
})

class PreGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: 0,
      playerName: ""
    };

  }

  handlePlayerNameChange = event => {
    this.setState({ playerName: event.target.value });
  };

  handleWalletChange = event => {
    this.setState({ wallet: event.target.value });
  };

  handleWalletSubmit = event => {
    event.preventDefault();
    return (this.props.pregameCallback(this.state.playerName, this.state.wallet))
  };

  render() {
      return (
        <div>
        <p className="App-intro">Please enter your information to get started: </p>
        <div style={styles.div}>
        <form onSubmit={this.handleWalletSubmit}>
        <div>
            Name:&nbsp;
        <input
            type="text"
           
            value={this.state.playerName} onChange={this.handlePlayerNameChange} 
          />
          </div><br />
          <div>
              Account Balance:&nbsp;
          <input
            type="number"
            min="10"
            value={this.state.wallet} onChange={this.handleWalletChange} 
          />
          </div>
          <br />
          <input type="submit" value="Submit" />
        </form>
        </div>
      </div>
      );
  }
}

export default withStyles(styles)(PreGame);
