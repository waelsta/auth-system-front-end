import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClient } from '../../types/client';

interface clientInitialState {
  displayAlert: boolean;
  isLoggedIn: boolean;
  isFetching: boolean;
  error: boolean;
  client: IClient | null;
  message: string | null;
  isFirstTime: boolean;
}

const initialState: clientInitialState = {
  displayAlert: false,
  isLoggedIn: false,
  isFetching: false,
  error: false,
  client: null,
  message: null,
  isFirstTime: false
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
      state.isFirstTime = true;
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
    getClientDataFail: state => {
      state.isFetching = false;
    },
    clientSignout: state => {
      state.isFetching = true;
    },
    clientSignoutSuccess: state => {
      state.isLoggedIn = false;
      state.isFetching = false;
      state.client = null;
    },
    clientSignoutFail: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
    clientProfilePictureUpload: (state, action) => {
      state.isFetching = true;
    },
    clientProfilePictureUploadSuccess: (state, action) => {
      state.isFetching = false;
      state.client!.profile_picture = action.payload.pfp;
      state.client!.profile_picture_url = action.payload.pfp_url;
      state.isFirstTime = false;
    },
    clientProfilePictureUploadFail: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
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
  clientSignout,
  clientSignoutSuccess,
  clientSignoutFail,
  clientProfilePictureUploadSuccess,
  clientProfilePictureUploadFail,
  clientProfilePictureUpload
} = clientSlice.actions;
export const clientReducer = clientSlice.reducer;
