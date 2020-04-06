import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { runInThisContext } from 'vm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {solution: 'а', value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleClick(event) {
    console.log('clicked');
    let data = { equation: this.state.value };

    axios.post(`http://localhost:4567/`, data)
      .then(res => {
        console.log(res['data']);
        this.setState({solution: res['data']['roots']['roots_amount']});
        console.log(this.state.solution)
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <input placeholder="Enter equation" value={this.state.value} type="text" onChange={this.handleChange} />
        <button onClick={this.handleClick} className="Button">Solve</button>
        <div className="Solution">{this.state.solution}</div>
      </div>
    );
  }
}

export default App;
