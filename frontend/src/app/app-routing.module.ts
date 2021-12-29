import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from 'src/navbar/navbar.component';
import { AddUserComponent } from 'src/registerUser/add-user.component';
import { ListUserComponent } from 'src/registerUser/list-users.component';
import { LoginUserComponent } from './loginUser/login-user.component';

const routes: Routes = [
  { path: '', component: NavbarComponent },
  { path: 'addUser', component:AddUserComponent },
  { path: 'listUser', component:ListUserComponent },
  { path: 'login', component:LoginUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
