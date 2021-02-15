import { Component } from "react";
import './Inputs.css';


class Inputs extends Component {


    render() {
        return (
            <form onSubmit={this.props.onSubmit()}>
                <label for="gridSize">Grid Size</label>
                <input type="text" name="gridSize"></input>

                <label for="startPosition">Starting Coordinates and Direction</label>
                <input type="text" name="startPosition"></input>

                <label for="directions">Robot Directions</label>
                <input type="text" name="directions"></input>

                <label for="timeBetweenMovements">Time between movements (In Milliseconds)</label>
                <input type="text" name="timeBetweenMovements"></input>

                <button type="submit">Submit</button>
            </form>
        )
    }

}

export default Inputs; 