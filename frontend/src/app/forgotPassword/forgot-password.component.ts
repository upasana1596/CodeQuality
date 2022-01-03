import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
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
  submitted =false;
  constructor(private form: FormBuilder,
    private apollo:Apollo) {}
  ngOnInit(): void {
    this.forgotPasswordForm = this.form.group({
      email: ['', Validators.required],
    });
    throw new Error('Method not implemented.');
  }

  get validate(){
    return this.forgotPasswordForm.controls;
  }
  onSubmit(){
    this.submitted = true;
    console.log("this.forgotPasswordForm.value,",this.forgotPasswordForm.value)
    this.apollo
      .watchQuery<unknown>({
        query: SendForgotPasswordRequest,
        variables: {
          email: this.forgotPasswordForm.value,
        },
      })
      .valueChanges.subscribe((_data: unknown) => {
        console.log('_data', _data);
      });


  }
}
