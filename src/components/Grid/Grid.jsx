import { Component } from 'react';
import './Grid.css';

class Grid extends Component {

    constructor(props) {
        super(props);

        this.state = {
            grid: [],
            gridSize: this.props.gridSize,
            startPosition: null,
            currentPosition: null,
            doneMoving: false,
        }

    }

    componentDidMount() {
        const grid = Array.from({ length: this.state.gridSize.y }, () => (Array.from({ length: this.state.gridSize.x }, () => ({ active: false, direction: null }))));

        this.setState(
            {
                grid,
                startPosition: this.getStartPositionObj(this.props.startPosition)
            }, () => {
                this.setStartPosition();
            }
        );
    }

    getStartPositionObj() {

        const startPositionData = this.props.startPosition.split(' ');
        startPositionData[0] = parseInt(startPositionData[0]);
        startPositionData[1] = parseInt(startPositionData[1]);

        switch (startPositionData[2]) {
            case 'N':
                startPositionData[2] = 0
                break;

            case 'E':
                startPositionData[2] = 1
                break;

            case 'S':
                startPositionData[2] = 2
                break;

            case 'W':
                startPositionData[2] = 3
                break;

            default:
                throw new Error('Expected start position direction to be either N, E, S, or W');
        }

        return {
            x: startPositionData[0],
            y: startPositionData[1],
            direction: startPositionData[2]
        }
    }

    setStartPosition() {
        //Doing this to deep copy the multi-dim array from state
        const updatedGrid = JSON.parse(JSON.stringify(this.state.grid));

        const { startPosition } = this.state;

        updatedGrid[startPosition.x][startPosition.y] = {active: true, direction: startPosition.direction}

        this.setState(
            {
                grid: updatedGrid,
                currentPosition: startPosition
            }
        )
    }

    moveRobot() {
        
        const { directions } = this.state;

        const moveAndDelay = movement => {
            //Deep copying grid from state
            const { currentPosition, grid, gridSize } = this.state

            const updatedGrid = JSON.parse(JSON.stringify(grid));

            const newPosition = {
                x: currentPosition.x,
                y: currentPosition.y,
                direction: currentPosition.direction
            }

            if (movement === 'F') {
                switch (currentPosition.direction) {
                    case 0:
                        newPosition.y = currentPosition.y - 1
                        break;
                    case 1:
                        newPosition.x = currentPosition.x + 1
                        break;
                    case 2:
                        newPosition.y = currentPosition.y + 1
                        break;
                    case 3:
                        newPosition.x = currentPosition.x - 1
                        break;
                    default:
                        throw new Error('Expected direction to be 0-3')
                }
            } else {
                if (movement === 'R' && currentPosition.direction !== 3) {
                    newPosition.direction = currentPosition.direction + 1;
                } else if (movement === 'R' && currentPosition.direction === 3) {
                    newPosition.direction = 0;
                }
        
                if (movement === 'L' && currentPosition.direction !== 0) {
                    newPosition.direction = currentPosition.direction - 1;
                } else if (movement === 'L' && currentPosition.direction === 0) {
                    newPosition.direction = 3;
                }
            }
        
            if (newPosition.x > (gridSize.x - 1) ||
                newPosition.x < 0 ||
                newPosition.y > (gridSize.y - 1) ||
                newPosition.y < 0) {
                console.log(`LOST ${currentPosition.x + 1} ${currentPosition.y + 1}`);
            } else {
                console.log(newPosition);
        
        
                updatedGrid[currentPosition.y][currentPosition.x] = { active: false, direction: null }
                updatedGrid[newPosition.y][newPosition.x] = { active: true, direction: newPosition.direction }

                setTimeout(() => {
                    this.setState({
                        grid: updatedGrid,
                        currentPosition: newPosition
                    });
                }, 2000)
            }

        }

        
    }

    render() {

        const gridDisplay = this.state.grid.map(gridRow => {
            return (
                <div className="gridRow">
                    {gridRow.map(gridCell => {
                        if (gridCell.active) {
                            switch (gridCell.direction) {
                                case 0:
                                    return <img className='upArrow' alt='Up Arrow' src={`${process.env.PUBLIC_URL}/arrow.svg`}></img>

                                case 1:
                                    return <img className='rightArrow' alt='Right Arrow' src={`${process.env.PUBLIC_URL}/arrow.svg`}></img>

                                case 2:
                                    return <img className='downArrow' alt='Down Arrow' src={`${process.env.PUBLIC_URL}/arrow.svg`}></img>

                                case 3:
                                    return <img className='leftArrow' alt='Left Arrow' src={`${process.env.PUBLIC_URL}/arrow.svg`}></img>

                                default:
                                    throw new Error('Expected a direction (0-3)');
                            }
                        } else {
                            return <div><h1 className="gridCell">O</h1></div>
                        }
                    })}
                </div>
            )
        })

        return (
            <div className="gridContainer">
                {gridDisplay}
            </div>
        )
    }
}

export default Grid;