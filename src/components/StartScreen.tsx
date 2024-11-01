import React from 'react';
import { Play, Calculator, Clock, Trophy } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Правила Игры</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center p-4">
            <Calculator className="w-10 h-10 text-purple-300 mb-2" />
            <h3 className="font-semibold mb-2">Решайте Примеры</h3>
            <p className="text-sm text-white/70">Простые арифметические задачи для устного счёта</p>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <Clock className="w-10 h-10 text-purple-300 mb-2" />
            <h3 className="font-semibold mb-2">60 Секунд</h3>
            <p className="text-sm text-white/70">Решите как можно больше примеров за минуту</p>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <Trophy className="w-10 h-10 text-purple-300 mb-2" />
            <h3 className="font-semibold mb-2">Набирайте Очки</h3>
            <p className="text-sm text-white/70">Каждый правильный ответ приносит 1 очко</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 mx-auto transition-all transform hover:scale-105"
        >
          <Play className="w-5 h-5" />
          Начать Игру
        </button>
      </div>
    </div>
  );
};

export default StartScreen;