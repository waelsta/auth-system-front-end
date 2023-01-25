import { UserType } from './user';

export interface IClientSignup {
  phone_number: string;
  first_name: string;
  last_name: string;
  street: string;
  email: string;
  city: string;
  password: string;
  password_match: string;
}

// client sign up data
export interface IClient {
  id: string;
  createdAt: Date;
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  street: string;
  phone_number: number;
  is_client: boolean;
  profile_picture_url: string;
  profile_picture: File;
  user_type: UserType;
}
