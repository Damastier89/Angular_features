export interface RegisterUserInterface {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  emailVerified?: boolean;
}

export interface RegisterReguestInterface {
  username: string;
  email: string;
  password: string;
}