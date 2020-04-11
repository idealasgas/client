import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {solution: '', value: ''};

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

    axios.post(process.env.REACT_APP_API_URL, data, {headers: { Authorization: "Basic " + process.env.REACT_APP_API_KEY }})
      .then(res => {
        this.setAnswer(res['data']);
        console.log(res['data'])
      })
      .catch(error => {
        console.log('МАША ВСЕ СЛОМАЛОСЬ');
        console.log(error)
      });

    event.preventDefault();
  }

  setAnswer(data) {
    if (data['error'] === true) {
      this.setState({
        solution: 'This is not equation'
      });
    } else {
      let answer = data['roots_amount'] === 0 ? 'no roots' : data['solution'].join(', ');
      this.setState({
        solution: answer
      });
    }
  }

  render() {
    return (
      <div className="App">
        <input className='Input' placeholder="Enter equation" value={this.state.value} type="text" onChange={this.handleChange} data-testid="input-text" />
        <button onClick={this.handleClick} data-testid="button" className="Button">Solve</button>
        <div className="Solution" data-testid="answer">{this.state.solution}</div>
        <div className="Disclaimer">
          Use to solve quadratic/linear equations <br/>
          ax^2+bx+c=0 - quadratic <br/>
          ax+b=c and many others - linear
        </div>
      </div>
    );
  }
}

export default App;
