import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from '../../services/cognito.service';
import { User } from '../../models/user';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  user: User | undefined;
  isConfirm: boolean = false;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.user = {} as User;
    this.isConfirm = false;
  }

  public signUpWidthCognito() {
    if(this.user && this.user.email && this.user.password) {
      this.cognitoService.signUp(this.user)
      .then(() => {
        this.isConfirm = true;
      })
      .catch((error:any) =>{
        // console.log('Sign-up error:', error);
        this.displayAlert(error.message);
      })
    } else {
      this.displayAlert("Missing username or password");
    }
  }

  public confirmSignUp() {
    if(this.user) {
      this.cognitoService.confirmSignUp(this.user)
      .then(() => {
        this.router.navigate(['/sign-in'])
      })
      .catch((error:any) => {
        this.displayAlert(error.message)
      })
    } else {
      this.displayAlert("Missing user information")
    }
  }

  private displayAlert(message: string) {
    this.notification.blank("Error", message).onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }
}
