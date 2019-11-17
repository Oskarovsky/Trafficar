import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxesApiService } from "./box/box-api.service";
import { BoxListComponent } from './box/box-list.component';

const appRoutes: Routes = [
  {path: 'all-boxes', component: BoxListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BoxListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BoxesApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
