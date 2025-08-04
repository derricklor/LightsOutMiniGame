import { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board'

export default function App() {
	const [boardSize, setboardSize] = useState(4)
	

	return (
		<div>
			<h1>Lights Out Game</h1>
			<p>Click on the lights to turn them on or off.</p>
			<button onClick={() => setboardSize(3)}>3x3</button>
			<button onClick={() => setboardSize(4)}>4x4</button>
			<button onClick={() => setboardSize(5)}>5x5</button>
			
			<Board boardSize={boardSize} />
		</div>
	)
}
