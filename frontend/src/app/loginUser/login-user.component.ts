import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { LoginGQL } from 'src/common/graphql/generated/graphql';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
})
export class LoginUserComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: Boolean = false;
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  
  constructor(private form: FormBuilder,
    private apollo: Apollo,
    private LoginQuery:LoginGQL,
    private router: Router,
    public authService:AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.pattern]],
      passwordHash: ['', Validators.required],
    });
    
  }
  onSubmit() {
    if(this.loginForm.valid){
      this.submitted = true;
      this.LoginQuery.watch({ input: this.loginForm.value }).valueChanges.subscribe((data) => {
        const accessToken =  data.data.Login.accessToken;
        this.authService.login(
          data.data.Login.accessToken,
        );
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        },400);
      });
    }
  }
  get validate() {
    return this.loginForm.controls;
  }
}
