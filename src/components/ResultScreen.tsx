import React from 'react';
import { RotateCcw, Trophy, XCircle, CheckCircle } from 'lucide-react';
import { Problem } from '../types';

interface ResultScreenProps {
  score: number;
  mistakes: Problem[];
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, mistakes, onRestart }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Игра Завершена!</h2>
          <p className="text-xl mb-4">Ваш результат: {score} очков</p>
          
          <div className="flex justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Правильно: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <span>Ошибок: {mistakes.length}</span>
            </div>
          </div>
        </div>

        {mistakes.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Разбор Ошибок:</h3>
            <div className="space-y-4">
              {mistakes.map((mistake, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="text-lg">
                    {mistake.expression} = {mistake.correctAnswer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 mx-auto transition-all transform hover:scale-105"
        >
          <RotateCcw className="w-5 h-5" />
          Играть Снова
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;