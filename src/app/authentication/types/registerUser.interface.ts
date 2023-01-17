export interface RegisterUserInterface {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  emailVerified?: boolean;
}

export interface RegisterRequestInterface {
  username: string;
  email: string;
  password: string;
}
