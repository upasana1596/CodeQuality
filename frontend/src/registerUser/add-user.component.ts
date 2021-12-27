import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { take } from 'rxjs';
import { SignUpGQL } from 'src/common/graphql/generated/graphql';
const createUser = gql`
  mutation SignUp($input: UserInput!) {
    SignUp(input: $input)
  }
`;
@Component({
  // selector: 'app-root',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  submitted = false;
  constructor(private form: FormBuilder, private signUpGQL: SignUpGQL,
    private apollo:Apollo) {}
  ngOnInit() {
    this.userForm = this.form.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern]],
      mobileNumber: ['', Validators.required],
    });
  }
  get validateUser() {
    return this.userForm.controls;
  }
  createNewUser() {
    this.submitted = true;
    console.log(" this.userForm.value", this.userForm.value)
    // this.apollo
    //   .mutate({
    //     mutation: createUser,
    //     variables: {
    //       input: this.userForm.controls,
    //     },
    //   }).subscribe((data: any) => {
    //     console.log("data",data)
      // })
    this.signUpGQL.mutate({ input:  this.userForm.value })
      .pipe(take(1))
      .subscribe((_data: unknown) => {
        console.log("_data",_data)
      });
  }
}
