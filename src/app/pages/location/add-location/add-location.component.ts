import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocationService } from 'src/app/services/location.service';

export interface DialogData {
  editMode: boolean;
}
@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private locationService: LocationService,
    private cd: ChangeDetectorRef,
    private authService: AuthenticationService
  ) {

  }

  File!: File;
  FileData: any;
  FormData: any;


  


  addLocation = new FormGroup<string | any>({
    'city': new FormControl(''),
    'state': new FormControl(''),
    'area': new FormControl(''),
    'locality': new FormControl(''),
    'dimension': new FormControl(''),
    'address': new FormControl(''),
    'pinCode': new FormControl(''),
  })

  ngOnInit(): void {
    console.log(this.data.editMode);
    if (this.data.editMode === true) {
      this.locationService.getLocationById(this.locationService.locationIdToUpdate).subscribe({
        next: (result) => {
          this.addLocation.patchValue(result);
  
          this.FormData = result;
          this.cd.detectChanges();
        },
        error: (err: any) => {
          this.authService.handleAuthError(err);
        }
      })
    }
  }


  // onAdd(controlName: string){
  //   const control = new FormControl(null);
  //   (<FormArray>this.addLocation.get(controlName)).push(control);
  // }
  // onRemove(controlName:string, controlIndex: number){
  //   (<FormArray>this.addLocation.get(controlName)).removeAt(controlIndex);

  // }

  uploadImages(event: any) {
    this.File = event.target.files;
    this.FileData = Object.values(this.File);


    // if (File) {
    //   const formData = new FormData();
    //   formData.append("images", File);
    //   formData.append("city", this.addLocation.value.city);
    //   formData.append("state", this.addLocation.value.state);
    //   formData.append("area", this.addLocation.value.area);
    //   formData.append("locality", this.addLocation.value.locality);
    //   formData.append("dimension", this.addLocation.value.dimension);
    //   formData.append("address", this.addLocation.value.address);
    //   formData.append("pinCode", this.addLocation.value.pinCode);



    //   const upload$ = this.http.post("http://192.168.29.233:3000/addLocation", formData);

    //   upload$.subscribe();

    // }

  }
  appendFormData() {
    const formData = new FormData();
    if (this.data.editMode === false) {
      this.FileData.forEach((file: Blob) => { formData.append('images', file) })
    }
    // formData.append("images", this.FileData);
    formData.append("city", this.addLocation.value.city);
    formData.append("state", this.addLocation.value.state);
    formData.append("area", this.addLocation.value.area);
    formData.append("locality", this.addLocation.value.locality);
    formData.append("dimension", this.addLocation.value.dimension);
    formData.append("address", this.addLocation.value.address);
    formData.append("pinCode", this.addLocation.value.pinCode);

    return formData;
  }

  onSubmit() {

    let formData = this.appendFormData();
    if (this.data.editMode === true) {
      formData.append("locationId", this.locationService.locationIdToUpdate);

      this.locationService.updateLocation(formData).subscribe({
        next: (result:any) => {
          console.log(result);
        },
        error: (err: any) => {
          this.authService.handleAuthError(err);
        }
      });
    }
    else {
      this.locationService.addLocation(formData).subscribe({
        next: (result:any) => {
          console.log(result);
        },
        error: (err: any) => {
          this.authService.handleAuthError(err);
        }
      });
    }


  }
}
