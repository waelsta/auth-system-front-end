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
