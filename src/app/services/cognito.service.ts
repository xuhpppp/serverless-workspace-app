import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { User } from '../models/user';
import { Amplify, Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() {
    Amplify.configure({
      Auth: environment.cognito
    })
  }

  public signUp(user: User) :Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password
    })
  }

  public confirmSignUp(user: User) :Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public getUser(user: User): Promise<any> {
    return Auth.currentUserInfo();
  }

  //Login with email and passowrd
  public signIn(user: User):Promise<any> {
    return Auth.signIn(user.email, user.password);
  }

  public signOut(): Promise<any> {
    return Auth.signOut();
  }
}
