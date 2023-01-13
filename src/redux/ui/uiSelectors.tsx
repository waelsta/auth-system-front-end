import { RootState } from '../store';

// select fullRoute
export const selectFullRoute = (state: RootState) =>
  `${state.uiReducer.modalEndpoint}?user=${state.uiReducer.modalParam}`;

export const selectEndpoint = (state: RootState) =>
  state.uiReducer.modalEndpoint;

// select modalState
export const selectModalState = (state: RootState) =>
  state.uiReducer.modalState;
