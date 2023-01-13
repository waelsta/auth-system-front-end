import { RootState } from '../store';

export const selectModalState = (state: RootState) =>
  state.uiReducer.modalState;

export const selectModalRoute = (state: RootState) =>
  state.uiReducer.modalRoute;
