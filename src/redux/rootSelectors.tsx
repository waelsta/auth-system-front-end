import { RootState } from './store';

export const selectIsFetching = (state: RootState): boolean =>
  state.clientReducer.loading || state.userReducer.loading;
