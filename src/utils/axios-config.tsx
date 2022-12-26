import axios from 'axios';
import { IClient } from '../types/client';

interface ISignindata {
  email: string;
  password: string;
}

const API_URL = 'http://localhost:5000/api/v1';

//axios config
const axiosClient = axios.create({
  baseURL: API_URL
});
//axios sign in function
export const axiosSignIn = async (data: ISignindata) => {
  const { email, password } = data;
  try {
    return await axiosClient.post(
      '/auth/client/signin',
      { email, password },
      {
        withCredentials: true
      }
    );
  } catch (err: any) {
    throw new Error(err.message);
  }
};

//axios client sign up call
export const axiosClientSignUp = async (client: IClient) => {
  try {
    return await axiosClient.post('/auth/client/signup', client, {
      withCredentials: true
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const axiosGetClientData = async () => {
  try {
    const response = await axiosClient.get('/client', {
      withCredentials: true
    });
    return response?.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
