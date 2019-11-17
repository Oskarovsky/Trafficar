import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Box} from "./box-model";
import {BoxesApiService} from "./box-api.service";

@Component({
  selector: 'box',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxListComponent implements OnInit, OnDestroy {
  boxesListSubs: Subscription;
  boxesList: Box[];

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

  ngOnDestroy() {
    this.boxesListSubs.unsubscribe();
  }

}
