import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProposalService } from 'src/app/services/proposal.service';


@Component({
  selector: 'app-location-preview',
  templateUrl: './location-preview.component.html',
  styleUrls: ['./location-preview.component.scss']
})
export class LocationPreviewComponent implements OnInit {

  baseUrl: string = 'http://192.168.29.233:3000/uploads'

  city!: string;
  location!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proposalService: ProposalService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    console.log(this.locationPreviews);
    if(this.route.snapshot.params?.['location']){
      this.location = this.route.snapshot.params?.['location'];
    }
  }

  locationPreviews = [
    {
      location: 'Shivaji Nagar',
      images: [
        this.baseUrl + '/preview/location1.jpg',
        this.baseUrl + '/preview/location1-1.jpeg'
      ]
    },
    {
      location: 'Kharadi',
      images: [
        this.baseUrl + '/preview/location2.jpeg',
        this.baseUrl + '/preview/location2-1.jpeg'
      ]
    },
    {
      location: 'Mumbai',
      images: []
    }
  ];

  initProposal = () => {
    this.proposalService.initializeProposal().subscribe({
      next: (result: any) => {
        if (result.Message === "Proposal Initiated Successfully") {
          this.router.navigate(['/new-proposal/add', this.location, result.Id]);
        }
      },
      error: (err: any) => {
        this.authService.handleAuthError(err);
      }
    })
  }

}
