import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = <Input />
    this.state = {solution: <Solution />}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('clicked');
    this.setState({
      solution: <Solution data="спасите" />
    })
  }

  render() {
    return (
      <div className="App">
        {this.inputField}
        <button onClick={this.handleClick} className="Button">Solve</button>
        {this.state.solution}
      </div>
    );
  }
}

class Input extends React.Component {
  render() {
    return (<input placeholder="Enter equation"></input>);
  }
}

class Solution extends React.Component {
  render() {
    return (
      <div className="Solution">{this.props.data}</div>
    )
  }
}

export default App;
