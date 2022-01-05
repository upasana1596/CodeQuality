import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { GetAllUsersGQL } from 'src/common/graphql/generated/graphql';

export interface PeriodicElement {
  id: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email','action'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource: any;
  constructor(private apollo:Apollo, private router: Router,private getUserQuery:GetAllUsersGQL) { }

  ngOnInit(): void {
    this.getUserQuery.watch().valueChanges.subscribe((data:any) => {
      this.dataSource= data.data.GetAllUsers;
    });
  }
}
