import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BoxesApiService} from "./box/box-api.service";
import {Box} from "./box/box-model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  boxesListSubs: Subscription;
  boxesList: Box[];

  constructor(private boxesApi: BoxesApiService) {

  }

  ngOnInit(): void {
    this.boxesListSubs = this.boxesApi
      .getBoxes()
      .subscribe(res => {
        this.boxesList = res;
      },
        console.error
      );
  }

  ngOnDestroy(): void {
    this.boxesListSubs.unsubscribe();
  }

}
