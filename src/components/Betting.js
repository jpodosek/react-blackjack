import React, { Component } from "react";

class Betting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      betAmount: 0
    };
  }

  handleBetChange = event => {
    this.setState({ betAmount: event.target.value });
  };

  handleBetSubmit = event => {
    event.preventDefault();
    return this.props.bettingCallbackFromParent(this.state.betAmount);
  };

  render() {

    return  this.props.showBetting ? (
      <div>
        <p className="App-intro">Account Balance: {this.props.accountBalance}</p>
        <p>Place your bet</p>
        <form onSubmit={this.handleBetSubmit}>
          <input
            type="number"
            min="1"
            max={this.props.accountBalance}
            value={this.state.betAmount}
            onChange={this.handleBetChange}
          />
          <input type="submit" value="Submit" />
        </form>
    </div>) : null;
    
  }
}

export default Betting;
