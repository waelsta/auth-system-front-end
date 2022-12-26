import { all, call, put, takeLatest } from 'redux-saga/effects';
import { IClient } from '../../types/client';
import {
  getClientData,
  clientSignInFail,
  clientSignInSuccess,
  getClientDataSuccess,
  clientSignUpSuccess,
  getClientDataFail,
  clientSignUpFail
} from './clientSlice';
import {
  axiosGetClientData,
  axiosSignIn,
  axiosClientSignUp
} from '../../utils/axios-config';
import { PayloadAction } from '@reduxjs/toolkit';

//get user data generator function
function* callGetClientData(): Generator<any> {
  let client;
  try {
    client = yield call(axiosGetClientData);
    yield put(getClientDataSuccess(client));
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
    err.response?.data
      ? yield put(clientSignInFail(err.response?.data))
      : yield put(clientSignInFail(err.message));
  }
}

//client sign up generator function
function* callClientSignUp(action: PayloadAction<IClient>): Generator<any> {
  const {
    first_name,
    last_name,
    email,
    password,
    password_match,
    city,
    street,
    phone_number
  } = action.payload;
  const client: IClient = {
    first_name,
    last_name,
    email,
    password,
    city,
    street,
    phone_number,
    password_match
  };
  try {
    yield call(axiosClientSignUp, client);
    yield put(clientSignUpSuccess(client));
  } catch (err: any) {
    err.response?.data
      ? yield put(clientSignUpFail(err.response?.data))
      : yield put(clientSignUpFail(err.message));
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
