interface SongProps {
  image: string;
  title: string;
  artist: string;
}

const Song: React.FC<SongProps> = ({ image, title, artist }) => {
  return (
    <div className="song-container max-w-[242px] mx-auto">
      <img src={image} alt={`${title} album cover`} className="song-image" />
      <div className="song-details">
        <h2 className="song-title">{title}</h2>
        <p className="song-name">{artist}</p>
      </div>
    </div>
  );
};

export default Song;
