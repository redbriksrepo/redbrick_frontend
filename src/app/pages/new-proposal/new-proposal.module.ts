import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewProposalComponent } from './new-proposal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RequirementComponent } from './requirement/requirement.component';

@NgModule({
  declarations: [NewProposalComponent, RequirementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'requirement/:Id',
        component: RequirementComponent
      },
      {
        path: 'requirement/edit/:Id',
        component: RequirementComponent
      },
      {
        path: 'add/:location/:Id',
        component: NewProposalComponent,
      }
    ]),
    ReactiveFormsModule
  ],
})
export class NewProposalModule {}
