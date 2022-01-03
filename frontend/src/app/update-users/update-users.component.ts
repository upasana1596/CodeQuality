import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetUserByIdGQL, UpdateUserGQL } from 'src/common/graphql/generated/graphql';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.scss']
})
export class UpdateUsersComponent implements OnInit {

  updateUserForm!: FormGroup;
  submitted = false;
  UserId: any;
  dataSource: any;
  
  constructor(private form: FormBuilder,public route: ActivatedRoute,private updateUserQuery:UpdateUserGQL,private getUserByIdQuery:GetUserByIdGQL){}

  ngOnInit(){
    const Id = this.route.snapshot.paramMap.get('id');
    this.getUserById(Id);
    this.updateUserForm = this.form.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern]],
      mobile_no:['',Validators.required]
    })
  }

  getUserById(id:any){
    this.getUserByIdQuery.fetch({id : id}).subscribe((data:any) => {
      this.dataSource= data.data.GetUserByID;
      this.updateUserForm.patchValue(this.dataSource);
    });
  }
  get validateUser() {
    return this.updateUserForm.controls;
  }
  updateUserDetails(){
    this.submitted = true;
    const Id = String(this.route.snapshot.paramMap.get('id'));
    const firstName = this.updateUserForm.value.first_name;
    const lastName = this.updateUserForm.value.last_name;
    const MobileNo = Number(this.updateUserForm.value.mobile_no);
    const Email = this.updateUserForm.value.email;
    this.updateUserQuery
    .mutate({
      id: Id,
      first_name:firstName,
      last_name:lastName,
      mobile_no:MobileNo,
      email:Email
      })
      .subscribe((data) => {
      });
  }
}