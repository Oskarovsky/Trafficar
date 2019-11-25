import {Component, OnInit} from "@angular/core";
import {BoxesApiService} from "../box/box-api.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Location } from '@angular/common';
import {Box} from "../box/box-model";

@Component({
  selector: 'app-box-form',
  templateUrl: './box-form.component.html',
  styleUrls: ['./box-form.component.css']
})
export class BoxFormComponent implements OnInit {
  public boxForm: FormGroup;
  box = {
    name: '',
    description: '',
    weight: 0,
    width: 0,
    height: 0,
    length: 0,
    target_place: ''
  };

  constructor(private boxesApi: BoxesApiService, private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.boxForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      width: new FormControl('',[Validators.required]),
      weight: new FormControl('',[Validators.required]),
      height: new FormControl('',[Validators.required]),
      length: new FormControl('',[Validators.required]),
      target_place: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.boxForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  public addBoxToList = (ownerFormValue) => {
    if (this.boxForm.valid) {
      this.executeOwnerCreation(ownerFormValue);
    }
  };

  private executeOwnerCreation = (boxValueFromForm) => {
    this.boxesApi
      .saveBox(this.box)
      .subscribe(
        () => {
          this.router.navigate(['/allBoxes']);
          this.location.back();
          },
    error => alert(error.message)
      );
  };

  updateName(event: any) {
    this.box.name = event.target.value;
  }

  updateDescription(event: any) {
    this.box.description = event.target.value;
  }

  updateWeight(event: any) {
    this.box.weight = event.target.value;
  }

  updateWidth(event: any) {
    this.box.width = event.target.value;
  }

  updateHeight(event: any) {
    this.box.height = event.target.value;
  }

  updateLength(event: any) {
    this.box.length = event.target.value;
  }

  updateTargetPlace(event: any) {
    this.box.target_place = event.target.value;
  }

}
