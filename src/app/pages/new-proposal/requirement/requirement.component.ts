import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProposalService } from 'src/app/services/proposal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.scss']
})
export class RequirementComponent implements OnInit {

  proposalId!: string;

  constructor(
    private proposalService: ProposalService,
    private authService: AuthenticationService,
    private route: ActivatedRoute, 
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  proposalRequirement = new FormGroup({
    'workStation': new FormGroup({
      'workStationCategory': new FormControl(''),
      'workStationNumber': new FormControl(''),
      'collabArea': new FormControl(''),
      'dryPantry': new FormControl(''),
      'storageRoom': new FormControl(''),
      'storageRoomNumber': new FormControl(1),
      'cafeteria': new FormControl(''),
      'cafeteriaNumber': new FormControl(1)
    }),
    'cabin': new FormGroup({
      'cabinCategory': new FormControl(''),
      'cabinNumber': new FormControl(''),
      'reception': new FormControl(''),
      'visitorMeetingRoom': new FormGroup({
        'visitorMeetingRoomToggle': new FormControl(''),
        'visitorMeetingRoomCategory': new FormControl(''),
        'visitorMeetingRoomNumber': new FormControl(1),
      })
    }),
    'meetingRooms': new FormGroup({
      'meetingRoomsCategory': new FormControl(''),
      'meetingRoomNumbers': new FormControl(''),
      'mailRoom': new FormControl(''),
      'bmsRoom': new FormControl(''),
      'compactor': new FormControl('')
    })
  })

  get storageRoom() {
    return this.proposalRequirement.get('workStation.storageRoom');
  }

  get cafeteria() {
    return this.proposalRequirement.get('workStation.cafeteria');
  }

  get visitorMeetingRoomToggle() {
    return this.proposalRequirement.get('cabin.visitorMeetingRoom.visitorMeetingRoomToggle');
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['Id']) {
      this.proposalId = this.route.snapshot.params['Id'];
      this.cd.detectChanges();
    }
  }

  onSubmit = () => {
    this.proposalService.addRequirement(this.proposalRequirement.value, this.proposalId).subscribe({
      next: (result: any) => {
        if (result.Message === "Requirement added Successfully!") {
          Swal.fire({
            title: 'No Conflict Found!',
            text: 'no confict found with other proposals',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })
        }
      }, 
      error: (err: any) => {
        this.authService.handleAuthError(err);
      }
    })
  }

}
