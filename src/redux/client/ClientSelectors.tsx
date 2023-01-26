import { RootState } from '../store';

export const selectCurrentClient = (state: RootState) =>
  state.clientReducer.client;

export const selectResponse = (state: RootState) => ({
  error: state.userReducer.error ?? state.clientReducer.error,
  message: state.userReducer.message ?? state.clientReducer.message
});

export const selectShowAlert = (state: RootState) =>
  state.uiReducer.displayAlert || state.clientReducer.displayAlert;

export const selectIsSignedUp = (state: RootState) =>
  state.clientReducer.isFirstTime;
