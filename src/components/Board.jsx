import React, { useState, useEffect } from 'react';
import Square from './Square';

// Helper function to create a new board state
const createBoard = (size, numClicks) => {
  // Start with a completely off board.
  let newBoard = Array.from({ length: size }, () => Array(size).fill(false));

  // A helper function to toggle a single light
  const toggle = (board, r, c) => {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      board[r][c] = !board[r][c];
    }
  };

  // A helper function to simulate a click on the board state
  const simulateClick = (board, r, c) => {
    toggle(board, r, c);       // Clicked square
    toggle(board, r, c - 1);   // Left
    toggle(board, r, c + 1);   // Right
    toggle(board, r - 1, c);   // Top
    toggle(board, r + 1, c);   // Bottom
  };

  // To guarantee a solvable board, we start with a solved board and make random moves.
  // Here, we'll make 10 random moves.
  const clicks = new Set();
  const maxClicks = Math.min(numClicks, size * size); // Ensure we don't loop forever on small boards
  while (clicks.size < maxClicks) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    clicks.add(`${row}-${col}`);
  }

  // Apply the random clicks to the board
  clicks.forEach(coord => {
    const [row, col] = coord.split('-').map(Number);
    simulateClick(newBoard, row, col);
  });

  return newBoard;
};

const Board = ({ boardSize }) => {
    const [board, setBoard] = useState(createBoard(boardSize,10));
    const [hasWon, setHasWon] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    // This effect hook re-creates the board when the size changes
    useEffect(() => {
        switch (boardSize) {
            case 3:
                setBoard(createBoard(3,4));
                break;
            case 4:
                setBoard(createBoard(4,10));
                break;
            case 5:
                setBoard(createBoard(5,15));
                break;
            default:
                setBoard(createBoard(4,10));
        }
        setHasWon(false); // Reset win state on resize
        setClickCount(0); // Reset click count on resize
    }, [boardSize]);

    // Check for a win condition whenever the board changes
    useEffect(() => {
        const isGameWon = board.every(row => row.every(light => !light));
        setHasWon(isGameWon);
    }, [board]);

    const handleSquareClick = (row, col) => {
        if (hasWon) return; // Don't allow clicks if the game is won

        setClickCount(clickCount + 1);

        let newBoard = board.map(arr => arr.slice());

        const toggleLight = (r, c) => {
            if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
                newBoard[r][c] = !newBoard[r][c];
            }
        };

        toggleLight(row, col);       // Clicked square
        toggleLight(row, col - 1);   // Left
        toggleLight(row, col + 1);   // Right
        toggleLight(row - 1, col);   // Top
        toggleLight(row + 1, col);   // Bottom

        setBoard(newBoard);
    };

    const handleNewGame = () => {
        switch (boardSize) {
            case 3:
                setBoard(createBoard(3,4));
                break;
            case 4:
                setBoard(createBoard(4,10));
                break;
            case 5:
                setBoard(createBoard(5,15));
                break;
                default:
                    setBoard(createBoard(4,10));
                }
                setHasWon(false);
                setClickCount(0);
            };
            
    return (
        <div className="dark:text-white">
            <div className="game-info">
                <button className="bg-green-300 rounded mb-2 p-1 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600" 
                onClick={handleNewGame}>New Game</button>
                <p className="click-counter dark:text-white">Clicks: {clickCount}</p>
            </div>
            {hasWon ? (
                <h1 className="mt-4 shadow-lg dark:text-white">You Won in {clickCount} clicks!</h1>
            ) : null}
            <div className="mt-5 border-2 border-gray-600 p-2.5 bg-gray-700 mx-auto w-fit">
                {board.map((row, r_idx) => (
                    <div className="flex gap-1.5 mb-1.5 last:mb-0" key={r_idx}>
                        {row.map((isLit, c_idx) => (
                            <Square
                                key={`${r_idx}-${c_idx}`}
                                isLit={isLit}
                                onClick={() => handleSquareClick(r_idx, c_idx)}
                            />
                        ))}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Board;
