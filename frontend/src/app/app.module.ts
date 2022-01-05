import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from 'src/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddUserComponent } from 'src/registerUser/add-user.component';
import { GraphQLModule } from './graphql.module';
import { ListUserComponent } from 'src/registerUser/list-users.component';
import { MatTableModule } from '@angular/material/table';
import { LoginUserComponent } from './loginUser/login-user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { ForgotPasswordComponent } from './forgotPassword/forgot-password.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MatToolbarModule } from '@angular/material/toolbar'
import { ResetPasswordComponent } from './resetPassword/reset-password.component';
import { CompleteAccountComponent } from './completeAccount/complete-account.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddUserComponent,
    ListUserComponent,
    LoginUserComponent,
    UserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CompleteAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GraphQLModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[ MatTableModule,MatPaginatorModule ]
})
export class AppModule { }
