import React, { useState, useEffect } from 'react';
import { Brain, Timer, Star, XCircle } from 'lucide-react';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import StartScreen from './components/StartScreen';
import { generateProblem } from './utils/mathUtils';
import { Problem } from './types';

function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [mistakes, setMistakes] = useState<Problem[]>([]);
  const [usedProblems, setUsedProblems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('end');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing' && !currentProblem) {
      const newProblem = generateProblem(usedProblems);
      setCurrentProblem(newProblem);
      setUsedProblems(new Set([...usedProblems, `${newProblem.expression}`]));
    }
  }, [gameState, currentProblem, usedProblems]);

  const handleStart = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setMistakes([]);
    setUsedProblems(new Set());
    setCurrentProblem(null);
  };

  const handleAnswer = (answer: number) => {
    if (!currentProblem) return;

    if (answer === currentProblem.correctAnswer) {
      setScore((prev) => prev + 1);
    } else {
      setMistakes((prev) => [...prev, currentProblem]);
    }

    const newProblem = generateProblem(usedProblems);
    setCurrentProblem(newProblem);
    setUsedProblems(new Set([...usedProblems, `${newProblem.expression}`]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="w-10 h-10 text-purple-300" />
            <h1 className="text-3xl font-bold">Математическая Тренировка</h1>
          </div>
          {gameState === 'playing' && (
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-yellow-300" />
                <span>{timeLeft} сек</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>{score} очков</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <span>{mistakes.length} ошибок</span>
              </div>
            </div>
          )}
        </header>

        {gameState === 'start' && <StartScreen onStart={handleStart} />}
        {gameState === 'playing' && currentProblem && (
          <GameScreen problem={currentProblem} onAnswer={handleAnswer} />
        )}
        {gameState === 'end' && (
          <ResultScreen
            score={score}
            mistakes={mistakes}
            onRestart={handleStart}
          />
        )}
      </div>
    </div>
  );
}

export default App;