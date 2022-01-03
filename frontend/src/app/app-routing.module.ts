import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from 'src/navbar/navbar.component';
import { AddUserComponent } from 'src/registerUser/add-user.component';
import { ListUserComponent } from 'src/registerUser/list-users.component';
import { ForgotPasswordComponent } from './forgotPassword/forgot-password.component';
import { LoginUserComponent } from './loginUser/login-user.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: NavbarComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'listUser', component: ListUserComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'user', component: UserComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
