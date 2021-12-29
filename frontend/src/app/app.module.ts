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
import { UserComponent } from './user/user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddUserComponent,
    ListUserComponent,
    LoginUserComponent
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GraphQLModule,
    MatTableModule 
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[ MatTableModule,MatPaginatorModule ]
})
export class AppModule { }
