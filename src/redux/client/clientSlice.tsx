import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClientData } from '../../types/client';

interface clientInitialState {
  displayAlert: boolean;
  isLoggedIn: boolean;
  isFetching: boolean;
  error: boolean;
  client: IClientData | null;
  message: string | null;
}

const initialState: clientInitialState = {
  displayAlert: false,
  isLoggedIn: false,
  isFetching: false,
  error: false,
  client: null,
  message: null
};

const clientSlice = createSlice({
  name: 'clientReducer',
  initialState,
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
      state.client = action.payload;
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
