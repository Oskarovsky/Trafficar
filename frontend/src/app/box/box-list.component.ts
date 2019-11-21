import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Box} from "./box-model";
import {BoxesApiService} from "./box-api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'box',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxListComponent implements OnInit, OnDestroy {
  boxesListSubs: Subscription;
  boxesList: Box[];
  displayedColumns = ['id', 'name', 'description', 'weight', 'height', 'width', 'length'];
  dataSource: MatTableDataSource<Box>;
  authenticated = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private boxesApi: BoxesApiService) { }

  ngOnInit() {
    this.boxesListSubs = this.boxesApi
      .getBoxes()
      .subscribe(res => {
        this.boxesList = res;
      },
      console.error
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.boxesListSubs.unsubscribe();
  }

}
