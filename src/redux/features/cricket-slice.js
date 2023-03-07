import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cricketApi= createApi({
  reducerPath: 'cricketApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.29.168:8080/cricket/'
  }),
  endpoints: (builder) => ({
    getAllPlayers: builder.query({
      query: () => 'players'
    }),
  }),
})

export const { useGetAllPlayersQuery } = cricketApi;