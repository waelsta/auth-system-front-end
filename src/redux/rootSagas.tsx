import { all, call } from 'redux-saga/effects';
import clientSaga from './client/clientSagas';
import userSaga from './user/userSagas';

// this is the function that basically calls all sagas in the app
// so they can listen to specific actions

export default function* rootSagas() {
  yield all([call(userSaga), call(clientSaga)]);
}
