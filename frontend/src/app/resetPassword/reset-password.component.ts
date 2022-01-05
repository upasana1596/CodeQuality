import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { take } from 'rxjs/operators';
import { SendResetPasswordRequestGQL, UpdateForgotUserPasswordGQL, UpdateResetUserPasswordGQL } from 'src/common/graphql/generated/graphql';
// import {
//   GetUserByEmailGQL,
//   UpdatePasswordGQL,
//   GetPasswordDetailGQL,
//   UpdatePasswordDetailGQL,
// } from 'src/common/graphql/generated';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private updateForgotUserPasswordGQL:UpdateForgotUserPasswordGQL
  ) {}

  email = '';
  code = '';
  confirmCode = false;
  error = '';
  confirmpassword = '';
  password = '';
  codeWasConfirmed = false;
  resetPasswordForm!: FormGroup;
  submitted: Boolean = false;
  message: Boolean = false;
  status: any;
  isDisabled: any;
  userName: any;

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      // username: ['', [Validators.required, Validators.email]],
      confirmpassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18),
        ],
      ],
    });

    // this.sendResetPasswordRequestQuery
    //   .fetch({
    //     email: String(this.route.snapshot.paramMap.get('email')),
    //   })
    //   .pipe(take(1))
    //   .subscribe(({ data }) => {
    //     this.status = data.getPasswordDetail?.record_status;
    //     if (this.status === 0) {
    //       this.isDisabled = false;
    //     } else {
    //       this.isDisabled = true;
    //     }
    //   });
    /* Get username*/
    // this.getUserByEmailQuery
    //   .fetch({
    //     email: String(this.route.snapshot.paramMap.get('email')),
    //   })
    //   .pipe(take(1))
    //   .subscribe(({ data }) => {
    //     this.userName = data.getUserByEmail?.username;
    //   });
  }
  get validate() {
    return this.resetPasswordForm.controls;
  }
  onSubmit() {
    console.log("this.resetPasswordForm.value",this.resetPasswordForm.value.password)
    if (
      null != this.resetPasswordForm.value.password &&
      '' != this.resetPasswordForm.value.password &&
      null != this.resetPasswordForm.value.confirmpassword &&
      '' != this.resetPasswordForm.value.confirmpassword &&
      8! < this.resetPasswordForm.value.password.length &&
      8! < this.resetPasswordForm.value.confirmpassword.length
    ) {
      this.submitted = true;
      this.updateForgotUserPasswordGQL
        .mutate({
          newPasswordHash: this.resetPasswordForm.value.password,
          email: String(this.route.snapshot.paramMap.get('email'))
        })
        .subscribe((data: unknown) => {
          this.message = true;
          // this.updatePasswordDetailGQL
          //   .mutate({
          //     email: String(this.route.snapshot.paramMap.get('email')),
          //   })
          //   .subscribe((data) => {
          //     setTimeout(() => {
          //       this.router.navigate(['/login']).then(() => {});
          //     }, 2000);
          //   });
        });
    } else {
      this.submitted = true;
    }
  }
}
