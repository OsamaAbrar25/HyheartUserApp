import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState, store } from "../store";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://13.234.37.110/",
    prepareHeaders: async (headers, { getState }) => {
      headers.set("Access-Control-Allow-Origin", "*");
      const token = (getState() as RootState).auth.jwt;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getZegoToken: builder.query<undefined, string>({
      query: () => `zego/validate-token`,
    }),
    getProviders: builder.query<undefined, string[]>({
      query: () => `profile/providers`,
    }),
    getProfile: builder.query<undefined, string>({
      query: () => `profile`,
    }),
    validateFirebaseToken: builder.mutation({
      query: (body) => ({ url: `auth/validate-token`, method: "POST", body }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetZegoTokenQuery,
  useGetProvidersQuery,
  useGetProfileQuery,
  useValidateFirebaseTokenMutation,
} = userApi;
