import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {getData} from './../reducers/utils'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.29.168:8080/api/',
    prepareHeaders: async (headers) => {
      const token = await getData('token');
      headers.set('Authorization',`Bearer ${token}`)
      return headers
  }
  }),
  tagTypes: ['CricketCards', 'Stats', 'User'],
  endpoints: (builder) => ({
    fetchStats: builder.query({
      query: () => 'cricket/stats',
      providesTags: ['Stats']
    }),
    updateCricketCollection: builder.mutation({
      query: (body) => {
        return {
        url: `cricket/collection`,
        method: 'PUT',
        body
      }},
      invalidatesTags: ['User'],
    }),
    fetchUser: builder.query({
      query: () => 'user',
      providesTags: ['User']
    }),
    updateCricketState: builder.mutation({
      query: (body) => {
        return {
        url: `user/cricket`,
        method: 'PUT',
        body
      }},
      invalidatesTags: ['User'],
    }),
    // Authentication
    login: builder.mutation({
      query: (body) => {
        return {
        url: `auth/login`,
        method: 'POST',
        body
      }},
    }),
  }),
})
export const { useFetchStatsQuery, useUpdateCricketCollectionMutation, useLoginMutation, useFetchUserQuery, useUpdateCricketStateMutation, useLazyFetchUserQuery} = api;