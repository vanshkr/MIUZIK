import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useDispatch } from "react-redux";

const SongCard = ({song, ind,activeSong, data, isPlaying}) => {
  console.log(song);
  const dispatch = useDispatch();
  const handlePauseClick = () =>{
    dispatch(playPause(false));
  }

  const handlePlayClick = () =>{
    dispatch(setActiveSong({song,data,ind}));
    dispatch(playPause(true));
  }

  return (
  <div className=" flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm cursor-pointer animate-slideup rounded-lg">
    <div className=" relative w-full h-56 group">
      <div className= {`bg-black absolute inset-0 
        justify-center items-center bg-opacity-50 
        group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'} `}>
        <PlayPause
          song = {song}
          activeSong = {activeSong}
          isPlaying = {isPlaying}
          handlePlay = {handlePlayClick}
          handlePause = {handlePauseClick}
        />
      </div>
      <img src = {song?.images?.coverart} alt = {song?.share?.subject}/>
    </div>
    <div className="mt-4 flex flex-col">
      <p className="font-semibold text-lg text-white truncate">
        <Link to={`/songs/${song?.key}`}>
          {song.title}
        </Link>
      </p>
      <p className="text-sm truncate text-gray-300 mt-1">
        <Link to={`/artists/${song?.artists?.[0]?.adamid}`}>
          {song.subtitle}
        </Link> 
      </p>
    </div>
  </div>
  )
};

export default SongCard;
