import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {DetailsHeader, Error, Loader, RelatedSongs} from "../components";

import { useGetArtistDetailsQuery, useGetArtistTopSongsQuery, useGetSongDetailsQuery} from "../redux/services/shazamCoreApi";


const ArtistDetails = () => {
    const field = (id) =>useGetSongDetailsQuery(id).resolve();
    const {id:artistId} = useParams();
    const {activeSong, isPlaying} = useSelector( state => state.player);
    const {data:artistData,isFetching:isFetchingArtistDetails, error} = useGetArtistDetailsQuery(artistId);
    const {data:artistTopSongs} = useGetArtistTopSongsQuery(artistId);
    const data = artistTopSongs?.data?.map(artist=>
        {
            const d = field(artist.id);
            console.log(d);
        });
    console.log(data);
    
    if(isFetchingArtistDetails)
        return <Loader title="Loading artist details"/>;
    if(error) return <Error/>;
    return(
        <div className="flex flex-col">
            <DetailsHeader 
              artistId = {artistId} 
              artistData={artistData?.data?.[0]}
               />

            {/* <RelatedSongs
                data = {artistSummary?.resources?.artists?.[artistId]?.views?.['top-songs']?.data}
                artistId = {artistId}
                isPlaying = {isPlaying}
                activeSong = {activeSong}
            /> */}
        </div>
    )
}

export default ArtistDetails;

