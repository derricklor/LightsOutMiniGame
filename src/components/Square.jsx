
import React from 'react';

const Square = ({ isLit, onClick }) => {
  const className = `w-16 h-16 border border-gray-400 dark:border-gray-500 p-0 flex justify-center items-center text-4xl 
  leading-none transition-colors duration-200 ease-in-out cursor-pointer hover:shadow-[0_0_10px_#fff,inset_0_0_5px_rgba(255,255,255,0.5)] 
  ${isLit ? 'bg-yellow-400 dark:bg-yellow-500 shadow-[0_0_15px_#ffde00,inset_0_0_5px_rgba(255,255,255,0.5)]' : 'bg-gray-600'}`;
  return <button className={className} onClick={onClick}></button>;
};

export default Square;
