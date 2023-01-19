import { UserType } from './user';

export type IEmployee = {
  id: number;
  first_name: string;
  last_name: string;
  cv_url?: string;
  profession: string;
  profile_picture_url: string;
  createdAt: Date;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  profile_picture: File;
  user_type: UserType;
};

//employee signup data
export interface IEmployeeSignup {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  city: string;
  street: string;
  createdAt: Date;
  password: string;
  password_match: string;
  profession: string;
}
