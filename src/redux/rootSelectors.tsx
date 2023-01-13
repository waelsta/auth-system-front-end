import { clientReducer } from './client/clientSlice';
import { RootState } from './store';

export const selectIsFetching = (state: RootState) =>
  state.clientReducer.isFetching;
//TODO update this to return other user types

export const selectCurrentUserType = (state: RootState): string => {
  if (state.clientReducer.client) {
    return 'client';
  }
  return '';
  //TODO update this to return other user types
};
