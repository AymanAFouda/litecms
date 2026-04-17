import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const Youtube = ({ id, title = "YouTube video" }) => {

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">   
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default Youtube;
