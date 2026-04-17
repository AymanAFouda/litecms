
export const VideoEmbed = ({ url }) => {
  if (!url) return null;

  let embedUrl = null;

  // YouTube detection
  const youtubeMatch =
    url.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([^&?/]+)/);

  if (youtubeMatch) {
    embedUrl = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Vimeo detection
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);

  if (vimeoMatch) {
    embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  if (!embedUrl) return null;

  return (
    <div className="w-full relative aspect-video rounded-none overflow-hidden sm:max-w-[80vw] mx-auto">
      <iframe 
        className="absolute inset-0 w-full h-full rounded-none"
        src={embedUrl}
        title="video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};