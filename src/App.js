import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import GamePlay from "./components/GamePlay.js";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">BLACKJACK</h1>
        </header>
        <div className="App">
          <GamePlay />
        </div>
      </div>
    );
  }
}

export default App;
