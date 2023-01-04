import { all, call, put, takeLatest } from 'redux-saga/effects';
import { IClient } from '../../types/client';
import {
  getClientData,
  clientSignInFail,
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
//interfaces
interface IAction {
  type: string;
  payload: any;
}

const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

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
function* callClientSignIn(action: IAction): Generator<any> {
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
function* callClientSignUp(action: IAction): Generator<any> {
  const {
    firstName: first_name,
    lastName: last_name,
    email,
    password,
    city,
    street,
    phone: phone_number,
    passwordMatch: password_match
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
    const message: any = yield call(axiosClientSignUp, client);
    console.log(message);
    yield put(clientSignUpSuccess({ client, message: message.data }));
    yield put(displayAlert());
    yield call(delay, 2000);
    yield put(removeAlert());
  } catch (err: any) {
    console.log(err);
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
