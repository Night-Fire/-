import React from 'react';
import { Video } from 'lucide-react';

interface VideoUrlInputProps {
  url: string;
  onChange: (url: string) => void;
  onSubmit: () => void;
  isValid: boolean;
}

const VideoUrlInput: React.FC<VideoUrlInputProps> = ({
  url,
  onChange,
  onSubmit,
  isValid,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Вставьте ссылку на видео (YouTube, Vimeo, VK)"
              className={`w-full px-6 py-4 bg-gray-800 border rounded-lg outline-none transition-all text-white placeholder-gray-500
                ${isValid ? 'border-gray-700 focus:ring-2 focus:ring-purple-500' : 'border-red-500 focus:ring-2 focus:ring-red-500'}`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Video className={`w-5 h-5 ${isValid ? 'text-purple-500' : 'text-red-500'}`} />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isValid}
        >
          Воспроизвести
        </button>
      </div>
    </form>
  );
};

export default VideoUrlInput;