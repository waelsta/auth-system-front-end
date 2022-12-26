import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
export const selectCurrentClient = (state: RootState) =>
  state.clientReducer.client;

const clientSlice = createSlice({
  name: 'clientReducer',
  initialState: {
    isLoggedIn: false,
    username: '',
    password: '',
    isFetching: false,
    error: null,
    client: null
  },
  reducers: {
    clientSignIn: (state, action) => {
      state.isFetching = true;
    },
    clientSignInSuccess: state => {
      state.isFetching = false;
      state.isLoggedIn = true;
    },
    clientSignInFail: (state, action) => {
      state.isLoggedIn = false;
      state.isFetching = false;
      state.error = action.payload.error;
    },
    getClientData: state => {
      state.isFetching = true;
    },
    getClientDataSuccess: (state, action) => {
      state.isFetching = false;
      state.client = action.payload.data;
    },
    getClientDataFail: (state, action) => {
      state.isFetching = false;
    }
  }
});

export const {
  clientSignIn,
  clientSignInSuccess,
  clientSignInFail,
  getClientData,
  getClientDataFail,
  getClientDataSuccess
} = clientSlice.actions;
export const clientReducer = clientSlice.reducer;
