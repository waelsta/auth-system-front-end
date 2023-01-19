import axios from 'axios';
import { IClientSignup } from '../types/client';
import { User, UserType } from '../types/user';

interface ISignindata {
  email: string;
  password: string;
  userType: UserType;
}

const API_URL = 'http://localhost:5000/api/v1';

//axios config
const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

//get userType from store after initialisation of store

//axios sign in function
export const axiosSignIn = async (data: ISignindata) => {
  const { email, password } = data;
  try {
    return await axiosClient.post(
      `/auth/signin?user=${data.userType}`,
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

//axios get user data call
export const axiosGetUserData = async (
  currUserType: UserType
): Promise<User> => {
  try {
    const { data } = await axiosClient.get<User>(`user?=${currUserType}`, {
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

export const axiosSignout = async (currUserType: UserType) => {
  try {
    return await axiosClient.post(`/auth/user?=${currUserType}/signout`, {
      withCredentials: true
    });
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.error);
    }
    throw new Error(err.message);
  }
};

export const axiosProfilePictureUpload = async (currUserType: UserType) => {
  try {
    return await axiosClient.post(
      `/uploads/profile-picture?user=${currUserType}`
    );
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.error);
    }
    throw new Error(err.message);
  }
};
