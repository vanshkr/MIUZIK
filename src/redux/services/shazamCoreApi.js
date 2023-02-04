import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import fetch from 'cross-fetch';
export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key','d6f831f0c2msh80fd94262fee546p141d16jsn52e90d7cc0b2');
            headers.set('X-RapidAPI-Host','shazam-core.p.rapidapi.com');
            return headers;
        },
    }),
    // allows us to use it as a HOOK
    endpoints:(builder) =>({
        getTopCharts:builder.query({query:() => 'v1/charts/world'}),
        getSongsByGenre: builder.query({ query: (genre) => `v1/charts/genre-world?genre_code=${genre}` }),
        getSongsByCountry: builder.query({ query: (countryCode) => `v1/charts/country?country_code=${countryCode}` }),
        getSongDetails:builder.query({query:({songid}) => ({
            url:`v1/tracks/details?track_id=${songid}`,
            
        })}),
        getArtistDetails:builder.query({query:(artistId) => `v2/artists/details?artist_id=${artistId}`}),
        getSongRelated:builder.query({query:({songid}) => `v1/tracks/related?track_id=${songid}`}),
        })
});

export const{
    useGetTopChartsQuery,
    useGetArtistDetailsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetSongsByGenreQuery,
    useGetSongsByCountryQuery
} = shazamCoreApi;