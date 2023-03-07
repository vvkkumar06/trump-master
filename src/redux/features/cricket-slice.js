import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cricketApi = createApi({
  reducerPath: 'cricketApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.29.168:8080/api/cricket/'
  }),
  tagTypes: ['Cards'],
  endpoints: (builder) => ({
    cricketCollection: builder.query({
      query: () => 'collection',
      providesTags: ['Cards']
    }),
    addToTeam: builder.mutation({
      query: (body) => {
        return {
        url: `collection/add`,
        method: 'PATCH',
        body
      }},
      invalidatesTags: ['Cards'],
    }),
    removeFromTeam: builder.mutation({
      query: (body) => {
        return {
        url: `collection/remove`,
        method: 'PATCH',
        body: body
      }},
      invalidatesTags: ['Cards'],
    }),
  }),
})

export const { useCricketCollectionQuery, useAddToTeamMutation, useRemoveFromTeamMutation } = cricketApi;