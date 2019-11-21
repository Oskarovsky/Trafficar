import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { BoxesApiService } from "./box/box-api.service";
import { Box } from "./box/box-model";
import * as Auth0 from "auth0-web";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  boxesListSubs: Subscription;
  boxesList: Box[];
  authenticated = false;

  constructor(private boxesApi: BoxesApiService) {}

  signIn = Auth0.signIn;
  signOut = Auth0.signOut;
  getProfile = Auth0.getProfile;

  ngOnInit(): void {
    this.boxesListSubs = this.boxesApi
      .getBoxes()
      .subscribe(res => {
        this.boxesList = res;
      },
        console.error
      );
    const self = this;
    Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }

  ngOnDestroy(): void {
    this.boxesListSubs.unsubscribe();
  }

}
