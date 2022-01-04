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
    private router:Router,
    private LoginQuery:LoginGQL,
    public authService:AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.pattern]],
      passwordHash: ['', Validators.required],
    });
    
  }
  onSubmit() {
    console.log('this.loginForm', this.loginForm.value);
    if(this.loginForm.valid){
      this.submitted = true;
      this.LoginQuery.fetch({ input: this.loginForm.value }).subscribe((data) => {
        const accessToken =  data.data.Login.accessToken;
        this.authService.login(accessToken);
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        },1000);
      });
    }
  }
  get validate() {
    return this.loginForm.controls;
  }
}
