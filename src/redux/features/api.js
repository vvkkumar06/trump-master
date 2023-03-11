import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.29.168:8080/api/'
  }),
  tagTypes: ['CricketCards', 'Stats'],
  endpoints: (builder) => ({
    fetchStats: builder.query({
      query: () => 'cricket/stats',
      providesTags: ['Stats']
    }),
    fetchCricketCollection: builder.query({
      query: () => 'cricket/collection',
      providesTags: ['CricketCards']
    }),
    updateCricketCollection: builder.mutation({
      query: (body) => {
        return {
        url: `cricket/collection`,
        method: 'PUT',
        body
      }},
      invalidatesTags: ['CricketCards'],
    }),
  }),
})

export const { useFetchCricketCollectionQuery, useFetchStatsQuery, useUpdateCricketCollectionMutation } = api;