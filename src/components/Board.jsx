import { useState } from 'react';
import Square from './Square';

export default function Board({ boardSize }) {
    // Initialize the game board based on the boardSize prop
    function emptyBoard (rows, cols) {
        const etyboard = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(
                    <Square
                        coord={`${i},${j}`}
                        value={false}
                        onSquareClick={handleClick}
                    />);
            }
            etyboard.push(row);
        }
        console.log("Empty board created:", etyboard);
        return etyboard;
    }
    const [board, setBoard] = useState(emptyBoard(boardSize, boardSize));

    function handleClick(coord) {
        // Logic to handle square click, toggling the square and its neighbors
        const [row, col] = coord.split(',').map(Number);
        //console.log(`Square clicked: ${coord} at row ${row}, col ${col}`);
        const newBoard = board.slice();
        // Toggle adjacent squares: left, right, up, down
        const directions = [
            [0, 0], // current square
            [-1, 0], // up
            [1, 0], // down
            [0, -1], // left
            [0, 1] // right
        ]
        directions.forEach(([r, c]) => {
            const newRow = row + r;
            const newCol = col + c;
            if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
                //console.log(`Toggling square at: ${newRow}, ${newCol}`);
                newBoard[newRow][newCol] = <Square
                    coord={`${newRow},${newCol}`}
                    value={!board[newRow][newCol].props.value} // toggle the square value
                    onSquareClick={handleClick}
                />;
            }
        });
        setBoard(newBoard);
    }

    return (    
        <div>
            <p className="">board</p>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((square, colIndex) => (
                        <span key={`${rowIndex}-${colIndex}`} className="board-square">
                            {square}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    )
}