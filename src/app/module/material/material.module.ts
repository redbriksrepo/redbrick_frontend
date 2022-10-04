import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

const materials = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
]



@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialModule { }
