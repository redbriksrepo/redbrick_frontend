import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LocationComponent } from "./location.component";
import { AddLocationComponent } from './add-location/add-location.component';
import { MaterialModule } from "src/app/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LocationComponent, AddLocationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LocationComponent
      }
    ]),
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class LocationModule {}
