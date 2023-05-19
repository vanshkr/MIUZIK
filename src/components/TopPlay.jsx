import {useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode} from 'swiper';

import TopChartCard from "./TopChartCard";
import {playPause, setActiveSong} from '../redux/features/playerSlice';
import {useGetTopChartsQuery} from '../redux/services/shazamCoreApi';


import 'swiper/css';
import 'swiper/css/free-mode';



const TopPlay = () => {
  const dispatch = useDispatch();
  const {activeSong,isPlaying} = useSelector((state)=>state.player);
  useEffect(()=> {
    divRef.current.scrollIntoView({behavior: 'smooth'});
  });
  const {data} = useGetTopChartsQuery();
  const topPlays = data?.tracks?.filter(song=>song?.images?.coverart ).slice(0,5);
  
  // console.log(topPlays);
  const divRef = useRef(null);
  const handlePauseClick = () =>{
    dispatch(playPause(false));
  }

  const handlePlayClick = (song,i) =>{
    dispatch(setActiveSong({song,data,i}));
    dispatch(playPause(true));
  }

  return(
    <div ref={divRef} className="xl:ml-6 xl:mb-0 xl:max-w-[500px] ml-0 mb-6 
      flex-1 max-w-full flex flex-col  ">
      <div className='w-full flex flex-col overflow-auto'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
          <Link to='/top-charts'>
            <p className='text-gray-300 text-base cursor-pointer'>See More</p>
          </Link>
        </div>
        <div className='mt-4 flex flex-col gap-1'>
          {topPlays?.map((song, i) =>{
            {/* console.log(song?.artists?.[0]?.adamid); */}
            return(
            <TopChartCard
              key={song?.key}
              song={song}
              i={i}
              activeSong = {activeSong}
              isPlaying = {isPlaying}
              handlePlayClick = {()=>handlePlayClick(song,i)}
              handlePauseClick = {handlePauseClick}
            />
          )})}
        </div>
        <div className='w-full flex flex-col mt-8'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Artists</h2>
          <Link to='/top-artists'>
            <p className='text-gray-300 text-base cursor-pointer'>See More</p>
          </Link>
        </div>
        
        <Swiper
          slidesPerView = 'auto' spaceBetween={15}
          freeMode centeredSlides centeredSlidesBounds
          modules = {[FreeMode]} className='mt-4'>
          {topPlays?.filter(song=>song?.images?.coverart )?.map((song,i) =>(
            <SwiperSlide
            key={song?.key}
            style = {{width:'100%',height:'auto'}}
            className='shadow-lg rounded-full animate-slideright'>
            <Link to= {`/artists/${song?.artists?.[0]?.adamid}`} >
              <img src = {song?.images?.background} alt = "name"
                className='rounded-full w-full object-cover'
              />
            </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </div>
    </div>
  )
}

export default TopPlay;
