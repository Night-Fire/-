export const getVideoId = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    
    // YouTube
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      if (urlObj.hostname.includes('youtu.be')) {
        return urlObj.pathname.slice(1);
      }
      return urlObj.searchParams.get('v');
    }
    
    // Vimeo
    if (urlObj.hostname.includes('vimeo.com')) {
      return urlObj.pathname.split('/')[1];
    }

    return null;
  } catch {
    return null;
  }
};

export const getVideoType = (url: string): string => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  if (url.includes('vimeo.com')) {
    return 'vimeo';
  }
  return 'unknown';
};