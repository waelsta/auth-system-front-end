import { createSlice } from '@reduxjs/toolkit';
import { User, UserType } from '../../types/user';

export interface UserState {
  loading: boolean;
  error: boolean;
  message: string | null;
  loggedIn: boolean;
  userType: UserType;
}

const initialState: UserState = {
  loading: false,
  error: false,
  message: null,
  loggedIn: false,
  userType: ''
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    signin: (state, action) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.userType = action.payload.user_type;
    },
    signinFail: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
      state.loggedIn = false;
    },
    upload: state => {
      state.loading = true;
    },
    uploadSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    uploadFail: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },
    signout: (state, action) => {
      state.loading = false;
    },
    signoutSuccess: state => {
      state.loading = false;
      state.loggedIn = false;
    },
    signoutFail: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },
    getUserData: (state, action) => {
      state.loading = true;
    },
    getUserDataSuccess: state => {
      state.loading = false;
    },
    getUserDataFail: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },
    profilePictureUpload: (state, action) => {
      state.loading = true;
    },
    profilePictureUploadSuccess: (state, action) => {
      state.loading = false;
    },
    profilePictureUploadFail: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    }
  }
});

export const {
  signin,
  signinSuccess,
  signinFail,
  upload,
  uploadSuccess,
  uploadFail,
  signout,
  signoutFail,
  signoutSuccess,
  getUserData,
  getUserDataSuccess,
  getUserDataFail,
  profilePictureUpload,
  profilePictureUploadSuccess,
  profilePictureUploadFail
} = userReducer.actions;

export default userReducer.reducer;
