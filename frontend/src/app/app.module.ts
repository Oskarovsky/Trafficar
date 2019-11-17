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
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSliderModule} from "@angular/material/slider";
import {CdkTableModule} from "@angular/cdk/table";

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
export class AppModule { }
