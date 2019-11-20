import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BoxesApiService} from "../box/box-api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-box-form',
  templateUrl: './box-form.component.html',
  styleUrls: ['./box-form.component.css']
})
export class BoxFormComponent {
  box = {
    name: '',
    description: '',
    weight: 0,
    width: 0,
    height: 0,
    length: 0,
  };

  constructor(private boxesApi: BoxesApiService, private router: Router) { }


  updateName(event: any) {
    this.box.name = event.target.value;
  }

  updateDescription(event: any) {
    this.box.description = event.target.value;
  }

  saveBox() {
    this.boxesApi
      .saveBox(this.box)
      .subscribe(
        () => this.router.navigate(['/']),
        error => alert(error.message)
      );
  }

}
