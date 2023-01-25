import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import showAlert from '../../utils/showAlert';
import { saveClient } from '../client/clientSlice';
import {
  getUserData,
  getUserDataFail,
  getUserDataSuccess,
  signinFail,
  signinSuccess,
  signoutFail,
  signoutSuccess
} from './userSlice';
import {
  axiosGetUserData,
  axiosSignIn,
  axiosSignout
} from '../../utils/axios-config';
import { UserType } from '../../types/user';

//client sign in generator function
export function* callSignIn(
  action: PayloadAction<{ email: string; password: string; userType: UserType }>
): Generator<any> {
  const { email, password, userType } = action.payload;
  try {
    const response: any = yield call(axiosSignIn, {
      email,
      password,
      userType
    });
    yield put(signinSuccess({ response: response.data, userType }));
    yield put(getUserData(userType));
  } catch (err: any) {
    yield put(signinFail(err.message));
    yield call(showAlert);
  }
}

function* callGetUserData(userType: PayloadAction<UserType>): Generator<any> {
  try {
    const response: any = yield call(axiosGetUserData, userType.payload);
    if (userType.payload === 'client') {
      console.log(response);
      yield put(saveClient(response.data));
    }
    yield put(getUserDataSuccess());
    //TODO: add else if for other user types
  } catch (err: any) {
    err.response?.data
      ? yield put(getUserDataFail(err.response?.data))
      : yield put(getUserDataFail(err.message));
  }
}

//user sign out generator function
function* callSignout(userType: PayloadAction<UserType>): Generator<any> {
  try {
    yield call(axiosSignout, userType.payload);
    yield put(signoutSuccess());
  } catch (error: any) {
    yield put(signoutFail(error.message));
    yield call(showAlert);
  }
}

function* onGetUserData() {
  yield takeLatest('userReducer/getUserData', callGetUserData);
}

function* onSignout() {
  yield takeLatest('userReducer/signout', callSignout);
}

function* onSignIn() {
  yield takeLatest('userReducer/signin', callSignIn);
}

export default function* userSagas() {
  yield all([call(onSignIn), call(onGetUserData), call(onSignout)]);
}
