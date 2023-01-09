import { call, put } from 'redux-saga/effects';
import { displayAlert, removeAlert } from '../redux/client/clientSlice';

//create a function that will delay the execution of the next line of code
const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

function* showAlert(): Generator<any> {
  yield put(displayAlert());
  yield call(delay, 2000);
  yield put(removeAlert());
}

export default showAlert;
