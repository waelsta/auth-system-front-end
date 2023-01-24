import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClient } from '../../types/client';

interface clientInitialState {
  displayAlert: boolean;
  loading: boolean;
  error: boolean;
  client: IClient | null;
  message: string | null;
  isFirstTime: boolean;
}

const initialState: clientInitialState = {
  displayAlert: false,
  loading: false,
  error: false,
  client: null,
  message: null,
  isFirstTime: false
};

export const clientSlice = createSlice({
  name: 'clientReducer',
  initialState,
  reducers: {
    clientSignUp: (state, action) => {
      state.loading = true;
    },
    clientSignUpSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message.data;
      state.client = action.payload.client;
      state.error = false;
      state.isFirstTime = true;
    },
    clientSignUpFail: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },
    saveClient: (state, action) => {
      state.client = action.payload;
    }
  }
});

export const {
  clientSignUp,
  clientSignUpFail,
  clientSignUpSuccess,
  saveClient
} = clientSlice.actions;
export const clientReducer = clientSlice.reducer;
