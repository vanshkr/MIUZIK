import { useDispatch, useSelector } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCoreApi';
import { genres } from '../assets/constants';

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

 

  const spotifyApi = new SpotifyWebApi();

  spotifyApi.setAccessToken('BQD0a1XhcXP-bChK1JNXTATdIe-ag_GscF5LEQUV1kWYoAkoAXmnfJuJ0ltEcVND6zB62mAeIdZr1_EU39DKDAY_WrGQvEl6VuMh68ldngXs4eRXfSljMaOrPTZv0NW_Jom5yvvHz5tZ_LQzwt8Lf_XB8Wv4x72kp__FGrnGH9fEdS2l3G6-lPqicvv3LiBPD99ADnxS');
  spotifyApi.getMyTopArtists({ time_range: 'medium_term', limit: 20 }).then((data) => {
    console.log('User playlists', data.items);
  })
  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className="flex flex-col">
      {/* <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>

        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.filter(song=>song?.images?.coverart )?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Discover;
