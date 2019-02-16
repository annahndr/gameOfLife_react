import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Box extends React.Component{

  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col)
  }

  render(){
    return(
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
        />
    );
  }
}


class Grid extends React.Component {
  render(){
    const width = (this.props.cols * 16) + 1; //refer to 'cols' being passed down as props in Grid component
    var rowsArr = [];

    var boxClass = "";
    for (var i = 0; i < this.props.rows; i ++) {
      for (var j = 0; j < this.props.cols; j ++) {
        let boxID = i + "_" + j; //this creates the ID for each box element

        boxClass = this.props.gridFull[i][j] ? "box on" : "box off"; //this looks at a specific box and checks if it is on or off
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxID}
            boxId={boxID}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        )
    }
  }
    //^^we are pushing a load of boxes into the array

    return (
      <div className="grid" style={{width: width}}>
        {rowsArr}

      </div>
    );
  }
}



class Main extends React.Component {

  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;
    //^^this are not in the state as we are going to reference the rows and the columns when we create the grid state (see below)

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
      //^^ this means, we are going to create an array that is as big as the rows variable, and then we are going to fill that with another array which is as big as the columns variable, and each element in that array is false (dead). So it is an array of arrays
    }
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col]; //so if it true it'll be false and vice versa
    this.setState({
      gridFull: gridCopy
    })
  }

  seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        if(Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    });
  }

  playButton = () => {
    clearInterval(this.intervalID)
    this.intervalID = setInterval(this.play, this.speed);
  }

  play = () => {
    let g = this.state.gridFull
    let g2 = arrayClone(this.state.gridFull);

    for (let i =0; i < this.rows; i++){
      for (let j = 0; j < this.cols; j++){
        let count = 0;
        if
      }
    }
  }

//componentDidMount runs whatever is in the method as soon as it's loaded
  componentDidMount(){
    this.seed();
  }

  // each component needs a render function
  render() {
    return (
      <div>
          <h1>The Game of Life</h1>
          <Grid
            gridFull = {this.state.gridFull}
            rows = {this.rows}
            cols = {this.cols}
            selectBox = {this.selectBox}
          />
          <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

//this is a helper function - has to be a deep clone as it is a nested array
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}


ReactDOM.render(<Main />, document.getElementById('root')); // follow 'root' to public/index/html to see where the whole app will load.

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
