import React, { useState, useEffect, useRef } from 'react';

interface FloatingAnswerProps {
  answer: number;
  onDrop: (answer: number) => void;
  isSelected: boolean;
}

const FloatingAnswer: React.FC<FloatingAnswerProps> = ({ answer, onDrop, isSelected }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const speed = 1;

  useEffect(() => {
    if (isSelected) return;

    const animate = () => {
      if (!containerRef.current?.parentElement) return;
      
      const container = containerRef.current.parentElement;
      const maxX = container.clientWidth - 80;
      const maxY = container.clientHeight - 80;

      setPosition(prev => {
        let newX = prev.x + direction.x * speed;
        let newY = prev.y + direction.y * speed;
        let newDirectionX = direction.x;
        let newDirectionY = direction.y;

        // Bounce off walls
        if (newX < -maxX/2 || newX > maxX/2) {
          newDirectionX = -direction.x;
          setDirection(prev => ({ ...prev, x: newDirectionX }));
        }
        if (newY < -maxY/2 || newY > maxY/2) {
          newDirectionY = -direction.y;
          setDirection(prev => ({ ...prev, y: newDirectionY }));
        }

        return {
          x: Math.max(-maxX/2, Math.min(maxX/2, newX)),
          y: Math.max(-maxY/2, Math.min(maxY/2, newY))
        };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [direction, isSelected, speed]);

  if (isSelected) return null;

  const handleDragEnd = (e: React.DragEvent) => {
    const dropZone = document.querySelector('.answer-box');
    if (!dropZone) return;

    const dropZoneRect = dropZone.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x >= dropZoneRect.left && x <= dropZoneRect.right &&
        y >= dropZoneRect.top && y <= dropZoneRect.bottom) {
      onDrop(answer);
    }
  };

  return (
    <div
      ref={containerRef}
      draggable
      onDragEnd={handleDragEnd}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
        transform: 'translate(-50%, -50%)',
        touchAction: 'none'
      }}
    >
      <div className="bg-white/20 backdrop-blur hover:bg-white/30 rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold shadow-lg transition-colors">
        {answer}
      </div>
    </div>
  );
};

export default FloatingAnswer;