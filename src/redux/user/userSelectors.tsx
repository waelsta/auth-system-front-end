import { RootState } from '../store';
import { User, UserType } from '../../types/user';

export const selectStatus = (state: RootState) => state.userReducer.loggedIn;

export const selectUser = (state: RootState): User | null => {
  if (state.userReducer.loggedIn) {
    if (state.clientReducer.client) {
      return state.clientReducer.client;
    }
    //TODO: add other user types
  }
  return null;
};

export const selectUserType = (state: RootState): UserType => {
  if (state.userReducer.loggedIn) {
    if (state.clientReducer.client) {
      return state.clientReducer.client.user_type;
    }
    //TODO: add other user types
  }
  return state.uiReducer.modalParam;
};
