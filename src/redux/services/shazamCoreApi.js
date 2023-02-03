import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import fetch from 'cross-fetch';
export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key','d6f831f0c2msh80fd94262fee546p141d16jsn52e90d7cc0b2');
            

            return headers;
        },
    }),
    // allows us to use it as a HOOK
    endpoints:(builder) =>({
        getTopCharts:builder.query({query:() => '/charts/world'}),
        getSongDetails:builder.query({query:(songid) => ({
            url:`/tracks/details/?track_id=${songid}`}),
            fetchFn : fetch,
            
        }),
        getArtistDetails:builder.query({query:(artistid) => `/tracks/details/?artistid=${artistid}`}),
        getSongRelated:builder.query({query:(songid) => `/tracks/related/?track_id=${songid}`}),
        })
});

export const{
    useGetTopChartsQuery,
    useGetArtistDetailsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
} = shazamCoreApi;