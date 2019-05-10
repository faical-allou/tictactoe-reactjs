import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
    return (
        <button className = {props.className}
        onClick={props.onClick}>
        {props.value}
        </button>
    )
}

function Reset(props) {
    return (
        <button className = "reset" 
        onClick={props.onClick}>
        Reset
        </button>
    )
}

class Board extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          squares: Array(9).fill(null),
          styling: Array(9).fill(null),
          xIsNext: true,
      };
  }

  handleClick(i) {
      const squares_ = this.state.squares.slice();
      squares_[i] = this.state.xIsNext ? 'X':'O';
      const styling_ = this.state.styling.slice();
      if (this.state.xIsNext) {
        styling_[i] = 'square Xstyle';
      } else {
        styling_[i] = 'square Ostyle';
      }
      
      this.setState({
          squares: squares_,
          xIsNext: !this.state.xIsNext,
          styling: styling_,
        })
  }

  handleClick_R() {
    const squares_ = Array(9).fill(null);
    this.setState({
        squares: squares_,
      })
  }

  renderSquare(i) {
    return (
    <Square
    className = {'square ' + this.state.styling[i]}
    value={this.state.squares[i] }
    onClick={() => this.handleClick(i)}/>
    );
  }

  renderReset() {
    return (
    <Reset
    onClick={() => this.handleClick_R()}/>
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    let styling_status;
    if (winner) {
        status = 'Winner: ' + winner;
        styling_status = 'styling_winner'
    } else {
    status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
    styling_status =  ' '
    }

    return (
      <div>
        <div className={"status "+ styling_status}>{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        {this.renderReset()}
      </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
