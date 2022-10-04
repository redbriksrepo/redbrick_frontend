import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProposalService } from 'src/app/services/proposal.service';
import { HttpClient } from '@angular/common/http';
import  Swal  from 'sweetalert2';
import * as _ from 'lodash';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-form',
  templateUrl: './new-proposal.component.html',
  styleUrls: ['./new-proposal.component.scss']
})
export class NewProposalComponent implements OnInit, OnChanges {

  IPC: boolean = false;
  NonIPC: boolean = false;
  dilogBroker: boolean = false;
  NoConflictFound: boolean = false;
  conflictFound: boolean = true;
  location!: string;
  visitorMeetingRooms: boolean = false;
  valueChange: any;
  EditMode: boolean = false;
  proposalDataToUpdate: any = {};
  proposalId!: string;


  newProposal = new FormGroup({
    'salesTeam': new FormControl(''),
    'salesHead': new FormControl(''),
    'location': new FormControl(''),
    'center': new FormControl(''),
    'broker': new FormGroup({
      'brokerType': new FormControl(''),
      'brokerCategory': new FormControl(''),
      'brokerCategoryOther': new FormControl('')
    }),
    'spocName': new FormControl(''),
    'clientName': new FormControl('')
  })


  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private proposalService: ProposalService,
    private authService: AuthenticationService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnInit(): void {
    if (this.route.snapshot.params['Id']) {
      this.proposalId = this.route.snapshot.params['Id'];
      this.cd.detectChanges();
    }
    if (this.route.snapshot.params['location']) {
      if (this.route.snapshot.params['location'] === 'edit') {
        this.EditMode = true;
        let id = this.route.snapshot.params['id'];
        console.log(id);
        this.proposalService.getSingleProposal(id).subscribe((result:any) => {
          this.newProposal.patchValue(result);
          for(let key of Object.keys(this.newProposal.value)){
            this.proposalDataToUpdate[key] = result[key]
          }
          if(result.broker.brokerType === 'IPC'){
            this.IPC = true;
          }
          else if(result.broker.brokerType === 'Non-IPC'){
            this.NonIPC = true;
          }
          this.cd.detectChanges();
        })
      }
      else {
        this.newProposal.patchValue({
          'location': this.route.snapshot.params['location']
        })
      }

      console.log(this.newProposal.value?.['location']);
    }
    console.log(this.proposalService.proposalDataToEdit);

    if (this.newProposal.value?.['broker']?.brokerType === 'IPC') {
      this.IPC = true;
      this.NonIPC = false;
    }
    else if (this.newProposal.value?.['broker']?.brokerType === 'Non-IPC') {
      this.NonIPC = true;
      this.IPC = false;
    }
  }

  get storageRoom() {
    return this.newProposal.get('workStation.storageRoom');
  }

  get cafeteria() {
    return this.newProposal.get('workStation.cafeteria');
  }

  get visitorMeetingRoomToggle() {
    return this.newProposal.get('cabin.visitorMeetingRoom.visitorMeetingRoomToggle');
  }



  //////////////
  Ipc() {
    this.IPC = true;
    this.NonIPC = false;
    this.newProposal.patchValue({
      'broker': {
        'brokerType': 'IPC'
      }
    });
    this.openDialogBroker();
    console.log(this.IPC);

  }
  NonIpc() {

    this.NonIPC = true;
    this.IPC = false;
    this.newProposal.patchValue({
      'broker': {
        'brokerType': 'Non-IPC'
      }
    });
    this.openDialogBroker();
    console.log(this.IPC);

  }
  openDialogBroker() {
    this.dilogBroker = true;
  }
  closeDialogBroker() {
    this.dilogBroker = false;
  }
  closeDialogBrokerCloseBtn() {
    this.newProposal.patchValue({
      'broker': {
        'brokerCategory': '',
        'brokerCategoryOther': ''
      }
    });
    this.IPC = false;
    this.NonIPC = false;
    this.closeDialogBroker();
  }



  onSubmit() {
    this.proposalService.addClientInfo(this.newProposal.value, this.proposalId).subscribe({
      next: (result: any) => {
        if (result.Message === "Client Info added Successfully!") {
          this.router.navigate(['/new-proposal/requirement',this.proposalId])
        }
      },
      error: (err: any) => {
        this.authService.handleAuthError(err);
      }
    })
  }
  get brokerCategory() {
    return this.newProposal.get('broker.brokerCategory');
  }



}
