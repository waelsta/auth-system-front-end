import axios from 'axios';
import { IClient, IClientSignup } from '../types/client';

interface ISignindata {
  email: string;
  password: string;
}

const API_URL = 'http://localhost:5000/api/v1';

//axios config
const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true
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
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.error);
    }
    throw new Error(err.message);
  }
};

//axios client sign up call
export const axiosClientSignUp = async (client: IClientSignup) => {
  try {
    return await axiosClient.post('/auth/client/signup', client, {
      withCredentials: true
    });
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.error);
    }
    throw new Error(err.message);
  }
};

export const axiosGetClientData = async (): Promise<IClient> => {
  try {
    const { data } = await axiosClient.get<IClient>('/client', {
      withCredentials: true
    });
    return data;
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.error);
    }
    throw new Error(err.message);
  }
};

export const axiosClientSignout = async () => {
  try {
    return await axiosClient.post('/auth/client/signout', {
      withCredentials: true
    });
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.error);
    }
    throw new Error(err.message);
  }
};
