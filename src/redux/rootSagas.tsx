import { all, call } from 'redux-saga/effects';
import clientSaga from './client/clientSagas';
import userSagas from './user/userSagas';

// this is the function that basically calls all sagas in the app
// so they can listen to specific actions

export function* rootSagas() {
  yield all([call(clientSaga), call(userSagas)]);
}
