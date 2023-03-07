import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cricketApi= createApi({
  reducerPath: 'cricketApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.29.168:8080/api/cricket/'
  }),
  endpoints: (builder) => ({
    cricketCollection: builder.query({
      query: () => 'collection'
    }),
    cricketTeam: builder.query({
      query: () => 'team'
    }),
  }),
})

export const { useCricketCollectionQuery, useCricketTeamQuery } = cricketApi;