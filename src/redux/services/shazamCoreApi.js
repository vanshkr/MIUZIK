import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const shazamCoreApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            
            headers.set('X-RapidAPI-Key','96a522fe43msh27395ad74331b3cp14ab55jsnab0564eccf6c');
            headers.set('X-RapidAPI-Host','shazam.p.rapidapi.com');
            return headers;
        },
    }),
    // allows us to use it as a HOOK
    endpoints:(builder) =>({
        getTopCharts:builder.query({query:() => 'charts/track'}),
        getSongsBySearch: builder.query({ query: (searchTerm) => `search?term=${searchTerm}` }),
        getSongDetails:builder.query({query:({songid}) => ({
            url:`songs/get-details?key=${songid}`,
            
        })}),
        getArtistDetails:builder.query({query:(artistId) => `artists/get-details?id=${artistId}`}),

        getSongRelated:builder.query({query:({songid}) => `songs/list-recommendations?key=484129036`}),
        getArtistTopSongs:builder.query({query:(artistId) => `artists/get-top-songs?id=${artistId}`}),
        getSongsByGenre: builder.query({ query: (genre) => `v1/charts/genre-world?genre_code=${genre}` }),
        getSongsByCountry: builder.query({ query: (countryCode) => `v1/charts/country?country_code=${countryCode}` }),
        })
});
//v1/tracks/related?track_id=${songid}

export const{
    useGetTopChartsQuery,useGetArtistDetailsQuery,
    useGetSongDetailsQuery,useGetSongRelatedQuery,
    useGetSongsByGenreQuery,useGetSongsByCountryQuery,
    useGetSongsBySearchQuery,useGetArtistTopSongsQuery
} = shazamCoreApi;