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

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
}

export interface INavLink {
  imgURL: string;
  route: string;
  label: string;
}
