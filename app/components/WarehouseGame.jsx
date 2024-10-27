"use client"

import React, { useState, useEffect } from 'react';
import { Package, Box, Timer, Trophy } from 'lucide-react';

const WarehouseGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [warehouseGrid, setWarehouseGrid] = useState([]);
  const targetScore = 500;
  
  // Generate random storage locations
  const generateWarehouseGrid = () => {
    const items = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'];
    const colors = {
      'Electronics': 'bg-[#33B1FF] hover:bg-[#2090DD]',
      'Clothing': 'bg-[#2090DD] hover:bg-[#1070BB]',
      'Food': 'bg-[#1070BB] hover:bg-[#005099]',
      'Books': 'bg-[#005099] hover:bg-[#004077]',
      'Toys': 'bg-[#004077] hover:bg-[#003055]'
    };
    
    const grid = [];
    
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * items.length);
      grid.push({
        id: i,
        item: items[randomIndex],
        color: colors[items[randomIndex]],
        isActive: false
      });
    }
    return grid;
  };

  // Generate a new picking order
  const generateOrder = () => {
    const items = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'];
    return {
      item: items[Math.floor(Math.random() * items.length)],
      quantity: Math.floor(Math.random() * 3) + 1,
      collected: 0
    };
  };

  // Start game
  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameActive(true);
    setWarehouseGrid(generateWarehouseGrid());
    setCurrentOrder(generateOrder());
  };

  // Handle cell click
  const handleCellClick = (cell) => {
    if (!gameActive || !currentOrder) return;

    if (cell.item === currentOrder.item) {
      setScore(prev => prev + 10);
      const newOrder = { ...currentOrder };
      newOrder.collected++;

      if (newOrder.collected >= newOrder.quantity) {
        setCurrentOrder(generateOrder());
      } else {
        setCurrentOrder(newOrder);
      }
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  return (
    <div className="max-w-2xl mx-auto bg-[#0A1520] rounded-xl shadow-xl p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          <span className="text-[#33B1FF]">Quetico</span> Pick & Pack
        </h1>
        <p className="text-[#33B1FF] text-lg">Can you beat {targetScore} points in 60 seconds?</p>
      </div>

      {/* Score and Timer */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-[#33B1FF]" />
          <span className="text-xl text-white">Score: {score}</span>
        </div>
        <div className="flex items-center">
          <Timer className="w-6 h-6 mr-2 text-[#33B1FF]" />
          <span className="text-xl text-white">Time: {timeLeft}s</span>
        </div>
      </div>

      {/* Start Button */}
      {!gameActive && (
        <button
          onClick={startGame}
          className="w-full p-4 mb-4 text-white bg-[#33B1FF] rounded-lg hover:bg-[#2090DD] transition-colors duration-200 shadow-md hover:shadow-lg font-bold"
        >
          Start Game
        </button>
      )}

      {/* Current Order */}
      {gameActive && currentOrder && (
        <div className="mb-4 p-4 bg-[#0A1520] rounded-lg border border-[#33B1FF]/20">
          <div className="text-lg font-semibold text-[#33B1FF]">Current Order:</div>
          <div className="flex items-center text-white">
            <Box className="w-5 h-5 mr-2 text-[#33B1FF]" />
            <span>Pick {currentOrder.quantity - currentOrder.collected} {currentOrder.item}</span>
          </div>
        </div>
      )}

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-2">
        {warehouseGrid.map((cell) => (
          <button
            key={cell.id}
            onClick={() => handleCellClick(cell)}
            className={`${cell.color} p-4 rounded-lg text-white font-bold h-24 
              flex items-center justify-center transform hover:scale-105 
              transition-all duration-200 ${!gameActive ? 'opacity-50 cursor-not-allowed' : ''}
              shadow-md hover:shadow-lg`}
            disabled={!gameActive}
          >
            {cell.item}
          </button>
        ))}
      </div>

      {/* Game Over */}
      {!gameActive && score > 0 && (
        <div className="mt-4 p-4 bg-[#0A1520] rounded-lg text-center border border-[#33B1FF]/20">
          <div className="text-xl font-bold text-[#33B1FF]">Game Over!</div>
          <div className="text-white">Final Score: {score}</div>
          {score >= targetScore ? (
            <div className="text-[#33B1FF] font-semibold mt-2">Congratulations! You beat the challenge! 🏆</div>
          ) : (
            <div className="text-[#33B1FF] font-semibold mt-2">Try again to beat {targetScore} points!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default WarehouseGame;
