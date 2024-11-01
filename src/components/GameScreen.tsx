import React, { useState, useEffect } from 'react';
import { Problem } from '../types';
import FloatingAnswer from './FloatingAnswer';
import AnswerBox from './AnswerBox';

interface GameScreenProps {
  problem: Problem;
  onAnswer: (answer: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ problem, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [problem]);

  const handleDrop = (answer: number) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
        <div className="text-center mb-8">
          <p className="text-4xl font-bold">{problem.expression} = ?</p>
        </div>

        <div className="relative h-64">
          {problem.answers.map((answer, index) => (
            <FloatingAnswer
              key={`${answer}-${index}`}
              answer={answer}
              onDrop={handleDrop}
              isSelected={answer === selectedAnswer}
            />
          ))}
        </div>

        <AnswerBox selectedAnswer={selectedAnswer} />
      </div>
    </div>
  );
}

export default GameScreen;