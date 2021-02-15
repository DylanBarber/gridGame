import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Inputs from './components/Inputs/Inputs';
import Grid from './components/Grid/Grid';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gridSize: {
        x: 0,
        y: 0,
      },
      startPosition: '0 0 N',
      directions: '',
      key: 0
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(formData) {
    formData.preventDefault();

    const gridValues = formData.target[0].value.split(' ');
    const gridSize = {
      x: gridValues[0],
      y: gridValues[1]
    }
    const startPosition = formData.target[1].value
    const directions = formData.target[2].value;
    const timeBetweenMovements = parseInt(formData.target[3].value);

    this.setState({
      gridSize,
      startPosition,
      directions,
      gameStarted: true,
      timeBetweenMovements,
      // I use key here because I need to remount <Grid /> whenever the input values are changed. Changing the key of a react component remounts it
      key: this.state.key + 1
    })
  }

  render() {

    const grid = <Grid
      key={this.state.key}
      gridSize={this.state.gridSize}
      startPosition={this.state.startPosition}
      directions={this.state.directions}
      timeBetweenMovements={this.state.timeBetweenMovements}
    />

    return (
      <>
        <div className="inputsContainer">
          <Inputs onSubmit={() => this.onFormSubmit} />
          {this.state.gameStarted ? grid
            :
            null}

        </div>

      </>
    );
  }

}

export default App;
