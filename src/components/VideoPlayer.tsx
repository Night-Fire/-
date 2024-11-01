import React from 'react';

interface VideoPlayerProps {
  videoId: string;
  type: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, type }) => {
  const getEmbedUrl = () => {
    switch (type) {
      case 'youtube':
        return `https://www.youtube.com/embed/${videoId}`;
      case 'vimeo':
        return `https://player.vimeo.com/video/${videoId}`;
      default:
        return '';
    }
  };

  return (
    <div className="aspect-video w-full">
      <iframe
        src={getEmbedUrl()}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video Player"
      />
    </div>
  );
};

export default VideoPlayer;