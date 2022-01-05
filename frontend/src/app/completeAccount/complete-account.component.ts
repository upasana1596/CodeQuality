import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CompleteAccountConfirmPassword } from './complete-account-confirm-password';
import { take } from 'rxjs/operators';
import { log } from 'console';

@Component({
  selector: 'app-complete-account',
  templateUrl: './complete-account.component.html',
  styleUrls: ['./complete-account.component.scss'],
})
export class CompleteAccountComponent implements OnInit {
  error = '';
  emailId: any;
  userDetailForm!: FormGroup;
  submitted = false;
  useremail: any;
  status: any;
  verificationCode: any;
  confirmPassword = '';
  passwordHash = '';

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    let email = this.route.snapshot.paramMap.get('email');
    this.verificationCode = this.route.snapshot.paramMap.get('code');
    this.useremail = String(email);
    this.userDetailForm = this.fb.group(
      {
        // username: ['', [Validators.required]],
        email: [this.useremail],
        passwordHash: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: CompleteAccountConfirmPassword(
          'passwordHash',
          'confirmPassword'
        ),
      }
    );
    // this.verifyAuthCodeQuery
    //   .fetch({
    //     email: this.useremail,
    //     verificationCode: this.verificationCode,
    //   })
    //   .pipe(take(1))
    //   .subscribe((result: any) => {
    //     if (result.data.verifyAuthCode) {
    //       this.router.navigate(['/login']);
    //     } else {
    //       this.updatePasswordGQL
    //         .mutate({
    //           email: this.useremail,
    //           passwordHash: this.userDetailForm.value.passwordHash,
    //           status: 1,
    //           username: this.userDetailForm.value.username,
    //         })
    //         .subscribe((data) => {
    //           this.flashMessage.show(
    //             'Your email is verified, please set password.',
    //             {
    //               cssClass: 'alert-success flashMessage',
    //               timeout: this.constants.FLASH_MESSAGE_TIMEOUT,
    //             }
    //           );
    //         });
    //     }
    //   });
  }
  UpdateUserDetail() {
    this.submitted = true;
    if (this.userDetailForm.valid) {
        console.log("this.userDetailForm.value",this.userDetailForm.value)
    //   this.verifyAuthCodeQuery
    //     .fetch({
    //       email: this.useremail,
    //       verificationCode: this.verificationCode,
    //     })
    //     .pipe(take(1))
    //     .subscribe((result: any) => {
    //       if (!result.data.verifyAuthCode) {
    //         if (
    //           this.userDetailForm.value.username &&
    //           this.userDetailForm.value.passwordHash
    //         ) {
    //           this.updatePasswordGQL
    //             .mutate({
    //               email: this.useremail,
    //               passwordHash: this.userDetailForm.value.passwordHash,
    //               status: 2,
    //               username: this.userDetailForm.value.username,
    //             })
    //             .pipe(take(1))
    //             .subscribe((data) => {
    //               this.router.navigate(['/login']);
    //             });
    //         } else {
    //           this.router.navigate(['/login']);
    //         }
    //       }
    //     });
    }
  }
  get records() {
    return this.userDetailForm.controls;
  }
}
