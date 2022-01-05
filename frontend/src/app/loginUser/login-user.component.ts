import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { LoginGQL } from 'src/common/graphql/generated/graphql';
const Login = gql`
  query Login($signinInput: SignInInput!) {
    Login(signinInput: $signinInput){
      user{
        id
      }
    }
  }
`;
@Component({
  // selector: 'app-root',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
})
export class LoginUserComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: Boolean = false;
  constructor(private form: FormBuilder,
    private apollo: Apollo,
    private LoginQuery:LoginGQL,
    private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.pattern]],
      passwordHash: ['', Validators.required],
    });
    
  }
  onSubmit() {
    this.submitted = true;
    this.LoginQuery.fetch({ input: this.loginForm.value }).subscribe((data) => {
      this.router.navigate(['/user']);
    });
  }
 get validate() {
    return this.loginForm.controls;
  }
}
