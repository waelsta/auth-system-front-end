import {all, call, put,takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import { getClientData, clientSignInFail,clientSignInSuccess, getClientDataSuccess, getClientDataFail } from './clientSlice';
const API_URL = 'http://localhost:5000/api/v1'

//axios config
const axiosClient = axios.create({
    baseURL:API_URL,
    headers:{
        Accept: "Application/json",
        "Content-Type": "Application/json",
    }
})
interface ISignindata {
  username: string,
  password: string
}
//axios sign in function
export const axiosSignIn = async (data:ISignindata) => {
    const {username:email,password} = data;
    try {
      return await axiosClient.post("/auth/client/signin", {email,password},{
        withCredentials: true,
      });
    } catch (err:any) {
      console.log(err.message);
    }
  };

export const axiosGetClientData = async () => {
  try {
    const user = await axiosClient.get("/client",{
      withCredentials:true,
    });
    console.log(user);
    return user;
  } catch (err:any) {
    console.log(err.message);
  }
}
//interfaces
interface IAction{
    type:string,
    payload:any
}

//get user data generator function
function* callGetClientData():Generator<any>{
  try {
    const client = yield call(axiosGetClientData);
    yield put(getClientDataSuccess(client))
  } catch (err:any) {
    err.response?.data
    ? yield put(getClientDataFail(err.response?.data))
    : yield put(getClientDataFail(err.message));
  }
}

//user sign in generator function
function* callClientSignIn(action:IAction):Generator<any>{
    const {username, password} = action.payload;
    try {
      yield call(axiosSignIn,{username,password});
      yield put(clientSignInSuccess());
      yield put(getClientData())
  
    } catch (err:any) {
      err.response?.data
      ? yield put(clientSignInFail(err.response?.data))
      : yield put(clientSignInFail(err.message));
    }

}


//client watcher 
function* onClientSignIn() {
  yield takeLatest("clientReducer/clientSignIn", callClientSignIn);
}

function* onGetClientData() {
  yield takeLatest("clientReducer/getClientData",callGetClientData);
}

//call all client sagas
export default function* clientSagas() {
  yield all([call(onClientSignIn),call(onGetClientData)]);
}