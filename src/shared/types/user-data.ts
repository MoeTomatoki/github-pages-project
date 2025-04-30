export type UserDataRegister = {
  username: string;
  email: string;
  password: string;
};

export type UserDataLogin = {
  email: string;
  password: string;
};

export type Profile = {
  username: string;
  email: string;
  token: string;
}
