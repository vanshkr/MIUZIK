import PlayPause from './PlayPause';
import {Link} from 'react-router-dom';

const TopChartCard = ({song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => {
    return(
    <div className='w-full flex flex-row items-center
     hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2'>
     <h3 className='font-bold text-base text-white mr-3'>
      {i+1}
     </h3>
     <div className='flex-1 flex flex-row justify-between items-center'>
        <img className='w-20 h-20 rounded-lg' src={song?.images?.coverart}
          alt={song?.title}/>
        <div className='flex-1 flex flex-col justify-center mx-3'>
          <Link to={`/songs/${song?.key}`}>
          <p className='text-xl font-bold text-white'>
            {song?.title}
          </p>
          </Link>
          <Link to={`artists/${song?.artists?.[0]?.adamid}`}>
          <p className='text-ase text-gray-300 mt-1'>
            {song?.subtitle}
          </p>
          </Link>
        </div>
     </div>
     <PlayPause
        song = {song}
        activeSong = {activeSong}
        isPlaying = {isPlaying}
        handlePlay = {handlePlayClick}
        handlePause = {handlePauseClick}
      />
    </div>
  )};

export default TopChartCard;