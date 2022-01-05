import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from 'src/registerUser/add-user.component';
import { CompleteAccountComponent } from './completeAccount/complete-account.component';
import { ForgotPasswordComponent } from './forgotPassword/forgot-password.component';
import { LoginUserComponent } from './loginUser/login-user.component';
import { ResetPasswordComponent } from './resetPassword/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UpdateUsersComponent } from './update-users/update-users.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: '', component: LoginUserComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'users', component: UserComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'reset-password/:email/:code', component: ResetPasswordComponent },
  {
    path: 'confirm-email/:email/:code',
    component: CompleteAccountComponent,
  },
  { path: 'edit-user/:id', component: UpdateUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
