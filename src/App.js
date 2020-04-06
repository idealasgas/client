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
    this.setAnswer = this.setAnswer.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleClick(event) {
    let data = { equation: this.state.value };

    axios.post(`http://localhost:4567/`, data)
      .then(res => {
        this.setAnswer(res['data']);
      })
      .catch(error => {
        console.log('МАША ВСЕ СЛОМАЛОСЬ');
      });

    event.preventDefault();
  }

  setAnswer(data) {
    if (data['error'] === true) {
      this.setState({
        solution: 'This is not equation'
      });
    } else {
      let answer = data['roots']['roots_amount'] === 0 ? 'no roots' : data['roots']['solution'].join(', ');
      this.setState({
        solution: answer
      });
    }
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
