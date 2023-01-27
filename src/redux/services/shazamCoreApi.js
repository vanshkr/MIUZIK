import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'd6f831f0c2msh80fd94262fee546p141d16jsn52e90d7cc0b2',
// 		'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
// 	}
// };


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
    })
});

export const{
    useGetTopChartsQuery,
} = shazamCoreApi;