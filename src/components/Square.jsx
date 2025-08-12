
import React from 'react';

const Square = ({ isLit, onClick }) => {
  const className = `square ${isLit ? 'on' : 'off'}`;
  return <button className={className} onClick={onClick}></button>;
};

export default Square;
