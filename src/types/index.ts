export interface INewUser {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface INewUserRecord {
  accountId: string;
  name: string;
  email: string;
  username?: string;
  imageUrl: string;
}
