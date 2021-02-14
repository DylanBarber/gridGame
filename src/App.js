import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Inputs from './components/Inputs/Inputs';
import Grid from './components/Grid/Grid';

class App extends Component {

  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(formData) {
    formData.preventDefault();

    const gridSizeValue = formData.target[0].value;
    const startPosition = formData.target[1].value
    const directions = formData.target[2].value;

    console.log(gridSizeValue);
    console.log(startPosition);
    console.log(directions);
  }

  render() {
    return (
      <>
        <div className="inputsContainer">
          <Inputs onSubmit={() => this.onFormSubmit} />
          <Grid gridSize={{ x: 10, y: 10 }} startPosition={'3 6 S'} />
        </div>

      </>
    );
  }

}

export default App;
