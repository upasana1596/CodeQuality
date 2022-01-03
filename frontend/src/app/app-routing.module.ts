import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from 'src/navbar/navbar.component';
import { AddUserComponent } from 'src/registerUser/add-user.component';
import { ForgotPasswordComponent } from './forgotPassword/forgot-password.component';
import { LoginUserComponent } from './loginUser/login-user.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: NavbarComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'users', component: UserComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'edit-user/:id', component: UpdateUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
