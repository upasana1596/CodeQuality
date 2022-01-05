import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { SendForgotPasswordRequestGQL } from 'src/common/graphql/generated/graphql';
const SendForgotPasswordRequest = gql`
  query SendForgotPasswordRequest($email: String!) {
    SendForgotPasswordRequest(email: $email)
  }
`;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  submitted = false;
  constructor(
    private form: FormBuilder,
    private apollo: Apollo,
    private sendForgotPasswordRequestGQL: SendForgotPasswordRequestGQL
  ) {}
  ngOnInit(): void {
    this.forgotPasswordForm = this.form.group({
      email: ['', Validators.required],
    });
    throw new Error('Method not implemented.');
  }

  get validate() {
    return this.forgotPasswordForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(
      'this.forgotPasswordForm.value,',
      this.forgotPasswordForm.value
    );
    this.sendForgotPasswordRequestGQL
      .fetch({
        email: this.forgotPasswordForm.value.email,
      })
      .subscribe(({ data }) => {
        console.log('data', data);
      });
  }
}
