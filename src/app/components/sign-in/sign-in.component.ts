import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../../services/cognito.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzSkeletonModule
],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{

  user: User | undefined;
  loading: boolean = false;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.user = {} as User;
    this.loading = false;
  }

  public signInWithCognito() {
    if(this.user && this.user.email && this.user.password) {
      this.loading = true;
      this.cognitoService.signIn(this.user)
      .then(() => {
        this.router.navigate(['/']);
        this.loading = false;
      })
      .catch((error:any) => {
        if(error.code  === 'UserNotConfirmedException') {
          this.displayAlert('Account not verified. Please contact admin for authentication');
        } else {
          this.displayAlert(error.message);
        }
        this.loading = false;
      })
    } else {
      this.displayAlert("Missing username or password");
    }
  }

  private displayAlert(message: string) {
    this.notification.blank("Error", message).onClick.subscribe(() => {
      console.log('notification clicked');
    })
  }
}
