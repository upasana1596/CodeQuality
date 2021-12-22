import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    // selector: 'app-root',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent  implements OnInit{
userForm!: FormGroup;
submitted = false;
constructor(
    private form: FormBuilder,
){

}
ngOnInit(){
     this.userForm = this.form.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern]],
        mobileNumber:['',Validators.required]
    })
}
get validateUser() {
    return this.userForm.controls;
  }
  createNewUser(){
    this.submitted = true
    console.log("UserForm", this.userForm.value);
  }
}