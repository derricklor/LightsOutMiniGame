import { useState, useEffect } from 'react';

import Board from './components/Board';

export default function App() {
	const [boardSize, setboardSize] = useState(4);
	const [isDarkTheme, setIsDarkTheme] = useState(() => {
		// Check for saved theme preference on component mount
		const savedTheme = localStorage.getItem('theme');
		return savedTheme === 'dark';
	});

	// useEffect to apply/remove 'dark' class to body and update localStorage
	useEffect(() => {
		if (isDarkTheme) {
			document.body.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.body.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [isDarkTheme]); // Re-run when isDarkTheme changes

	// Function to toggle the theme
	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	

	return (
		<main className="flex flex-col min-h-screen items-center bg-gray-100 text-gray-900 transition-colors duration-300 ease-in-out dark:bg-gray-900 dark:text-gray-100">
			<button
				className="w-40 h-40 hover:cursor-pointer"
				onClick={toggleTheme}
			>
				<img
					src={isDarkTheme ? "lightbulb-on.svg" : "lightbulb.svg"}
					alt="toggle theme"
				/>
			</button>

			<h1>Lights Out Game</h1>
			<p>Click on the lights to turn them on or off.</p>
			<div className='flex m-4'>
				<button
					className="bg-gray-300 dark:bg-gray-400 m-1 rounded hover:cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-300 min-w-[6rem]"
					onClick={() => setboardSize(3)}
				>
					3x3
				</button>
				<button
					className="bg-gray-300 dark:bg-gray-400 m-1 rounded hover:cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-300 min-w-[6rem]"
					onClick={() => setboardSize(4)}
				>
					4x4
				</button>
				<button
					className="bg-gray-300 dark:bg-gray-400 m-1 rounded hover:cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-300 min-w-[6rem]"
					onClick={() => setboardSize(5)}
				>
					5x5
				</button>
			</div>
			<Board boardSize={boardSize} />
		</main>
	)
}
