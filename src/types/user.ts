import { IClient } from './client';
import { IEmployee } from './employee';

export type User = IClient | IEmployee;

export type UserType = 'client' | 'employee' | '';
