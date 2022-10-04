import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProposalData } from '../Models/ProposalData.model';
import { DeviceDetectorService } from './device-detector.service';
import { LocalStorageService } from './localstrage.service';
import { HotToastService } from "@ngneat/hot-toast";

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  proposalDataToEdit: any = [];

  baseUrl: string = environment.baseUrl + 'proposal/';

  Proposals: any;
  ProposalFormData: any;

  private updateHeader = () => {
    let authToken: string = `${this.localStorage.getItem('auth-token')}`;
    let deviceType: string = this.deviceDetectorService.detectDevice();
    let headers: HttpHeaders = new HttpHeaders({
      'auth-token': authToken,
      'devicetype': deviceType
    });

    let httpOptions: any = {
      headers: headers
    }

    return httpOptions;

  };

  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient,
    private deviceDetectorService: DeviceDetectorService,
    private toster: HotToastService,
  ){ }

  initializeProposal = () => {
    let httpOptions = this.updateHeader();
    return this.http.get(this.baseUrl + 'init', httpOptions).pipe(
      this.toster.observe({
        success: 'Proposal Initialized',
        loading: 'Initialzing Proposal...',
        error: ({ error }) => `${error.Message}`
      })
    );
  }

  addClientInfo = (clientInfo: any, id: string) => {
    let httpOptions = this.updateHeader();
    return this.http.post(this.baseUrl + 'addClientInfo/' + id, clientInfo, httpOptions).pipe(
      this.toster.observe({
        success: 'Proposal data saved Successfully',
        loading: 'Saving proposal data...',
        error: ({ error }) => `${error.Message}`
      })
    );
  }

  addRequirement = (requirementData: any, id: string) => {
    let httpOptions = this.updateHeader();
    return this.http.post(this.baseUrl + 'addRequirement/' + id, requirementData, httpOptions).pipe(
      this.toster.observe({
        success: 'Requirement Saved Successfully',
        loading: 'Saving requirement...',
        error: ({ error }) => `${error.Message}`
      })
    );;
  }

  getAllProposal(){
    return this.http.get('http://192.168.29.233:3000/getAllProposal');
  }
  getSingleProposal(id: any) {
    return this.http.post('http://192.168.29.233:3000/getProposalById',{proposalId: id});
  }

  deleteProposal(id: any) {
    return this.http.post('http://192.168.29.233:3000/deleteProposal',{proposalId: id});
  }
  updateProposal(id: any){
    return this.http.post('http://192.168.29.233:3000/updateProposal',{proposalId: id});
  }

}
