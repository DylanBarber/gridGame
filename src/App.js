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
      key: 0,
      sizeValidationError: false
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

    const startPositionSplit = startPosition.split(' ');

    if (gridSize.x > 50 || gridSize.y > 50 || startPositionSplit[0] > 50 || startPositionSplit[1] > 50) {
      this.setState({
        sizeValidationError: true
      });
    } else {
      this.setState({
        gridSize,
        startPosition,
        directions,
        gameStarted: true,
        timeBetweenMovements,
        // I use key here because I need to remount <Grid /> whenever the input values are changed. Changing the key of a react component remounts it
        key: this.state.key + 1,
        sizeValidationError: false
      })
    }

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
        <div className="appContainer">
          {this.state.sizeValidationError ? <h1 className="validationError">Grid Size or Coordinates Cannot Be Over 50</h1>: null}
          <Inputs onSubmit={() => this.onFormSubmit} />
          {this.state.gameStarted ? grid
            :
            null}

        </div>
    );
  }

}

export default App;
