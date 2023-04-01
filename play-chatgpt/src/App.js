import logo from './logo.svg';
import './App.css';
import {useState} from "react";

//dumb component - don't have state
function Square({value, onSquareClick}) {
    return (
        <button className="square" onClick={onSquareClick}>{value}</button>
    );
}

function Board({squares, onPlay}) {

    const [XisNext, setXisNext] = useState(true);


    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (XisNext ? "X" : "O");
    }

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;
        const nextSquares = squares.slice();
        if (XisNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
        setXisNext(!XisNext);
    }

    return (
        <>
            <div>{status}</div>
            <div className="row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
}

function Game() {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stateNumber, setStateNumber] = useState(-1);
    const currentSquares = stateNumber === -1 ? history[history.length-1] : history[stateNumber];

    function handlePlay(nextSquares) {
        //this function should get called when the user clicks on the 'Go to this state' button and
        //the squares' state in the board component should be set to the state that is passed in from the Game component.
        //this also means I need to keep the state over here in the Game component.

        setHistory([...history, nextSquares]);
    }

    return (
        <div>
            <div>
                <ol>
                    {history.map((squares, index) => {
                        return (
                            <li key={index} style={{color:index === stateNumber? "red":"blue"}}>
                                <button onClick={() => setStateNumber(index)}>Go to this state : {index}</button>
                            </li>
                        );
                    })}
                </ol>
            </div>
            <div>
                <Board squares={currentSquares} onPlay={handlePlay} />
            </div>
        </div>
    );
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

export default Game;

/*
First state lift :
As the board needs to calculate the winner, it needs to know the state of all the squares.
Hence, we lifted the state of all the squares to the board.
The board will pass the state of the squares to the squares.

Second state lift :
As the Game component needs to display the board at any given state, it needs to know the state of all the squares at that particular move.
Hence, we need to lift up the state of the board to Game.
Game component will pass the board state to the board component.
So I need to keep the history of the board's state in the Game component and on the basis of the click from the user, I need to pass the particular board's state.
So need to add a button after every move and assign it a particular board state.
When clicked on the button, the board will be rendered with the particular board state.
The array of all nine squares' state will be sent from Game component and the board will set it up to its squares.


 */