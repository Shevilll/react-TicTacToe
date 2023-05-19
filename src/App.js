import { useState } from "react";

export default function App() {
    return <CreateBoard />;
}

function CreateBoard() {
    const [isX, setX] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const winner = checkWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (isX ? "X" : "O");
    }
    function handleClick(i) {
        if (squares[i] || checkWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (isX) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        setSquares(nextSquares);
        setX(!isX);
    }
    return (
        <>
            <h1>{status}</h1>
            <div>
                <MyButton value={squares[0]} clicked={() => handleClick(0)} />
                <MyButton value={squares[1]} clicked={() => handleClick(1)} />
                <MyButton value={squares[2]} clicked={() => handleClick(2)} />
            </div>
            <div>
                <MyButton value={squares[3]} clicked={() => handleClick(3)} />
                <MyButton value={squares[4]} clicked={() => handleClick(4)} />
                <MyButton value={squares[5]} clicked={() => handleClick(5)} />
            </div>
            <div>
                <MyButton value={squares[6]} clicked={() => handleClick(6)} />
                <MyButton value={squares[7]} clicked={() => handleClick(7)} />
                <MyButton value={squares[8]} clicked={() => handleClick(8)} />
            </div>
        </>
    );
}

function MyButton({ value, clicked }) {
    return (
        <>
            <button onClick={clicked}>{value}</button>
        </>
    );
}

function checkWinner(squares) {
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
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}
