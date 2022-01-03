import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
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
    private apollo: Apollo) {}

  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.pattern]],
      passwordHash: ['', Validators.required],
    });
    
  }
  onSubmit() {
    console.log("this.loginForm",this.loginForm.value)
    this.submitted = true;
    this.apollo
      .watchQuery<unknown>({
        query: Login,
        variables: {
          signinInput: this.loginForm.value,
        },
      })
      .valueChanges.subscribe((_data: unknown) => {
        console.log('_data', _data);
      });
  }
 get validate() {
    return this.loginForm.controls;
  }
}
