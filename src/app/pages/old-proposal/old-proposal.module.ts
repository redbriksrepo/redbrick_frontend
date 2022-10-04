import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/material.module";
import { OldProposalComponent } from "./old-proposal.component";



@NgModule({
  declarations: [OldProposalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path:'',
      component: OldProposalComponent
    }]),
    MaterialModule,

  ],
  exports:[]
})

export class OldProposalModule{}
