import SongBar from "./SongBar";
import { useGetSongDetailsQuery } from "../redux/services/shazamCoreApi";
const RelatedSongs = ({data,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick}) => {
    console.log(data);
    return(
      <div className="flex flex-col">
        <h1 className="font-bold text-3xl text-white">
          Related Songs:
        </h1>

        <div className="mt-6 w-full flex flex-col">
          {data?.tracks?.filter(song=>song?.images?.coverart )?.map((song,i) => (
            <SongBar
              key={`${song.key}-${artistId}-${i}`}
              song={song}
              i={i}
              artistId={artistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))}
        </div>

      </div>
)};

export default RelatedSongs;
