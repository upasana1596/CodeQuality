import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { take } from 'rxjs';
import { SignUpGQL } from 'src/common/graphql/generated/graphql';
import {MatListModule} from '@angular/material/list';
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
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern]],
      mobile_no: ['', Validators.required],
      status_code:0,

    });
  }
  get validateUser() {
    return this.userForm.controls;
  }
  createNewUser() {
    this.submitted = true;
    console.log(" this.userForm.value", this.userForm.value)
    const firstName = this.userForm.value.first_name;
    const lastName = this.userForm.value.last_name;
    const mobileNo = Number(this.userForm.value.mobile_no);
    const email = this.userForm.value.email;
    this.signUpGQL.mutate({ first_name:  firstName,last_name:lastName,email:email,mobile_no:mobileNo })
      .subscribe((_data: unknown) => {
        console.log("_data",_data)
    });
  }
}
