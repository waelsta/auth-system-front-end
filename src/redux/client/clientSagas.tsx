import { all, call, put, takeLatest } from 'redux-saga/effects';
import { IClientSignup } from '../../types/client';
import { clientSignUpSuccess, clientSignUpFail } from './clientSlice';
import { callSignIn } from '../user/userSagas';
import { axiosClientSignUp } from '../../utils/axios-config';
import { PayloadAction } from '@reduxjs/toolkit';
import showAlert from '../../utils/showAlert';

//client sign up generator function
function* callClientSignUp(
  action: PayloadAction<IClientSignup>
): Generator<any> {
  const client = action.payload;
  try {
    const message: any = yield call(axiosClientSignUp, client);
    yield put(clientSignUpSuccess({ client, message: message.data }));
    yield callSignIn({
      payload: {
        email: client.email,
        password: client.password,
        userType: 'client'
      },
      type: 'userReducer/signin'
    });
    yield call(showAlert);
  } catch (err: any) {
    yield put(clientSignUpFail(err.message));
    yield call(showAlert);
  }
}

function* onClientSignUp() {
  yield takeLatest('clientReducer/clientSignUp', callClientSignUp);
}

//call all client sagas
export default function* clientSagas() {
  yield all([call(onClientSignUp)]);
}
