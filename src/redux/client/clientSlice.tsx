import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
export const selectCurrentClient = (state: RootState) =>
  state.clientReducer.client;

const clientSlice = createSlice({
  name: 'clientReducer',
  initialState: {
    isLoggedIn: false,
    isFetching: false,
    error: null,
    client: null,
    response: ''
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
      state.error = action.payload;
    },
    clientSignUp: (state, action) => {
      state.isFetching = true;
    },
    clientSignUpSuccess: (state, action) => {
      state.isFetching = false;
      state.response = 'signed up successfully !';
    },
    clientSignUpFail: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    getClientData: state => {
      state.isFetching = true;
    },
    getClientDataSuccess: (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.client = action.payload;
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
  clientSignUp,
  clientSignUpFail,
  clientSignUpSuccess,
  getClientData,
  getClientDataFail,
  getClientDataSuccess
} = clientSlice.actions;
export const clientReducer = clientSlice.reducer;
