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
      password: user.password,
      attributes: {
        email: user.email,
        given_name: user.giveName,
        family_name: user.familyName
      }
    })
  }

  public confirmSignUp(user: User) :Promise<any> {
    return Auth.confirmSignUp(user.email, user.password);
  }
}
