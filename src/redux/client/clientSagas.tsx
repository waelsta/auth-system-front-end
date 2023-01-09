import { all, call, put, takeLatest } from 'redux-saga/effects';
import { IClientData, IClientSignup } from '../../types/client';
import {
  getClientData,
  clientSignInSuccess,
  getClientDataSuccess,
  clientSignUpSuccess,
  getClientDataFail,
  clientSignUpFail,
  displayAlert,
  removeAlert
} from './clientSlice';

import {
  axiosGetClientData,
  axiosSignIn,
  axiosClientSignUp
} from '../../utils/axios-config';
import { PayloadAction } from '@reduxjs/toolkit';

const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

//get user data generator function
function* callGetClientData(): Generator<any> {
  try {
    const response = yield call(axiosGetClientData);
    yield put(getClientDataSuccess(response));
  } catch (err: any) {
    err.response?.data
      ? yield put(getClientDataFail(err.response?.data))
      : yield put(getClientDataFail(err.message));
  }
}

//client sign in generator function
function* callClientSignIn(
  action: PayloadAction<{ email: string; password: string }>
): Generator<any> {
  const { email, password } = action.payload;
  try {
    yield call(axiosSignIn, { email, password });
    yield put(clientSignInSuccess());
    yield put(getClientData());
  } catch (err: any) {
    yield put(clientSignUpFail(err.message));
    yield put(displayAlert());
    yield call(delay, 2000);
    yield put(removeAlert());
  }
}

//client sign up generator function
function* callClientSignUp(
  action: PayloadAction<IClientSignup>
): Generator<any> {
  const client = action.payload;
  try {
    const message: any = yield call(axiosClientSignUp, client);
    yield put(clientSignUpSuccess({ client, message: message.data }));
    yield put(displayAlert());
    yield call(delay, 2000);
    yield put(removeAlert());
  } catch (err: any) {
    yield put(clientSignUpFail(err.message));
    yield put(displayAlert());
    yield call(delay, 2000);
    yield put(removeAlert());
  }
}

//client watcher
function* onClientSignIn() {
  yield takeLatest('clientReducer/clientSignIn', callClientSignIn);
}

function* onClientSignUp() {
  yield takeLatest('clientReducer/clientSignUp', callClientSignUp);
}

function* onGetClientData() {
  yield takeLatest('clientReducer/getClientData', callGetClientData);
}

//call all client sagas
export default function* clientSagas() {
  yield all([
    call(onClientSignIn),
    call(onGetClientData),
    call(onClientSignUp)
  ]);
}
