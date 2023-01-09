export interface IClient {
  phone_number: string;
  first_name: string;
  last_name: string;
  street: string;
  email: string;
  city: string;
}
export interface IClientSignUp extends IClient {
  password: string;
  password_match: string;
}

// export type Client = {
//   id: string
//   createdAt: Date
//   email: string
//   first_name: string
//   last_name: string
//   city: string
//   street: string
//   phone_number: number
//   is_client: boolean
//   password: string
// }
