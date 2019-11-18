import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxesApiService } from "./box/box-api.service";
import { BoxListComponent } from './box/box-list.component';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
         MatSortModule, MatTableModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { CdkTableModule } from "@angular/cdk/table";
import { BoxFormComponent } from './box-form/box-form.component';
import { CallbackComponent } from './callback/callback.component';
import * as Auth0 from 'auth0-web';

const appRoutes: Routes = [
  {path: 'allBoxes', component: BoxListComponent},
  {path: 'addBox', component: BoxFormComponent},
  {path: 'callback', component: CallbackComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    BoxListComponent,
    BoxFormComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    // MATERIAL DESIGN
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    CdkTableModule
  ],
  providers: [BoxesApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Auth0.configure({
      domain: 'oskarro.eu.auth0.com',
      audience: 'https://trafficar.com',
      clientID: 'UZBpDr1ITSnnPzU8x6nL7FBIh0jSI4Qp',
      redirectUri: 'http://localhost:4200/callback',
      scope: 'openid profile manage:boxes'
    });
  }
}
