import { all, call, put, takeLatest } from 'redux-saga/effects';
import { IClientSignup } from '../../types/client';
import {
  getClientData,
  clientSignInSuccess,
  getClientDataSuccess,
  clientSignUpSuccess,
  getClientDataFail,
  clientSignUpFail,
  clientSignoutSuccess,
  clientSignoutFail,
  clientSignInFail
} from './clientSlice';

import {
  axiosGetClientData,
  axiosSignIn,
  axiosClientSignUp,
  axiosClientSignout
} from '../../utils/axios-config';
import { PayloadAction } from '@reduxjs/toolkit';
import showAlert from '../../utils/showAlert';

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
    yield put(clientSignInFail(err.message));
    yield call(showAlert);
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
    yield call(showAlert);
  } catch (err: any) {
    yield put(clientSignUpFail(err.message));
    yield call(showAlert);
  }
}

function* callClientSignout(): Generator<any> {
  try {
    const message = yield call(axiosClientSignout);
    console.log(message);
    yield put(clientSignoutSuccess());
  } catch (error: any) {
    yield put(clientSignoutFail(error.message));
    yield call(showAlert);
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

function* onClientSignout() {
  yield takeLatest('clientReducer/clientSignout', callClientSignout);
}

//call all client sagas
export default function* clientSagas() {
  yield all([
    call(onClientSignIn),
    call(onGetClientData),
    call(onClientSignUp),
    call(onClientSignout)
  ]);
}
