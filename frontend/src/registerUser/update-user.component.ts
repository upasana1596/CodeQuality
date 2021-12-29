import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    // selector: 'app-root',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent  implements OnInit{
    updateUserForm!: FormGroup;
submitted = false;
constructor(
    private form: FormBuilder,
){

}
ngOnInit(){
     this.updateUserForm = this.form.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern]],
        mobileNumber:['',Validators.required]
    })
}
get validateUser() {
    return this.updateUserForm.controls;
  }
  updateUserDetails(){
    this.submitted = true
    console.log("UserForm", this.updateUserForm.value);
  }
}