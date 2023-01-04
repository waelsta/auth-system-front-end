import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
export const selectCurrentClient = (state: RootState) =>
  state.clientReducer.client;

export const selectResponse = (state: RootState) => ({
  error: state.clientReducer.error,
  message: state.clientReducer.message
});
export const selectShowAlert = (state: RootState) =>
  state.clientReducer.displayAlert;
export const selectStatus = (state: RootState) =>
  state.clientReducer.isLoggedIn;
const clientSlice = createSlice({
  name: 'clientReducer',
  initialState: {
    displayAlert: false,
    isLoggedIn: false,
    isFetching: false,
    error: false,
    client: null,
    message: ''
  },
  reducers: {
    clientSignIn: (state, action) => {
      state.isFetching = true;
    },
    clientSignInSuccess: state => {
      state.isFetching = false;
      state.error = false;
    },
    clientSignInFail: (state, action) => {
      state.isLoggedIn = false;
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
    clientSignUp: (state, action) => {
      state.isFetching = true;
    },
    clientSignUpSuccess: (state, action) => {
      state.isFetching = false;
      state.message = action.payload.message.data;
      state.client = action.payload.client;
      state.error = false;
    },
    clientSignUpFail: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
    displayAlert: state => {
      state.displayAlert = true;
    },
    removeAlert: state => {
      state.displayAlert = false;
    },
    getClientData: state => {
      state.isFetching = true;
    },
    getClientDataSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.isLoggedIn = true;
      state.client = action.payload.data;
    },
    getClientDataFail: (state, action) => {
      state.isFetching = false;
    },
    signout: state => {
      state.isLoggedIn = false;
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
  getClientDataSuccess,
  displayAlert,
  removeAlert,
  signout
} = clientSlice.actions;
export const clientReducer = clientSlice.reducer;
