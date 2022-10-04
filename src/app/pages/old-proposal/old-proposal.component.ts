import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProposalData } from 'src/app/Models/ProposalData.model';
import { ProposalService } from 'src/app/services/proposal.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-old-proposal',
  templateUrl: './old-proposal.component.html',
  styleUrls: ['./old-proposal.component.scss']
})
export class OldProposalComponent implements OnInit {

  All: boolean = false;
  Status: string = 'pending';
  confirmDelete: boolean = false;
  lastDeletedData: any[] = [];
  Proposals: any;

  @ViewChild(MatTable) table!: MatTable<ProposalData>;

  constructor(
    private router: Router,
    private proposalService: ProposalService,
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) {

  }



  displayedColumns: string[] = ['sr', 'spocName', 'date', 'brokerType', 'workStation', 'cabin', 'meetingRooms', 'status', 'actions'];
  dataSource!: MatTableDataSource<ProposalData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  Authtoken: any = localStorage.getItem('v8.0.38-authf649fc9a5f55');
  Auth: any = JSON.parse(this.Authtoken);
  Admin: boolean = false;
  SalesHead: boolean = false;
  rm: boolean = false;

  ngOnInit(): void {
    if (this.Auth.authToken === 'auth-token-8f3ae836da744329a6f93bf20594b5cc') {
      this.Admin = true;
      console.log('Admin')
    }
    else if (this.Auth.authToken === 'auth-token-6829bba69dd3421d8762-991e9e806dbf') {
      this.rm = true;
      console.log('rm')
    }
    else if (this.Auth.authToken === 'auth-token-d2dff7b82f784de584b60964abbe45b9') {
      this.SalesHead = true;
      console.log('sales Head')
    }
    else {
      console.log(this.Auth.authToken);
    }
    this.proposalService.getAllProposal().subscribe((result: any) => {
      this.Proposals = result;
      this.tableDataSource(this.Proposals);
    });

  }

  editProposal(id: number) {
    this.router.navigate(['/new-proposal', 'edit', id]);
  }

  tableDataSource(data: ProposalData[] | undefined) {
    // debugger;

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    // debugger;
    console.log(this.Proposals)
    // debugger;
    this.cd.detectChanges();
    this.table.renderRows();
  }

  deleteProposal(id: number) {

    Swal.fire({
      title: 'Delete Confirm!',
      text: 'Are you sure you want to Delete this Proposal?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
    }).then((confirmation) => {
      if (confirmation.isConfirmed) {
        this.proposalService.deleteProposal(id).subscribe(() => {
          this.proposalService.getAllProposal().subscribe((result) => {
            this.Proposals = result;
            this.tableDataSource(this.Proposals);
          })
        });
      }
    })

  }

  approveProposal(id: any) {
    Swal.fire({
      title: 'Delete Confirm!',
      text: 'Are you sure you want to Approve this Proposal?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Approve',
    }).then((confirmation) => {
      if (confirmation.isConfirmed) {
        let approvalData = { proposalId: id, status: 'Approved' }
        this.http.post('http://192.168.29.233:3000/updateProposal', approvalData).subscribe((result) => {
          console.log(result);
          this.proposalService.getAllProposal().subscribe((result: any) => {
            this.Proposals = result;
            this.tableDataSource(this.Proposals);
          });
        })
      }
    })
  }
  declineProposal(id: any) {
    Swal.fire({
      title: 'Delete Confirm!',
      text: 'Are you sure you want to Decline this Proposal?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Decline',
    }).then((confirmation) => {
      if (confirmation.isConfirmed) {
        let approvalData = { proposalId: id, status: 'Decline' }
        this.http.post('http://192.168.29.233:3000/updateProposal', approvalData).subscribe((result) => {
          console.log(result);
          this.proposalService.getAllProposal().subscribe((result: any) => {
            this.Proposals = result;
            this.tableDataSource(this.Proposals);
          });
        })
      }
    })
  }



  edit(s: number) {
    // this.Proposals.find((p,i) => {
    //   if(p.sr === s){
    //     console.log(this.Proposals[i])
    //   }
    // })
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  closeConfirmDeleteDialog() {
    this.confirmDelete = false;
  }

  cancelDelete() {
    this.proposalService.Proposals = [...this.proposalService.Proposals, ...this.lastDeletedData];
    this.tableDataSource(this.proposalService.Proposals);
    this.confirmDelete = false;
  }




}
