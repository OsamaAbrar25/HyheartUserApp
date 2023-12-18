import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  name?: any;
  photoURL?: any;
  id?: any;
  zegoId?: any;
  email?: any;
}

export interface AuthState {
  jwt: string | null;
  isLoggedIn: boolean;
  userData: UserData;
  callId: string;
  callHistoryId: string;
  duration: number;
}

const initialState: AuthState = {
  jwt: null,
  isLoggedIn: false,
  userData: {},
  callId: '',
  callHistoryId: '',
  duration: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeUserData(state, action: PayloadAction<UserData>) {
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    removeUserData(state) {
      state.userData = {};
      state.isLoggedIn = false;
    },
    storeJwt(state, action: PayloadAction<string>) {
      state.jwt = action.payload;
    },
    removeJwt(state) {
      state.jwt = null;
    },
    storeProviderCallId(state, action: PayloadAction<string>) {
      state.callId = action.payload;
    },
    removeProviderCallId(state) {
      state.callId = '';
    },
    storeCallHistoryId(state, action: PayloadAction<string>) {
      state.callHistoryId = action.payload;
    },
    storeDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const {
  storeUserData,
  removeUserData,
  storeJwt,
  removeJwt,
  storeProviderCallId,
  removeProviderCallId,
  storeCallHistoryId,
  storeDuration,
} = actions;
// Export the reducer as a default export
export default reducer;
