import React from 'react';

interface AnswerBoxProps {
  selectedAnswer: number | null;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({ selectedAnswer }) => {
  return (
    <div className="mt-8 answer-box">
      <div className="w-24 h-24 mx-auto border-4 border-dashed border-white/50 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/70">
        {selectedAnswer !== null ? (
          <span className="text-3xl font-bold animate-pop">{selectedAnswer}</span>
        ) : (
          <span className="text-white/50">?</span>
        )}
      </div>
      <p className="text-center mt-2 text-white/70">Перетащите ответ сюда</p>
    </div>
  );
};

export default AnswerBox;