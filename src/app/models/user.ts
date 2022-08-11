export interface UserInterface {
  id: string;
  name: string;
  lastName: string;
  email: string;
  image?: string;
  password?: string;
}

export class User implements UserInterface {
  constructor(public id = '', public name = '', public lastName = '', public email = '') {}
}

export interface ForgotPasswordRecoverRequestType {
  password: string;
  confirmPassword: string;
  token: string;
}


export type ForgotPasswordRequestType = {
  email: string;
  token: string;
}
