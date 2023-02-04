import { Error, Loader, SongCard } from "../components";
import {genres} from "../assets/constants";
import {useGetTopChartsQuery} from '../redux/services/shazamCoreApi';
import { useSelector } from "react-redux";
const Discover = () => {
    // console.log(genres);

    const {activeSong,isPlaying} = useSelector((state)=>state.player);
    const {data, isFetching, isError} = useGetTopChartsQuery();
    // console.log(useGetTopChartsQuery());
    // console.log(data);
    const genreTitle = 'POP'; 
    if (isFetching){
        return <Loader title = "Loading songs..." />;
    }
    if (isError){
        return <Error/>;
    }
    return(
        <div className="flex flex-col">
            <div className="w-full flex justify-center items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">
                    Discover {genreTitle}
                </h2>
                <select 
                onChange={()=>{}}
                value=""
                className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 ">
                {
                    genres.map((genre)=>{
                        return(
                            <option key={genre.value} value={genre.value}>{genre.title}</option>
                        )
                    })
                }
                </select>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {data?.filter(song=>song?.images?.coverart )
                .map((song,ind)=>{
                {/* console.log(song); */}
                return(
                    <SongCard
                        key={song.key}
                        song={song}
                        id = {ind}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data = {data}
                    />
                )
            })}
            </div>
        </div>
    )
};

export default Discover;
